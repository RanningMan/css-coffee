import { NextApiRequest, NextApiResponse } from "next";

interface GeneratedContent {
  summary: string;
  codeExample: {
    HTML: string;
    CSS: string;
  };
}

type Data = GeneratedContent | { error: string };

// --- Simple in-memory per-IP rate limit (resets on cold start) ---
const RATE_LIMIT = 5; // requests
const RATE_WINDOW_MS = 60 * 1000; // per minute
const rateMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) {
    return true;
  }

  entry.count += 1;
  return false;
}

function getClientIp(req: NextApiRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  if (Array.isArray(forwarded)) {
    return forwarded[0];
  }
  return req.socket.remoteAddress || "unknown";
}

// The ai-blogger-agent generation API (sibling repo, run via `npm run serve`).
const AGENT_API_URL = process.env.AGENT_API_URL || "http://localhost:4000";
const TIMEOUT_MS = 15000;
const GENERIC_ERROR = "Couldn't generate a playground — try again";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // Rate limit
  if (isRateLimited(getClientIp(req))) {
    res.status(429).json({ error: "Too many requests" });
    return;
  }

  // Validate input
  const rawProperty = req.body?.property;
  if (typeof rawProperty !== "string" || rawProperty.trim().length === 0) {
    res.status(400).json({ error: "A CSS property is required" });
    return;
  }

  const property = rawProperty.trim().toLowerCase().slice(0, 60);

  // Delegate generation to the ai-blogger-agent API.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const agentRes = await fetch(`${AGENT_API_URL}/api/generate-playground`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ property }),
      signal: controller.signal,
    });

    const data = await agentRes.json().catch(() => null);

    if (!agentRes.ok || !data) {
      res.status(502).json({ error: GENERIC_ERROR });
      return;
    }

    const result: GeneratedContent = {
      summary: data.summary || "",
      codeExample: {
        HTML: data.codeExample?.HTML || "",
        CSS: data.codeExample?.CSS || "",
      },
    };
    res.status(200).json(result);
  } catch (error) {
    // Timeout / abort -> 504; agent unreachable or other failure -> 502.
    if (error instanceof Error && error.name === "AbortError") {
      res.status(504).json({ error: "Generation timed out — try again" });
      return;
    }
    res.status(502).json({ error: GENERIC_ERROR });
  } finally {
    clearTimeout(timeout);
  }
}

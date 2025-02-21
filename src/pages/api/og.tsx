import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            background: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <h1
            style={{
              fontSize: "80px",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            CSS Coffee
          </h1>
          <p
            style={{
              fontSize: "32px",
              color: "#666",
              textAlign: "center",
            }}
          >
            Learn CSS properties through interactive examples
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        // Add proper headers for caching
        headers: {
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      }
    );
  } catch (error) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}

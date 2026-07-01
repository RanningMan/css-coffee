import { useMemo, useState } from "react";
import styles from "./PlaygroundGenerator.module.css";

interface GeneratedContent {
  summary: string;
  codeExample: {
    HTML: string;
    CSS: string;
  };
}

interface PlaygroundGeneratorProps {
  locale?: string;
}

type Tab = "html" | "css" | "js";

const MAX_PROPERTY_LENGTH = 60;

/**
 * Assemble a self-contained document for the live preview. Rendered inside a
 * sandboxed iframe (allow-scripts only, no same-origin) so the generated
 * HTML/CSS/JS is fully isolated from the surrounding page — it cannot leak
 * styles or reach the parent document. Mirrors the HTML/CSS/JS demo shipped by
 * the agent's demoTemplateGenerator.ts.
 */
function buildSrcDoc(html: string, css: string, js: string): string {
  // Prevent user JS from breaking out of the injected <script> block.
  const safeJs = js.replace(/<\/script>/gi, "<\\/script>");

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  body {
    margin: 0;
    padding: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
${css}
</style>
</head>
<body>
${html}
<script>
try {
${safeJs}
} catch (e) { console.error(e); }
</script>
</body>
</html>`;
}

function makePgId(): string {
  return `pg-${Math.random().toString(36).slice(2, 10)}`;
}

export default function PlaygroundGenerator({
  locale = "en-US",
}: PlaygroundGeneratorProps) {
  const isZh = locale === "zh-CN";

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [pgId, setPgId] = useState<string | null>(null);
  const [propertyName, setPropertyName] = useState("");
  const [summary, setSummary] = useState("");
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("css");

  const srcDoc = useMemo(
    () => (pgId ? buildSrcDoc(html, css, js) : ""),
    [pgId, html, css, js]
  );

  const t = {
    heading: isZh ? "生成你自己的 Playground" : "Generate Your Own Playground",
    subheading: isZh
      ? "输入任意 CSS 属性，即时获得一个可交互的实时示例。"
      : "Type any CSS property and get a live, editable playground instantly.",
    placeholder: "e.g. grid-template-areas",
    generate: isZh ? "生成" : "Generate",
    generating: isZh ? "生成中…" : "Generating…",
    jsPlaceholder: isZh ? "// 可选的 JavaScript" : "// Optional JavaScript",
    genericError: isZh
      ? "无法生成 Playground —— 请重试"
      : "Couldn't generate a playground — try again",
    rateLimited: isZh
      ? "你最近生成了多个 Playground，请一分钟后再试。"
      : "You've generated several playgrounds recently. Try again in a minute.",
  };

  async function handleGenerate() {
    const property = input.trim();
    if (!property || loading) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate-playground", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ property }),
      });

      if (res.status === 429) {
        setError(t.rateLimited);
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        setError((data && data.error) || t.genericError);
        return;
      }

      const result = data as GeneratedContent;
      setPropertyName(property);
      setSummary(result.summary || "");
      setHtml(result.codeExample?.HTML || "");
      setCss(result.codeExample?.CSS || "");
      setJs(""); // model returns HTML + CSS only; JS starts empty for the user
      setPgId(makePgId());
      setActiveTab("css");
      setInput(""); // clear so the user can type the next property
    } catch {
      setError(t.genericError);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleGenerate();
    }
  }

  return (
    <section className={styles.section} aria-label={t.heading}>
      <h2 className={styles.heading}>{t.heading}</h2>
      <p className={styles.subheading}>{t.subheading}</p>

      <div className={styles.controls}>
        <input
          type="text"
          className={styles.input}
          placeholder={t.placeholder}
          value={input}
          maxLength={MAX_PROPERTY_LENGTH}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label={t.placeholder}
        />
        <button
          type="button"
          className={styles.button}
          onClick={handleGenerate}
          disabled={loading || input.trim().length === 0}
        >
          {loading ? t.generating : t.generate}
        </button>
      </div>

      <div className={styles.resultWrap}>
        {loading && (
          <div className={styles.loading} role="status">
            <span className={styles.spinner} aria-hidden="true" />
            <span>{t.generating}</span>
          </div>
        )}

        {!loading && error && (
          <div className={styles.error} role="alert">
            {error}
          </div>
        )}

        {!loading && !error && pgId && (
          <div className={styles.card}>
            <div className={styles.topic}>{propertyName}</div>

            <pre className={`language-css ${styles.codeSnippet}`}>
              <code className="language-css">{css}</code>
            </pre>

            <div className={styles.description}>{summary}</div>

            <div className={styles.demoArea}>
              <div className={styles.codePanel}>
                <div className={styles.tabs} role="tablist">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "html"}
                    className={`${styles.tab} ${
                      activeTab === "html" ? styles.tabActive : ""
                    }`}
                    onClick={() => setActiveTab("html")}
                  >
                    HTML
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "css"}
                    className={`${styles.tab} ${
                      activeTab === "css" ? styles.tabActive : ""
                    }`}
                    onClick={() => setActiveTab("css")}
                  >
                    CSS
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "js"}
                    className={`${styles.tab} ${
                      activeTab === "js" ? styles.tabActive : ""
                    }`}
                    onClick={() => setActiveTab("js")}
                  >
                    JavaScript
                  </button>
                </div>

                <textarea
                  className={styles.textarea}
                  spellCheck={false}
                  hidden={activeTab !== "html"}
                  value={html}
                  onChange={(e) => setHtml(e.target.value)}
                  aria-label="HTML editor"
                />
                <textarea
                  className={styles.textarea}
                  spellCheck={false}
                  hidden={activeTab !== "css"}
                  value={css}
                  onChange={(e) => setCss(e.target.value)}
                  aria-label="CSS editor"
                />
                <textarea
                  className={styles.textarea}
                  spellCheck={false}
                  hidden={activeTab !== "js"}
                  value={js}
                  placeholder={t.jsPlaceholder}
                  onChange={(e) => setJs(e.target.value)}
                  aria-label="JavaScript editor"
                />
              </div>

              <div className={styles.previewPanel}>
                <iframe
                  key={pgId}
                  className={styles.previewFrame}
                  title={`${propertyName} live preview`}
                  sandbox="allow-scripts"
                  srcDoc={srcDoc}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

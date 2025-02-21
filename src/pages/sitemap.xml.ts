import { GetServerSideProps } from "next";
import fs from "fs";
import path from "path";

const generateSitemap = (
  posts: string[]
) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://csscoffee.dev</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${posts
    .map(
      (post) => `
    <url>
      <loc>https://csscoffee.dev/demos/${post}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `
    )
    .join("")}
</urlset>`;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Set proper XML content type
  res.setHeader("Content-Type", "text/xml");

  try {
    const contentDir = path.join(process.cwd(), "content", "en-US");
    const files = fs.readdirSync(contentDir);
    const posts = files.map((file) => file.replace(".md", ""));

    // Generate and write sitemap
    res.write(generateSitemap(posts));
    res.end();
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.write(generateSitemap([]));
    res.end();
  }

  return {
    props: {},
  };
};

// Required default export
export default function Sitemap() {
  return null;
}

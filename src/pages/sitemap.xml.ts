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
  const contentDir = path.join(process.cwd(), "content", "en-US");
  const files = fs.readdirSync(contentDir);
  const posts = files.map((file) => file.replace(".md", ""));

  res.setHeader("Content-Type", "text/xml");
  res.write(generateSitemap(posts));
  res.end();

  return {
    props: {},
  };
};

export default function Sitemap() {
  return null;
}

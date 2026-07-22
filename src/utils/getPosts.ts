import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { Post } from "components/components.interface";

const postsDirectory = path.join(process.cwd(), "content");
const defaultLocale = "en-US";
// Keep in sync with the i18n locales in next.config.js
const supportedLocales = ["en-US", "zh-CN"];

// Translations are sparse: a locale directory only holds the posts translated
// so far, and locales are routable (next.config.js) before any of their content
// exists. Resolve each post individually and fall back to the default locale,
// which is the only locale guaranteed to be complete.
function getPostPath(id: string, locale: string) {
  if (supportedLocales.includes(locale)) {
    const localizedPath = path.join(postsDirectory, locale, `${id}.md`);
    if (fs.existsSync(localizedPath)) {
      return localizedPath;
    }
  }
  return path.join(postsDirectory, defaultLocale, `${id}.md`);
}

export default async function getPosts(
  from: number,
  to: number,
  locale: string
) {
  // Posts are numbered 1..N against the default locale, so it defines the
  // ordering for every locale — a sparse translation must not shift the range.
  const contentLength = fs.readdirSync(
    path.join(postsDirectory, defaultLocale)
  ).length;
  let posts: Post[] = [];
  let current: number = Math.max(1, contentLength - to);
  while (current <= contentLength - from) {
    const id = `${current}`;
    const fullPath = getPostPath(id, locale);
    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);
      const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
      const order = parseInt(matterResult.data.order);
      const contentHtml = processedContent.toString();
      posts.push({
        id,
        description: contentHtml,
        ...matterResult.data,
        order,
      } as Post);
    }
    current++;
  }
  return posts;
}

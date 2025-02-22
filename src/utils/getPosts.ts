import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { Post } from "components/components.interface";

const postsDirectory = path.join(process.cwd(), "content");

export default async function getPosts(
  from: number,
  to: number,
  locale: string
) {
  const contentLength = fs.readdirSync(
    path.join(postsDirectory, locale)
  ).length;
  let posts: Post[] = [];
  let current: number = Math.max(1, contentLength - to);
  while (current <= contentLength - from) {
    const id = `${current}`;
    const fullPath = path.join(path.join(postsDirectory, locale), `${id}.md`);
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

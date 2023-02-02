import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from 'components/components.interface';

const postsDirectory = path.join(process.cwd(), 'content');

function getMonth(current: Date) {
	let month = current.getMonth() + 1;
	if (month < 10) {
		return `0${month}`;
	} else {
		return `${month}`;
	}
}

function getDate(current: Date) {
	let date = current.getDate();
	if (date < 10) {
		return `0${date}`;
	} else {
		return `${date}`;
	}
}

function getYear(current: Date) {
	return `${current.getFullYear()}`;
}

export default function getPosts(from: Date, to: Date) {
	let posts: Post[] = [];
	let current: Date = from;
	while (current <= to) {
		const id = `${getYear(current)}-${getMonth(current)}-${getDate(
			current
		)}`;
		const fileName = `${id}.md`;
		// Read markdown file as string
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');

		// Use gray-matter to parse the post metadata section
		const matterResult = matter(fileContents);
		posts.push({
			id,
			...matterResult.data,
		} as Post);
		current.setDate(current.getDate() + 1);
	}
	return posts;
}
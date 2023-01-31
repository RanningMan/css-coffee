import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import styles from 'styles/Home.module.css';
import ContentContainer from 'components/ContentContainer/ContentContainer';
import Hero from 'components/Hero/Hero';
import { Post } from 'components/components.interface';
import Footer from 'components/Footer/Footer';

interface HomeProps {
	posts: Post[];
}

const postsDirectory = path.join(process.cwd(), 'content');

export async function getStaticProps() {
	const fileNames = fs.readdirSync(postsDirectory);
	const posts: Post[] = fileNames.map((fileName) => {
		// Remove ".md" from file name to get id
		const id = fileName.replace(/\.md$/, '');

		// Read markdown file as string
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');

		// Use gray-matter to parse the post metadata section
		const matterResult = matter(fileContents);

		// Combine the data with the id
		return {
			id,
			...matterResult.data,
		} as Post;
	});

	// sort by date
	// filter out posts with date later than today
	const sortedPosts = posts
		.sort((a, b) => {
			if (a.date < b.date) {
				return 1;
			} else {
				return -1;
			}
		})
		.filter((post) => new Date(post.date) <= new Date());

	return {
		props: {
			posts: sortedPosts,
		},
	};
}

export default function Home({ posts }: HomeProps) {
	return (
		<>
			<main className={styles.main}>
				<Hero />
				<ContentContainer posts={posts} />
				<Footer />
			</main>
		</>
	);
}

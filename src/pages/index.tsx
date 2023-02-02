import styles from 'styles/Home.module.css';
import ContentContainer from 'components/ContentContainer/ContentContainer';
import Hero from 'components/Hero/Hero';
import { Post } from 'components/components.interface';
import Footer from 'components/Footer/Footer';
import configs from 'utils/config';

interface HomeProps {
	posts: Post[];
}

export async function getServerSideProps() {
	const res = await fetch(`${configs.endpoint}/api/posts?start=0&limit=5`);
	const posts: Post[] = (await res.json())['content'];

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

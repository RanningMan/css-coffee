import { GetServerSidePropsContext } from 'next';
import styles from 'styles/Home.module.css';
import ContentContainer from 'components/ContentContainer/ContentContainer';
import Hero from 'components/Hero/Hero';
import { Post } from 'components/components.interface';
import Footer from 'components/Footer/Footer';
import configs from 'utils/config';

interface HomeProps {
	posts: Post[];
	locale: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const locale = context.locale || 'en-US';
	const res = await fetch(
		`${configs.endpoint}/api/posts?start=0&limit=2&locale=${locale}`
	);
	const data = await res.json();
	const posts: Post[] = data['content'];

	// sort by date
	// filter out posts with date later than today
	const sortedPosts = posts.sort((a, b) => {
		if (a.date <= b.date) {
			return 1;
		} else {
			return -1;
		}
	});

	return {
		props: {
			posts: sortedPosts,
			locale,
		},
	};
}

export default function Home({ posts, locale }: HomeProps) {
	return (
		<>
			<main className={styles.main}>
				<Hero locale={locale} />
				<ContentContainer posts={posts} locale={locale} />
				<Footer locale={locale} />
			</main>
		</>
	);
}

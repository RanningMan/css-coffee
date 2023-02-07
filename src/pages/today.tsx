import Card from 'components/Card/Card';
import { Post } from 'components/components.interface';
import ExtensionFooter from 'components/ExtensionFooter/ExtensionFooter';
import { GetServerSidePropsContext } from 'next';
import configs from 'utils/config';
import styles from 'styles/Home.module.css';
import ExtensionHeader from 'components/ExtensionHeader/ExtensionHeader';

interface ExtensionHomeProps {
	post: Post;
	locale: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const locale = context.locale || 'en-US';
	const res = await fetch(
		`${configs.endpoint}/api/postToday?locale=${locale}`
	);
	const data = await res.json();
	const post: Post = data['content'];

	return {
		props: {
			post,
			locale,
		},
	};
}

export default function ExtensionHome({ post, locale }: ExtensionHomeProps) {
	return (
		<>
			<main className={styles.main}>
				<ExtensionHeader locale={locale} />
				<Card post={post} size={'sm'} />
				<ExtensionFooter locale={locale} />
			</main>
		</>
	);
}

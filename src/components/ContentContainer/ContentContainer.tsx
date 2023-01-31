import Card from 'components/Card/Card';
import { Post } from 'components/components.interface';
import styles from './ContentContainer.module.css';

export interface ContentContainerProps {
	posts: Post[];
}

export default function ContentContainer({ posts }: ContentContainerProps) {
	return (
		<div className={styles.container}>
			{posts.map((post) => (
				<Card key={post.id} post={post} />
			))}
		</div>
	);
}

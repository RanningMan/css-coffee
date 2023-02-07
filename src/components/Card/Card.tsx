import styles from './Card.module.css';
import { Post } from 'components/components.interface';
import Demo from './Demo';

interface CardProp {
	post: Post;
	size?: 'lg' | 'sm';
}

export default function Card({ post, size }: CardProp) {
	return (
		<div
			className={`${styles.card} ${
				size !== 'sm' ? styles.lg : styles.sm
			}`}
		>
			<div className={styles.topic}>{post.topic}</div>
			<div className={styles.date}>{post.date}</div>
			<pre className={`language-css ${styles.codeSnippet}`}>
				<code className='language-css'>{post.codeSnippet}</code>
			</pre>
			<div
				className={styles.description}
				dangerouslySetInnerHTML={{ __html: post.description }}
			></div>
			<div className={styles.demoLink}>
				<Demo title={post.demoTitle} demoLink={post.demoLink} />
			</div>
		</div>
	);
}

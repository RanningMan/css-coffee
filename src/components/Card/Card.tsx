import styles from './Card.module.css';
import { Post } from 'components/components.interface';
import Demo from './Demo';

interface CardProp {
	post: Post;
}

export default function Card({ post }: CardProp) {
	return (
		<div className={styles.card}>
			<div className={styles.topic}>{post.topic}</div>
			<div className={styles.date}>{post.date}</div>
			<pre className={`language-css ${styles.codeSnippet}`}>
				<code className='language-css'>{post.codeSnippet}</code>
			</pre>
			<div className={styles.description}>{post.description}</div>
			<div className={styles.demoLink}>
				<Demo title={post.demoTitle} demoLink={post.demoLink} />
			</div>
		</div>
	);
}

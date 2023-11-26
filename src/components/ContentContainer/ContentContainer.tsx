import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Card from 'components/Card/Card';
import { Post } from 'components/components.interface';
import styles from './ContentContainer.module.css';
import configs from 'utils/config';

export interface ContentContainerProps {
	posts: Post[];
	locale: String;
}

interface ScrollToTopButtonProps {
	show: boolean;
}

function ScrollToTopButton({ show }: ScrollToTopButtonProps) {
	const onBackToTopClick = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};
	return (
		<button
			className={`${styles.backToTopButton} ${
				show ? styles.show : styles.hidden
			}`}
			onClick={onBackToTopClick}
		>
			<span className={`material-symbols-outlined ${styles.custom}`}>
				keyboard_double_arrow_up
			</span>
		</button>
	);
}

export default function ContentContainer({
	posts: data,
	locale,
}: ContentContainerProps) {
	const [posts, setPosts] = useState([...data]);
	const [hasMore, setHasMore] = useState(true);
	const [showScrollToTop, setShowScrollToTop] = useState(false);
	const fetchData = async () => {
		const res = await fetch(
			`${configs.endpoint}/api/posts?start=${posts.length}&limit=5&locale=${locale}`
		);
		const data = await res.json();
		const morePosts: Post[] = data['content'];
		setPosts(
			Array.from(new Set([...posts, ...morePosts])).sort((a, b) => {
				if (a.order <= b.order) {
					return 1;
				} else {
					return -1;
				}
			})
		);
		setHasMore(() => morePosts.length > 0);
	};
	return (
		<div className={styles.container}>
			<ScrollToTopButton show={showScrollToTop} />
			<InfiniteScroll
				dataLength={posts.length} //This is important field to render the next data
				next={fetchData}
				hasMore={hasMore}
				onScroll={() => {
					if (window.scrollY <= 1024) {
						setShowScrollToTop(false);
					} else {
						setShowScrollToTop(true);
					}
				}}
				loader={<h4>Loading...</h4>}
				endMessage={
					<p style={{ textAlign: 'center' }}>
						{locale === 'en-US' ? (
							<b>Yay! You have seen it all</b>
						) : (
							<b>棒！你看完了全部内容</b>
						)}
					</p>
				}
			>
				{posts.map((post) => (
					<Card key={post.id} post={post} />
				))}
			</InfiniteScroll>
		</div>
	);
}

import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Card from 'components/Card/Card';
import { Post } from 'components/components.interface';
import styles from './ContentContainer.module.css';
import { getDaysAgo } from 'utils/getDates';
import configs from 'utils/config';

export interface ContentContainerProps {
	posts: Post[];
}

export default function ContentContainer({
	posts: data,
}: ContentContainerProps) {
	const [posts, setPosts] = useState([...data]);
	const [hasMore, setHasMore] = useState(true);
	const fetchData = async () => {
		const res = await fetch(
			`${configs.endpoint}/api/posts?start=${posts.length}&limit=5`
		);
		const morePosts: Post[] = (await res.json())['content'];
		setPosts([...posts, ...morePosts]);
		setHasMore(() => morePosts.length > 0);
	};
	return (
		<div className={styles.container}>
			<InfiniteScroll
				dataLength={posts.length} //This is important field to render the next data
				next={fetchData}
				hasMore={hasMore}
				loader={<h4>Loading...</h4>}
				endMessage={
					<p style={{ textAlign: 'center' }}>
						<b>Yay! You have seen it all</b>
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
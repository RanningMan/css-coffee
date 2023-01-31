interface DemoProp {
	title: string;
	demoLink: string;
	author?: string;
	authorCodePenPage?: string;
	authorNickName?: string;
}

export default function Demo({
	title,
	demoLink,
	author,
	authorNickName,
	authorCodePenPage,
}: DemoProp) {
	return (
		<iframe
			style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
			title={title}
			src={demoLink}
			loading='lazy'
			allowFullScreen={true}
		>
			{/* See the Pen <a href={demoLink}>{title}</a> by {author || 'Ran Xia'}(
			<a href={authorCodePenPage || 'https://codepen.io/ranningman'}>
				@{authorNickName || 'ranningman'}
			</a>
			) on <a href='https://codepen.io'>CodePen</a>.
			See the Pen by Ran Xia(@ranningman) on. */}
		</iframe>
	);
}

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
		></iframe>
	);
}

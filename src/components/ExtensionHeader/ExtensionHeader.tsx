import styles from './ExtensionHeader.module.css';

interface HeaderProps {
	locale: String;
}

export default function ExtensionHeader({ locale }: HeaderProps) {
	return (
		<div className={styles.header}>
			<img
				className={styles.img}
				src='./css-coffee.png'
				alt='css coffee logo'
			></img>
			<h1 className={styles.title}>
				{locale === 'en-US'
					? 'Your CSS Coffee For Today is Ready!'
					: '今日份 CSS 咖啡已备好！'}
			</h1>
		</div>
	);
}

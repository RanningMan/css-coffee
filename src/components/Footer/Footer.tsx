import styles from './Footer.module.css';

interface FooterProps {
	locale: String;
}

const EnFooter = (
	<footer className={styles.footer}>
		Built with
		<span className={`material-symbols-outlined ${styles.heart}`}>
			favorite
		</span>{' '}
		by Ran Xia (<a href='https://github.com/RanningMan'>@ranningman</a>)
	</footer>
);

const ZhFooter = (
	<footer className={styles.footer}>
		本站由 <a href='https://github.com/RanningMan'>@ranningman</a>{' '}
		建设及维护
	</footer>
);

export default function Footer({ locale }: FooterProps) {
	return locale === 'en-US' ? EnFooter : ZhFooter;
}

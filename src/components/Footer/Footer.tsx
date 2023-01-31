import styles from './Footer.module.css';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			Built by Ran Xia (
			<a href='https://github.com/RanningMan'>@ranningman</a>) with{' '}
			<span className={`material-symbols-outlined ${styles.heart}`}>
				favorite
			</span>
		</footer>
	);
}

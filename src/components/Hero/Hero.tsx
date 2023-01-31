import Image from 'next/image';
import styles from './Hero.module.css';

const inlineStyle = {
	paddingTop: '5vh',
	paddingBottom: '5vh',
};

export default function Hero() {
	return (
		<div className={styles.hero}>
			<Image
				style={inlineStyle}
				src='./logo-no-background.svg'
				alt='css coffee'
				fill
			></Image>
		</div>
	);
}

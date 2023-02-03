import Image from 'next/image';
import styles from './Hero.module.css';

const inlineStyle = {
	paddingTop: '5vh',
};

interface HeroProps {
	locale: String;
}

export default function Hero({ locale }: HeroProps) {
	return (
		<div className={styles.hero}>
			<div className={styles.heroImage}>
				<Image
					style={inlineStyle}
					src='./logo-no-background.svg'
					alt='css coffee'
					fill
				></Image>
			</div>
			<a
				className={styles.button}
				href='https://github.com/RanningMan/css-coffee'
			>
				<span className='material-symbols-outlined'>star</span>
				{locale === 'en-US' ? `Star on Github` : '在GitHub上关注'}
			</a>
		</div>
	);
}

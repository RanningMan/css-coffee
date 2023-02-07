import styles from './ExtensionFooter.module.css';
import configs from 'utils/config';

interface HeaderProps {
	locale: String;
}

export default function ExtensionFooter({ locale }: HeaderProps) {
	return (
		<div className={styles.footer}>
			{locale === 'en-US'
				? 'Check out past CSS coffee from '
				: '查看更多'}
			<a href={configs.endpoint}>{configs.endpoint}</a>
		</div>
	);
}

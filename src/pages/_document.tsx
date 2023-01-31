import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<meta
					name='description'
					content='Learn a little bit of css every day'
				/>
				<link rel='icon' href='/favicon.ico' />
				<link href='prism.css' rel='stylesheet' />
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0&display=optional'
				/>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin=''
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Crimson+Pro&display=swap'
					rel='stylesheet'
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
				<Script src='prism.js' data-manual></Script>
			</body>
		</Html>
	);
}

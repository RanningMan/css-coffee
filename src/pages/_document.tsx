import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<link rel='icon' href='favicon.ico' />
				<link href='prism.css' rel='stylesheet' />
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0&display=swap'
				/>
				<Script
					id='clarify-script'
					strategy='afterInteractive'
					dangerouslySetInnerHTML={{
						__html: `
							(function(c,l,a,r,i,t,y){
								c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
								t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
								y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
							})(window, document, "clarity", "script", 'ftv8n00kt9');`,
					}}
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

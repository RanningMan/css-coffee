import "styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Head>
        <title>CSS Coffee | The daily sip of CSS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Learn a little bit of css every day"
        />
        <meta property="og:title" content="CSS Coffee | The daily sip of CSS" />
        <meta
          property="og:description"
          content="Learn a little bit of css every day"
        />
      </Head>
      <h1 className="hidden">Learn CSS daily</h1>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

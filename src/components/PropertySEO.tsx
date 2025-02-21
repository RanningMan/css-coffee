import { NextSeo } from "next-seo";

interface PropertySEOProps {
  title: string;
  description: string;
  canonical: string;
}

export default function PropertySEO({
  title,
  description,
  canonical,
}: PropertySEOProps) {
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={canonical}
      openGraph={{
        title,
        description,
        url: canonical,
      }}
    />
  );
}

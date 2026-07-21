import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useGlobalData } from '../context/GlobalDataContext';

const SEO = ({ title, description, image, url, type = 'website' }) => {
  const { siteSettings } = useGlobalData();

  // Fallbacks
  const siteName = siteSettings?.site_name || 'Paramarsh Construction';
  const finalTitle = title ? `${title} | ${siteName}` : siteName;
  const finalDescription = description || siteSettings?.default_meta_description || 'Premium construction services.';
  const finalImage = image || siteSettings?.logo || '';
  const finalUrl = url ? `http://localhost:5173${url}` : 'http://localhost:5173';

  return (
    <Helmet>
      {/* Basic HTML Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={finalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:image" content={finalImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type === 'article' ? 'Article' : 'WebSite',
          name: finalTitle,
          url: finalUrl,
          description: finalDescription,
          image: finalImage,
          publisher: {
            '@type': 'Organization',
            name: siteName,
            logo: {
              '@type': 'ImageObject',
              url: siteSettings?.logo || ''
            }
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;

import { isEmpty } from 'lodash';
import type { AppIconLinks, Link, Meta } from '../types';
import type {
  HrefLangs,
  Metatag,
  SEOMetadata,
} from '@farfetch/blackout-client';

// Build functions
export const buildMetas = (
  seo: SEOMetadata | null | undefined,
  metas: Meta[],
) => {
  const metaTagsData = seo?.metatags || [];

  const descriptionMeta = seo?.description
    ? [
        {
          name: 'description',
          content: seo.description,
        },
      ]
    : [];

  const keywordsMeta = seo?.keywords
    ? [
        {
          name: 'keywords',
          content: seo.keywords,
        },
      ]
    : [];

  // Meta tags including social (e.g Open Graph, Twitter Cards)
  const metaTags = metaTagsData.map((metatag: Metatag) => {
    const metaType = metatag?.propertyType || '';
    const metaDescription = metatag?.propertyDescription || '';

    if (!metaType || !metaDescription) {
      return {};
    }

    return {
      [metaType]: metaDescription,
      content: metatag?.content || '',
    };
  });

  return [...descriptionMeta, ...keywordsMeta, ...metaTags, ...metas];
};

export const buildLinks = (
  seo: SEOMetadata | null | undefined,
  appIconLinks: AppIconLinks,
  links: Link[],
) => {
  const canonicalLink = seo?.canonicalUrl
    ? [{ href: seo.canonicalUrl, rel: 'canonical' }]
    : [];

  // Hreflang tags for similar content in multiple languages
  const hrefLangsLink = (seo?.hrefLangs || []).map((languages: HrefLangs) => ({
    rel: 'alternate',
    href: languages.href || '/',
    hreflang: languages.hrefLang,
  }));

  return [
    ...canonicalLink,
    ...hrefLangsLink,
    ...links,
    ...(appIconLinks ? buildIconLinks(appIconLinks) : []),
  ];
};

export const buildIconLinks = ({
  appleIcons = [],
  icons = [],
  maskIcon = {},
}: Partial<{
  appleIcons: AppIconLinks['appleIcons'];
  icons: AppIconLinks['icons'];
  maskIcon: AppIconLinks['maskIcon'];
}>) => {
  // Regular application icons properties.
  const regularIconsProps = icons.map(icon => ({
    ...icon,
    rel: 'icon',
    type: 'image/png',
  }));

  // Apple icons properties.
  const appleIconsProps = appleIcons.map(icon => ({
    ...icon,
    rel: 'apple-touch-icon',
  }));

  // Mask icon - Color of the hover and active state of the Safari's pinned tab.
  const maskIconProps = !isEmpty(maskIcon)
    ? [
        {
          rel: 'mask-icon',
          color: maskIcon?.color,
          href: maskIcon?.href,
        },
      ]
    : [];

  return [...regularIconsProps, ...appleIconsProps, ...maskIconProps];
};

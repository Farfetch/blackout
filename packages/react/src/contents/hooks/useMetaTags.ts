import {
  fetchSEO,
  getSEO,
  getSEOError,
  isSEOLoading,
  StoreState,
} from '@farfetch/blackout-redux';
import { useAction, usePrevious } from '../../helpers';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import type { AppIconLinks, Link, Meta, UseMetatags } from '../types';
import type { HrefLangs, Metatags, QuerySEO } from '@farfetch/blackout-client';

/**
 * Hook to return metadata to populate document head.
 *
 * @param data - Meta data.
 *
 * @returns - Returns actions and selectors for the SEO metadata.
 */
const useMetaTags = ({
  query,
  appIconLinks = {},
  links = [],
  metas = [],
}: {
  query: QuerySEO;
  appIconLinks?: AppIconLinks;
  links?: Link[];
  metas?: Meta[];
}): UseMetatags => {
  const error = useSelector((state: StoreState) => getSEOError(state, query));
  const isLoading = useSelector((state: StoreState) =>
    isSEOLoading(state, query),
  );
  const seo = useSelector((state: StoreState) => getSEO(state, query));

  // Build functions
  const buildMetas = () => {
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
    const metaTags = metaTagsData.map((metatag: Metatags) => {
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

  const buildLinks = () => {
    const canonicalLink = seo?.canonicalUrl
      ? [{ href: seo.canonicalUrl, rel: 'canonical' }]
      : [];

    // Hreflang tags for similar content in multiple languages
    const hrefLangsLink = (seo?.hrefLangs || []).map(
      (languages: HrefLangs) => ({
        rel: 'alternate',
        href: languages.href || '/',
        hreflang: languages.hrefLang,
      }),
    );

    return [
      ...canonicalLink,
      ...hrefLangsLink,
      ...links,
      ...(appIconLinks ? buildIconLinks(appIconLinks) : []),
    ];
  };

  const buildIconLinks = ({
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

  // Actions
  const fetch = useAction(fetchSEO);

  // Meta object
  const meta = {
    title: seo?.title,
    description: seo?.description,
    canonical: seo?.canonicalUrl,
    meta: buildMetas(),
    link: buildLinks(),
  };

  // Get the previous query
  const previousQuery = usePrevious(query);

  useEffect(() => {
    if (!isEqual(previousQuery, query)) {
      fetch(query);
    }
  }, [fetch, previousQuery, query]);

  return {
    /**
     * SEO error status.
     */
    error,
    /**
     * SEO loading status.
     */
    isLoading,
    /**
     * Meta result/payload.
     */
    meta,
  };
};

export default useMetaTags;

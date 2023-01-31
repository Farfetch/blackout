import get from 'lodash/get';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * @typedef HeadProps
 * @property {object} seo - SEO metadata.
 * @property {string} lang - Site language.
 * @property {string} themeColor - Toolbar color for Android.
 * @property {string} appIconLinks - Link tags, mostly related to icons.
 * @property {string} manifest - App manifest.
 * @property {Node}   children - A React Node.
 */

/**
 * Renders a Helmet component with metadata info.
 *
 * @component
 * @memberof module:content/components
 *
 * @param {HeadProps} props - All props of Head.
 *
 * @returns {Node} Helmet component.
 */
const Head = ({
  seo = {},
  lang,
  themeColor,
  appIconLinks,
  manifest,
  children,
}) => {
  const buildMetas = () => {
    const { description, keywords, metatags = [] } = seo;

    const descriptionMeta = description && {
      name: 'description',
      content: description,
    };

    const keywordsMeta = keywords && {
      name: 'keywords',
      content: keywords,
    };

    // Meta tags including social (e.g Open Graph, Twitter Cards)
    const metaTags = metatags.map(metatag => {
      const metaType = get(metatag, 'propertyType', '');
      const metaDescription = get(metatag, 'propertyDescription', '');

      if (!metaType || !metaDescription) {
        return {};
      }

      return {
        [metaType]: metaDescription,
        content: metatag.content,
      };
    });

    return [{ ...descriptionMeta }, { ...keywordsMeta }, ...metaTags];
  };

  const buildIconLinks = ({
    appleIcons = [],
    icons = [],
    maskIcon = {},
  } = {}) => {
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
    const maskIconProps = maskIcon && {
      rel: 'mask-icon',
      color: maskIcon.color,
      href: maskIcon.href,
    };

    return [...regularIconsProps, ...appleIconsProps, maskIconProps];
  };

  const buildLinks = () => {
    const canonicalLink = seo.canonicalUrl
      ? [{ href: seo.canonicalUrl, rel: 'canonical' }]
      : [];

    // Hreflang tags for similar content in multiple languages
    const hrefLangsLink = get(seo, 'hrefLangs', []).map(languages => ({
      rel: 'alternate',
      href: languages.href || '/',
      hreflang: languages.hrefLang,
    }));

    return [
      ...(manifest ? [{ rel: 'manifest', href: manifest }] : []),
      ...canonicalLink,
      ...hrefLangsLink,
      ...buildIconLinks(appIconLinks),
    ];
  };

  const buildHelmetProps = () => ({
    htmlAttributes: {
      lang: lang || 'en',
    },
    defaultTitle: seo.title || '',
    meta: [
      ...buildMetas(),

      // Theme color
      ...(themeColor
        ? [
            {
              name: 'theme-color',
              content: themeColor,
            },
          ]
        : []),
    ],
    link: [...buildLinks()],
  });

  return seo && <Helmet {...buildHelmetProps()}>{children}</Helmet>;
};

Head.propTypes = {
  appIconLinks: PropTypes.shape({
    appleIcons: PropTypes.array,
    icons: PropTypes.array,
    maskIcon: PropTypes.shape({
      color: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    }),
  }),
  seo: PropTypes.object,
  lang: PropTypes.string,
  themeColor: PropTypes.string,
  manifest: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default Head;

import * as schemaProperties from './schemas/schemaProperties';
import { getCategories, getMetatag, stripUrlSubfolder } from '../utils';
import { renderScriptTag } from '../helpers';
import type { Article, WithContext } from 'schema-dts';
import type { Breadcrumb, ContentsDate, Publisher } from '../types';
import type { ReactElement } from 'react';
import type { SEOMetadata } from '@farfetch/blackout-client/contents/types';

/**
 * Generate Structured Data (JSON-LD) for an Article.
 *
 * @memberof module:contents/structured-data
 *
 * @param {object} metadata - All SEO metadata for the Article.
 * @param {object} date - All information about Article date.
 * @param {string} date.publicationDate - Publication date of the Article.
 * @param {string} date.modificationDate - Modification date of the Article.
 * @param {string} url - Relative url of the page (location.pathname).
 * @param {string} title - Title of the first component in the Page (e.g. Hero Title, or H1).
 * @param {string} image - Image URL to describe the content of the Page.
 * @param {string} author - Author name of the Article.
 * @param {Array}  breadcrumbs - Breadcrumbs list with all url Texts.
 * @param {object} publisher - Object with publisher data.
 * @param {string} publisher.name - The name of the Article publisher.
 * @param {string} publisher.url - The url of the Article publisher.
 * @param {string} publisher.logo - The logo path of the Article publisher.
 * @param {number} [space] - Add whitespace and indentation to the serialized output.
 *
 * @returns {ReactElement} - A script tag with Article JSON-LD structured data.
 *
 * @example
 * import { article as structuredArticle } from '@farfetch/blackout-react/content/structured-data';
 *
 * <Helmet>
 *  {structuredArticle(
 *    metadata,
 *    {
 *      publicationDate: '...',
 *      modificationDate: '...',
 *    },
 *    pathname,
 *    title,
 *    image,
 *    author,
 *    breadcrumbsList,
 *    publisher: {
 *      name: '...',
 *      url: '...',
 *      logo: '...',
 *    },
 *    2
 *  )}
 * </Helmet>
 */
const article = (
  metadata: SEOMetadata,
  date: ContentsDate,
  url: string,
  title: string,
  image: string,
  author: string,
  breadcrumbs: Breadcrumb[],
  publisher: Publisher,
  space?: number,
): ReactElement => {
  const generateSchemaOrgProperty = (property: string) =>
    getMetatag(property, metadata?.metatags);

  const ARTICLE: WithContext<Article> = {
    '@context': schemaProperties.DEFAULT_CONTEXT,
    '@type': schemaProperties.DEFAULT_TYPE,
    name: generateSchemaOrgProperty('og:title') || metadata?.title,
    headline: metadata?.h1 || title,
    description:
      generateSchemaOrgProperty('og:description') || metadata?.description,
    url: generateSchemaOrgProperty('og:url') || stripUrlSubfolder(url),
    mainEntityOfPage: {
      '@type': schemaProperties.DEFAULT_TYPE_WEBPAGE,
      '@id': url,
    },
    datePublished:
      generateSchemaOrgProperty('article:datePublished') ||
      date?.publicationDate,
    dateModified:
      generateSchemaOrgProperty('article:dateModified') ||
      date?.modificationDate,
    publisher: {
      '@type': schemaProperties.DEFAULT_ORGANISATION,
      name:
        generateSchemaOrgProperty('article:publisher:name') || publisher?.name,
      url: generateSchemaOrgProperty('article:publisher:url') || publisher?.url,
      logo: {
        '@type': schemaProperties.DEFAULT_IMAGE_OBJECT,
        url:
          generateSchemaOrgProperty('article:publisher:logo') ||
          publisher?.logo,
      },
    },
    author: {
      '@type': schemaProperties.DEFAULT_ORGANISATION,
      name: generateSchemaOrgProperty('og:site_name') || author,
    },
    articleBody: generateSchemaOrgProperty('article:body'),
    articleSection:
      generateSchemaOrgProperty('article:section') ||
      getCategories(breadcrumbs),
    image:
      generateSchemaOrgProperty('article:image') ||
      generateSchemaOrgProperty('og:image') ||
      image,
    keywords: metadata?.keywords,
  };

  return renderScriptTag(ARTICLE, space);
};

export default article;

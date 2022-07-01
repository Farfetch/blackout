import * as schemaProperties from './schemas/schemaProperties';
import { getCategories, getMetatag, stripUrlSubfolder } from '../utils';
import { renderScriptTag } from '../helpers';
import type { Article, WithContext } from 'schema-dts';
import type { Breadcrumb, ContentsDate, Publisher } from '../types';
import type { ReactElement } from 'react';
import type { SEOMetadata } from '@farfetch/blackout-client';

/**
 * Generate Structured Data (JSON-LD) for an Article.
 *
 * @example
 * ```
 * import { structuredArticle } from '@farfetch/blackout-react/content/structured-data';
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
 * ```
 *
 * @param metadata    - All SEO metadata for the Article.
 * @param date        - All information about Article date.
 * @param url         - Relative url of the page (location.pathname).
 * @param title       - Title of the first component in the Page (e.g. Hero Title, or H1).
 * @param image       - Image URL to describe the content of the Page.
 * @param author      - Author name of the Article.
 * @param breadcrumbs - Breadcrumbs list with all url Texts.
 * @param publisher   - Object with publisher data.
 * @param space       - Add whitespace and indentation to the serialized output.
 *
 * @returns - A script tag with Article JSON-LD structured data.
 */
const structuredArticle = (
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
    keywords: metadata?.keywords ?? undefined,
  };

  return renderScriptTag(ARTICLE, space);
};

export default structuredArticle;

import * as schemaProperties from './schemas/schemaProperties.js';
import {
  generateSchemaOrgProperty,
  getCategories,
  stripUrlSubfolder,
} from '../utils/index.js';
import { renderScriptTag } from '../helpers/index.js';
import type { Article, WithContext } from 'schema-dts';
import type { Breadcrumb, ContentsDate, Publisher } from '../types/index.js';
import type { ReactElement } from 'react';
import type { SEOMetadata } from '@farfetch/blackout-client';

/**
 * Generate Structured Data (JSON-LD) for an Article.
 *
 * @example
 * ```
 * import { structuredArticle } from '@farfetch/blackout-react';
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
  const ARTICLE: WithContext<Article> = {
    '@context': schemaProperties.DEFAULT_CONTEXT,
    '@type': schemaProperties.DEFAULT_TYPE,
    name: generateSchemaOrgProperty('og:title', metadata) || metadata?.title,
    headline: metadata?.h1 || title,
    description:
      generateSchemaOrgProperty('og:description', metadata) ||
      metadata?.description,
    url:
      generateSchemaOrgProperty('og:url', metadata) || stripUrlSubfolder(url),
    mainEntityOfPage: {
      '@type': schemaProperties.DEFAULT_TYPE_WEBPAGE,
      '@id': url,
    },
    datePublished:
      generateSchemaOrgProperty('article:datePublished', metadata) ||
      date?.publicationDate,
    dateModified:
      generateSchemaOrgProperty('article:dateModified', metadata) ||
      date?.modificationDate,
    publisher: {
      '@type': schemaProperties.DEFAULT_ORGANISATION,
      name:
        generateSchemaOrgProperty('article:publisher:name', metadata) ||
        publisher?.name,
      url:
        generateSchemaOrgProperty('article:publisher:url', metadata) ||
        publisher?.url,
      logo: {
        '@type': schemaProperties.DEFAULT_IMAGE_OBJECT,
        url:
          generateSchemaOrgProperty('article:publisher:logo', metadata) ||
          publisher?.logo,
      },
    },
    author: {
      '@type': schemaProperties.DEFAULT_ORGANISATION,
      name: generateSchemaOrgProperty('og:site_name', metadata) || author,
    },
    articleBody: generateSchemaOrgProperty('article:body', metadata),
    articleSection:
      generateSchemaOrgProperty('article:section', metadata) ||
      getCategories(breadcrumbs),
    image:
      generateSchemaOrgProperty('article:image', metadata) ||
      generateSchemaOrgProperty('og:image', metadata) ||
      image,
    keywords: metadata?.keywords ?? undefined,
  };

  return renderScriptTag(ARTICLE, space);
};

export default structuredArticle;

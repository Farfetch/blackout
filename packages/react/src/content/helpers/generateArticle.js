import * as schemaProperties from '../components/schemas/schemaProperties';
import { getCategories, getMetatag, stripUrlSubfolder } from '../utils';

/**
 * Generate Structured Data (JSON-LD) for an Article.
 *
 * @function generateArticle
 * @memberof module:content/helpers
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
 *
 * @returns {object} - JSON-LD Schema.org object for an Article.
 */
export default (
  metadata,
  date,
  url,
  title,
  image,
  author,
  breadcrumbs,
  publisher,
) => {
  const generateSchemaOrgProperty = property =>
    getMetatag(property, metadata?.metatags);

  return {
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
      '@type': schemaProperties.DEFAULT_THING,
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
};

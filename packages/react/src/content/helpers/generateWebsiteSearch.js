import * as schemaProperties from '../components/schemas/schemaProperties';
import { getMetatag } from '../utils';

/**
 * Generate Structured Data (JSON-LD) for WebsiteSearch.
 *
 * @function generateWebsiteSearch
 * @memberof module:content/helpers
 *
 * @param {object} metadata - SEO metadata for type WebsiteSearch on Homepage.
 * @param {string} url - Relative URL of the page.
 * @param {string} searchTitle - Website title.
 * @param {string} urlTemplate - Complete url to query on.
 *
 * @returns {object} - JSON-LD Schema.org object for Website Search.
 */
export default (metadata, url, searchTitle, urlTemplate) => {
  const generateSchemaOrgProperty = property =>
    getMetatag(property, metadata?.metatags);

  return {
    '@context': schemaProperties.DEFAULT_CONTEXT,
    '@type': schemaProperties.DEFAULT_TYPE_WEBSITE,
    url: generateSchemaOrgProperty('organization:url') || url,
    potentialAction: {
      '@type': schemaProperties.DEFAULT_TYPE_ACTION,
      name: generateSchemaOrgProperty('homepage:searchTitle') || searchTitle,
      target:
        generateSchemaOrgProperty('homepage:searchUrl') ||
        `${urlTemplate}{search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
};

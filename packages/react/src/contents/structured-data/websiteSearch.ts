import * as schemaProperties from './schemas/schemaProperties';
import { getMetatag } from '../utils';
import { renderScriptTag } from '../helpers';
import type { CustomSearchAction } from '../types';
import type { ReactElement } from 'react';
import type { SEOMetadata } from '@farfetch/blackout-client/contents/types';
import type { WebSite, WithContext } from 'schema-dts';

/**
 * Generate Structured Data (JSON-LD) for Website Search.
 *
 * @memberof module:contents/structured-data
 *
 * @param {object} metadata - SEO metadata for type WebsiteSearch on Homepage.
 * @param {string} url - Relative URL of the page.
 * @param {string} searchTitle - Website title.
 * @param {string} urlTemplate - Complete url to query on.
 * @param {number} [space] - Add whitespace and indentation to the serialized output.
 *
 * @example
 * import { websiteSearch as structuredWebsiteSearch } from '@farfetch/blackout-react/content/structured-data';
 *
 * <Helmet>
 *  {structuredWebsiteSearch(
 *    metadata,
 *    url,
 *    searchTitle,
 *    urlTemplate,
 *    2)
 *   }
 * </Helmet>
 *
 * @returns {ReactElement} - A script tag with Website Search JSON-LD structured data.
 */
const websiteSearch = (
  metadata: SEOMetadata,
  url: string,
  searchTitle: string,
  urlTemplate: string,
  space?: number,
): ReactElement => {
  const generateSchemaOrgProperty = (property: string) =>
    getMetatag(property, metadata?.metatags);

  const POTENCIAL_ACTION: CustomSearchAction = {
    '@type': schemaProperties.DEFAULT_TYPE_ACTION,
    name: generateSchemaOrgProperty('homepage:searchTitle') || searchTitle,
    target: {
      '@type': schemaProperties.DEFAULT_TYPE_TARGET,
      urlTemplate:
        generateSchemaOrgProperty('homepage:searchUrl') ||
        `${urlTemplate}{search_term_string}`,
    },
    'query-input': {
      '@type': schemaProperties.DEFAULT_TYPE_INPUT,
      valueRequired: 'True',
      valueName: 'search_term_string',
    },
  };

  const WEBSITE: WithContext<WebSite> = {
    '@context': schemaProperties.DEFAULT_CONTEXT,
    '@type': schemaProperties.DEFAULT_TYPE_WEBSITE,
    url: generateSchemaOrgProperty('organization:url') || url,
    potentialAction: POTENCIAL_ACTION,
  };

  return renderScriptTag(WEBSITE, space);
};

export default websiteSearch;

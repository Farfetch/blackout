import * as schemaProperties from './schemas/schemaProperties';
import { getMetatag } from '../utils';
import { renderScriptTag } from '../helpers';
import type { CustomSearchAction } from '../types';
import type { ReactElement } from 'react';
import type { SEOMetadata } from '@farfetch/blackout-client';
import type { WebSite, WithContext } from 'schema-dts';

/**
 * Generate Structured Data (JSON-LD) for Website Search.
 *
 * @example
 * ```
 * import { structuredWebsiteSearch } from '@farfetch/blackout-react/content/structured-data';
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
 * ```
 *
 * @param metadata    - SEO metadata for type WebsiteSearch on Homepage.
 * @param url         - Relative URL of the page.
 * @param searchTitle - Website title.
 * @param urlTemplate - Complete url to query on.
 * @param space       - Add whitespace and indentation to the serialized output.
 *
 * @returns - A script tag with Website Search JSON-LD structured data.
 */
const structuredWebsiteSearch = (
  metadata: SEOMetadata,
  url: string,
  searchTitle: string,
  urlTemplate: string,
  space?: number,
): ReactElement => {
  const generateSchemaOrgProperty = (property: string) =>
    getMetatag(property, metadata?.metatags);

  const POTENTIAL_ACTION: CustomSearchAction = {
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
    potentialAction: POTENTIAL_ACTION,
  };

  return renderScriptTag(WEBSITE, space);
};

export default structuredWebsiteSearch;

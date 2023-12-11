import * as schemaProperties from './schemaProperties.js';
import generateSchemaOrgProperty from '../../utils/generateSchemaOrgProperty.js';
import type { CustomSearchAction } from '../../types/index.js';
import type { SEOMetadata } from '@farfetch/blackout-client';

/**
 * Generate a schema for Potential Action.
 *
 * @example
 * ```
 * const potencialActioin = schemaPotentialAction(searchTitle, urlTemplate, metadata);
 * ```
 *
 * @param searchTitle - Website title.
 * @param urlTemplate - Complete url to query on.
 * @param metadata    - SEO metadata for type WebsiteSearch on Homepage.
 *
 * @returns - An object with Potential Action JSON-LD structured data.
 */
const schemaPotentialAction = (
  searchTitle: string,
  urlTemplate: string,
  metadata: SEOMetadata,
): CustomSearchAction => ({
  '@type': schemaProperties.DEFAULT_TYPE_ACTION,
  name:
    generateSchemaOrgProperty('homepage:searchTitle', metadata) || searchTitle,
  target: {
    '@type': schemaProperties.DEFAULT_TYPE_TARGET,
    urlTemplate:
      generateSchemaOrgProperty('homepage:searchUrl', metadata) ||
      `${urlTemplate}{search_term_string}`,
  },
  'query-input': {
    '@type': schemaProperties.DEFAULT_TYPE_INPUT,
    valueRequired: 'True',
    valueName: 'search_term_string',
  },
});

export default schemaPotentialAction;

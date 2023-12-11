import * as schemaProperties from './schemas/schemaProperties.js';
import { renderScriptTag } from '../helpers/index.js';
import generateSchemaOrgProperty from '../utils/generateSchemaOrgProperty.js';
import schemaPotentialAction from './schemas/schemaPotentialAction.js';
import type { ReactElement } from 'react';
import type { SEOMetadata } from '@farfetch/blackout-client';
import type { WebSite, WithContext } from 'schema-dts';

/**
 * Generate Structured Data (JSON-LD) for Website Search.
 *
 * @example
 * ```
 * import { structuredWebsiteSearch } from '@farfetch/blackout-react';
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
  const WEBSITE: WithContext<WebSite> = {
    '@context': schemaProperties.DEFAULT_CONTEXT,
    '@type': schemaProperties.DEFAULT_TYPE_WEBSITE,
    url: generateSchemaOrgProperty('organization:url', metadata) || url,
    potentialAction: schemaPotentialAction(searchTitle, urlTemplate, metadata),
  };

  return renderScriptTag(WEBSITE, space);
};

export default structuredWebsiteSearch;

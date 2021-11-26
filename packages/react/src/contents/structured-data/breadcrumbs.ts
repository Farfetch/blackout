import * as schemaProperties from './schemas/schemaProperties';
import { renderScriptTag } from '../helpers';
import type { Breadcrumb } from '../types';
import type { BreadcrumbList, WithContext } from 'schema-dts';
import type { ReactElement } from 'react';

/**
 * Generate Structured Data (JSON-LD) for Breadcrumbs.
 *
 * @memberof module:contents/structured-data
 *
 * @param {object} breadcrumbs - Breadcrumbs data.
 * @param {string} breadcrumbs.url - Breadcrumbs Item URL.
 * @param {string} breadcrumbs.name - Breadcrumbs Item Name.
 * @param {number} space - Add whitespace and indentation to the serialized output.
 *
 * @returns {ReactElement} - A script tag with Breadcrumbs JSON-LD structured data.
 *
 * @example
 * import { breadcrumbs as structuredBreadcrumbs } from '@farfetch/blackout-react/content/structured-data';
 *
 * <Helmet>
 *  {structuredBreadcrumbs(breadcrumbsList, 2)}
 * </Helmet>
 */
const breadcrumbs = (
  breadcrumbs: Breadcrumb[],
  space?: number,
): ReactElement => {
  const BREADCRUMBLIST: WithContext<BreadcrumbList> = {
    '@context': schemaProperties.DEFAULT_CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs
      .filter((breadcrumb: Breadcrumb) => (breadcrumb.url || '').length > 0)
      .map((breadcrumb: Breadcrumb, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@id': breadcrumb.url,
          name: breadcrumb.name,
        },
      })),
  };

  return renderScriptTag(BREADCRUMBLIST, space);
};

export default breadcrumbs;

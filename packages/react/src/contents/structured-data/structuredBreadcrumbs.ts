import * as schemaProperties from './schemas/schemaProperties';
import { renderScriptTag } from '../helpers';
import type { Breadcrumb } from '../types';
import type { BreadcrumbList, WithContext } from 'schema-dts';
import type { ReactElement } from 'react';

/**
 * Generate Structured Data (JSON-LD) for Breadcrumbs.
 *
 * @example
 * ```
 * import { structuredBreadcrumbs } from '@farfetch/blackout-react/content/structured-data';
 *
 * <Helmet>
 *  {structuredBreadcrumbs(breadcrumbsList, 2)}
 * </Helmet>
 * ```
 *
 * @param breadcrumbs - Breadcrumbs data.
 * @param space       - Add whitespace and indentation to the serialized output.
 *
 * @returns - A script tag with Breadcrumbs JSON-LD structured data.
 */
const structuredBreadcrumbs = (
  breadcrumbs: Breadcrumb[],
  space?: number,
): ReactElement => {
  const BreadcrumbListTag: WithContext<BreadcrumbList> = {
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

  return renderScriptTag(BreadcrumbListTag, space);
};

export default structuredBreadcrumbs;

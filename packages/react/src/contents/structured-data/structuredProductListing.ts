import * as schemaProperties from './schemas/schemaProperties';
import { getMetatag } from '../utils';
import { renderScriptTag } from '../helpers';
import type { ItemList, WithContext } from 'schema-dts';
import type { ReactElement } from 'react';
import type { SEOMetadata } from '@farfetch/blackout-client';
import type { StructuredProductData, StructuredProductListing } from '../types';

/**
 * Generate Structured Data (JSON-LD) for Products Listing.
 *
 * @example
 * ```
 * import { structuredProductListing } from '@farfetch/blackout-react/content/structured-data';
 *
 * <Helmet>
 *  {structuredProductListing(
 *    productListing,
 *    metadata,
 *    url,
 *    2)
 *   }
 * </Helmet>
 *
 * ```
 *
 * @param listing  - All details data for the Products List.
 * @param metadata - All SEO metadata for the Products List.
 * @param url      - Relative URL of the page.
 * @param space    - Add whitespace and indentation to the serialized output.
 *
 * @returns - A script tag with Product Listing JSON-LD structured data.
 */
const structuredProductListing = (
  listing: StructuredProductListing,
  metadata: SEOMetadata,
  url: string,
  space?: number,
): ReactElement => {
  const generateSchemaOrgProperty = (property: string) =>
    getMetatag(property, metadata?.metatags);

  const generateProductUrl = (slug: string) => {
    const initialUrl = url?.substring(0, url?.lastIndexOf('/'));

    return `${initialUrl}/shopping/${slug}`;
  };

  const PRODUCTSLISTING: WithContext<ItemList> = {
    '@context': schemaProperties.DEFAULT_CONTEXT,
    '@type': schemaProperties.DEFAULT_ITEM_LIST,
    name:
      generateSchemaOrgProperty('productsList:name') ||
      listing?.name ||
      'Products Listing',
    url: url,
    numberOfItems: listing?.totalItems,
    itemListElement: listing?.entries.map(
      (product: StructuredProductData, index: number) => ({
        '@type': schemaProperties.DEFAULT_LIST_ITEM,
        position: index + 1,
        name:
          generateSchemaOrgProperty(`productsList:${product.id}:name`) ||
          product.name,
        url: product.slug ? generateProductUrl(product.slug) : undefined,
      }),
    ),
  };

  return renderScriptTag(PRODUCTSLISTING, space);
};

export default structuredProductListing;

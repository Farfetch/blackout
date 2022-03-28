import * as schemaProperties from './schemas/schemaProperties';
import { getMetatag } from '../utils';
import { renderScriptTag } from '../helpers';
import type { ItemList, WithContext } from 'schema-dts';
import type { Listing, Product } from '../types';
import type { ReactElement } from 'react';
import type { SEOMetadata } from '@farfetch/blackout-client/contents/types';

/**
 * Generate Structured Data (JSON-LD) for Products Listing.
 *
 * @memberof module:contents/structured-data
 *
 * @param {object} listing - All details data for the Products List.
 * @param {object} metadata - All SEO metadata for the Products List.
 * @param {string} url - Relative URL of the page.
 * @param {number} [space] - Add whitespace and indentation to the serialized output.
 *
 * @example
 * import { productListing as structuredProductListing } from '@farfetch/blackout-react/content/structured-data';
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
 * @returns {ReactElement} - A script tag with Product Listing JSON-LD structured data.
 */
const productListing = (
  listing: Listing,
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
    numberOfItems: listing?.products?.totalItems,
    itemListElement: listing?.entries.map(
      (product: Product, index: number) => ({
        '@type': schemaProperties.DEFAULT_LIST_ITEM,
        position: index + 1,
        name:
          generateSchemaOrgProperty(`productsList:${product.id}:name`) ||
          product.name,
        url: generateProductUrl(product.slug),
      }),
    ),
  };

  return renderScriptTag(PRODUCTSLISTING, space);
};

export default productListing;

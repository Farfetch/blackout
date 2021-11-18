import * as schemaProperties from '../components/schemas/schemaProperties';
import { getMetatag } from '../utils';

/**
 * Generate Structured Data (JSON-LD) for Products Listing.
 *
 * @function generateProductListing
 * @memberof module:content/helpers
 *
 * @param {object} listing - All details data for the Products List.
 * @param {object} metadata - All SEO metadata for the Products List.
 * @param {string} url - Relative URL of the page.
 *
 * @returns {object} - JSON-LD Schema.org object for Product Listing.
 */
export default (listing, metadata, url) => {
  const generateSchemaOrgProperty = property =>
    getMetatag(property, metadata?.metatags);

  const generateProductUrl = slug => {
    const initialUrl = url?.substring(0, url?.lastIndexOf('/'));

    return `${initialUrl}/shopping/${slug}`;
  };

  return {
    '@context': schemaProperties.DEFAULT_CONTEXT,
    '@type': schemaProperties.DEFAULT_ITEM_LIST,
    name:
      generateSchemaOrgProperty('productsList:name') ||
      listing?.name ||
      'Products Listing',
    url: url,
    numberOfItems: listing?.products?.totalItems,
    itemListElement: listing?.entries.map((product, index) => ({
      '@type': schemaProperties.DEFAULT_LIST_ITEM,
      position: index + 1,
      name:
        generateSchemaOrgProperty(`productsList:${product.id}:name`) ||
        product.name,
      url: generateProductUrl(product.slug),
    })),
  };
};

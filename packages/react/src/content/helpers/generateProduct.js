import * as schemaProperties from '../components/schemas/schemaProperties';
import { getConditionSchemaOrg, getMetatag } from '../utils';

/**
 * Generate Structured Data (JSON-LD) for Product Details.
 *
 * @function generateProduct
 * @memberof module:content/helpers
 *
 * @param {object} product - All details data for the current Product.
 * @param {object} metadata - All SEO metadata for the current Product.
 * @param {string} lastCategory - Last category name.
 * @param {string} url - Relative url of the product (location.pathname).
 * @param {string} seller - Seller name for this particular product.
 *
 * @returns {object} - JSON-LD Schema.org object for Product Details.
 */
export default (product, metadata, lastCategory, url, seller) => {
  // Validate if certain description exist and return the property content.
  const generateSchemaOrgProperty = property =>
    getMetatag(property, metadata?.metatags);

  const metaSeller = generateSchemaOrgProperty('product:seller');

  return {
    '@context': schemaProperties.DEFAULT_CONTEXT,
    '@type': schemaProperties.DEFAULT_TYPE_PRODUCT,
    name:
      generateSchemaOrgProperty('product:name') ||
      generateSchemaOrgProperty('og:title') ||
      product?.name,
    description:
      generateSchemaOrgProperty('product:description') ||
      generateSchemaOrgProperty('og:description') ||
      product?.description,
    image:
      product?.images?.map((image, index) =>
        generateSchemaOrgProperty(`product:image:${index + 1}`)
          ? generateSchemaOrgProperty(`product:image:${index + 1}`)
          : image.url,
      ) || generateSchemaOrgProperty('og:image'),
    sku: generateSchemaOrgProperty('product:sku') || product?.sku,
    productID:
      generateSchemaOrgProperty('product:id') || product?.id?.toString(),
    mpn: generateSchemaOrgProperty('product:mpn') || product?.mpn,
    color:
      generateSchemaOrgProperty('product:color') ||
      product?.colors?.[0].color?.name,
    category: generateSchemaOrgProperty('product:category') || lastCategory,
    brand: {
      '@type': schemaProperties.DEFAULT_BRAND_TYPE,
      name: generateSchemaOrgProperty('product:brand') || product?.brand?.name,
    },
    offers: {
      '@context': schemaProperties.DEFAULT_CONTEXT,
      '@type': schemaProperties.DEFAULT_TYPE_OFFER,
      url: generateSchemaOrgProperty('og:url') || url,
      price:
        generateSchemaOrgProperty('product:price:amount') ||
        product?.price?.includingTaxes,
      priceCurrency:
        generateSchemaOrgProperty('product:price:currency') ||
        product?.currencyIsoCode,
      itemCondition:
        getConditionSchemaOrg(generateSchemaOrgProperty('product:condition')) ||
        schemaProperties.NEW_CONDITION,
      availability: generateSchemaOrgProperty('product:availability')
        ? schemaProperties.IN_STOCK
        : product?.quantity > 0
        ? schemaProperties.IN_STOCK
        : schemaProperties.OUT_OF_STOCK,
      priceValidUntil:
        generateSchemaOrgProperty('product:price:priceValidUntil') ||
        product?.price?.priceValidUntil,
      ...((metaSeller || seller) && {
        seller: {
          '@type': schemaProperties.DEFAULT_ORGANISATION,
          name: metaSeller || seller,
        },
      }),
    },
  };
};

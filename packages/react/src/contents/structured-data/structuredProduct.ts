import * as schemaProperties from './schemas/schemaProperties.js';
import {
  generateSchemaOrgProperty,
  getConditionSchemaOrg,
} from '../utils/index.js';
import { renderScriptTag } from '../helpers/index.js';
import type { Product as ProductSchema, WithContext } from 'schema-dts';
import type { ReactElement } from 'react';
import type { SEOMetadata } from '@farfetch/blackout-client';
import type {
  StructuredProductData,
  StructuredProductImage,
} from '../types/index.js';

/**
 * Generate Structured Data (JSON-LD) for Product Details.
 *
 * @example
 * ```
 * import { structuredProduct } from '@farfetch/blackout-react';
 *
 * <Helmet>
 *  {structuredProduct(
 *    product,
 *    metadata,
 *    lastCategory,
 *    url,
 *    seller,
 *    2)
 *   }
 * </Helmet>
 *
 * ```
 *
 * @param product      - All details data for the current Product.
 * @param metadata     - All SEO metadata for the current Product.
 * @param lastCategory - Last category name.
 * @param url          - Relative url of the product (location.pathname).
 * @param seller       - Seller name for this particular product.
 * @param space        - Add whitespace and indentation to the serialized output.
 *
 * @returns - A script tag with Product JSON-LD structured data.
 */
const structuredProduct = (
  product: StructuredProductData,
  metadata: SEOMetadata,
  seller: string,
  space?: number,
): ReactElement => {
  const metaSeller = generateSchemaOrgProperty('product:seller', metadata);

  const PRODUCT: WithContext<ProductSchema> = {
    '@context': schemaProperties.DEFAULT_CONTEXT,
    '@type': schemaProperties.DEFAULT_TYPE_PRODUCT,
    name:
      generateSchemaOrgProperty('product:name', metadata) ||
      generateSchemaOrgProperty('og:title', metadata) ||
      product.name,
    description:
      generateSchemaOrgProperty('product:description', metadata) ||
      generateSchemaOrgProperty('og:description', metadata) ||
      product.description,
    image:
      product.images?.map((image: StructuredProductImage, index: number) =>
        generateSchemaOrgProperty(`product:image:${index + 1}`, metadata)
          ? generateSchemaOrgProperty(`product:image:${index + 1}`, metadata)
          : image.url,
      ) || generateSchemaOrgProperty('og:image', metadata),
    sku: generateSchemaOrgProperty('product:sku', metadata) || product.sku,
    productID:
      generateSchemaOrgProperty('product:id', metadata) ||
      product.id?.toString(),
    mpn: generateSchemaOrgProperty('product:mpn', metadata) || product.mpn,
    color:
      generateSchemaOrgProperty('product:color', metadata) || product.colorName,
    category:
      generateSchemaOrgProperty('product:category', metadata) ||
      product.lastCategory,
    brand: {
      '@type': schemaProperties.DEFAULT_BRAND_TYPE,
      name:
        generateSchemaOrgProperty('product:brand', metadata) ||
        product.brandName,
    },
    offers: {
      '@context': schemaProperties.DEFAULT_CONTEXT,
      '@type': schemaProperties.DEFAULT_TYPE_OFFER,
      url: generateSchemaOrgProperty('og:url', metadata) || product.url,
      price:
        generateSchemaOrgProperty('product:price:amount', metadata) ||
        product.price?.includingTaxes,
      priceCurrency:
        generateSchemaOrgProperty('product:price:currency', metadata) ||
        product.currencyIsoCode,
      itemCondition:
        getConditionSchemaOrg(
          generateSchemaOrgProperty('product:condition', metadata),
        ) || schemaProperties.NEW_CONDITION,
      availability: generateSchemaOrgProperty('product:availability', metadata)
        ? schemaProperties.IN_STOCK
        : (product?.quantity ?? 0) > 0
        ? schemaProperties.IN_STOCK
        : schemaProperties.OUT_OF_STOCK,
      priceValidUntil:
        generateSchemaOrgProperty('product:price:priceValidUntil', metadata) ||
        product.price?.priceValidUntil,
      ...((metaSeller || seller) && {
        seller: {
          '@type': schemaProperties.DEFAULT_ORGANISATION,
          name: metaSeller || seller,
        },
      }),
    },
  };

  return renderScriptTag(PRODUCT, space);
};

export default structuredProduct;

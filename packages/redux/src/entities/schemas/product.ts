import {
  adaptCustomAttributes,
  adaptMerchant,
  adaptPrice,
  adaptProductImages,
  adaptProductSizes,
} from '../../helpers/adapters/index.js';
import { get } from 'lodash-es';
import { schema } from 'normalizr';
import brand from './brand.js';
import category from './category.js';
import merchant from './merchant.js';
import type {
  AdaptGroupedEntries,
  AdaptPrices,
  AdaptVariants,
} from '../types/index.js';

const adaptGroupedEntries: AdaptGroupedEntries = groupedEntries =>
  groupedEntries && {
    ...groupedEntries,
    entries: groupedEntries.entries.map(entry => ({
      ...entry,
      images: adaptProductImages(entry.images),
    })),
  };
const adaptPrices: AdaptPrices = prices => prices?.map(adaptPrice);
const adaptVariants: AdaptVariants = variants =>
  variants?.map(variant => ({
    ...variant,
    price: adaptPrice(variant.price),
  }));

export default new schema.Entity(
  'products',
  {
    categories: [category],
    brand,
    merchant,
  },
  {
    processStrategy: value => {
      const {
        colorGrouping,
        customAttributes,
        discountInclTaxes,
        discountRate,
        formattedPrice,
        formattedPriceWithoutDiscount,
        groupedEntries,
        grouping,
        groupingProperties,
        imageGroups,
        images,
        merchantId,
        merchantName,
        merchantShoppingUrl,
        price,
        priceExclTaxes,
        priceInclTaxes,
        priceInclTaxesWithoutDiscount,
        prices,
        priceType,
        priceWithoutDiscount,
        productImgQueryParam,
        promocodeDiscountPercentage,
        promotionPercentage,
        sizes,
        tag,
        tagDescription,
        tags,
        taxesRate,
        taxesType,
        taxesValue,
        variants,
        ...item
      } = value;

      const priceToAdapt = typeof price === 'object' ? price : value;
      const imagesToAdapt = imageGroups || get(images, 'images') || images;

      return {
        customAttributes: adaptCustomAttributes(customAttributes),
        groupedEntries: adaptGroupedEntries(groupedEntries),
        images: adaptProductImages(imagesToAdapt, {
          productImgQueryParam,
        }),
        merchant: adaptMerchant({
          merchantId,
          merchantName,
          merchantShoppingUrl,
        }),
        price: adaptPrice(priceToAdapt),
        prices: adaptPrices(prices),
        sizes: adaptProductSizes(sizes, variants),
        tag: {
          name: tagDescription,
          id: tag,
        },
        variants: adaptVariants(variants),
        ...item,
      };
    },
  },
);

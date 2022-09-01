import {
  adaptCustomAttributes,
  adaptGrouping,
  adaptGroupingProperties,
  adaptMerchant,
  adaptPrice,
  adaptProductImages,
  adaptProductSizes,
} from '../../helpers/adapters';
import { schema } from 'normalizr';
import brand from './brand';
import category from './category';
import get from 'lodash/get';
import merchant from './merchant';
import type { AdaptGroupedEntries, AdaptPrices, AdaptVariants } from '../types';

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
        grouping: adaptGrouping(grouping),
        groupingProperties: adaptGroupingProperties(groupingProperties),
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

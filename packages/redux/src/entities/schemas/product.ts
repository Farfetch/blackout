import {
  adaptCustomAttributes,
  adaptMerchant,
  adaptPrice,
  adaptProductImages,
  adaptProductSizes,
} from '@farfetch/blackout-client/helpers/adapters';
import { schema } from 'normalizr';
import brand from './brand';
import category from './category';
import get from 'lodash/get';
import merchant from './merchant';
import type {
  AdaptColorGrouping,
  AdaptGroupedEntries,
  AdaptPrices,
  AdaptVariants,
} from '../types';

const adaptColorGrouping: AdaptColorGrouping = colorGrouping =>
  colorGrouping && {
    ...colorGrouping,
    entries: colorGrouping.entries.map(entry => ({
      ...entry,
      digitalAssets: adaptProductImages(entry.digitalAssets),
    })),
  };

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
        customAttributes,
        colorGrouping,
        discountInclTaxes,
        discountRate,
        formattedPrice,
        formattedPriceWithoutDiscount,
        groupedEntries,
        imageGroups,
        images,
        productImgQueryParam,
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
        colorGrouping: adaptColorGrouping(colorGrouping),
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

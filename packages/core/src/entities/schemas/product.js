import {
  adaptCustomAttributes,
  adaptMerchant,
  adaptPrice,
  adaptProductImages,
  adaptProductSizes,
  DEPRECATED_adaptProductImages,
} from '../../helpers/adapters';
import { schema } from 'normalizr';
import brand from './brand';
import category from './category';
import get from 'lodash/get';
import merchant from './merchant';

const adaptColorGrouping = colorGrouping =>
  colorGrouping &&
  colorGrouping.map(colorGroup => ({
    ...colorGroup,
    entries: colorGroup.entries.map(entry => ({
      ...entry,
      digitalAssets: adaptProductImages(entry.digitalAssets),
    })),
  }));
const adaptGroupedEntries = groupedEntries =>
  groupedEntries && {
    ...groupedEntries,
    entries: groupedEntries.entries.map(entry => ({
      ...entry,
      images: adaptProductImages(entry.images),
    })),
  };
const adaptPrices = prices =>
  prices && prices.length ? prices.map(price => adaptPrice(price)) : undefined;
const adaptVariants = variants =>
  variants &&
  variants.map(variant => ({
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
        DEPRECATED_images: DEPRECATED_adaptProductImages(imagesToAdapt),
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

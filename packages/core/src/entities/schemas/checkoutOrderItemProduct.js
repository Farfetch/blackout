import {
  adaptCustomAttributes,
  adaptPrice,
  adaptProductImages,
  adaptProductSizes,
  DEPRECATED_adaptProductImages,
} from '../../helpers/adapters';
import { schema } from 'normalizr';
import category from './category';
import get from 'lodash/get';
import merchant from './merchant';

const adaptVariants = variants =>
  variants &&
  variants.map(variant => ({
    ...variant,
    price: adaptPrice(variant.price),
  }));

export default new schema.Entity(
  'checkoutOrderItemProducts',
  {
    categories: [category],
    merchant,
  },
  {
    processStrategy: value => {
      const { customAttributes, images, price, sizes, variants, ...item } =
        value;
      const priceToAdapt = typeof price === 'object' ? price : value;
      const imagesToAdapt = get(images, 'images') || images;

      return {
        customAttributes: adaptCustomAttributes(customAttributes),
        images: adaptProductImages(imagesToAdapt),
        DEPRECATED_images: DEPRECATED_adaptProductImages(imagesToAdapt),
        price: adaptPrice(priceToAdapt),
        sizes: adaptProductSizes(sizes, variants),
        variants: adaptVariants(variants),
        ...item,
      };
    },
  },
);

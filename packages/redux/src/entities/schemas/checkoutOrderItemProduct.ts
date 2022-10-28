import {
  adaptCustomAttributes,
  adaptPrice,
  adaptProductImages,
} from '../../helpers/adapters';
import { schema } from 'normalizr';
import category from './category';
import get from 'lodash/get';
import merchant from './merchant';
import type { AdaptVariants } from '../types';

const adaptVariants: AdaptVariants = variants =>
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
      const {
        customAttributes,
        images,
        price,
        variants,
        productImgQueryParam,
        ...item
      } = value;
      const priceToAdapt = typeof price === 'object' ? price : value;
      const imagesToAdapt = get(images, 'images') || images;

      return {
        customAttributes: adaptCustomAttributes(customAttributes),
        images: adaptProductImages(imagesToAdapt, { productImgQueryParam }),
        price: adaptPrice(priceToAdapt),
        variants: adaptVariants(variants),
        ...item,
      };
    },
  },
);

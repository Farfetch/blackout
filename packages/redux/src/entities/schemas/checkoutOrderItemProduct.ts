import {
  adaptCustomAttributes,
  adaptPrice,
  adaptProductImages,
} from '../../helpers/adapters/index.js';
import { get } from 'lodash-es';
import { schema } from 'normalizr';
import category from './category.js';
import merchant from './merchant.js';
import type { AdaptVariants } from '../types/index.js';

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

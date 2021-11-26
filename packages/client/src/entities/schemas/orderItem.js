import {
  adaptCustomAttributes,
  adaptProductImages,
} from '../../helpers/adapters';
import { schema } from 'normalizr';
import brand from './brand';
import category from './category';
import defaultTo from 'lodash/defaultTo';
import merchant from './merchant';

export default new schema.Entity(
  'orderItems',
  {
    brand,
    categories: [category],
    merchant,
  },
  {
    processStrategy: value => {
      const {
        customAttributes,
        images,
        images: { images: orderProductImages },
        merchantId,
        price,
        productAggregator,
        productImgQueryParam,
        tag,
        tagDescription,
        ...item
      } = value;

      const imagesToAdapt = defaultTo(orderProductImages, images);
      if (productAggregator && productAggregator.hasOwnProperty('id')) {
        item.productAggregator = {
          ...productAggregator,
          images: adaptProductImages(productAggregator.images.images, {
            productImgQueryParam,
          }),
        };
      }
      const orderItem = {
        customAttributes: adaptCustomAttributes(customAttributes),
        images: adaptProductImages(imagesToAdapt, {
          productImgQueryParam,
        }),
        merchant: {
          id: merchantId,
        },
        price,
        tag: {
          name: tagDescription,
          id: tag,
        },
        ...item,
      };

      return orderItem;
    },
  },
);

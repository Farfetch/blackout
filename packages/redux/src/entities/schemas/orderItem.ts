import {
  adaptCustomAttributes,
  adaptPrice,
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
    processStrategy: (value, parent) => {
      const {
        customAttributes,
        images,
        images: { images: orderProductImages },
        merchantId,
        price,
        productAggregator,
        productImgQueryParam,
        ...item
      } = value;

      const finalProductImgQueryParam =
        productImgQueryParam || parent.productImgQueryParam;

      const imagesToAdapt = defaultTo(orderProductImages, images);

      if (productAggregator && productAggregator.hasOwnProperty('id')) {
        item.productAggregator = {
          ...productAggregator,
          images: adaptProductImages(productAggregator.images.images, {
            productImgQueryParam: finalProductImgQueryParam,
          }),
        };
      }
      const orderItem = {
        customAttributes: adaptCustomAttributes(customAttributes),
        images: adaptProductImages(imagesToAdapt, {
          productImgQueryParam: finalProductImgQueryParam,
        }),
        merchant: {
          id: merchantId,
        },
        price: adaptPrice(price),
        ...item,
      };

      return orderItem;
    },
  },
);

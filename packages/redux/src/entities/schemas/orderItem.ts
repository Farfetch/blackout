import {
  adaptCustomAttributes,
  adaptDate,
  adaptPrice,
  adaptProductImages,
} from '../../helpers/adapters/index.js';
import { defaultTo } from 'lodash-es';
import {
  MerchantOrderStatus,
  MerchantOrderStatusLegacy,
  OrderItemCreationChannel,
  OrderItemCreationChannelLegacy,
  OrderItemStatus,
  OrderItemStatusLegacy,
  ProductType,
} from '@farfetch/blackout-client';
import { schema } from 'normalizr';
import brand from './brand.js';
import category from './category.js';

export default new schema.Entity(
  'orderItems',
  {
    brand,
    categories: [category],
  },
  {
    processStrategy: (value, parent) => {
      const {
        customAttributes,
        images,
        images: { images: orderProductImages },
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
        price: adaptPrice(price),
        ...item,
      };

      if (orderItem.preOrder && orderItem.preOrder.expectedFulfillmentDate) {
        orderItem.preOrder = {
          ...orderItem.preOrder,
          expectedFulfillmentDate: {
            endDate: adaptDate(
              orderItem.preOrder.expectedFulfillmentDate.endDate,
            ),
            startDate: adaptDate(
              orderItem.preOrder.expectedFulfillmentDate.startDate,
            ),
          },
        };
      }

      // The next conversions are related to when we receive a legacy
      // order (i.e. when using the get guest order legacy endpoint)
      // This will make it easier to work with those properties by the consumer.
      if (typeof orderItem.creationChannel === 'number') {
        const creationChannelKey = OrderItemCreationChannelLegacy[
          orderItem.creationChannel
        ] as keyof typeof OrderItemCreationChannelLegacy | undefined;

        if (creationChannelKey) {
          orderItem.creationChannel =
            OrderItemCreationChannel[creationChannelKey];
        }
      }

      if (typeof orderItem.orderItemStatus === 'number') {
        const orderItemStatusKey = OrderItemStatusLegacy[
          orderItem.orderItemStatus
        ] as keyof typeof OrderItemStatusLegacy | undefined;

        if (orderItemStatusKey) {
          orderItem.orderItemStatus = OrderItemStatus[orderItemStatusKey];
        }
      }

      if (typeof orderItem.productType === 'number') {
        const productTypeKey = ProductType[orderItem.productType] as
          | keyof typeof ProductType
          | undefined;

        if (productTypeKey) {
          // There is no ProductTypeLegacy enum, as there are services that
          // return either a number or a string for the productType property.
          // So we need to reuse the same enum here by using the string key.
          orderItem.productType = productTypeKey;
        }
      }

      if (typeof orderItem.orderStatus === 'number') {
        const orderStatusKey = MerchantOrderStatusLegacy[
          orderItem.orderStatus
        ] as keyof typeof MerchantOrderStatusLegacy | undefined;

        if (orderStatusKey) {
          orderItem.orderStatus = MerchantOrderStatus[orderStatusKey];
        }
      }

      return orderItem;
    },
  },
);

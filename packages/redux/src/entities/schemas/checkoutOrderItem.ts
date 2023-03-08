import {
  adaptAttributes,
  adaptPrice,
  adaptProductImages,
} from '../../helpers/adapters/index.js';
import { schema } from 'normalizr';
import checkoutOrderItemProduct from './checkoutOrderItemProduct.js';
import merchant from './merchant.js';

export default new schema.Entity(
  'checkoutOrderItems',
  { product: checkoutOrderItemProduct, merchant },
  {
    processStrategy: (value, parent) => {
      const {
        attributes,
        categories,
        colors,
        customAttributes,
        images,
        isCustomizable,
        isExclusive,
        merchantId,
        merchantName,
        price,
        productImgQueryParam,
        productAggregator,
        productId,
        productName,
        productSlug,
        variants,
        ...item
      } = value;

      const finalProductImgQueryParam =
        productImgQueryParam || parent.productImgQueryParam;

      item.size = adaptAttributes(attributes);

      const merchant = {
        id: merchantId,
        name: merchantName,
      };

      item.merchant = merchant;
      item.price = adaptPrice(price);

      if (productAggregator && productAggregator.hasOwnProperty('id')) {
        item.productAggregator = {
          ...productAggregator,
          images: adaptProductImages(productAggregator.images.images, {
            productImgQueryParam: finalProductImgQueryParam,
          }),
        };
      }

      /* NOTE: There might exist other product properties that might
            have the same problem as the merchant and price.
            Please, take a look at other product properties that might
            make sense to be on the checkout order item
            instead of being on the product property. */
      item.product = {
        categories,
        colors,
        customAttributes,
        id: productId,
        images,
        isCustomizable,
        isExclusive,
        merchant, // NOTE: This prop is now redundant but I have kept it for backwards-compatibility. It might be better to remove this property (and maybe other properties) from here as they might clash when there are different order items for the same product but different merchants.
        name: productName,
        price, // NOTE: Same as merchant prop
        productImgQueryParam: finalProductImgQueryParam,
        slug: productSlug,
        variants,
      };

      return item;
    },
  },
);

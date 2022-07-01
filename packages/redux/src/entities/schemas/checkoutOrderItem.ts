import {
  adaptAttributes,
  adaptDate,
  adaptPrice,
  adaptProductImages,
} from '../../helpers/adapters';
import { schema } from 'normalizr';
import checkoutOrderItemProduct from './checkoutOrderItemProduct';
import merchant from './merchant';

export default new schema.Entity(
  'checkoutOrderItems',
  { product: checkoutOrderItemProduct, merchant },
  {
    processStrategy: value => {
      const {
        attributes,
        categories,
        colors,
        customAttributes,
        dateCreated,
        images,
        isAvailable,
        isCustomizable,
        isExclusive,
        merchantId,
        merchantName,
        merchantShoppingUrl,
        price,
        productAggregator,
        productDescription,
        productId,
        productName,
        productSlug,
        sizes,
        variants,
        ...item
      } = value;

      item.dateCreated = adaptDate(dateCreated);
      item.size = adaptAttributes(attributes);

      const merchant = {
        id: merchantId,
        name: merchantName,
        shoppingUrl: merchantShoppingUrl,
      };

      item.merchant = merchant;
      item.price = adaptPrice(price);

      if (productAggregator && productAggregator.hasOwnProperty('id')) {
        item.productAggregator = {
          ...productAggregator,
          images: adaptProductImages(productAggregator.images.images),
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
        description: productDescription,
        id: productId,
        images,
        isAvailable,
        isCustomizable,
        isExclusive,
        merchant, // NOTE: This prop is now redundant but I have kept it for backwards-compatibility. It might be better to remove this property (and maybe other properties) from here as they might clash when there are different order items for the same product but different merchants.
        name: productName,
        price, // NOTE: Same as merchant prop
        sizes,
        slug: productSlug,
        variants,
      };

      return item;
    },
  },
);

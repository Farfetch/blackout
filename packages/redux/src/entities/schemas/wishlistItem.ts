import {
  adaptAttributes,
  adaptDate,
  adaptMerchant,
  adaptPrice,
} from '../../helpers/adapters/index.js';
import { schema } from 'normalizr';
import merchant from './merchant.js';
import product from './product.js';

export default new schema.Entity(
  'wishlistItems',
  { product, merchant },
  {
    processStrategy: value => {
      const {
        attributes,
        brandId,
        brandName,
        categories,
        colors,
        dateCreated,
        images,
        productImgQueryParam,
        labels,
        merchantId,
        merchantShoppingUrl,
        price,
        productDescription,
        productId,
        productName,
        productSlug,
        sizes,
        variants,
        ...item
      } = value;

      item.attributes = attributes;
      item.dateCreated = adaptDate(dateCreated);
      item.merchant = adaptMerchant({
        merchantId,
        merchantShoppingUrl,
      });
      item.price = adaptPrice(price);
      item.size = adaptAttributes(attributes, sizes);
      item.product = {
        brand: {
          id: brandId,
          name: brandName,
        },
        description: productDescription,
        id: productId,
        name: productName,
        productImgQueryParam,
        slug: productSlug,
        categories,
        colors,
        images,
        labels,
        sizes,
        variants,
      };

      return item;
    },
  },
);

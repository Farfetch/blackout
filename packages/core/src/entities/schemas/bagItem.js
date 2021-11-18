import {
  adaptAttributes,
  adaptCustomAttributes,
  adaptDate,
  adaptMerchant,
  adaptPrice,
} from '../../helpers/adapters';
import { schema } from 'normalizr';
import merchant from './merchant';
import product from './product';

export default new schema.Entity(
  'bagItems',
  { product, merchant },
  {
    processStrategy: value => {
      const {
        attributes,
        brandId,
        brandName,
        categories,
        colors,
        customAttributes,
        dateCreated,
        images,
        productImgQueryParam,
        labels,
        merchantId,
        merchantName,
        merchantShoppingUrl,
        price,
        productDescription,
        productId,
        productName,
        productSlug,
        sizes,
        type,
        variants,
        ...item
      } = value;

      item.attributes = attributes;
      item.customAttributes = adaptCustomAttributes(customAttributes);
      item.dateCreated = adaptDate(dateCreated);
      item.merchant = adaptMerchant({
        merchantId,
        merchantName,
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
        slug: productSlug,
        categories,
        colors,
        images,
        labels,
        productImgQueryParam,
        sizes,
        type,
        variants,
      };

      return item;
    },
  },
);

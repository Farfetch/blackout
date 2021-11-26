import type {
  BagItemEntity,
  MerchantEntity,
  ProductEntity,
} from '../../entities/types';
import type { CustomAttributesAdapted } from '@farfetch/blackout-client/helpers/adapters/types';

type Params = Partial<{
  productId: ProductEntity['id'];
  product: ProductEntity;
  customAttributes: CustomAttributesAdapted | string;
  merchantId: MerchantEntity['id'];
  merchant: MerchantEntity['id'];
  size: BagItemEntity['size'] | number;
  scale: string | number;
}>;

/**
 * Creates a hash based on the merchant, product, size ids and custom attributes.
 *
 * @memberof module:bags/utils
 *
 * @param {object} params - The params needed to create a hash.
 *
 * @returns {string} The hash created.
 */
const generateBagItemHash = (params: Params): string => {
  const productId = params.productId || params.product?.id;
  const merchantId = params.merchantId || params.merchant;
  let sizeId = params.size;
  let sizeScale = params.scale;
  const customAttributes = params.customAttributes;

  if (typeof params.size === 'object') {
    sizeId = params.size.id;
    sizeScale = params.size.scale;
  }

  if (!merchantId || !productId || !sizeId || !sizeScale) {
    throw new Error(
      'Item is missing some important properties, please check your `merchantId`, `productId`, `size.id` or `size.scale`',
    );
  }

  return `${merchantId}!${productId}!${sizeId}!${sizeScale}!${
    customAttributes || ''
  }`;
};

export default generateBagItemHash;

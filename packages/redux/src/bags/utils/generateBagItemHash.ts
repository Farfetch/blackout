import type {
  BagItemEntity,
  MerchantEntity,
  ProductEntity,
  ProductEntityDenormalized,
} from '../../entities/types/index.js';
import type { CustomAttributesAdapted } from '../../helpers/adapters/index.js';

type Params = Partial<{
  productId: ProductEntity['id'];
  product: ProductEntityDenormalized;
  customAttributes: CustomAttributesAdapted | string;
  merchantId: MerchantEntity['id'];
  merchant: MerchantEntity['id'];
  productAggregator: BagItemEntity['productAggregator'];
  productAggregatorId: Exclude<BagItemEntity['productAggregator'], null>['id'];
  size: BagItemEntity['size'] | number;
  scale: string | number;
}>;

/**
 * Creates a hash based on the merchant, product, size ids and custom attributes.
 *
 * @param params - The params needed to create a hash.
 *
 * @returns The hash created.
 */
const generateBagItemHash = (params: Params): string => {
  const productId = params.productId || params.product?.id;
  const merchantId = params.merchantId || params.merchant;
  let sizeId = params.size;
  let sizeScale = params.scale;
  const productAggregatorId =
    params.productAggregatorId || params.productAggregator?.id;

  if (typeof params.size === 'object') {
    sizeId = params.size.id;
    sizeScale = params.size.scale;
  }

  const customAttributes =
    typeof params.customAttributes === 'object'
      ? JSON.stringify(params.customAttributes)
      : params.customAttributes;

  if (!merchantId || !productId || !sizeId || !sizeScale) {
    throw new Error(
      'Item is missing some important properties, please check your `merchantId`, `productId`, `size.id` or `size.scale`',
    );
  }

  return `${merchantId}!${productId}!${sizeId}!${sizeScale}${
    customAttributes ? `!${customAttributes}` : ''
  }${productAggregatorId ? `!${productAggregatorId}` : ''}`;
};

export default generateBagItemHash;

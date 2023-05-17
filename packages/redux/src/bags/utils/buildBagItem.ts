import type {
  BagItemEntity,
  ProductEntityDenormalized,
} from '../../entities/types/index.js';
import type {
  CustomAttributesAdapted,
  SizeAdapted,
} from '../../helpers/adapters/index.js';

type BuildBagItemParams = {
  // Authorization code (for SMS restrictions, for example).
  authCode?: string;
  // Custom attributes.
  customAttributes?: CustomAttributesAdapted;
  // Specific merchant id.
  merchantId: number;
  // Product with all information.
  product: ProductEntityDenormalized;
  // Product bundle aggregator id.
  productAggregatorId?: Exclude<BagItemEntity['productAggregator'], null>['id'];
  // Number of units.
  quantity?: number;
  // Size information.
  size: SizeAdapted | BagItemEntity['size'];
};

/**
 * Build a bag item ready to bag requests (add or update).
 *
 * @param data - Details of the bag item to build.
 *
 * @returns Bag item data ready to perform add or update requests.
 */
const buildBagItem = ({
  authCode,
  customAttributes = '',
  merchantId,
  product,
  productAggregatorId,
  quantity = 1,
  size,
}: BuildBagItemParams) => {
  const parsedCustomAttributes =
    !!customAttributes && typeof customAttributes === 'object'
      ? JSON.stringify(customAttributes)
      : customAttributes;

  return {
    authCode,
    customAttributes: parsedCustomAttributes,
    merchantId: merchantId,
    productId: product.id,
    productAggregatorId,
    quantity,
    scale: size.scale,
    size: size.id,
  };
};

export default buildBagItem;

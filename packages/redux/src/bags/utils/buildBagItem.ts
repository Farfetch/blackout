import type {
  BagItemEntity,
  MerchantEntity,
  ProductEntity,
} from '../../entities/types';
import type {
  CustomAttributesAdapted,
  SizeAdapted,
} from '../../helpers/adapters';

type BuildBagItemParams = {
  // Authorization code (for SMS restrictions, for example).
  authCode?: string;
  // Custom attributes.
  customAttributes?: CustomAttributesAdapted;
  // Specific merchant id.
  merchantId?: number;
  // Product with all information.
  product: ProductEntity;
  // Product bundle aggregator id.
  productAggregatorId?: Exclude<BagItemEntity['productAggregator'], null>['id'];
  // Number of units.
  quantity?: number;
  // Size information.
  size: SizeAdapted | BagItemEntity['size'];
  // Provenience of action.
  from?: string;
};

type BuildBagItem = (params: BuildBagItemParams) => {
  authCode?: string;
  customAttributes: CustomAttributesAdapted | string;
  merchantId?: MerchantEntity['id'];
  productId: ProductEntity['id'];
  quantity: number;
  scale: SizeAdapted['scale'];
  size: SizeAdapted['id'];
  from?: string;
};

/**
 * Build a bag item ready to bag requests (add or update).
 *
 * @param data - Details of the bag item to build.
 *
 * @returns Bag item data ready to perform add or update requests.
 */
const buildBagItem: BuildBagItem = ({
  authCode,
  customAttributes = '',
  merchantId,
  product,
  productAggregatorId,
  quantity = 1,
  size,
  ...otherParams
}) => {
  const sizeHydrated = product.sizes?.find(({ id }) => id === size.id);

  return {
    authCode,
    customAttributes,
    merchantId: merchantId || sizeHydrated?.stock[0]?.merchantId,
    productId: product.id,
    productAggregatorId,
    quantity,
    scale: size.scale,
    size: size.id,
    ...otherParams,
  };
};

export default buildBagItem;

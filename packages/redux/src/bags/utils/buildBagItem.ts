import type {
  BagItemEntity,
  MerchantEntity,
  ProductEntity,
} from '../../entities/types';
import type {
  CustomAttributesAdapted,
  SizeAdapted,
} from '@farfetch/blackout-client/helpers/adapters/types';

type BuildBagItemParams = {
  authCode?: string;
  customAttributes?: CustomAttributesAdapted;
  merchantId?: number;
  product: ProductEntity;
  productAggregatorId?: Exclude<BagItemEntity['productAggregator'], null>['id'];
  quantity?: number;
  size: SizeAdapted | BagItemEntity['size'];
};

type BuildBagItem = (arg0: BuildBagItemParams) => {
  authCode?: string;
  customAttributes: CustomAttributesAdapted | string;
  merchantId?: MerchantEntity['id'];
  productId: ProductEntity['id'];
  quantity: number;
  scale: SizeAdapted['scale'];
  size: SizeAdapted['id'];
};

/**
 * Build a bag item ready to bag requests (add or update).
 *
 * @memberof module:bags/utils
 *
 * @param {object} data - Details of the bag item to build.
 * @param {string} [data.authCode] - Authorization code (for SMS
 * restrictions, for example).
 * @param {string} [data.customAttributes=''] - Custom attributes.
 * @param {number} [data.merchantId] - Specific merchant id.
 * @param {object} data.product - Product with all information.
 * @param {number} [data.productAggregatorId] - Product bundle aggregator id.
 * @param {number} [data.quantity=1] - Number of units.
 * @param {object} data.size - Size information.
 *
 * @returns {object} Bag item data ready to perform add or update requests.
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

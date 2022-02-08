import type {
  BagItemHydrated,
  ProductEntity,
} from '@farfetch/blackout-redux/entities/types';
import type {
  CustomAttributesAdapted,
  SizeAdapted,
} from '@farfetch/blackout-client/helpers/adapters/types';

export type HandleAddOrUpdateItem = ({
  customAttributes,
  from,
  product,
  productAggregatorId,
  quantity,
  size,
}: {
  customAttributes?: CustomAttributesAdapted;
  from?: string;
  product?: ProductEntity;
  productAggregatorId?: Exclude<
    BagItemHydrated['productAggregator'],
    null
  >['id'];
  quantity?: number;
  size?: SizeAdapted;
}) => Promise<void>;

export type UseAddOrUpdateBagItem = (
  bagItem?: BagItemHydrated,
) => HandleAddOrUpdateItem;

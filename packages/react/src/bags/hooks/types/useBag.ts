import type {
  BagItemActionMetadata,
  BagItemHydrated,
  CustomAttributesAdapted,
  ProductEntity,
  SizeAdapted,
} from '@farfetch/blackout-redux';
import type { Config, GetBagQuery } from '@farfetch/blackout-client';

export type HandleAddOrUpdateItem = (
  {
    customAttributes,
    from,
    product,
    productAggregatorId,
    quantity,
    size,
  }: {
    customAttributes?: CustomAttributesAdapted | string;
    from?: string;
    product: ProductEntity;
    productAggregatorId?: Exclude<
      BagItemHydrated['productAggregator'],
      null
    >['id'];
    quantity: number;
    size: SizeAdapted;
  },
  metadata?: BagItemActionMetadata,
) => Promise<void>;

export type UseBagOptions = {
  enableAutoFetch?: boolean;
  fetchQuery?: GetBagQuery;
  fetchConfig?: Config;
};

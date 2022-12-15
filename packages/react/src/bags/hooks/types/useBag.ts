import type {
  BagItemActionMetadata,
  BagItemDenormalized,
  CustomAttributesAdapted,
  ProductEntityDenormalized,
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
    product: ProductEntityDenormalized;
    productAggregatorId?: Exclude<
      BagItemDenormalized['productAggregator'],
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

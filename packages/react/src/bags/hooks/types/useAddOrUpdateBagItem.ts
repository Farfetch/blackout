import type {
  BagItemHydrated,
  CustomAttributesAdapted,
  ProductEntity,
  SizeAdapted,
} from '@farfetch/blackout-redux';

export type HandleAddOrUpdateItem = ({
  customAttributes,
  from,
  product,
  productAggregatorId,
  quantity,
  size,
}: {
  // Custom attributes of the bag item to handle.
  customAttributes?: CustomAttributesAdapted;
  // Provenience of action.
  from?: string;
  // Product of the bag item to handle. Defaults to the product of the bag item that instantiated the hook.
  product?: ProductEntity;
  // Product aggregator id that represents the bundle variant that owns it.
  productAggregatorId?: Exclude<
    BagItemHydrated['productAggregator'],
    null
  >['id'];
  // Quantity of the product to add/update. Defaults to the quantity of
  // the bag item that instantiated the hook or 1 when adding an item for the first time.
  quantity?: number;
  // Size of the product to add/update. Defaults to the size of the bag item that instantiated the hook.
  size?: SizeAdapted;
}) => Promise<void>;

export type UseAddOrUpdateBagItem = (
  bagItem?: BagItemHydrated,
) => HandleAddOrUpdateItem;

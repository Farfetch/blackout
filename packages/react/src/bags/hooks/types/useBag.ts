import type {
  Bag,
  BagItem,
  Config,
  GetBagQuery,
  PatchBagItemData,
  PatchBagItemQuery,
  PostBagItemData,
  PostBagItemQuery,
} from '@farfetch/blackout-client';
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
  customAttributes?: CustomAttributesAdapted | string;
  from?: string;
  product: ProductEntity;
  productAggregatorId?: Exclude<
    BagItemHydrated['productAggregator'],
    null
  >['id'];
  quantity: number;
  size: SizeAdapted;
}) => Promise<void>;

export type Options = {
  enableAutoFetch?: boolean;
};

export type AddBagItem = (
  data: PostBagItemData,
  query?: PostBagItemQuery,
  config?: Config,
) => Promise<Bag>;

export type UpdateBagItem = (
  bagItemId: number,
  data: PatchBagItemData,
  query?: PatchBagItemQuery,
  config?: Config,
) => Promise<Bag>;

export type RemoveBagItem = (
  bagItemId: BagItem['id'],
  config?: Config,
) => Promise<Bag>;

export type FetchBag = (
  id: Bag['id'],
  query?: GetBagQuery,
  config?: Config,
) => Promise<Bag>;

export type ResetBag = () => void;

export type HandleAddItem = (
  productId: number,
  { quantity, sizeId }: { quantity: number; sizeId: number },
) => Promise<void>;

export type HandleUpdateItem = (
  bagItemId: number,
  { quantity, sizeId }: { quantity?: number; sizeId?: number },
) => Promise<void | Bag> | undefined;

import type {
  Bag,
  PatchBagItemData,
  PostBagItemData,
  Query,
} from '@farfetch/blackout-client/bags/types';
import type {
  BagItemHydrated,
  ProductEntity,
} from '@farfetch/blackout-redux/entities/types';
import type {
  CustomAttributesAdapted,
  SizeAdapted,
} from '@farfetch/blackout-client/helpers/adapters/types';
import type { Error } from '@farfetch/blackout-client/types';

export type HandleAddOrUpdateItemType = ({
  customAttributes,
  product,
  productAggregatorId,
  quantity,
  size,
  from,
}: {
  customAttributes?: CustomAttributesAdapted;
  product?: ProductEntity;
  productAggregatorId?: Exclude<
    BagItemHydrated['productAggregator'],
    null
  >['id'];
  quantity?: number;
  size?: SizeAdapted | undefined;
  from?: string;
}) => Promise<void>;
export type HandleQuantityChangeType = (
  newQuantity: number,
  from?: string,
) => void;
export type HandleSizeChangeType = (newSize: number, from?: string) => void;
export type HandleFullUpdateType = (
  newSizeId: number,
  newQty: number,
  from?: string,
) => void;
export type HandleDeleteBagItemType = (from?: string) => void;

export type UseBagItem = (
  bagItemId: number,
  from?: string,
) => {
  addBagItem: (
    data: PostBagItemData,
    query?: Query,
    config?: Record<string, unknown>,
  ) => Promise<Bag>;
  deleteBagItem: (
    bagItemId: number,
    data?: PatchBagItemData,
    query?: Query,
    config?: Record<string, unknown>,
  ) => Promise<Bag>;
  updateBagItem: (
    bagItemId: number,
    data: PatchBagItemData,
    query?: Query,
    config?: Record<string, unknown>,
  ) => Promise<Bag>;
  bagItem: BagItemHydrated;
  error: Error | null | undefined;
  isLoading: boolean | undefined;
  handleAddOrUpdateItem: HandleAddOrUpdateItemType;
  handleQuantityChange: HandleQuantityChangeType;
  handleSizeChange: HandleSizeChangeType;
  handleFullUpdate: HandleFullUpdateType;
  handleDeleteBagItem: HandleDeleteBagItemType;
};

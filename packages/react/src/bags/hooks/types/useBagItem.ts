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
  product,
  customAttributes,
  quantity,
  size,
}: {
  product?: ProductEntity;
  customAttributes?: CustomAttributesAdapted;
  quantity?: number;
  size?: SizeAdapted;
}) => Promise<void>;
export type HandleQuantityChangeType = (newQuantity: number) => void;
export type HandleSizeChangeType = (newSize: number) => void;
export type HandleFullUpdateType = (newSizeId: number, newQty: number) => void;
export type HandleDeleteBagItemType = () => void;

export type UseBagItem = (bagItemId: number) => {
  addBagItem: (
    data: PostBagItemData,
    query?: Query,
    config?: Record<string, unknown>,
  ) => Promise<Bag>;
  deleteBagItem: (
    bagItemId: number,
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

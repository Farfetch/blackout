import type {
  Bag,
  PatchBagItemData,
  PostBagItemData,
  Query,
} from '@farfetch/blackout-client/bags/types';
import type { BagItemHydrated } from '@farfetch/blackout-redux/entities/types';
import type { BlackoutError } from '@farfetch/blackout-client/types';

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

export type UseBagItem = (bagItemId: number) => {
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
  error: BlackoutError | null | undefined;
  isLoading: boolean | undefined;
  handleQuantityChange: HandleQuantityChangeType;
  handleSizeChange: HandleSizeChangeType;
  handleFullUpdate: HandleFullUpdateType;
  handleDeleteBagItem: HandleDeleteBagItemType;
};

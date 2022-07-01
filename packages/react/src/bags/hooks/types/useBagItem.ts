import type {
  Bag,
  BlackoutError,
  Config,
  DeleteBagItemQuery,
  PatchBagItemData,
  PatchBagItemQuery,
} from '@farfetch/blackout-client';
import type { BagItemHydrated } from '@farfetch/blackout-redux';

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
  deleteBagItem: (
    bagItemId: number,
    data?: PatchBagItemData,
    query?: DeleteBagItemQuery,
    config?: Config,
  ) => Promise<Bag>;
  updateBagItem: (
    bagItemId: number,
    data: PatchBagItemData,
    query?: PatchBagItemQuery,
    config?: Config,
  ) => Promise<Bag>;
  bagItem: BagItemHydrated;
  error: BlackoutError | null | undefined;
  isLoading: boolean | undefined;
  handleQuantityChange: HandleQuantityChangeType;
  handleSizeChange: HandleSizeChangeType;
  handleFullUpdate: HandleFullUpdateType;
  handleDeleteBagItem: HandleDeleteBagItemType;
};

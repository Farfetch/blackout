import type {
  Bag,
  PostBagItemData,
  Query,
} from '@farfetch/blackout-client/src/bags/types';
import type { BagItemHydrated } from '@farfetch/blackout-redux/src/entities/types';
import type { ProductTypeEnum } from '@farfetch/blackout-client/products/types';
import type { State } from '@farfetch/blackout-redux/src/bags/types';

export type UseBag = (excludeProductTypes?: ProductTypeEnum[]) => {
  bag: State['result'];
  error: State['error'] | undefined;
  addBagItem: (
    data: PostBagItemData,
    query?: Query,
    config?: Record<string, unknown>,
  ) => Promise<Bag>;
  fetchBag: (
    bagId: string,
    query?: Query,
    config?: Record<string, unknown>,
  ) => Promise<Bag>;
  id: State['id'];
  isEmpty: boolean | undefined;
  isLoading: State['isLoading'];
  isWithAnyError: boolean | undefined;
  items: BagItemHydrated[];
  itemsCount: number;
  itemsIds: BagItemHydrated['id'][] | null;
  itemsUnavailable: BagItemHydrated[] | undefined;
  resetBag: () => void;
  resetBagState: (fieldsToReset?: string[]) => void;
  totalQuantity: number;
};

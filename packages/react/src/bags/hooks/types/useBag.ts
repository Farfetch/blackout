import type {
  Bag,
  Config,
  GetBagQuery,
  PostBagItemData,
  PostBagItemQuery,
  ProductType,
} from '@farfetch/blackout-client';
import type { BagItemHydrated, BagsState } from '@farfetch/blackout-redux';

export type UseBag = (excludeProductTypes?: ProductType[]) => {
  bag: BagsState['result'];
  error: BagsState['error'] | undefined;
  addBagItem: (
    data: PostBagItemData,
    query?: PostBagItemQuery,
    config?: Config,
  ) => Promise<Bag>;
  fetchBag: (
    bagId: string,
    query?: GetBagQuery,
    config?: Config,
  ) => Promise<Bag>;
  id: BagsState['id'];
  isEmpty: boolean | undefined;
  isLoading: BagsState['isLoading'];
  isWithAnyError: boolean | undefined;
  items: BagItemHydrated[];
  itemsCount: number;
  itemsIds: BagItemHydrated['id'][] | null;
  itemsUnavailable: BagItemHydrated[] | undefined;
  resetBag: () => void;
  resetBagState: (fieldsToReset?: string[]) => void;
  totalQuantity: number;
};

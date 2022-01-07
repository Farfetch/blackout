import type { Bag } from '@farfetch/blackout-client/src/bags/types';
import type { BagItemHydrated } from '@farfetch/blackout-redux/src/entities/types';
import type { State } from '@farfetch/blackout-redux/src/bags/types';

export type UseBag = () => {
  bag: State['result'];
  error: State['error'] | undefined;
  fetchBag: () => Promise<Bag>;
  id: State['id'];
  isEmpty: boolean | undefined;
  isLoading: State['isLoading'];
  isWithAnyError: boolean | undefined;
  items: BagItemHydrated[];
  itemsIds: BagItemHydrated['id'][] | null;
  itemsUnavailable: BagItemHydrated[] | undefined;
  resetBag: () => void;
  resetBagState: (fieldsToReset?: string[]) => void;
};

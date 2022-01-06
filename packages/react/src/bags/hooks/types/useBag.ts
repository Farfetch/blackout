import type { BagItemHydrated } from '@farfetch/blackout-redux/src/entities/types';
import type { Error } from '@farfetch/blackout-client/types';
import type { NormalizedBag } from '@farfetch/blackout-redux/src/bags/types';

export type UseBag = () => {
  bag: NormalizedBag | null;
  bagId: NormalizedBag['id'] | null;
  error: Error | null | undefined;
  fetchBag: () => Promise<NormalizedBag>;
  hasItems: boolean | undefined;
  isLoading: boolean | undefined;
  isWithAnyError: boolean | undefined;
  items: BagItemHydrated[];
  itemsIds: BagItemHydrated['id'][] | null;
  itemsUnavailable: BagItemHydrated[] | undefined;
  resetBag: () => void;
  resetBagState: () => void;
};

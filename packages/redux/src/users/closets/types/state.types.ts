import type {
  Closet,
  ClosetItem,
  ClosetItems,
} from '@farfetch/blackout-client';
import type { ProductImagesAdapted } from '../../../index.js';
import type { StateWithResult } from '../../../types/subAreaState.types.js';

export type ClosetItemAdapted = Omit<ClosetItem, 'images'> & {
  images: ProductImagesAdapted;
};

export type ClosetItemsAdapted = Omit<ClosetItems, 'entries'> & {
  entries: Array<ClosetItemAdapted>;
};

export type UserClosetsState = StateWithResult<Closet[]> & {
  closetItems: StateWithResult<ClosetItemsAdapted>;
};

import type { Config, PostReturnItemData } from '../..';
import type { Return } from './return.types';

export type PostReturnData = Omit<
  Return,
  | 'id'
  | 'status'
  | 'maximumDateForPickup'
  | 'createdDate'
  | 'items'
  | 'numberOfBoxes'
  | 'type'
  | 'availableDates'
  | 'userId'
  | 'awbUrl'
  | 'invoiceUrl'
  | 'references'
> & {
  items: PostReturnItemData[];
  numberOfBoxes?: number;
  type?: string;
};

export type PostReturn = (
  data: PostReturnData,
  config?: Config,
) => Promise<Return>;

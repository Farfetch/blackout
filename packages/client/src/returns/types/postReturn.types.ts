import type { Config, PostReturnItemData, ReturnOptionType } from '../..';
import type { Return, ReturnPickupSchedule } from './return.types';

export type PostReturnData = Omit<
  Return,
  | 'id'
  | 'status'
  | 'maximumDateForPickup'
  | 'createdDate'
  | 'items'
  | 'type'
  | 'availableDates'
  | 'userId'
  | 'awbUrl'
  | 'invoiceUrl'
  | 'references'
  | 'pickupSchedule'
  | 'returnStatus'
> & {
  items: PostReturnItemData[];
  type?: ReturnOptionType;
  pickupSchedule?: Partial<ReturnPickupSchedule>;
};

export type PostReturn = (
  data: PostReturnData,
  config?: Config,
) => Promise<Return>;

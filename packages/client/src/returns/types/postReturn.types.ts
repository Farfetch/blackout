import type {
  Config,
  PostReturnItemData,
  ReturnOptionType,
} from '../../index.js';
import type { Return, ReturnPickupSchedule } from './return.types.js';

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

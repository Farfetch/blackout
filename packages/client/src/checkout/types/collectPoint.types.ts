import type { ClickAndCollect } from './checkoutOrder.types';
import type { StoreAddress } from '../../types/common/address.types';

export enum Weekday {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export type CollectPoint = {
  storeAddress: StoreAddress;
  clickAndCollect: ClickAndCollect;
  businessDays: {
    hours: {
      close: string;
      open: string;
    }[];
    weekday: Weekday;
  }[];
};

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
  clickAndCollect: {
    collectPointId: number;
    merchantLocationId: number;
  };
  businessDays: {
    hours: {
      close: string;
      open: string;
    }[];
    weekday: Weekday;
  }[];
};

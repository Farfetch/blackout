import type { FlatAddress } from '.';

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
  storeAddress: FlatAddress;
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

import type {
  LabelTracking,
  ShipmentTracking,
  ShipmentTrackings,
} from '@farfetch/blackout-client';

export type ShipmentTrackingsNormalized = Omit<ShipmentTrackings, 'entries'> & {
  entries: ShipmentTrackingNormalized[];
};

export type ShipmentTrackingNormalized = Omit<
  ShipmentTracking,
  'labelTrackings'
> & {
  labelTrackings: LabelTrackingEntity['trackingNumber'][];
};

export type LabelTrackingEntity = Omit<LabelTracking, 'courier'> & {
  courier: number;
};

export type CourierEntity = {
  id: number;
  name: string;
};

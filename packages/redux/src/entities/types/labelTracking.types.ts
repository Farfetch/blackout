import type {
  LabelTracking,
  ShipmentTracking,
  ShipmentTrackings,
} from '@farfetch/blackout-client';

export type TrackingsNormalized = Omit<ShipmentTrackings, 'entries'> & {
  entries: TrackingNormalized[];
};

export type TrackingNormalized = Omit<ShipmentTracking, 'labelTrackings'> & {
  labelTrackings: LabelTrackingEntity['trackingNumber'][];
};

export type LabelTrackingEntity = Omit<LabelTracking, 'courier'> & {
  courier: number;
};

export type CourierEntity = {
  id: number;
  name: string;
};

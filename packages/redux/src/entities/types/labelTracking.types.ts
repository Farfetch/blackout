import type {
  LabelTracking,
  Tracking,
  Trackings,
} from '@farfetch/blackout-client';

export type TrackingsNormalized = Omit<Trackings, 'entries'> & {
  entries: TrackingNormalized[];
};

export type TrackingNormalized = Omit<Tracking, 'labelTrackings'> & {
  labelTrackings: LabelTrackingEntity['trackingNumber'][];
};

export type LabelTrackingEntity = Omit<LabelTracking, 'courier'> & {
  courier: number;
};

export type CourierEntity = {
  id: number;
  name: string;
};

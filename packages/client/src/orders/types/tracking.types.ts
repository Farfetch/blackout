export type Trackings = {
  number: number;
  totalPages: number;
  totalItems: number;
  entries: Tracking[];
};

export type Tracking = {
  id: string;
  numberOfTrackings: number;
  parcels: number;
  pickupDate: string;
  deliveryDate: string;
  estimatedDeliveryDate: string;
  events: TrackingEvent[];
  labelTrackings: LabelTracking[];
};

export type TrackingEvent = {
  type: TrackingEventType[];
  description: string;
  date: string;
};

export enum TrackingEventType {
  None,
  Pickup,
  Delivered,
  DeliveryFault,
}

export type LabelTracking = {
  courier: {
    id: number;
    name: string;
  };
  trackingNumber: string;
  service: string;
  isEstimatedDeliveryDateTrusworthy: boolean;
  estimatedDeliveryDate: string;
  event: LabelTrackingEvent[];
};

export type LabelTrackingEvent = {
  code: string;
  date: string;
  description: string;
  location: string;
  signatory: string;
};

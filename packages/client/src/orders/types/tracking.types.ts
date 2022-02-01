export type Tracking = {
  number: number;
  totalPages: number;
  totalItems: number;
  entries: Entries[];
};

type Entries = {
  id: string;
  numberOfTrackings: number;
  parcels: number;
  pickupDate: string;
  deliveryDate: string;
  estimatedDeliveryDate: string;
  events: TrackingEvent[];
  labelTrackings: LabelTracking[];
};

type TrackingEvent = {
  type: TrackingEventType[];
  description: string;
  date: string;
};

enum TrackingEventType {
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

type LabelTrackingEvent = {
  code: string;
  date: string;
  description: string;
  location: string;
  signatory: string;
};

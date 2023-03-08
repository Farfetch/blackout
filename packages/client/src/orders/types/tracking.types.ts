import type { PagedResponse } from '../../types/index.js';

export type ShipmentTrackings = PagedResponse<ShipmentTracking>;

export type ShipmentTracking = {
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
  type: TrackingEventType;
  description: string;
  date: string;
};

export enum TrackingEventType {
  None = 'None',
  Pickup = 'Pickup',
  Delivered = 'Delivered',
  DeliveryFault = 'DeliveryFault',
  StationDelivered = 'StationDelivered',
  StationPickup = 'StationPickup',
  DeliveryAttemptFailed = 'DeliveryAttemptFailed',
  OutForDelivery = 'OutForDelivery',
  ArrivedAtDestinationCountry = 'ArrivedAtDestinationCountry',
  CustomsOut = 'CustomsOut',
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
  events: LabelTrackingEvent[];
};

export type LabelTrackingEvent = {
  code: string;
  date: string;
  description: string;
  location: string;
  signatory: string;
};

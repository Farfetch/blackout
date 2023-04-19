import type { PagedResponse } from '../../types/index.js';

export type ShipmentTrackings = PagedResponse<ShipmentTracking>;

export type ShipmentTracking = {
  id: string;
  numberOfTrackings: number;
  parcels: number;
  pickupDate: string;
  deliveryDate: string;
  estimatedDeliveryDate: string;
  events: ShipmentTrackingEvent[];
  labelTrackings: LabelTracking[];
};

export type ShipmentTrackingEvent = {
  type: ShipmentTrackingEventType;
  description: string;
  date: string;
};

export enum ShipmentTrackingEventType {
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
  events: LabelShipmentTrackingEvent[];
};

export type LabelShipmentTrackingEvent = {
  code: string;
  date: string;
  description: string;
  location: string;
  signatory: string;
};

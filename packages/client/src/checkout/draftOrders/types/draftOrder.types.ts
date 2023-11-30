import type {
  CheckoutOrderDeliveryBundle,
  DraftOrderItem,
} from '../../index.js';

import type { DraftOrderAddress, Metadata } from '../../../types/index.js';

export enum DraftOrderStatus {
  Created = 'Created',
  Canceled = 'Canceled',
  Completed = 'Completed',
}

export type DraftOrder = {
  id: string;
  customerId?: string;
  status: DraftOrderStatus;
  dateCreated: string;
  dateModified?: string;
  items?: DraftOrderItem[];
  paymentMethods?: string[];
  shippingAddress?: DraftOrderAddress;
  billingAddress?: DraftOrderAddress;
  deliveryBundles?: CheckoutOrderDeliveryBundle[];
  metadata?: Metadata;
};

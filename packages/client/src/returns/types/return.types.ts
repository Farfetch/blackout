import type { CategorisedAddress } from '../../types/common/address.types';
import type {
  Order,
  OrderItem,
  RefundPaymentType,
  ReturnOptionType,
} from '../../orders';
import type { ReturnItem } from './returnItem.types';
import type { User } from '../../users/authentication/types/user.types';

export enum ReturnReferenceName {
  ReturnNote = 'ReturnNote',
  ReturnCustomerRequestedAWB = 'ReturnCustomerRequestedAWB',
  ReturnLabelAWB = 'ReturnLabelAWB',
  DropOffLocationsPage = 'DropOffLocationsPage',
}

export enum ReturnStatus {
  Created = 'Created',
  AwaitingPickup = 'AwaitingPickup',
  InTransit = 'InTransit',
  Accepted = 'Accepted',
  PartialAccepted = 'PartialAccepted',
  Refused = 'Refused',
  Canceled = 'Canceled',
  NeedPickupSchedule = 'NeedPickupSchedule',
}

export enum ReturnStatusCode {
  WaitingExternalApproval = 'WaitingExternalApproval',
  Draft = 'Draft',
  Booked = 'Booked',
  AtPartnerLocation = 'AtPartnerLocation',
  InTransit = 'InTransit',
  ArrivedAtFinalLocation = 'ArrivedAtFinalLocation',
  Processing = 'Processing',
  Accepted = 'Accepted',
  PartiallyAccepted = 'PartiallyAccepted',
  Refused = 'Refused',
  Cancelled = 'Cancelled',
}

export type ReturnReference = {
  name: ReturnReferenceName;
  url: string;
};

export type ReturnPickupSchedule = {
  start: string;
  end: string;
};

export type ReturnRefundPreference = {
  paymentType: RefundPaymentType;
};

export type Return = {
  availableDates: string[];
  id: number;
  orderId: Order['id'];
  merchantId: OrderItem['merchantId'];
  userId: User['id'];
  type: ReturnOptionType;
  status: ReturnStatus;
  courier?: string;
  numberOfBoxes: number;
  numberOfItems: number;
  userPickupAddress?: CategorisedAddress;
  maximumDateForPickup?: string;
  pickupSchedule?: ReturnPickupSchedule;
  merchantLocationId?: string;
  items: ReturnItem[];
  createdDate: string;
  awbUrl?: string;
  invoiceUrl?: string;
  references?: ReturnReference[];
  refundPreference?: ReturnRefundPreference;
  returnStatus: {
    code: ReturnStatusCode;
  };
};

import type { CategorisedAddress } from '../../types/common/address.types';
import type { ReturnItem } from './returnItem.types';
import type { User } from '../../users/authentication/types/user.types';

export type Return = {
  availableDates: string[];
  id: number;
  orderId: string;
  merchantId: number;
  userId: User['id'];
  type: string;
  status: string;
  courier?: string;
  numberOfBoxes: number;
  numberOfItems: number;
  userPickupAddress?: CategorisedAddress;
  maximumDateForPickup: string;
  pickupSchedule?: {
    start: string;
    end: string;
  };
  merchantLocationId?: string;
  items: ReturnItem[];
  createdDate: string;
  awbUrl: string;
  invoiceUrl: string;
  references: {
    name: string;
    url: string;
  }[];
  refundPreference?: {
    paymentType: string;
  };
};

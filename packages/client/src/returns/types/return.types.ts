import type { ReturnItem } from './returnItem.types';

export type Return = {
  availableDates: string[];
  id: number;
  orderId: string;
  merchantId: number;
  userId: number;
  type: string;
  status: string;
  courier: string;
  numberOfBoxes: number;
  numberOfItems: number;
  userPickupAddress?: {
    id: string;
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    vatNumber: string;
    city: {
      id: number;
      name: string;
      stateId: number;
      countryId: number;
    };
    state: {
      id: number;
      code: string;
      name: string;
      countryId: number;
    };
    country: {
      id: number;
      name: string;
      nativeName: string;
      alpha2Code: string;
      alpha3Code: string;
      culture: string;
      currency: {
        id: number;
        name: string;
        isoCode: string;
        cultureCode: string;
      };
      region: string;
      subRegion: string;
      continentId: number;
    };
    zipCode: string;
    phone: string;
    neighbourhood: string;
    ddd: string;
    continent: {
      id: number;
      name: string;
      countries: [
        {
          id: string;
          value: string;
        },
      ];
    };
    addressType: string;
    identityDocument: string;
    customsClearanceCode: string;
    title: string;
    isCurrentShipping: boolean;
    isCurrentBilling: boolean;
    isCurrentPreferred: boolean;
    createdDate: string;
    updatedDate: string;
  };
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

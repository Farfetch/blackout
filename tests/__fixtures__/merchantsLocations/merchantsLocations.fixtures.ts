import { MerchantLocationWeekday } from '@farfetch/blackout-client';

export const mockMerchantLocationId = 1467;
export const mockMerchantLocationId1 = 1234;
export const mockDistance = 10;

export const mockQuery = {
  merchantIds: '1111|9359',
  merchantLocationIds: '2222|1467',
};

export const mockMerchantLocation = {
  address: {
    addressLine1: '23-27 South Molton Street',
    addressLine2: 'W1K 5RD',
    city: {
      countryId: 0,
      id: 0,
      name: 'London',
    },
    country: {
      alpha2Code: 'GB',
      alpha3Code: 'GBR',
      culture: 'en-GB',
      id: 215,
      name: 'United Kingdom',
      nativeName: 'United Kingdom',
      region: 'Europe',
      subRegion: 'string',
      regionId: 0,
      subfolder: 'string',
      continentId: 3,
    },
    firstName: 'Acme',
    id: '00000000-0000-0000-0000-000000000000',
    lastName: '',
    neighbourhood: 'string',
    phone: '+44 (0) 207 514 0031',
    vatNumber: '95489652',
    zipCode: 'W1K 5RD',
    customsClearanceCode: null,
  },
  businessDays: [
    {
      hours: [
        {
          close: '18:00:00',
          open: '7:30:00',
        },
      ],
      weekday: MerchantLocationWeekday.Monday,
    },
  ],
  id: mockMerchantLocationId,
  isCollectPoint: false,
  isReturnsInStoreAllowed: false,
  lat: '51.513357',
  lon: '-0.146409',
  merchantId: 9359,
  merchantName: 'ACME',
  sameDayDelivery: {
    cutOffTime: '00:00:00',
    isActive: false,
  },
  deliveryOptions: [
    {
      deliveryType: 4,
      startTime: '00:00:00',
      endTime: '00:00:00',
      isEnabled: false,
    },
  ],
};

export const mockState = {
  merchantsLocations: {
    error: 'error',
    isLoading: false,
  },
  entities: {
    merchantsLocations: {
      [mockMerchantLocationId]: mockMerchantLocation,
      [mockMerchantLocationId1]: {
        ...mockMerchantLocation,
        id: mockMerchantLocationId1,
      },
    },
  },
};

export const mockMerchantsLocationsNormalizedResponse = {
  entities: {
    merchantsLocations: {
      [mockMerchantLocationId]: mockMerchantLocation,
    },
  },
  result: [mockMerchantLocationId],
};

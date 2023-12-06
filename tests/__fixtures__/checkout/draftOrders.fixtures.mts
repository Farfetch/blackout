import {
  checkoutId,
  mockDeliveryBundlesResponse as deliveryBundles,
} from './index.mjs';
import { DraftOrderStatus } from '@farfetch/blackout-client';
import type { StoreState } from '@farfetch/blackout-redux';

export const customerId = '123';

export const draftOrderId = 'eb92d414-68de-496e-96db-a0c6582b74d4';
export const mockDraftOrdersQuery = {
  customerId,
};

export const mockDataDraftOrder = {
  orderId: checkoutId,
  customerId: customerId,
};

export const mockDraftOrderItemId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';

const draftOrdersAddress = {
  id: '00000000-0000-0000-0000-000000000000',
  addressLine1: 'Rua da Lionesa 446, G12',
  addressLine2: ' Teste',
  addressLine3: '',
  city: {
    id: 0,
    name: 'Leça do Balio',
    stateId: 0,
    countryId: 0,
  },
  country: {
    id: 165,
    name: 'Portugal',
    nativeName: 'Portugal',
    alpha2Code: 'PT',
    alpha3Code: 'PRT',
    culture: 'pt-PT',
    region: 'europe',
    subRegion: 'europe',
    continentId: 3,
  },
  ddd: 'string',
  firstName: 'test',
  lastName: 'tester',
  neighbourhood: 'string',
  phoneContact: {
    value: '121525125',
    countryCode: '165',
    countryCallingCode: '+351',
  },
  state: {
    id: 0,
    code: 'test',
    name: 'name',
    countryId: 0,
  },
  vatNumber: '1233432',
  zipCode: '4465-761',
};

export const mockDraftOrderResponse = {
  id: draftOrderId,
  customerId,
  status: DraftOrderStatus.Created,
  dateCreated: '2023-11-30T14:35:44.193Z',
  dateModified: '2023-11-30T14:35:44.193Z',
  items: [
    {
      id: mockDraftOrderItemId,
      productId: 10202,
      merchantId: 1233,
      variantId: 'te62hd-68de-496e-96db-a0c6582b5436',
      quantity: 2,
      customAttributes: 'string',
      productAggregatorId: 1232144,
      colors: [
        {
          color: {
            id: 12,
            name: 'blue',
          },
          tags: ['string'],
        },
      ],
    },
  ],
  paymentMethods: ['PayPal'],
  shippingAddress: draftOrdersAddress,
  billingAddress: draftOrdersAddress,
  deliveryBundles: deliveryBundles,
};
export const mockDraftOrdersResponse = [mockDraftOrderResponse];

export const mockDraftOrdersResponses = {
  entries: [mockDraftOrderResponse],
  pageSize: 0,
  pageNumber: 0,
  totalPages: 0,
  totalItems: 0,
};

export const mockFetchDraftOrderNormalizedPayload = {
  result: draftOrderId,
  entities: {
    draftOrders: {
      [draftOrderId]: mockDraftOrderResponse,
    },
  },
};

export const mockFetchDraftOrdersNormalizedPayload = {
  entities: {
    draftOrders: {
      [draftOrderId]: mockDraftOrderResponse,
    },
  },
  result: {
    entries: [draftOrderId],
    pageSize: 0,
    pageNumber: 0,
    totalPages: 0,
    totalItems: 0,
  },
};

export const draftOrderQuery = '?customerid=123';

export const mockDraftOrderState: StoreState = {
  entities: {
    ...mockFetchDraftOrdersNormalizedPayload.entities,
    ...mockFetchDraftOrderNormalizedPayload.entities,
  },
  draftOrders: {
    draftOrder: {
      [draftOrderId]: {
        isLoading: false,
        error: null,
      },
    },
    allDraftOrders: {
      [draftOrderQuery]: {
        result: {
          entries: [draftOrderId],
          pageSize: 0,
          pageNumber: 0,
          totalPages: 0,
          totalItems: 0,
        },
        isLoading: false,
        error: null,
      },
    },
    draftOrderCreations: {
      [checkoutId]: {
        isLoading: false,
        error: null,
      },
    },
    updateDraftOrder: {
      [draftOrderId]: {
        isLoading: false,
        error: null,
      },
    },
    removeDraftOrder: {
      [draftOrderId]: {
        isLoading: false,
        error: null,
      },
    },
  },
};

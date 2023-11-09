/**
 * Response payloads.
 */

export const returnId = 123456;
export const exchangeReturnItemId = '123456';
export const orderId = 'ABC123';
export const orderItemUuid = '25C0AF64-7D1A-40B2-BA58-155A4B0C6878';
export const exchangeFilterId = '25301c32-d738-4315-8e9c-d43d2b57f009';
export const exchangeId = 'a8cc5ea3-b0a9-4a02-bfaa-e522045ebc28"';
export const bookRequestId = 'a1c46d6c-c411-11ed-afa1-0242ac120002';

export const responses = {
  postExchangeBookRequest: {
    success: 201,
  },
  postExchangeFilter: {
    success: {
      id: exchangeFilterId,
      exchangeFilterItems: [
        {
          orderCode: orderId,
          orderItemUuid: orderItemUuid,
        },
      ],
      filters: [
        {
          criteria: 'ProductId',
          comparator: 'Equals',
          values: '18061196',
        },
        {
          criteria: 'Price',
          comparator: 'LessThanOrEqual',
          values: '1.0',
        },
      ],
    },
  },
  postExchange: {
    success: 201,
  },
  getExchange: {
    success: {
      id: exchangeId,
      status: 'Draft',
      exchangeOrder: {
        checkoutOrderId: '215058872',
        orderId: orderId,
        payment: {
          intentId: '09079122-328a-4bd1-9aff-cd9ad016de70',
        },
      },
      customer: {
        id: 83110367,
      },
      requestOrigin: {
        clientId: 10004152,
        requester: {
          type: 'Staff',
          id: 83110367,
          uuid: '5c06d1a3-c85f-4b78-9fc6-6fde1a018bea',
          email: null,
        },
      },
      overrides: null,
      exchangeGroups: [
        {
          exchangeReturnItems: [
            {
              id: '74da9bf1-5864-47b0-b058-e6f0df1e69e0',
              orderCode: orderId,
              orderItemUuid: orderItemUuid,
              returnId: null,
            },
          ],
          exchangeItems: [
            {
              id: '177d6a94-2fa0-4481-a0e5-69c57c220a25',
              product: {
                id: 18061196,
                uuid: '44a12a5e-25b0-4640-a98e-3a6ab4cb2d71',
                variantId: 'e1bd4075-2f19-4b8f-9bc5-25a8acf75864',
                merchantId: 13708,
              },
            },
          ],
          refundSimulation: {
            currency: 'EUR',
            amount: 1.0,
          },
        },
      ],
      createdDate: '2023-01-30T15:46:23.6727716+00:00',
      updatedDate: '2023-01-30T15:46:23.6727716+00:00',
    },
  },
  getExchangeBookRequest: {
    success: {
      id: bookRequestId,
      status: 'Success',
      faults: null,
      exchangeReturnAssociations: [
        {
          exchangeReturnItemId: exchangeReturnItemId,
          returnId: returnId,
        },
      ],
    },
  },
};

export const requestData = {
  postExchangeBookRequest: {
    exchangeReturnAssociations: [
      {
        exchangeReturnItemId: exchangeReturnItemId,
        returnId: returnId,
      },
    ],
  },
  postExchangeFilter: {
    exchangeFilterItems: [
      {
        orderCode: orderId,
        orderItemUuid: orderItemUuid,
      },
    ],
  },
  postExchangeFilterWithoutOrderItemUuid: {
    exchangeFilterItems: [
      {
        orderCode: orderId,
      },
    ],
  },
  postExchange: {
    exchangeGroups: [
      {
        exchangeReturnItems: [
          {
            orderCode: orderId,
            orderItemUuid: orderItemUuid,
          },
        ],
        exchangeItems: [
          {
            product: {
              id: 18061196,
              uuid: '44a12a5e-25b0-4640-a98e-3a6ab4cb2d71',
              variantId: 'E1BD4075-2F19-4B8F-9BC5-25A8ACF75864',
              merchantId: 13708,
            },
          },
        ],
      },
    ],
  },
};

export const expectedExchangeFiltersNormalizedPayload = {
  entities: {
    exchangeFilters: {
      [orderItemUuid]: {
        id: exchangeFilterId,
        exchangeFilterItems: [
          {
            orderCode: orderId,
            orderItemUuid: orderItemUuid,
          },
        ],
        filters: [
          {
            criteria: 'ProductId',
            comparator: 'Equals',
            values: '18061196',
          },
          {
            criteria: 'Price',
            comparator: 'LessThanOrEqual',
            values: '1.0',
          },
        ],
      },
    },
  },
  result: orderItemUuid,
};

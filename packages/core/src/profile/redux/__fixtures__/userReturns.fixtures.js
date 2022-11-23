export const mockGetUserReturnsResponse = {
  number: 1,
  totalPages: 1,
  totalItems: 1,
  entries: [
    {
      id: 50057759,
      orderId: 'YGG2Y8BK2',
      merchantId: 9134,
      userId: 30446182,
      type: 'CourierPickUp',
      status: 'InTransit',
      numberOfBoxes: 1,
      numberOfItems: 1,
      userPickupAddress: {
        firstName: 'Fabricio Baia',
        lastName: '',
        addressLine1: 'Rua Luciano da Silva Barros 213',
        addressLine2: '',
        addressLine3: null,
        vatNumber: '',
        city: {
          id: 0,
          name: 'Porto',
          stateId: null,
          countryId: 165,
        },
        state: null,
        country: {
          id: 165,
          name: 'Portugal',
          nativeName: null,
          alpha2Code: 'PT',
          alpha3Code: null,
          culture: null,
          currency: null,
          region: null,
          subRegion: null,
          continentId: 0,
        },
        zipCode: '4470-193',
        phone: '123456789.',
        neighbourhood: null,
        ddd: null,
        continent: null,
        addressType: 'Any',
      },
      maximumDateForPickup: '2022-06-24T23:59:58',
      pickupSchedule: {
        start: '2022-06-06T14:00:00.443',
        end: '2022-06-06T17:00:00.443',
      },
      merchantLocationId: null,
      items: [
        {
          id: 1323,
          orderItemId: 2195153,
          reason: null,
          description: null,
          status: 'Created',
          itemStatus: {
            code: 'Open',
          },
        },
      ],
      createdDate: '2022-06-02T16:37:54.213',
      awbUrl: '/v1/returns/50057759/AWB',
      invoiceUrl: '/v1/returns/50057759/Invoice',
      references: [
        {
          name: 'ReturnCustomerRequestedAWB',
          url: '/v1/returns/50057759/ReturnCustomerRequestedAWB',
        },
        {
          name: 'ReturnNote',
          url: '/v1/returns/50057759/ReturnNote',
        },
      ],
      refundPreference: {
        paymentType: 'Default',
      },
      returnStatus: {
        code: 'InTransit',
      },
    },
  ],
};

import {
  RefundPaymentType,
  ReturnItemStatus,
  ReturnOptionType,
  ReturnReferenceName,
  ReturnStatus,
  ReturnStatusCode,
} from '@farfetch/blackout-client';
import type { UserReturns } from '@farfetch/blackout-client/src/users/returns/types/index.js';

export const mockUserReturnsResponse: UserReturns = {
  number: 1,
  totalPages: 1,
  totalItems: 1,
  entries: [
    {
      id: 50057759,
      orderId: 'YGG2Y8BK2',
      merchantId: 9134,
      userId: 30446182,
      type: ReturnOptionType.CourierDropOff,
      status: ReturnStatus.InTransit,
      numberOfBoxes: 1,
      numberOfItems: 1,
      userPickupAddress: {
        firstName: 'Fabricio Baia',
        lastName: '',
        addressLine1: 'Rua Luciano da Silva Barros 213',
        addressLine2: '',
        addressLine3: '',
        vatNumber: '',
        city: {
          id: 0,
          name: 'Porto',
          stateId: 123,
          countryId: 165,
        },
        country: {
          id: 165,
          name: 'Portugal',
          nativeName: null,
          alpha2Code: 'PT',
          alpha3Code: null,
          culture: null,
          region: null,
          subRegion: null,
          continentId: 0,
        },
        zipCode: '4470-193',
        phone: '123456789.',
        neighbourhood: null,
        ddd: null,
        continent: null,
      },
      maximumDateForPickup: '2022-06-24T23:59:58',
      pickupSchedule: {
        start: '2022-06-06T14:00:00.443',
        end: '2022-06-06T17:00:00.443',
      },
      merchantLocationId: '',
      items: [
        {
          id: 1323,
          orderItemId: 2195153,
          reason: "Item doesn't fit",
          description: 'Fits too big',
          status: ReturnItemStatus.Created,
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
          name: ReturnReferenceName.ReturnCustomerRequestedAWB,
          url: '/v1/returns/50057759/ReturnCustomerRequestedAWB',
        },
        {
          name: ReturnReferenceName.ReturnNote,
          url: '/v1/returns/50057759/ReturnNote',
        },
      ],
      refundPreference: {
        paymentType: RefundPaymentType.Default,
      },
      availableDates: ['1663156800000', '1663156900000', '1663157000000'],
      returnStatus: {
        code: ReturnStatusCode.InTransit,
      },
    },
  ],
};

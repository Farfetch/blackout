import {
  RefundPaymentType,
  ReturnItemStatus,
  ReturnOptionType,
  ReturnReferenceName,
  ReturnStatus,
  ReturnStatusCode,
} from '../../../packages/client/src';
import type { UserReturns } from '../../../packages/client/src/users/returns/types';

export const returnItemId = 2195153;
export const returnId = 50057759;

export const mockReturnItem = {
  id: 1323,
  orderItemId: returnItemId,
  reason: "Item doesn't fit",
  description: 'Fits too big',
  status: ReturnItemStatus.Created,
  itemStatus: {
    code: 'Open',
  },
};

export const mockReturn = {
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
  maximumDateForPickup: 1656111598000,
  pickupSchedule: {
    start: 1654520400443,
    end: 1654531200443,
  },
  merchantLocationId: '',
  items: [2195153],
  createdDate: 1654184274213,
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
  availableDates: [1654357074213, 1654443474213, 1654529874213],
  returnStatus: {
    code: ReturnStatusCode.InTransit,
  },
};

export const mockNormalizedUserReturnsResponse = {
  entities: {
    returnItems: {
      '2195153': {
        id: 1323,
        orderItemId: returnItemId,
        reason: "Item doesn't fit",
        description: 'Fits too big',
        status: ReturnItemStatus.Created,
        itemStatus: {
          code: 'Open',
        },
      },
    },
    returns: {
      '50057759': {
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
        maximumDateForPickup: 1656111598000,
        pickupSchedule: {
          start: 1654520400443,
          end: 1654531200443,
        },
        merchantLocationId: '',
        items: [2195153],
        createdDate: 1654184274213,
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
        availableDates: [1654357074213, 1654443474213, 1654529874213],
        returnStatus: {
          code: ReturnStatusCode.InTransit,
        },
      },
    },
  },
  result: { number: 1, totalPages: 1, totalItems: 1, entries: [50057759] },
};

export const mockDenormalizedUserReturnsResponse = {
  ...mockNormalizedUserReturnsResponse,
  result: {
    number: 1,
    totalPages: 1,
    totalItems: 1,
    entries: [
      {
        ...mockReturn,
        items: [
          mockNormalizedUserReturnsResponse.entities.returnItems[returnItemId],
        ],
      },
    ],
  },
};

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
      maximumDateForPickup: '2022-06-24T23:59:58+01:00',
      pickupSchedule: {
        start: '2022-06-06T14:00:00.443+01:00',
        end: '2022-06-06T17:00:00.443+01:00',
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
      createdDate: '2022-06-02T16:37:54.213+01:00',
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
      availableDates: [
        '2022-06-04T16:37:54.213+01:00',
        '2022-06-05T16:37:54.213+01:00',
        '2022-06-06T16:37:54.213+01:00',
      ],
      returnStatus: {
        code: ReturnStatusCode.InTransit,
      },
    },
  ],
};

export const expectedUserReturnsNormalizedPayload = {
  entities: {
    returns: { [returnId]: { ...mockReturn } },
    returnItems: { [returnItemId]: { ...mockReturnItem } },
  },
  result: { mockNormalizedUserReturnsResponse },
};

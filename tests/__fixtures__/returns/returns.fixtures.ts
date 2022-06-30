// @ts-nocheck
enum RescheduleStatus {
  InProgress,
  Succeeded,
  Failed,
}

export const id = 123456;
export const rescheduleRequestId = '1654321';
export const mockReturnId = '123456';
export const mockOrderId = '123456';

export const responses = {
  post: {
    success: {
      availableDates: [
        '2022-01-07T10:59:03.9169641Z',
        '2022-01-07T10:59:03.9169641Z',
        '2022-01-07T10:59:03.9169641Z',
        '2022-01-07T10:59:03.9169641Z',
        '2022-01-07T10:59:03.9169641Z',
        '2022-01-07T10:59:03.9169641Z',
      ],
      id: 25741579,
      orderId: '8HYCEV',
      merchantId: 11554,
      userId: 34113438,
      type: 'Courier',
      status: 'Accepted',
      courier: 'NotKnown',
      numberOfBoxes: 0,
      numberOfItems: 1,
      maximumDateForPickup: '2022-01-08T15:10:13.69Z',
      items: [
        {
          id: 32283248,
          orderItemId: 49427539,
          reason: "Item doesn't fit",
          description: 'Fits too big',
          status: 'Created',
        },
      ],
      createdDate: '2022-01-03T15:10:13.66Z',
      awbUrl: '/account/v1/returns/25741579/AWB',
      invoiceUrl: '/account/v1/returns/25741579/Invoice',
      references: [
        {
          name: 'ReturnNote',
          url: '/account/v1/returns/25741579/references/ReturnNote',
        },
      ],
    },
  },
  get: {
    success: {
      availableDates: [
        '2022-01-07T10:59:03.9169641Z',
        '2022-01-07T10:59:03.9169641Z',
        '2022-01-07T10:59:03.9169641Z',
        '2022-01-07T10:59:03.9169641Z',
        '2022-01-07T10:59:03.9169641Z',
        '2022-01-07T10:59:03.9169641Z',
      ],
      id: 25741579,
      orderId: '8HYCEV',
      merchantId: 11554,
      userId: 34113438,
      type: 'Courier',
      status: 'Accepted',
      courier: 'NotKnown',
      numberOfBoxes: 0,
      numberOfItems: 1,
      maximumDateForPickup: '2022-01-08T15:10:13.69Z',
      items: [
        {
          id: 32283248,
          orderItemId: 49427539,
          reason: "Item doesn't fit",
          description: 'Fits too big',
          status: 'Created',
        },
      ],
      createdDate: '2022-01-03T15:10:13.66Z',
      awbUrl: '/account/v1/returns/25741579/AWB',
      invoiceUrl: '/account/v1/returns/25741579/Invoice',
      references: [
        {
          name: 'ReturnNote',
          url: '/account/v1/returns/25741579/references/ReturnNote',
        },
      ],
    },
  },
  getReturnPickupCapabilities: {
    success: {
      availableTimeSlots: [
        {
          start: '/Date(1549987200000)/',
          end: '/Date(1549962000000)/',
        },
        {
          start: '/Date(1549987200000)/',
          end: '/Date(1549965600000)/',
        },
        {
          start: '/Date(1549987200000)/',
          end: '/Date(1549969200000)/',
        },
        {
          start: '/Date(1549987200000)/',
          end: '/Date(1549972800000)/',
        },
        {
          start: '/Date(1549987200000)/',
          end: '/Date(1549976400000)/',
        },
      ],
    },
  },
  getPickupCapabilities: {
    success: {
      availableTimeSlots: [
        {
          start: '/Date(1549987200000)/',
          end: '/Date(1549962000000)/',
        },
        {
          start: '/Date(1549987200000)/',
          end: '/Date(1549965600000)/',
        },
        {
          start: '/Date(1549987200000)/',
          end: '/Date(1549969200000)/',
        },
        {
          start: '/Date(1549987200000)/',
          end: '/Date(1549972800000)/',
        },
        {
          start: '/Date(1549987200000)/',
          end: '/Date(1549976400000)/',
        },
      ],
    },
  },
  getReturnsFromOrder: {
    get: {
      success: [
        {
          availableDates: [
            '2022-01-07T10:59:03.9169641Z',
            '2022-01-07T10:59:03.9169641Z',
            '2022-01-07T10:59:03.9169641Z',
            '2022-01-07T10:59:03.9169641Z',
            '2022-01-07T10:59:03.9169641Z',
            '2022-01-07T10:59:03.9169641Z',
          ],
          id: 25741579,
          orderId: '8HYCEV',
          merchantId: 11554,
          userId: 34113438,
          type: 'Courier',
          status: 'Accepted',
          courier: 'NotKnown',
          numberOfBoxes: 0,
          numberOfItems: 1,
          maximumDateForPickup: '2022-01-08T15:10:13.69Z',
          items: [
            {
              id: 32283248,
              orderItemId: 49427539,
              reason: "Item doesn't fit",
              description: 'Fits too big',
              status: 'Created',
            },
          ],
          createdDate: '2022-01-03T15:10:13.66Z',
          awbUrl: '/account/v1/returns/25741579/AWB',
          invoiceUrl: '/account/v1/returns/25741579/Invoice',
          references: [
            {
              name: 'ReturnNote',
              url: '/account/v1/returns/25741579/references/ReturnNote',
            },
          ],
        },
      ],
    },
  },
  patch: {
    success: {
      redirectUrl:
        'https://obx05-whitelabel.fftech.info/pt/account/return/summary/?id=5926969',
    },
  },
  getReturnPickupRescheduleRequests: {
    success: [
      {
        id: 'string',
        timeWindow: {
          start: '2022-05-06T09:45:32.623Z',
          end: '2022-05-06T09:45:32.623Z',
        },
        status: RescheduleStatus.InProgress,
      },
    ],
  },
  getReturnPickupRescheduleRequest: {
    success: {
      id: 'string',
      timeWindow: {
        start: '2022-05-06T09:40:01.115Z',
        end: '2022-05-06T09:40:01.115Z',
      },
      status: RescheduleStatus.InProgress,
    },
  },
  postReturnPickupRescheduleRequests: {
    success: 202,
  },
};

export const orderId = responses.get.success.orderId;
export const returnId = responses.get.success.id;
export const returnItemId = responses.get.success.items[0]?.orderItemId;
export const orderItemId = responses.get.success.items[0]?.orderItemId;
export const returnsNormalizedPayload = {
  entities: {
    returnItems: {
      [orderItemId]: {
        id: 32283248,
        orderItemId,
        reason: "Item doesn't fit",
        description: 'Fits too big',
        status: 'Created',
      },
    },
    returns: {
      [returnId]: {
        id: 25741579,
        orderId: '8HYCEV',
        merchantId: 11554,
        userId: 34113438,
        type: 'Courier',
        status: 'Accepted',
        courier: 'NotKnown',
        numberOfBoxes: 0,
        numberOfItems: 1,
        maximumDateForPickup: 1641654613690,
        items: [orderItemId],
        createdDate: 1641222613660,
        awbUrl: '/account/v1/returns/25741579/AWB',
        invoiceUrl: '/account/v1/returns/25741579/Invoice',
        references: [
          {
            name: 'ReturnNote',
            url: '/account/v1/returns/25741579/references/ReturnNote',
          },
        ],
      },
    },
  },
};

export const returnsFromOrderNormalizedPayload = {
  ...returnsNormalizedPayload,
  result: [returnId],
};

export const returnEntity = {
  id: returnId,
  orderId: '8VXRHN',
  merchantId: 10973,
  userId: 29511627,
  items: [returnItemId],
};

export const returnItem = {
  id: returnItemId,
  orderItemId: 333,
  reason: 'Item does not fit',
};

export const mockState = {
  returns: {
    error: 'error: not loaded',
    id: returnId,
    isLoading: false,
    returns: {
      error: 'error: not loaded',
      isLoading: false,
    },
    references: {
      error: 'error: not loaded',
      isLoading: false,
    },
    pickupCapabilities: {
      error: 'error: not loaded',
      isLoading: false,
    },
  },
  entities: {
    returnItems: { [returnItemId]: returnItem },
    returns: { [returnId]: returnEntity },
    availableTimeSlots: [
      {
        start: '2022-01-07T10:59:03.9169641Z',
        end: '2022-01-07T10:59:03.9169641Z',
      },
    ],
  },
};

export const mockPatchData = {
  start: '2022-01-07T10:59:03.9169641Z',
  end: '2022-01-07T10:59:03.9169641Z',
};

export const mockPostData = {
  availableDates: [
    '2022-01-07T10:59:03.9169641Z',
    '2022-01-07T10:59:03.9169641Z',
    '2022-01-07T10:59:03.9169641Z',
    '2022-01-07T10:59:03.9169641Z',
    '2022-01-07T10:59:03.9169641Z',
    '2022-01-07T10:59:03.9169641Z',
  ],
  id: 25741579,
  orderId: '8HYCEV',
  merchantId: 11554,
  userId: 34113438,
  type: 'Courier',
  status: 'Accepted',
  courier: 'NotKnown',
  numberOfBoxes: 0,
  numberOfItems: 1,
  maximumDateForPickup: '2022-01-08T15:10:13.69Z',
  items: [
    {
      id: 32283248,
      orderItemId: 49427539,
      reason: "Item doesn't fit",
      description: 'Fits too big',
      status: 'Created',
    },
  ],
  createdDate: '2022-01-03T15:10:13.66Z',
  awbUrl: '/account/v1/returns/25741579/AWB',
  invoiceUrl: '/account/v1/returns/25741579/Invoice',
  references: [
    {
      name: 'ReturnNote',
      url: '/account/v1/returns/25741579/references/ReturnNote',
    },
  ],
};

export const mockPickupCapabilitiesResponse = {
  availableTimeSlots: [
    {
      start: '2022-01-07T10:59:03.9169641Z',
      end: '2022-01-07T10:59:03.9169641Z',
    },
  ],
};

export const mockPickupReschedulePostData = {
  id: '',
  timeWindow: {
    start: '',
    end: '',
  },
  status: RescheduleStatus.InProgress,
};

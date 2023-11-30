import type { PostDraftOrdersResponse } from '@farfetch/blackout-client';

export const mockDraftOrders: PostDraftOrdersResponse = {
  id: 'eb92d414-68de-496e-96db-a0c6582b74d4',
  customerId: 'string',
  status: 'Created',
  dateCreated: '2023-11-30T17:25:32.156Z',
  dateModified: '2023-11-30T17:25:32.156Z',
  items: [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      productId: 0,
      merchantId: 0,
      variantId: 'eb92d414-68de-496e-96db-a0c6582b74d4',
      quantity: 0,
      customAttributes: 'string',
      productAggregatorId: 0,
      colors: [
        {
          color: {
            id: 0,
            name: 'string',
          },
          tags: ['string'],
        },
      ],
      metadata: {
        additionalProp1: {
          metadata: {
            someKey: 'someValue',
            anotherKey: 'anotherValue',
          },
        },
        additionalProp2: {
          metadata: {
            someKey: 'someValue',
            anotherKey: 'anotherValue',
          },
        },
        additionalProp3: {
          metadata: {
            someKey: 'someValue',
            anotherKey: 'anotherValue',
          },
        },
      },
    },
  ],
  paymentMethods: ['string'],
  shippingAddress: {
    id: 'string',
    addressLine1: 'string',
    addressLine2: 'string',
    addressLine3: 'string',
    city: {
      id: 0,
      name: 'string',
      stateId: 0,
      countryId: 0,
    },
    country: {
      id: 0,
      name: 'string',
      nativeName: 'string',
      alpha2Code: 'string',
      alpha3Code: 'string',
      culture: 'string',
      region: 'string',
      subRegion: 'string',
      continentId: 0,
    },
    ddd: 'string',
    firstName: 'string',
    lastName: 'string',
    neighbourhood: 'string',
    phoneContact: {
      value: 'string',
      countryCode: 'string',
      countryCallingCode: 'string',
    },
    state: {
      id: 0,
      code: 'string',
      name: 'string',
      countryId: 0,
    },
    vatNumber: 'string',
    zipCode: 'string',
  },
  billingAddress: {
    id: 'string',
    addressLine1: 'string',
    addressLine2: 'string',
    addressLine3: 'string',
    city: {
      id: 0,
      name: 'string',
      stateId: 0,
      countryId: 0,
    },
    country: {
      id: 0,
      name: 'string',
      nativeName: 'string',
      alpha2Code: 'string',
      alpha3Code: 'string',
      culture: 'string',
      region: 'string',
      subRegion: 'string',
      continentId: 0,
    },
    ddd: 'string',
    firstName: 'string',
    lastName: 'string',
    neighbourhood: 'string',
    phoneContact: {
      value: 'string',
      countryCode: 'string',
      countryCallingCode: 'string',
    },
    state: {
      id: 0,
      code: 'string',
      name: 'string',
      countryId: 0,
    },
    vatNumber: 'string',
    zipCode: 'string',
  },
  deliveryBundles: [
    {
      id: 'string',
      name: 'string',
      isSelected: true,
      price: 0,
      formattedPrice: 'string',
      finalPrice: 0,
      formattedFinalPrice: 'string',
      discount: 0,
      currency: 'string',
      rank: 0,
      itemsDeliveryOptions: [
        {
          itemId: 0,
          name: 'string',
          tags: ['string'],
          deliveryWindow: {
            type: 'Nominated',
            min: '2023-11-30T17:25:32.156Z',
            max: '2023-11-30T17:25:32.156Z',
          },
        },
      ],
    },
  ],
  metadata: {
    additionalProp1: {
      metadata: {
        someKey: 'someValue',
        anotherKey: 'anotherValue',
      },
    },
    additionalProp2: {
      metadata: {
        someKey: 'someValue',
        anotherKey: 'anotherValue',
      },
    },
    additionalProp3: {
      metadata: {
        someKey: 'someValue',
        anotherKey: 'anotherValue',
      },
    },
  },
};

import {
  GenderCode,
  ProductVariantAttributeType,
  toBlackoutError,
} from '@farfetch/blackout-client';

export const closetId = '3455f70e-f756-4ad5-b8e3-46d32ac74def';
export const closetItemId = '654321';
export const mockProductImgQueryParam = '?c=2';

export const mockGetUserClosetItemsResponse = {
  number: 1,
  totalPages: 1,
  totalItems: 1,
  entries: [
    {
      id: closetItemId,
      orderId: 'ABC123',
      merchantId: 123,
      productId: 123,
      productName: 'product1',
      productDescription: 'description1',
      attributes: [
        {
          type: ProductVariantAttributeType.Size,
          value: '10',
          description: '',
        },
      ],
      images: {
        images: [
          {
            order: 1,
            size: '200',
            url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099951_200.jpg',
          },
          {
            order: 2,
            size: '200',
            url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099952_200.jpg',
          },
          {
            order: 3,
            size: '200',
            url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099953_200.jpg',
          },
          {
            order: 4,
            size: '200',
            url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099954_200.jpg',
          },
          {
            order: 5,
            size: '200',
            url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099955_200.jpg',
          },
        ],
        liveModel: {
          globalId: '00000000-0000-0000-0000-000000000000',
          id: 0,
          measurements: [],
          name: 'string',
        },
        liveModelId: 0,
        productSize: '26',
        tag: 'string',
      },
      categories: [
        {
          id: 0,
          name: 'string',
          parentId: 0,
          gender: GenderCode.Woman,
        },
      ],
      colors: [
        {
          color: {
            id: 112504,
            name: 'Red',
          },
          tags: ['MainColor'],
        },
      ],
      price: {
        priceExclTaxes: 0,
        priceInclTaxes: 0,
        priceInclTaxesWithoutDiscount: 0,
        discountExclTaxes: 0,
        discountInclTaxes: 0,
        discountRate: 0,
        taxesRate: 0,
        taxesValue: 0,
        tags: ['string'],
        formattedPrice: 'string',
        formattedPriceWithoutDiscount: 'string',
        formattedPriceWithoutCurrency: 'string',
        formattedPriceWithoutDiscountAndCurrency: 'string',
        taxType: 'string',
      },
      purchasePrice: {
        priceExclTaxes: 0,
        priceInclTaxes: 0,
        priceInclTaxesWithoutDiscount: 0,
        discountExclTaxes: 0,
        discountInclTaxes: 0,
        discountRate: 0,
        taxesRate: 0,
        taxesValue: 0,
        tags: ['string'],
        formattedPrice: 'string',
        formattedPriceWithoutDiscount: 'string',
        formattedPriceWithoutCurrency: 'string',
        formattedPriceWithoutDiscountAndCurrency: 'string',
        taxType: 'string',
      },
      brand: {
        description: 'Yves Saint Laurent Beauty',
        id: 45511224,
        name: 'Yves Saint Laurent Beauty',
        priceType: 0,
        isActive: true,
      },
      customAttributes: '',
      isAvailable: true,
      createdDate: '2023-08-17T11:52:35.941Z',
    },
  ],
};

export const getExpectedUserClosetItemsPayload = (
  productImgQueryParam = '',
) => {
  return {
    number: 1,
    totalPages: 1,
    totalItems: 1,
    entries: [
      {
        id: closetItemId,
        orderId: 'ABC123',
        merchantId: 123,
        productId: 123,
        productName: 'product1',
        productDescription: 'description1',
        attributes: [
          {
            type: ProductVariantAttributeType.Size,
            value: '10',
            description: '',
          },
        ],
        images: [
          {
            order: 1,
            size: '200',
            sources: {
              200: `https://cdn-images.farfetch.com/12/09/16/86/12091686_11099951_200.jpg${productImgQueryParam}`,
            },
            url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099951_200.jpg',
          },
          {
            order: 2,
            size: '200',
            sources: {
              200: `https://cdn-images.farfetch.com/12/09/16/86/12091686_11099952_200.jpg${productImgQueryParam}`,
            },
            url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099952_200.jpg',
          },
          {
            order: 3,
            size: '200',
            sources: {
              200: `https://cdn-images.farfetch.com/12/09/16/86/12091686_11099953_200.jpg${productImgQueryParam}`,
            },
            url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099953_200.jpg',
          },
          {
            order: 4,
            size: '200',
            sources: {
              200: `https://cdn-images.farfetch.com/12/09/16/86/12091686_11099954_200.jpg${productImgQueryParam}`,
            },
            url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099954_200.jpg',
          },
          {
            order: 5,
            size: '200',
            sources: {
              200: `https://cdn-images.farfetch.com/12/09/16/86/12091686_11099955_200.jpg${productImgQueryParam}`,
            },
            url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099955_200.jpg',
          },
        ],
        categories: [
          {
            id: 0,
            name: 'string',
            parentId: 0,
            gender: GenderCode.Woman,
          },
        ],
        colors: [
          {
            color: {
              id: 112504,
              name: 'Red',
            },
            tags: ['MainColor'],
          },
        ],
        price: {
          priceExclTaxes: 0,
          priceInclTaxes: 0,
          priceInclTaxesWithoutDiscount: 0,
          discountExclTaxes: 0,
          discountInclTaxes: 0,
          discountRate: 0,
          taxesRate: 0,
          taxesValue: 0,
          tags: ['string'],
          formattedPrice: 'string',
          formattedPriceWithoutDiscount: 'string',
          formattedPriceWithoutCurrency: 'string',
          formattedPriceWithoutDiscountAndCurrency: 'string',
          taxType: 'string',
        },
        purchasePrice: {
          priceExclTaxes: 0,
          priceInclTaxes: 0,
          priceInclTaxesWithoutDiscount: 0,
          discountExclTaxes: 0,
          discountInclTaxes: 0,
          discountRate: 0,
          taxesRate: 0,
          taxesValue: 0,
          tags: ['string'],
          formattedPrice: 'string',
          formattedPriceWithoutDiscount: 'string',
          formattedPriceWithoutCurrency: 'string',
          formattedPriceWithoutDiscountAndCurrency: 'string',
          taxType: 'string',
        },
        brand: {
          description: 'Yves Saint Laurent Beauty',
          id: 45511224,
          name: 'Yves Saint Laurent Beauty',
          priceType: 0,
          isActive: true,
        },
        customAttributes: '',
        isAvailable: true,
        createdDate: '2023-08-17T11:52:35.941Z',
      },
    ],
  };
};

export const mockGetUserClosetsResponse = [
  {
    id: closetId,
    createdDate: '2023-08-17T11:52:35.941Z',
    totalItems: 1,
  },
];

export const mockState = {
  closets: {
    error: toBlackoutError(new Error('error')),
    isLoading: false,
    result: mockGetUserClosetsResponse,
    closetItems: {
      error: toBlackoutError(new Error('error')),
      isLoading: false,
      result: getExpectedUserClosetItemsPayload(mockProductImgQueryParam),
    },
  },
};

import { adaptProductSizes } from '@farfetch/blackout-redux/src/helpers/adapters';
import {
  AttributeType,
  BagItem,
  PurchaseChannel,
} from '@farfetch/blackout-client';
import { mockMerchantId, mockProductId } from '../products/ids.fixtures';
import { mockPriceAdaptedEmpty } from '../products/price.fixtures';
import { mockProductEntityDenormalized } from '../products/products.fixtures';

export const mockBagItemId = 134;
export const mockProductAggregatorId = 321;

export const mockBagItem: BagItem = {
  attributes: [{ type: 1, value: 'M', description: 'Size' }],
  brandId: 25354,
  brandName: 'Ralph Lauren',
  categories: [
    {
      gender: 0,
      id: 136301,
      name: 'Shoes',
      parentId: 0,
    },
    {
      gender: 0,
      id: 136308,
      name: 'Sandals',
      parentId: 136301,
    },
  ],
  colors: [
    {
      color: {
        id: 112495,
        name: 'Black',
      },
      tags: ['MainColor'],
    },
    {
      color: {
        id: 0,
        name: 'BLACK',
      },
      tags: ['DesignerColor'],
    },
  ],
  customAttributes: '',
  dateCreated: '/Date(12345)/',
  fulfillmentInfo: {
    fulfillmentDate: null,
    isPreOrder: false,
  },
  gender: 1,
  id: mockBagItemId,
  images: {
    images: [
      {
        order: 1,
        size: '54',
        url: 'https://cdn-images.farfetch.com/12/91/31/72/12913172_13206150_54.jpg',
      },
    ],
    liveModel: null,
    liveModelId: 0,
    productSize: '1',
    tag: null,
  },
  isCustomizable: false,
  isExclusive: false,
  labels: [],
  merchantId: mockMerchantId,
  merchantName: 'STORE OF THE FUTURE LISBON BOUTIQUE',
  variants: [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      attributes: [
        {
          type: AttributeType.Size,
          value: 'string',
          description: 'string',
        },
      ],
      availableAt: [0],
      merchantId: 0,
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
      formattedPrice: 'string',
      formattedPriceWithoutDiscount: 'string',
      purchaseChannel: PurchaseChannel.AddToBag,
      quantity: 5,
      size: 'string',
      scale: 'string',
      scaleAbbreviation: 'string',
      sizeDescription: 'string',
      isOneSize: true,
    },
  ],
  merchantShoppingUrl: null,
  price: {
    discountExclTaxes: 0,
    discountInclTaxes: 0,
    discountRate: 0,
    formattedPrice: '$265,597.00',
    formattedPriceWithoutCurrency: '265597.00',
    formattedPriceWithoutDiscount: '$265,597.00',
    formattedPriceWithoutDiscountAndCurrency: '265597.00',
    priceExclTaxes: 185442.9802,
    priceInclTaxes: 265596.9995,
    priceInclTaxesWithoutDiscount: 265596.9995,
    tags: ['DDP'],
    taxType: 'DDP',
    taxesRate: 43.223,
    taxesValue: 80154.0193,
  },
  productAggregator: null,
  productDescription: 'Classic oxford shirt',
  productId: mockProductId,
  productName: 'Oxford Shirt',
  productSlug: 'oxford-shirt-11766695',
  promotionDetail: {
    formattedTotalDiscountValue: '0 €',
    isProductOffer: false,
    totalDiscountPercentage: null,
    totalDiscountValue: 0,
    promotionEvaluationItemId: null,
  },
  type: 0,
  quantity: 5,
  isAvailable: true,
  sizes: [
    {
      sizeId: '23',
      sizeDescription: '36',
      scale: '117',
      scaleAbbreviation: 'IT',
      isOneSize: false,
      variants: [
        {
          merchantId: 11554,
          formattedPrice: '4 300 €',
          formattedPriceWithoutDiscount: '4 300 €',
          quantity: 2,
          barcodes: ['2013323497172'],
          priceInclTaxes: 4300,
          priceInclTaxesWithoutDiscount: 4300,
        },
      ],
    },
  ],
};

export const mockBagItemEntity = {
  // Since a lot of properties are ommited for the BagItemEntity type,
  // we didn't spread the properties from the original mockBagItem (...mockBagItem)
  attributes: mockBagItem.attributes,
  fulfillmentInfo: mockBagItem.fulfillmentInfo,
  isCustomizable: mockBagItem.isCustomizable,
  isExclusive: mockBagItem.isExclusive,
  productAggregator: mockBagItem.productAggregator,
  promotionDetail: mockBagItem.promotionDetail,
  quantity: mockBagItem.quantity,
  sizes: mockBagItem.sizes,
  isAvailable: mockBagItem.isAvailable,
  gender: mockBagItem.gender,
  // BagItemEntity new properties
  customAttributes: '',
  dateCreated: 1643041075470,
  id: mockBagItemId,
  merchant: mockMerchantId,
  price: {
    ...mockPriceAdaptedEmpty,
    discount: {
      excludingTaxes: 0,
      includingTaxes: 0,
      rate: 0,
    },
    excludingTaxes: 81.3,
    formatted: {
      includingTaxes: '100,00 €',
      includingTaxesWithoutDiscount: '100,00 €',
    },
    includingTaxes: 100,
    includingTaxesWithoutDiscount: 100,
    taxes: {
      amount: 18.7,
      rate: 23,
      type: 'VAT',
    },
    isFormatted: true,
  },
  product: mockProductId,
  size: adaptProductSizes(mockBagItem!.sizes, mockBagItem!.variants)![0]!,
};

export const mockBagItemHydrated = {
  ...mockBagItemEntity,
  product: mockProductEntityDenormalized,
};

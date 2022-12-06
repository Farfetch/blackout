import { toBlackoutError } from '@farfetch/blackout-client';
import type {
  BrandEntity,
  CategoryEntity,
  ProductEntity,
  StoreState,
  WishlistItemEntity,
  WishlistSetEntity,
} from '@farfetch/blackout-redux';

const productId = 4544564654;
const wishListItemId = 4568785454;
const brandId = 6326412;
const categoryId = 135967;
const userId = 135967;
const wishlistId = '8ea6dba4-ca23-4daa-9f0f-d34ba3d91634';
export const wishlistSetId = '50408d1f-8541-49a6-be2e-64c3c267e237';
const wishlistSetName = 'This is a set';
const wishlistSetDescription = 'This is a set description';

const categoryEntity: CategoryEntity = {
  id: categoryId,
  name: 'dress',
  gender: 0,
  parentId: 0,
};

const brandEntity: BrandEntity = {
  id: brandId,
  description: 'Gucci',
  name: 'Gucci',
};

// @ts-ignore ignore unused properties
const productEntity: ProductEntity = {
  brand: brandId,
  categories: [categoryId],
  colors: [
    {
      color: {
        id: 112504,
        name: 'Red',
      },
      tags: ['MainColor'],
    },
    {
      color: {
        id: 2323429,
        name: 'degrade vermelho',
      },
      tags: ['DesignerColor'],
    },
  ],
  description: 'Grey cotton patchwork trousers from 78 Stitches. ',
  id: productId,
  images: [],
  name: 'Cotton patchwork trousers ',
  price: {
    formatted: {
      includingTaxes: '$129.74',
      includingTaxesWithoutDiscount: '$129.74',
    },
    includingTaxes: 129.7446,
    includingTaxesWithoutDiscount: 129.7446,
    taxes: {
      type: 'VAT',
      rate: 0,
      amount: 0,
    },
    isFormatted: true,
  },
  sizes: [
    {
      globalQuantity: 9,
      id: 25,
      isOneSize: false,
      isOutOfStock: false,
      name: '30',
      scale: 125,
      scaleAbbreviation: 'WAIST',
      scaleDescription: 'Jeans (waist)',
      stock: [
        {
          merchantId: 9359,
          quantity: 9,
          purchaseChannel: 0,
          barcodes: [],
          price: {
            formatted: {
              includingTaxes: '$129.74',
              includingTaxesWithoutDiscount: '$129.74',
            },
          },
        },
      ],
    },
    {
      globalQuantity: 15,
      id: 26,
      isOneSize: false,
      isOutOfStock: false,
      name: '31',
      scale: 125,
      scaleAbbreviation: 'WAIST',
      scaleDescription: 'Jeans (waist)',
      stock: [
        {
          merchantId: 9359,
          quantity: 9,
          purchaseChannel: 0,
          barcodes: [],
          price: {
            formatted: {
              includingTaxes: '$129.74',
              includingTaxesWithoutDiscount: '$129.74',
            },
          },
        },
      ],
    },
  ],
  slug: 'cotton-patchwork-trousers-12912485',
};

const wishListItemEntity: WishlistItemEntity = {
  dateCreated: 1562573174875,
  fulfillmentDate: null,
  createdByStaffMemberId: null,
  attributes: [],
  id: wishListItemId,
  isAvailable: true,
  isCustomizable: false,
  isExclusive: false,
  merchant: 9359,
  price: {
    discount: {
      rate: 0,
    },
    formatted: {
      includingTaxes: '$371.62',
      includingTaxesWithoutDiscount: '$371.62',
    },
    includingTaxes: 371.62,
    includingTaxesWithoutDiscount: 371.62,
    isFormatted: true,
    taxes: {
      type: 'VAT',
      rate: 0,
      amount: 0,
    },
  },
  quantity: 1,
  size: {
    scale: 125,
    id: 26,
    name: '31',
    scaleDescription: 'Jeans (waist)',
    scaleAbbreviation: 'WAIST',
    globalQuantity: 15,
  },
  product: productId,
};

const wishlistSetEntity: WishlistSetEntity = {
  id: wishlistSetId,
  name: wishlistSetName,
  description: wishlistSetDescription,
  dateCreated: '2020-04-06T15:59:17.377Z',
  wishlistSetItems: [
    {
      wishlistItemId: wishListItemId,
      dateCreated: '2020-04-13T15:27:45.081Z',
    },
  ],
};

const state: StoreState = {
  entities: {
    products: {
      [productId]: productEntity,
    },
    wishlistItems: {
      [wishListItemId]: wishListItemEntity,
    },
    wishlistSets: {
      [wishlistSetId]: wishlistSetEntity,
    },
    brands: {
      [brandId]: brandEntity,
    },
    categories: {
      [categoryId]: categoryEntity,
    },
  },
  wishlist: {
    error: toBlackoutError(new Error('error')),
    id: wishlistId,
    isLoading: false,
    result: {
      count: 1,
      id: wishlistId,
      items: [wishListItemId],
      userId: userId,
    },
    items: {
      ids: [wishListItemId],
      item: {
        error: {},
        isLoading: {},
      },
    },
    sets: {
      error: null,
      ids: null,
      isLoading: false,
      set: {
        error: {},
        isLoading: {},
      },
    },
  },
};

export const wishlistMockData = {
  state,
  productId,
  wishListItemId,
  categoryId,
  brandId,
  wishlistId,
};

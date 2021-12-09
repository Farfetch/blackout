import {
  trackTypes as analyticsTrackTypes,
  eventTypes,
  fromParameterTypes,
  interactionTypes,
  pageTypes,
} from '@farfetch/blackout-core/analytics';
import mockedPageData from '../__fixtures__/analyticsPageData.fixtures.json';

const validTrackEvents = {
  [eventTypes.PRODUCT_ADDED_TO_CART]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.PRODUCT_ADDED_TO_CART,
    properties: {
      from: fromParameterTypes.WISHLIST,
      cartId: 'skdjsidjsdkdj29j',
      id: '507f1f77bcf86cd799439011',
      sku: 'G-32',
      category: 'Clothing/Tops/T-shirts',
      name: 'Gareth McConnell Dreamscape T-Shirt',
      brand: 'Just A T-Shirt',
      variant: 'Black',
      size: 'L',
      discountValue: 6,
      price: 19,
      priceWithoutDiscount: 25,
      quantity: 1,
      currency: 'USD',
      list: 'my_wishlist',
      listId: 'd3618128-5aa9-4caa-a452-1dd1377a6190',
    },
    user: {
      id: 680968743,
      localId: '5acecae2-8ee4-47ff-968c-d9864a1c112d',
      traits: {
        name: 'foo',
        email: 'bar',
        isGuest: false,
      },
    },
  },

  [eventTypes.PRODUCT_UPDATED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.PRODUCT_UPDATED,
    properties: {
      from: fromParameterTypes.BAG,
      cartId: 'skdjsidjsdkdj29j',
      id: '507f1f77bcf86cd799439011',
      sku: 'G-32',
      category: 'Clothing/Tops/T-shirts',
      name: 'Gareth McConnell Dreamscape T-Shirt',
      brand: 'Just A T-Shirt',
      variant: 'Black',
      price: 18.99,
      currency: 'USD',
      colour: 'red',
      oldColour: 'black',
      size: 'L',
      oldSize: 'XL',
      quantity: 1,
      oldQuantity: 2,
    },
    user: {
      id: 680968743,
      localId: '5acecae2-8ee4-47ff-968c-d9864a1c112d',
      traits: {
        name: 'foo',
        email: 'bar',
        isGuest: false,
      },
    },
  },

  [eventTypes.PRODUCT_REMOVED_FROM_CART]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.PRODUCT_REMOVED_FROM_CART,
    properties: {
      from: fromParameterTypes.BAG,
      cartId: 'ksjdj92dj29dj92d2j',
      id: '507f1f77bcf86cd799439011',
      sku: 'G-32',
      category: 'Clothing/Tops/T-shirts',
      name: 'Gareth McConnell Dreamscape T-Shirt',
      list: 'Bag',
      listId: 'e0030b3c-b970-4496-bc72-f9a38d6270b1',
      brand: 'Just A T-Shirt',
      variant: 'Black',
      size: 'L',
      price: 19,
      priceWithoutDiscount: 25,
      discountValue: 6,
      quantity: 1,
      currency: 'USD',
      value: 19,
      position: 1,
    },
  },

  [eventTypes.PRODUCT_ADDED_TO_WISHLIST]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.PRODUCT_ADDED_TO_WISHLIST,
    properties: {
      from: fromParameterTypes.PLP,
      id: '507f1f77bcf86cd799439011',
      category: 'Clothing/Tops/T-shirts',
      name: 'Gareth McConnell Dreamscape T-Shirt',
      brand: 'Just A T-Shirt',
      variant: 'Black',
      discountValue: 6,
      price: 19,
      priceWithoutDiscount: 25,
      currency: 'USD',
      list: 'Woman shopping',
      listId: '/en-pt/shopping/woman',
      wishlist: 'my_wishlist',
      wishlistId: 'd3618128-5aa9-4caa-a452-1dd1377a6190',
    },
  },

  [eventTypes.PRODUCT_REMOVED_FROM_WISHLIST]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.PRODUCT_REMOVED_FROM_WISHLIST,
    properties: {
      from: fromParameterTypes.PLP,
      id: '507f1f77bcf86cd799439011',
      list: 'Woman shopping',
      listId: '/en-pt/shopping/woman',
      category: 'Clothing/Tops/T-shirts',
      name: 'Gareth McConnell Dreamscape T-Shirt',
      brand: 'Just A T-Shirt',
      variant: 'Black',
      price: 19,
      priceWithoutDiscount: 25,
      discountValue: 6,
      currency: 'USD',
      wishlist: 'my_wishlist',
      wishlistId: 'd3618128-5aa9-4caa-a452-1dd1377a6190',
    },
  },

  [eventTypes.PRODUCT_UPDATED_WISHLIST]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.PRODUCT_UPDATED_WISHLIST,
    properties: {
      from: fromParameterTypes.WISHLIST,
      id: '507f1f77bcf86cd799439011',
      category: 'Clothing/Tops/T-shirts',
      name: 'Gareth McConnell Dreamscape T-Shirt',
      brand: 'Just A T-Shirt',
      variant: 'Black',
      discountValue: 6,
      price: 19,
      priceWithoutDiscount: 25,
      currency: 'USD',
      list: 'my_wishlist',
      listId: 'd3618128-5aa9-4caa-a452-1dd1377a6190',
    },
  },

  [eventTypes.PRODUCT_CLICKED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.PRODUCT_CLICKED,
    properties: {
      from: fromParameterTypes.PLP,
      id: '507f1f77bcf86cd799439011',
      name: 'Gareth McConnell Dreamscape T-Shirt',
      position: 3,
      list: 'Woman shopping',
      listId: '/en-pt/shopping/woman',
      currency: 'GBP',
      discountValue: 6,
      price: 19,
      priceWithoutDiscount: 25,
    },
  },

  [eventTypes.PRODUCT_VIEWED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.PRODUCT_VIEWED,
    properties: {
      from: fromParameterTypes.PLP,
      id: '507f1f77bcf86cd799439011',
      sku: 'G-32',
      category: 'Clothing/Tops/T-shirts',
      name: 'Gareth McConnell Dreamscape T-Shirt',
      brand: 'Just A T-Shirt',
      variant: 'Black',
      list: 'Woman shopping',
      listId: '/en-pt/shopping/woman',
      discountValue: 6,
      price: 19,
      priceWithoutDiscount: 25,
      currency: 'USD',
      isOutOfStock: true,
    },
  },

  [eventTypes.PRODUCT_LIST_VIEWED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.PRODUCT_LIST_VIEWED,
    properties: {
      category: 'Clothing',
      list: 'Woman shopping',
      currency: 'USD',
      products: [
        {
          id: '507f1f77bcf86cd799439011',
          name: 'Gareth McConnell Dreamscape T-Shirt',
          position: 2,
          currency: 'USD',
          discountValue: 6,
          price: 19,
          priceWithoutDiscount: 25,
          list: 'Woman shopping',
          listId: '09a35590-bb62-4027-a630-5da04ec64fb5',
        },
        {
          id: '507f1f77bcf86cd799439012',
          name: 'Gareth McConnell Dreamscape T-Shirt',
          position: 3,
          currency: 'USD',
          discountValue: 6,
          price: 19,
          priceWithoutDiscount: 25,
          list: 'Woman shopping',
          listId: '09a35590-bb62-4027-a630-5da04ec64fb5',
        },
      ],
    },
  },

  [eventTypes.CHECKOUT_STARTED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.CHECKOUT_STARTED,
    properties: {
      orderId: '50314b8e9bcf000000000000',
      total: 24.64,
      shipping: 3.6,
      tax: 2.04,
      coupon: 'HARRODS2019',
      currency: 'USD',
      products: [
        {
          id: '507f1f77bcf86cd799439011',
          category: 'Clothing/Tops/T-shirts/',
          name: 'Gareth McConnell Dreamscape T-Shirt',
          brand: 'Just A T-Shirt',
          currency: 'USD',
          variant: 'Black',
          size: 'L',
          discountValue: 6,
          price: 19,
          priceWithoutDiscount: 25,
          quantity: 1,
        },
      ],
    },
  },

  [eventTypes.CHECKOUT_STEP_VIEWED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.CHECKOUT_STEP_VIEWED,
    properties: {
      orderId: '50314b8e9bcf000000000000',
      step: 1,
      currency: 'USD',
      products: [
        {
          id: '507f1f77bcf86cd799439011',
          category: 'Clothing/Tops/T-shirts/',
          name: 'Gareth McConnell Dreamscape T-Shirt',
          brand: 'Just A T-Shirt',
          variant: 'Black',
          size: 'L',
          discountValue: 6,
          price: 19,
          priceWithoutDiscount: 25,
          quantity: 1,
        },
      ],
    },
  },

  [eventTypes.PAYMENT_INFO_ADDED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.PAYMENT_INFO_ADDED,
    properties: {
      orderId: '50314b8e9bcf000000000000',
      total: 24.64,
      shipping: 3.6,
      tax: 2.04,
      coupon: 'HARRODS2019',
      paymentType: 'credit card',
      currency: 'USD',
      products: [
        {
          id: '507f1f77bcf86cd799439011',
          category: 'Clothing/Tops/T-shirts/',
          name: 'Gareth McConnell Dreamscape T-Shirt',
          brand: 'Just A T-Shirt',
          variant: 'Black',
          currency: 'USD',
          size: 'L',
          discountValue: 6,
          price: 19,
          priceWithoutDiscount: 25,
          quantity: 1,
        },
      ],
    },
  },

  [eventTypes.SHIPPING_INFO_ADDED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.SHIPPING_INFO_ADDED,
    properties: {
      orderId: '50314b8e9bcf000000000000',
      total: 24.64,
      shipping: 3.6,
      tax: 2.04,
      coupon: 'HARRODS2019',
      shippingTier: 'Next Day',
      currency: 'USD',
      products: [
        {
          id: '507f1f77bcf86cd799439011',
          category: 'Clothing/Tops/T-shirts/',
          name: 'Gareth McConnell Dreamscape T-Shirt',
          brand: 'Just A T-Shirt',
          variant: 'Black',
          currency: 'USD',
          size: 'L',
          discountValue: 6,
          price: 19,
          priceWithoutDiscount: 25,
          quantity: 1,
        },
      ],
    },
  },

  [eventTypes.SAME_BILLING_ADDRESS_SELECTED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.SAME_BILLING_ADDRESS_SELECTED,
    properties: {
      orderId: '50314b8e9bcf000000000000',
      total: 24.64,
      shipping: 3.6,
      tax: 2.04,
      coupon: 'HARRODS2019',
      shippingTier: 'Next Day',
      currency: 'USD',
      products: [
        {
          id: '507f1f77bcf86cd799439011',
          category: 'Clothing/Tops/T-shirts/',
          name: 'Gareth McConnell Dreamscape T-Shirt',
          brand: 'Just A T-Shirt',
          variant: 'Black',
          currency: 'USD',
          size: 'L',
          discountValue: 6,
          price: 19,
          priceWithoutDiscount: 25,
          quantity: 1,
        },
      ],
    },
  },

  [eventTypes.ADDRESS_INFO_ADDED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.ADDRESS_INFO_ADDED,
    properties: {
      orderId: '50314b8e9bcf000000000000',
      total: 24.64,
      shipping: 3.6,
      tax: 2.04,
      coupon: 'HARRODS2019',
      shippingTier: 'Next Day',
      currency: 'USD',
      products: [
        {
          id: '507f1f77bcf86cd799439011',
          category: 'Clothing/Tops/T-shirts/',
          name: 'Gareth McConnell Dreamscape T-Shirt',
          brand: 'Just A T-Shirt',
          variant: 'Black',
          currency: 'USD',
          size: 'L',
          discountValue: 6,
          price: 19,
          priceWithoutDiscount: 25,
          quantity: 1,
        },
      ],
    },
  },

  [eventTypes.SHIPPING_METHOD_ADDED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.SHIPPING_METHOD_ADDED,
    properties: {
      orderId: '50314b8e9bcf000000000000',
      total: 24.64,
      shipping: 3.6,
      tax: 2.04,
      coupon: 'HARRODS2019',
      shippingTier: 'Next Day',
      currency: 'USD',
      products: [
        {
          id: '507f1f77bcf86cd799439011',
          category: 'Clothing/Tops/T-shirts/',
          name: 'Gareth McConnell Dreamscape T-Shirt',
          brand: 'Just A T-Shirt',
          variant: 'Black',
          currency: 'USD',
          size: 'L',
          discountValue: 6,
          price: 19,
          priceWithoutDiscount: 25,
          quantity: 1,
        },
      ],
    },
  },

  [eventTypes.CHECKOUT_STEP_COMPLETED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.CHECKOUT_STEP_COMPLETED,
    properties: {
      orderId: '50314b8e9bcf000000000000',
      step: 1,
      option: 'DHL Ground',
    },
  },

  [eventTypes.ORDER_COMPLETED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.ORDER_COMPLETED,
    properties: {
      orderId: '50314b8e9bcf000000000000',
      total: 24.64,
      shipping: 3.6,
      tax: 2.04,
      coupon: 'HARRODS2019',
      currency: 'USD',
      products: [
        {
          id: '507f1f77bcf86cd799439011',
          category: 'Clothing/Tops/T-shirts/',
          name: 'Gareth McConnell Dreamscape T-Shirt',
          brand: 'Just A T-Shirt',
          currency: 'USD',
          variant: 'Black',
          size: 'L',
          discountValue: 6,
          price: 19,
          priceWithoutDiscount: 25,
          quantity: 1,
        },
      ],
    },
  },

  [eventTypes.ORDER_REFUNDED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.ORDER_REFUNDED,
    properties: {
      orderId: '50314b8e9bcf000000000000',
      total: 19,
      currency: 'USD',
      products: [
        {
          id: '507f1f77bcf86cd799439011',
          category: 'Clothing/Tops/T-shirts/',
          name: 'Gareth McConnell Dreamscape T-Shirt',
          brand: 'Just A T-Shirt',
          currency: 'USD',
          variant: 'Black',
          size: 'L',
          discountValue: 6,
          price: 19,
          priceWithoutDiscount: 25,
          quantity: 1,
        },
      ],
    },
  },

  [eventTypes.PLACE_ORDER_STARTED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.PLACE_ORDER_STARTED,
    properties: {
      orderId: '50314b8e9bcf000000000000',
      total: 24.64,
      shipping: 3.6,
      tax: 2.04,
      coupon: 'HARRODS2019',
      currency: 'USD',
      products: [
        {
          id: '507f1f77bcf86cd799439011',
          category: 'Clothing/Tops/T-shirts/',
          name: 'Gareth McConnell Dreamscape T-Shirt',
          brand: 'Just A T-Shirt',
          currency: 'USD',
          variant: 'Black',
          size: 'L',
          discountValue: 6,
          price: 19,
          priceWithoutDiscount: 25,
          quantity: 1,
        },
      ],
    },
  },

  [eventTypes.PROMOCODE_APPLIED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.PROMOCODE_APPLIED,
    properties: {
      orderId: '50314b8e9bcf000000000000',
      total: 24.64,
      shipping: 3.6,
      tax: 2.04,
      coupon: 'HARRODS2019',
      shippingTier: 'Next Day',
      currency: 'USD',
      products: [
        {
          id: '507f1f77bcf86cd799439011',
          category: 'Clothing/Tops/T-shirts/',
          name: 'Gareth McConnell Dreamscape T-Shirt',
          brand: 'Just A T-Shirt',
          variant: 'Black',
          currency: 'USD',
          size: 'L',
          discountValue: 6,
          price: 19,
          priceWithoutDiscount: 25,
          quantity: 1,
        },
      ],
    },
  },

  [eventTypes.CHECKOUT_ABANDONED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.CHECKOUT_ABANDONED,
    properties: {
      orderId: '50314b8e9bcf000000000000',
      total: 24.64,
      shipping: 3.6,
      tax: 2.04,
      coupon: 'HARRODS2019',
      currency: 'USD',
      products: [
        {
          id: '507f1f77bcf86cd799439011',
          category: 'Clothing/Tops/T-shirts/',
          name: 'Gareth McConnell Dreamscape T-Shirt',
          brand: 'Just A T-Shirt',
          currency: 'USD',
          variant: 'Black',
          size: 'L',
          discountValue: 6,
          price: 19,
          priceWithoutDiscount: 25,
          quantity: 1,
        },
      ],
    },
  },

  [eventTypes.LOGIN]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.LOGIN,
    properties: {
      method: 'Farfetch',
    },
  },

  [eventTypes.SIGNUP_FORM_COMPLETED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.SIGNUP_FORM_COMPLETED,
    properties: {
      method: 'Farfetch',
    },
  },

  [eventTypes.SELECT_CONTENT]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.SELECT_CONTENT,
    properties: {
      contentType: 'biz',
      id: 12312312,
    },
  },

  [pageTypes.SEARCH]: {
    ...mockedPageData,
    type: analyticsTrackTypes.PAGE,
    event: pageTypes.SEARCH,
    properties: {
      searchTerm: 'shoes',
    },
  },

  [pageTypes.BAG]: {
    ...mockedPageData,
    type: analyticsTrackTypes.PAGE,
    event: pageTypes.BAG,
    properties: {
      currency: 'USD',
      from: fromParameterTypes.BAG,
      list: 'Bag',
      listId: 'e0030b3c-b970-4496-bc72-f9a38d6270b1',
      products: [
        {
          id: '507f1f77bcf86cd799439011',
          category: 'Clothing/Tops/T-shirts/',
          name: 'Gareth McConnell Dreamscape T-Shirt',
          brand: 'Just A T-Shirt',
          variant: 'Black',
          size: 'L',
          discountValue: 6,
          price: 19,
          priceWithoutDiscount: 25,
          quantity: 1,
        },
      ],
    },
  },

  [pageTypes.WISHLIST]: {
    ...mockedPageData,
    type: analyticsTrackTypes.PAGE,
    event: pageTypes.WISHLIST,
    properties: {
      currency: 'USD',
      from: fromParameterTypes.WISHLIST,
      list: 'my_wishlist',
      listId: 'd3618128-5aa9-4caa-a452-1dd1377a6190',
      products: [
        {
          id: '507f1f77bcf86cd799439011',
          category: 'Clothing/Tops/T-shirts/',
          name: 'Gareth McConnell Dreamscape T-Shirt',
          brand: 'Just A T-Shirt',
          variant: 'Black',
          size: 'L',
          discountValue: 6,
          price: 19,
          priceWithoutDiscount: 25,
          quantity: 1,
        },
      ],
    },
  },

  [eventTypes.FILTERS_APPLIED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.FILTERS_APPLIED,
    properties: {
      filters: {
        brands: [2765, 4062],
        categories: [135973],
        colors: [1],
        discount: [0],
        gender: [0],
        price: [0, 1950],
        sizes: [16],
      },
    },
  },

  [eventTypes.FILTERS_CLEARED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.FILTERS_CLEARED,
    properties: {
      filters: {
        brands: [2765, 4062],
        categories: [135973],
        colors: [1],
        discount: [0],
        gender: [0],
        price: [0, 1950],
        sizes: [16],
      },
    },
  },

  [eventTypes.SORT_OPTION_CHANGED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.SORT_OPTION_CHANGED,
    properties: {
      sortOption: 'Price: Low to High',
    },
  },

  [eventTypes.CHECKOUT_STEP_EDITING]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.CHECKOUT_STEP_EDITING,
    properties: {
      step: 1,
    },
  },
  [eventTypes.SHARE]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.SHARE,
    properties: {
      method: 'Facebook',
      contentType: 'image',
      id: '123456',
    },
  },

  [eventTypes.CHANGE_SCALE_SIZE_GUIDE]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.CHANGE_SCALE_SIZE_GUIDE,
    properties: {
      total: 30.64,
      currency: 'USD',
      from: 'PDP',
      sizeScaleId: '20652',
      sizeScaleName: 'Adidas Men Shoes UK',
      products: [
        {
          id: '507f1f77bcf86cd799439011',
          category: 'Clothing/Tops/T-shirts/',
          name: 'Gareth McConnell Dreamscape T-Shirt',
          brand: 'Just A T-Shirt',
          currency: 'USD',
          variant: 'Black',
          size: 'L',
          price: 19,
          quantity: 1,
        },
      ],
    },
  },
  [eventTypes.INTERACT_CONTENT]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.INTERACT_CONTENT,
    properties: {
      interactionType: interactionTypes.CLICK,
      contentType: 'biz',
      someOtherProperty: 12312312,
    },
  },
};

const nonSupportedByDefaultTrackEvent = {
  type: analyticsTrackTypes.TRACK,
  event: eventTypes.PRODUCT_UPDATED_WISHLIST, // Non supported event by default
  properties: {
    cartId: 'skdjsidjsdkdj29j',
    id: '507f1f77bcf86cd799439011',
    sku: 'G-32',
    category: 'Clothing/Tops/T-shirts',
    name: 'Gareth McConnell Dreamscape T-Shirt',
    brand: 'Just A T-Shirt',
    variant: 'Black',
    size: 'L',
    price: 18.99,
    quantity: 1,
    currency: 'USD',
  },
};

const notValidTrackEvent = {
  type: analyticsTrackTypes.TRACK,
  event: eventTypes.PRODUCT_ADDED_TO_CART,
  properties: {
    from: fromParameterTypes.WISHLIST,
    cartId: 'skdjsidjsdkdj29j',
    id: '507f1f77bcf86cd799439011',
    sku: 'G-32',
    category: 'Clothing/Tops/T-shirts',
    name: 'Gareth McConnell Dreamscape T-Shirt',
    brand: 'Just A T-Shirt',
    variant: 'Black',
    list: 'my_wishlist',
    listId: 'd3618128-5aa9-4caa-a452-1dd1377a6190',
    size: 'L',
    price: -120, // negative price
    quantity: 1,
    currency: 'USD',
  },
};

export {
  validTrackEvents,
  nonSupportedByDefaultTrackEvent,
  notValidTrackEvent,
};

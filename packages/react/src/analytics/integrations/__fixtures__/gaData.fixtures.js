import {
  trackTypes as analyticsTrackTypes,
  eventTypes,
  fromParameterTypes,
  pageTypes,
} from '@farfetch/blackout-core/analytics';
import mockedPageData from '../__fixtures__/analyticsPageData.fixtures.json';

const validTrackEvents = {
  [eventTypes.PRODUCT_ADDED_TO_CART]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.PRODUCT_ADDED_TO_CART,
    properties: {
      from: fromParameterTypes.PDP,
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
      brand: 'Just A T-Shirt',
      variant: 'Black',
      size: 'L',
      price: 18.99,
      quantity: 1,
      currency: 'USD',
      value: 18.99,
      position: 1,
    },
  },

  [eventTypes.PRODUCT_ADDED_TO_WISHLIST]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.PRODUCT_ADDED_TO_WISHLIST,
    properties: {
      id: '507f1f77bcf86cd799439011',
      category: 'Clothing/Tops/T-shirts',
      name: 'Gareth McConnell Dreamscape T-Shirt',
      brand: 'Just A T-Shirt',
      variant: 'Black',
      price: 18.99,
      currency: 'USD',
      list: 'Woman shopping',
    },
  },

  [eventTypes.PRODUCT_REMOVED_FROM_WISHLIST]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.PRODUCT_REMOVED_FROM_WISHLIST,
    properties: {
      id: '507f1f77bcf86cd799439011',
      category: 'Clothing/Tops/T-shirts',
      name: 'Gareth McConnell Dreamscape T-Shirt',
      brand: 'Just A T-Shirt',
      variant: 'Black',
      price: 18.99,
      currency: 'USD',
      list: 'Woman shopping',
    },
  },

  [eventTypes.PRODUCT_UPDATED_WISHLIST]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.PRODUCT_UPDATED_WISHLIST,
    properties: {
      id: '507f1f77bcf86cd799439011',
      category: 'Clothing/Tops/T-shirts',
      name: 'Gareth McConnell Dreamscape T-Shirt',
      brand: 'Just A T-Shirt',
      variant: 'Black',
      price: 18.99,
      currency: 'USD',
      list: 'Woman shopping',
    },
  },

  [eventTypes.PRODUCT_CLICKED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.PRODUCT_CLICKED,
    properties: {
      id: '507f1f77bcf86cd799439011',
      name: 'Gareth McConnell Dreamscape T-Shirt',
      position: 3,
      list: 'Woman shopping',
      currency: 'GBP',
      price: 10,
    },
  },

  [eventTypes.PRODUCT_VIEWED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.PRODUCT_VIEWED,
    properties: {
      id: '507f1f77bcf86cd799439011',
      sku: 'G-32',
      category: 'Clothing/Tops/T-shirts',
      name: 'Gareth McConnell Dreamscape T-Shirt',
      brand: 'Just A T-Shirt',
      variant: 'Black',
      price: 18.99,
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
          price: 18.99,
          list: 'Woman shopping',
        },
        {
          id: '507f1f77bcf86cd799439012',
          name: 'Gareth McConnell Dreamscape T-Shirt',
          position: 3,
          currency: 'USD',
          price: 18.99,
          list: 'Woman shopping',
        },
      ],
    },
  },

  [eventTypes.CHECKOUT_STARTED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.CHECKOUT_STARTED,
    properties: {
      orderId: '50314b8e9bcf000000000000',
      total: 30.64,
      revenue: 25.0,
      shipping: 3.6,
      tax: 2.04,
      coupon: 'acme2019',
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
          price: 19,
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
          price: 19,
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
      total: 30.64,
      revenue: 25.0,
      shipping: 3.6,
      tax: 2.04,
      coupon: 'acme2019',
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
          price: 19,
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
      total: 30.64,
      revenue: 25.0,
      shipping: 3.6,
      tax: 2.04,
      coupon: 'acme2019',
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
          price: 19,
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
      total: 30.64,
      revenue: 25.0,
      shipping: 3.6,
      tax: 2.04,
      coupon: 'acme2019',
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
          price: 19,
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
      total: 30,
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
          price: 19,
          quantity: 1,
        },
      ],
    },
  },

  [eventTypes.LOGIN]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.LOGIN,
    properties: {
      method: 'Acme',
    },
  },

  [eventTypes.SIGNUP_FORM_COMPLETED]: {
    type: analyticsTrackTypes.TRACK,
    event: eventTypes.SIGNUP_FORM_COMPLETED,
    properties: {
      method: 'Acme',
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
      products: [
        {
          id: '507f1f77bcf86cd799439011',
          category: 'Clothing/Tops/T-shirts/',
          name: 'Gareth McConnell Dreamscape T-Shirt',
          brand: 'Just A T-Shirt',
          variant: 'Black',
          size: 'L',
          price: 19,
          quantity: 1,
        },
      ],
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
    cartId: 'skdjsidjsdkdj29j',
    id: '507f1f77bcf86cd799439011',
    sku: 'G-32',
    category: 'Clothing/Tops/T-shirts',
    name: 'Gareth McConnell Dreamscape T-Shirt',
    brand: 'Just A T-Shirt',
    variant: 'Black',
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

import {
  expectedCommonParameters,
  mockCommonData,
} from './commonData.fixtures';
import eventTypes from '../types/eventTypes';
import mockedPageData from './pageData.fixtures';
import platformTypes from '../types/platformTypes';
import trackTypes from '../types/trackTypes';

const trackMockData = {
  // Properties given from the browser - No need to pass them via `data.properties`
  consent: null,
  context: mockedPageData.context,
  properties: {
    products: [
      {
        id: 12345678,
        discountValue: 1,
        brand: 'designer name',
        category: 'shoes',
        priceWithoutDiscount: 1,
        sizeId: 1,
      },
    ],
    total: 100,
    shipping: 10,
  },
  platform: platformTypes.Web,
  timestamp: mockCommonData.timestamp,
  type: trackTypes.TRACK,
  user: {
    localId: mockCommonData.userLocalId,
    id: 4789996,
    traits: { gender: 0, isGuest: true, name: null, email: null },
  },
};

export const customTrackMockData = {
  [eventTypes.CHECKOUT_STEP_EDITING]: {
    checkoutOrderId: 12345678,
    orderId: 'ABC12',
    step: 2,
  },
  [eventTypes.SHARE]: {
    method: 'share_button_facebook',
    productId: 123,
  },
  [eventTypes.CHECKOUT_STARTED]: {
    currency: 'USD',
    orderId: 'ABC12',
    checkoutOrderId: 12345678,
    deliveryType: 'Standard/Standard',
    paymentType: 'credit',
    interactionType: 'click',
    step: 1,
    tax: 1.23,
    shippingTier: 'Next Day',
  },
  [eventTypes.CHECKOUT_ABANDONED]: {
    checkoutOrderId: 12345678,
    shipping: 10,
    step: 2,
    orderId: 'ABC12',
    deliveryType: 'Standard/Standard',
    paymentType: 'credit',
    interactionType: 'click',
    shippingTier: 'Next Day',
    tax: 1.24,
  },
  [eventTypes.PROMOCODE_APPLIED]: {
    coupon: 'PROMO_ABC',
    orderId: 'ABC12',
    checkoutOrderId: 12345678,
    errorMessage: 'No promocode available.',
  },
  [eventTypes.PLACE_ORDER_STARTED]: {
    orderId: 'ABC12',
    coupon: 'promo',
  },
  [eventTypes.ORDER_COMPLETED]: {
    orderId: 'ABC12',
  },
  [eventTypes.SIGNUP_NEWSLETTER]: {
    gender: ['0', '1'],
  },
  [eventTypes.ADDRESS_INFO_ADDED]: {
    step: '1',
    deliveryType: 'Standard/Standard',
    interactionType: 'click',
  },
  [eventTypes.PAYMENT_INFO_ADDED]: {
    step: '1',
    deliveryType: 'Standard/Standard',
    interactionType: 'click',
    paymentType: 'credit',
  },
  [eventTypes.SHIPPING_METHOD_ADDED]: {
    step: '2',
    deliveryType: 'Standard/Standard',
    interactionType: 'click',
    paymentType: 'credit',
  },
  [eventTypes.SHIPPING_INFO_ADDED]: {
    step: '2',
    deliveryType: 'Standard/Standard',
    interactionType: 'click',
    paymentType: 'credit',
  },
  [eventTypes.PRODUCT_REMOVED_FROM_CART]: {
    from: 'PDP',
    currency: 'EUR',
  },
  [eventTypes.PRODUCT_ADDED_TO_CART]: {
    from: 'PDP',
    currency: 'EUR',
  },
  [eventTypes.PRODUCT_ADDED_TO_WISHLIST]: {
    from: 'PDP',
    wishlistId: '4c040892-cc27-4294-99e3-524b14eddf33',
    currency: 'EUR',
  },
  [eventTypes.PRODUCT_REMOVED_FROM_WISHLIST]: {
    from: 'PDP',
    wishlistId: '4c040892-cc27-4294-99e3-524b14eddf33',
    currency: 'EUR',
  },
  [eventTypes.PRODUCT_CLICKED]: {
    from: 'PDP',
    id: 123,
  },
  [eventTypes.PRODUCT_UPDATED]: {
    from: 'PDP',
    id: 12345,
    colour: 'White',
    oldColour: 'Black',
    colourId: '1',
    oldColourId: '2',
    size: 'S',
    oldSize: 'M',
    sizeId: '10',
    oldSizeId: '11',
    oldSizeScaleId: '10',
    sizeScaleId: '12',
    quantity: 2,
    oldQuantity: 1,
  },
  [eventTypes.FILTERS_APPLIED]: {
    from: 'PLP',
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
  [eventTypes.FILTERS_CLEARED]: {
    from: 'PLP',
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
  [eventTypes.LOGIN]: {
    method: 'Tenant',
  },
  [eventTypes.SIGNUP_FORM_COMPLETED]: {
    method: 'Tenant',
  },
  [eventTypes.INTERACT_CONTENT]: {
    contentType: 'Navbar',
    interactionType: 'click',
    id: '123',
    state: 'expanded',
  },
  [eventTypes.SELECT_CONTENT]: {
    contentType: 'Navbar',
    interactionType: 'click',
    id: '123',
    productId: '12345',
  },
};

export const expectedTrackPayload = {
  clientId: trackMockData.context.clientId,
  tenantId: trackMockData.context.tenantId,
  correlationId: trackMockData.user.localId,
  customerId: 'g_4789996',
  event: 'PageAction',
  parameters: {
    ...expectedCommonParameters,
  },
};

export default trackMockData;

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
  context: {
    culture: 'en-US',
    library: { version: '0.86.0', name: '@farfetch/blackout-core/analytics' },
    web: mockedPageData.context.web,
    clientId: 26000,
    tenantId: 26000,
  },
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
    step: 2,
  },
  [eventTypes.SHARE]: {
    actionArea: 'share_button_facebook',
    productId: 123,
  },
  [eventTypes.CHECKOUT_STARTED]: {
    currency: 'USD',
  },
  [eventTypes.PROMOCODE_APPLIED]: {
    coupon: 'PROMO_ABC',
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

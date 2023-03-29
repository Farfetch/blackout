import { EventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventTypes.CHECKOUT_STEP_EDITING,
  properties: {
    checkoutOrderId: 12345678,
    orderId: '50314b8e9bcf000000000000',
    step: 1,
  },
};

export default fixtures;

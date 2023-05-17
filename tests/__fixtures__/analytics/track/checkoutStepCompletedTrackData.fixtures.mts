import { EventType } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventType.CheckoutStepCompleted,
  properties: {
    orderId: '50314b8e9bcf000000000000',
    step: 1,
    option: 'DHL Ground',
  },
};

export default fixtures;

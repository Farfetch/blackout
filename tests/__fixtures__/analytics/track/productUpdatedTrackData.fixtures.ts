import { eventTypes, fromParameterTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

const fixtures = {
  ...baseTrackData,
  event: eventTypes.PRODUCT_UPDATED,
  properties: {
    from: fromParameterTypes.BAG,
    id: '507f1f77bcf86cd799439011',
    name: 'Gareth McConnell Dreamscape T-Shirt',
    colour: 'red',
    oldColour: undefined,
    size: 'L',
    oldSize: undefined,
    quantity: 1,
    oldQuantity: undefined,
  },
};

export default fixtures;

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
    oldColour: 'black',
    colourId: '1',
    oldColourId: '2',
    size: 'L',
    oldSize: 'S',
    sizeId: '10',
    oldSizeId: '11',
    quantity: 1,
    oldQuantity: 2,
    oldSizeScaleId: '10',
    sizeScaleId: '12',
  },
};

export default fixtures;

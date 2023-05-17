import { EventType, FromParameterType } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventType.ProductUpdated,
  properties: {
    from: FromParameterType.Bag,
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
    position: 1,
    locationId: '123',
  },
};

export default fixtures;

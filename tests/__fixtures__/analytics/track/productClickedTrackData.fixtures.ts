import { eventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

export default {
  ...baseTrackData,
  event: eventTypes.PRODUCT_CLICKED,
  properties: {
    id: '507f1f77bcf86cd799439011',
    name: 'Gareth McConnell Dreamscape T-Shirt',
    position: 3,
    list: 'Woman shopping',
    currency: 'GBP',
    price: 10,
  },
};

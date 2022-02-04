import { eventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

export default {
  ...baseTrackData,
  event: eventTypes.CHANGE_SCALE_SIZE_GUIDE,
  properties: {
    id: '507f1f77bcf86cd799439011',
    name: 'Gareth McConnell Dreamscape T-Shirt',
    total: 30.64,
    currency: 'USD',
    from: 'PDP',
    sizeScaleId: '33232',
    sizeScaleName: 'Adidas men shoes',
  },
};

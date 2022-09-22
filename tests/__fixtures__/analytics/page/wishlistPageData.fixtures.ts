import { fromParameterTypes, pageTypes } from '@farfetch/blackout-analytics';
import basePageData from './basePageData.fixtures';

const fixtures = {
  ...basePageData,
  event: pageTypes.WISHLIST,
  properties: {
    currency: 'USD',
    from: fromParameterTypes.WISHLIST,
    wishlistId: 'd3618128-5aa9-4caa-a452-1dd1377a6190',
  },
};

export default fixtures;
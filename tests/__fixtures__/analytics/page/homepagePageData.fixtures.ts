import { pageTypes } from '@farfetch/blackout-analytics';
import basePageData from './basePageData.fixtures';

export default {
  ...basePageData,
  properties: {
    storeId: 123123,
    cenas: 123123,
    didYouMean: 1123123,
  },
  event: pageTypes.HOMEPAGE,
};

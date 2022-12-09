import { PageTypes } from '@farfetch/blackout-analytics';
import basePageData from './basePageData.fixtures';

const data = {
  ...basePageData,
  properties: {
    storeId: 123123,
    cenas: 123123,
    didYouMean: 1123123,
  },
  event: PageTypes.HOMEPAGE,
};

export default data;

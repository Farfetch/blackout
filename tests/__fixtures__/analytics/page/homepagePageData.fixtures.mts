import { PageType } from '@farfetch/blackout-analytics';
import basePageData from './basePageData.fixtures.mjs';

const data = {
  ...basePageData,
  properties: {
    storeId: 123123,
    cenas: 123123,
    didYouMean: 1123123,
  },
  event: PageType.Homepage,
};

export default data;

import { pageTypes } from '@farfetch/blackout-analytics';
import basePageData from './basePageData.fixtures';

export default {
  ...basePageData,
  properties: {
    searchTerm: 'shoes',
  },
  event: pageTypes.SEARCH,
};

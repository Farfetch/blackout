import { pageTypes } from '@farfetch/blackout-analytics';
import basePageData from './basePageData.fixtures';

const fixtures = {
  ...basePageData,
  properties: {
    searchQuery: 'shoes',
    currency: 'EUR',
    products: [{ id: '10000' }, { id: '20000' }],
  },
  event: pageTypes.SEARCH,
};

export default fixtures;

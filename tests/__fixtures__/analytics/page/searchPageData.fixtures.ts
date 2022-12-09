import { PageTypes } from '@farfetch/blackout-analytics';
import basePageData from './basePageData.fixtures';

const fixtures = {
  ...basePageData,
  properties: {
    searchQuery: 'shoes',
    currency: 'EUR',
    products: [{ id: '10000' }, { id: '20000' }],
  },
  event: PageTypes.SEARCH,
};

export default fixtures;

import { PageType } from '@farfetch/blackout-analytics';
import basePageData from './basePageData.fixtures.mjs';

const fixtures = {
  ...basePageData,
  properties: {
    searchQuery: 'shoes',
    currency: 'EUR',
    products: [{ id: '10000' }, { id: '20000' }],
    itemCount: 3,
  },
  event: PageType.Search,
};

export default fixtures;

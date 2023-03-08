import { expectedRecentlyViewedLocalPayload } from 'tests/__fixtures__/products/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import { productsActionTypes } from '../..//index.js';
import { saveRecentlyViewedProduct } from '..//index.js';
import reducer from '../../reducer/index.js';

const mockAction = { type: 'this_is_a_mock_action' };
const productId = expectedRecentlyViewedLocalPayload[0]?.productId as number;

const mockRecentlyViewedStore = (state = {}) =>
  mockStore(
    {
      recentlyViewed: reducer(undefined, mockAction),
    },
    state,
  );

describe('saveRecentlyViewedProduct() action creator', () => {
  let store: ReturnType<typeof mockRecentlyViewedStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockRecentlyViewedStore();
  });

  it('should create the correct action', async () => {
    saveRecentlyViewedProduct(productId)(store.dispatch);

    const actionResults = store.getActions();

    await expect(actionResults).toEqual([
      {
        type: productsActionTypes.SAVE_RECENTLY_VIEWED_PRODUCT,
        payload: [
          {
            productId,
            lastVisitDate: expect.any(String),
          },
        ],
      },
    ]);
  });
});

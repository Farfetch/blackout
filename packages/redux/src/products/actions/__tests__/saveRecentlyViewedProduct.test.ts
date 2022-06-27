import { expectedRecentlyViewedLocalPayload } from 'tests/__fixtures__/products';
import { mockStore } from '../../../../tests';
import { productsActionTypes } from '../../';
import { saveRecentlyViewedProduct } from '../';
import reducer from '../../reducer';

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
  const action = saveRecentlyViewedProduct();

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockRecentlyViewedStore();
  });

  it('should create the correct action', () => {
    action(productId)(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toEqual([
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

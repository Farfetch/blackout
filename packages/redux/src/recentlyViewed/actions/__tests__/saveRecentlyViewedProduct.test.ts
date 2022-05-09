import { actionTypes } from '../../';
import { expectedLocalPayload } from 'tests/__fixtures__/recentlyViewed';
import { mockStore } from '../../../../tests';
import { saveRecentlyViewedProduct } from '../';
import reducer from '../../reducer';

const mockAction = { type: 'this_is_a_mock_action' };
const productId = expectedLocalPayload[0]?.productId as number;

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
        type: actionTypes.SAVE_RECENTLY_VIEWED_PRODUCT,
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

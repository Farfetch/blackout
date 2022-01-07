import { actionTypes } from '../../';
import { expectedLocalPayload } from 'tests/__fixtures__/recentlyViewed';
import { mockStore } from 'redux/tests';
import { saveRecentlyViewedProduct } from '../';
import reducer, { INITIAL_STATE } from '../../reducer';

const mockAction = { type: 'this_is_a_mock_action' };

const mockRecentlyViewedStore = (state = {}) =>
  mockStore(
    {
      recentlyViewed: reducer(INITIAL_STATE, mockAction),
    },
    state,
  );

describe('saveRecentlyViewedProduct() action creator', () => {
  let store;
  const action = saveRecentlyViewedProduct();

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockRecentlyViewedStore();
  });

  it('should create the correct action', () => {
    store.dispatch(action(expectedLocalPayload[0].productId));

    const actionResults = store.getActions();

    expect(actionResults).toEqual([
      {
        type: actionTypes.SAVE_RECENTLY_VIEWED_PRODUCT,
        payload: [
          {
            productId: expectedLocalPayload[0].productId,
            lastVisitDate: expect.any(String),
          },
        ],
      },
    ]);
  });
});

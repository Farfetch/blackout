import { expectedLocalPayload } from 'tests/__fixtures__/recentlyViewed/getRecentlyViewed';
import { mockStore } from 'redux/tests';
import { saveRecentlyViewedProduct } from '../';
import reducer, { actionTypes } from '../../';

const mockRecentlyViewedStore = (state = {}) =>
  mockStore(
    {
      recentlyViewed: reducer(),
    },
    state,
  );

describe('saveRecentlyViewedProduct() action creator', () => {
  let store;
  const expectedConfig = undefined;
  const action = saveRecentlyViewedProduct();

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockRecentlyViewedStore();
  });

  it('should create the correct action', () => {
    store.dispatch(action(expectedLocalPayload[0].productId, expectedConfig));

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

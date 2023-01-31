import { doSaveRecentlyViewedProduct } from '../';
import { expectedLocalPayload } from '../../__mocks__/getRecentlyViewed';
import { mockStore } from '../../../../../tests';
import reducer, { actionTypes } from '../../';

const mockRecentlyViewedStore = (state = {}) =>
  mockStore(
    {
      recentlyViewed: reducer(),
    },
    state,
  );

describe('doSaveRecentlyViewedProduct() action creator', () => {
  let store;
  const expectedConfig = undefined;
  const action = doSaveRecentlyViewedProduct();

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

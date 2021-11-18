import { doDeleteRecentlyViewedProduct } from '..';
import { mockStore } from '../../../../../tests';
import reducer, { actionTypes } from '../..';

const mockRecentlyViewedStore = (state = {}) =>
  mockStore(
    {
      recentlyViewed: reducer(),
    },
    state,
  );

describe('doDeleteRecentlyViewedProduct() action creator', () => {
  let store;
  const expectedConfig = undefined;
  const deleteRecentlyViewed = jest.fn();
  const action = doDeleteRecentlyViewedProduct(deleteRecentlyViewed);
  const productId = 1234567;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockRecentlyViewedStore();
  });

  it('should create the correct actions for when a delete of a recently viewed product fails', async () => {
    const expectedError = new Error('get recently viewed products error');

    deleteRecentlyViewed.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(productId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(deleteRecentlyViewed).toHaveBeenCalledTimes(1);
      expect(deleteRecentlyViewed).toHaveBeenCalledWith(
        productId,
        expectedConfig,
      );

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { productId },
            type: actionTypes.DELETE_RECENTLY_VIEWED_PRODUCT_REQUEST,
          },
          {
            meta: { productId },
            payload: { error: expectedError },
            type: actionTypes.DELETE_RECENTLY_VIEWED_PRODUCT_FAILURE,
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the delete of a recently viewed product is successful', async () => {
    deleteRecentlyViewed.mockResolvedValueOnce();

    await store.dispatch(action(productId, expectedConfig));

    const actionResults = store.getActions();

    expect(deleteRecentlyViewed).toHaveBeenCalledTimes(1);
    expect(deleteRecentlyViewed).toHaveBeenCalledWith(
      productId,
      expectedConfig,
    );
    expect(actionResults).toEqual([
      {
        meta: { productId },
        type: actionTypes.DELETE_RECENTLY_VIEWED_PRODUCT_REQUEST,
      },
      {
        meta: { productId },
        type: actionTypes.DELETE_RECENTLY_VIEWED_PRODUCT_SUCCESS,
      },
    ]);
  });
});

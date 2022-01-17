import { actionTypes } from '../..';
import { deleteRecentlyViewedProduct } from '@farfetch/blackout-client/recentlyViewed';
import { mockStore } from '../../../../tests';
import { removeRecentlyViewedProduct } from '..';
import reducer from '../../reducer';

jest.mock('@farfetch/blackout-client/recentlyViewed', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-client/recentlyViewed'),
    deleteRecentlyViewedProduct: jest.fn(),
  };
});

const mockAction = { type: 'this_is_a_mock_action' };

const mockRecentlyViewedStore = (state = {}) =>
  mockStore(
    {
      recentlyViewed: reducer(undefined, mockAction),
    },
    state,
  );

describe('removeRecentlyViewedProduct() action creator', () => {
  let store;
  const expectedConfig = undefined;
  const productId = 1234567;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockRecentlyViewedStore();
  });

  it('should create the correct actions for when a delete of a recently viewed product fails', async () => {
    const expectedError = new Error('get recently viewed products error');

    deleteRecentlyViewedProduct.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(removeRecentlyViewedProduct(productId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(deleteRecentlyViewedProduct).toHaveBeenCalledTimes(1);
      expect(deleteRecentlyViewedProduct).toHaveBeenCalledWith(
        productId,
        expectedConfig,
      );

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { productId },
            type: actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_REQUEST,
          },
          {
            meta: { productId },
            payload: { error: expectedError },
            type: actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_FAILURE,
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the delete of a recently viewed product is successful', async () => {
    deleteRecentlyViewedProduct.mockResolvedValueOnce();

    await store.dispatch(
      removeRecentlyViewedProduct(productId, expectedConfig),
    );

    const actionResults = store.getActions();

    expect(deleteRecentlyViewedProduct).toHaveBeenCalledTimes(1);
    expect(deleteRecentlyViewedProduct).toHaveBeenCalledWith(
      productId,
      expectedConfig,
    );
    expect(actionResults).toEqual([
      {
        meta: { productId },
        type: actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_REQUEST,
      },
      {
        meta: { productId },
        type: actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_SUCCESS,
      },
    ]);
  });
});

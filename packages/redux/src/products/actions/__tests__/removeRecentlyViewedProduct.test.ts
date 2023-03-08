import { deleteRecentlyViewedProduct } from '@farfetch/blackout-client';
import { mockStore } from '../../../../tests/index.js';
import { productsActionTypes } from '../../index.js';
import { removeRecentlyViewedProduct } from '../index.js';
import reducer from '../../reducer/index.js';

jest.mock('@farfetch/blackout-client', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-client'),
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
  let store: ReturnType<typeof mockRecentlyViewedStore>;
  const expectedConfig = undefined;
  const productId = 1234567;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockRecentlyViewedStore();
  });

  it('should create the correct actions for when a delete of a recently viewed product fails', async () => {
    const expectedError = new Error('get recently viewed products error');

    (deleteRecentlyViewedProduct as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () => await removeRecentlyViewedProduct(productId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(deleteRecentlyViewedProduct).toHaveBeenCalledTimes(1);
    expect(deleteRecentlyViewedProduct).toHaveBeenCalledWith(
      productId,
      expectedConfig,
    );

    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          meta: { productId },
          type: productsActionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_REQUEST,
        },
        {
          meta: { productId },
          payload: { error: expectedError },
          type: productsActionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_FAILURE,
        },
      ]),
    );
  });

  it('should create the correct actions for when the delete of a recently viewed product is successful', async () => {
    (deleteRecentlyViewedProduct as jest.Mock).mockResolvedValueOnce({});

    await removeRecentlyViewedProduct(
      productId,
      expectedConfig,
    )(store.dispatch);

    const actionResults = store.getActions();

    expect(deleteRecentlyViewedProduct).toHaveBeenCalledTimes(1);
    expect(deleteRecentlyViewedProduct).toHaveBeenCalledWith(
      productId,
      expectedConfig,
    );
    expect(actionResults).toEqual([
      {
        meta: { productId },
        type: productsActionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_REQUEST,
      },
      {
        meta: { productId },
        type: productsActionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_SUCCESS,
      },
    ]);
  });
});

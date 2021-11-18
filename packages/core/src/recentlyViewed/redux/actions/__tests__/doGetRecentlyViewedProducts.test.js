import { doGetRecentlyViewedProducts } from '../';
import { expectedRemotePayload } from '../../__mocks__/getRecentlyViewed';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const mockRecentlyViewedStore = (state = {}) =>
  mockStore(
    {
      recentlyViewed: reducer(),
    },
    state,
  );

describe('doGetRecentlyViewedProducts() action creator', () => {
  let store;
  const expectedConfig = undefined;
  const getRecentlyViewedProducts = jest.fn();
  const action = doGetRecentlyViewedProducts(getRecentlyViewedProducts);
  const query = {
    page: 1,
    pageSize: 25,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockRecentlyViewedStore();
  });

  it('should create the correct actions for when the get recently viewed products fail', async () => {
    const expectedError = new Error('get recently viewed products error');

    getRecentlyViewedProducts.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getRecentlyViewedProducts).toHaveBeenCalledTimes(1);
      expect(getRecentlyViewedProducts).toHaveBeenCalledWith(
        query,
        expectedConfig,
      );

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.GET_RECENTLY_VIEWED_PRODUCTS_REQUEST,
          },
          {
            type: actionTypes.GET_RECENTLY_VIEWED_PRODUCTS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get recently viewed products procedure is successful', async () => {
    console.warn = jest.fn();

    getRecentlyViewedProducts.mockResolvedValueOnce(expectedRemotePayload);

    await store.dispatch(action(query, expectedConfig));

    const actionResults = store.getActions();

    expect(getRecentlyViewedProducts).toHaveBeenCalledTimes(1);
    expect(getRecentlyViewedProducts).toHaveBeenCalledWith(
      query,
      expectedConfig,
    );
    expect(actionResults).toEqual([
      {
        type: actionTypes.GET_RECENTLY_VIEWED_PRODUCTS_REQUEST,
      },
      {
        type: actionTypes.GET_RECENTLY_VIEWED_PRODUCTS_SUCCESS,
        payload: expectedRemotePayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_RECENTLY_VIEWED_PRODUCTS_SUCCESS,
      }),
    ).toMatchSnapshot('get recently viewed products success payload');

    store = mockRecentlyViewedStore({
      recentlyViewed: {
        result: {
          remote: [{ productId: 123123 }],
        },
      },
    });

    await store.dispatch(action(query, expectedConfig));

    expect(console.warn).toHaveBeenCalledWith(`
            @farfetch/blackout-core/recentlyViewed - Seems you are trying to fetch recently viewed products more than once.
            Please make sure you only request the products once, and use the "doSaveRecentlyViewedProduct" action to mark the product as viewed when a product page is visited.
            Keep in mind that "doSaveRecentlyViewedProduct" will only store locally the recently viewed product and will not persist it on the server. 
            For that, make sure you are using analytics with Omnitracking integration.
        `);
  });
});

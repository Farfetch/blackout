import { expectedRemotePayload } from 'tests/__fixtures__/recentlyViewed/getRecentlyViewed';
import { fetchRecentlyViewedProducts } from '../';
import { getRecentlyViewedProducts } from '@farfetch/blackout-client/recentlyViewed';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

jest.mock('@farfetch/blackout-client/recentlyViewed', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-client/recentlyViewed'),
    getRecentlyViewedProducts: jest.fn(),
  };
});

const mockRecentlyViewedStore = (state = {}) =>
  mockStore(
    {
      recentlyViewed: reducer(),
    },
    state,
  );

describe('fetchRecentlyViewedProducts() action creator', () => {
  let store;
  const expectedConfig = undefined;
  const query = {
    page: 1,
    pageSize: 25,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockRecentlyViewedStore();
  });

  it('should create the correct actions for when the fetch recently viewed products fail', async () => {
    const expectedError = new Error('fetch recently viewed products error');

    getRecentlyViewedProducts.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(fetchRecentlyViewedProducts(query));
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
            type: actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_REQUEST,
          },
          {
            type: actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch recently viewed products procedure is successful', async () => {
    console.warn = jest.fn();

    getRecentlyViewedProducts.mockResolvedValueOnce(expectedRemotePayload);

    const result = await store.dispatch(
      fetchRecentlyViewedProducts(query, expectedConfig),
    );

    const actionResults = store.getActions();

    expect(result).toBe(expectedRemotePayload);
    expect(getRecentlyViewedProducts).toHaveBeenCalledTimes(1);
    expect(getRecentlyViewedProducts).toHaveBeenCalledWith(
      query,
      expectedConfig,
    );
    expect(actionResults).toEqual([
      {
        type: actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_REQUEST,
      },
      {
        type: actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS,
        payload: expectedRemotePayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS,
      }),
    ).toMatchSnapshot('fetch recently viewed products success payload');

    store = mockRecentlyViewedStore({
      recentlyViewed: {
        result: {
          remote: [{ productId: 123123 }],
        },
      },
    });

    await store.dispatch(fetchRecentlyViewedProducts(query, expectedConfig));

    expect(console.warn).toHaveBeenCalledWith(`
            @farfetch/blackout-redux/recentlyViewed - Seems you are trying to fetch recently viewed products more than once.
            Please make sure you only request the products once, and use the "saveRecentlyViewedProduct" action to mark the product as viewed when a product page is visited.
            Keep in mind that "saveRecentlyViewedProduct" will only store locally the recently viewed product and will not persist it on the server.
            For that, make sure you are using analytics with Omnitracking integration.
        `);
  });
});

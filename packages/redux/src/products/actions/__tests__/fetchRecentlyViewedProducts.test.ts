import { actionTypes } from '../../';
import { expectedRecentlyViewedRemotePayload } from 'tests/__fixtures__/products';
import { fetchRecentlyViewedProducts } from '../';
import { getRecentlyViewedProducts } from '@farfetch/blackout-client/products';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import reducer from '../../reducer';
import type { StoreState } from '../../../types';

jest.mock('@farfetch/blackout-client/products', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-client/products'),
    getRecentlyViewedProducts: jest.fn(),
  };
});

const mockAction = { type: 'this_is_a_mock_action' };

const mockRecentlyViewedStore = (state: StoreState = {}) =>
  mockStore(
    {
      products: {
        recentlyViewed: reducer(undefined, mockAction),
      },
    },
    state,
  );

describe('fetchRecentlyViewedProducts() action creator', () => {
  let store: ReturnType<typeof mockRecentlyViewedStore>;
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

    (getRecentlyViewedProducts as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    expect.assertions(4);

    await fetchRecentlyViewedProducts(query)(
      store.dispatch,
      store.getState as () => StoreState,
    ).catch(error => {
      expect(error).toBe(expectedError);
      expect(getRecentlyViewedProducts).toHaveBeenCalledTimes(1);
      expect(getRecentlyViewedProducts).toHaveBeenCalledWith(
        query,
        expectedConfig,
      );
    });

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
  });

  it('should create the correct actions for when the fetch recently viewed products procedure is successful', async () => {
    console.warn = jest.fn();

    (getRecentlyViewedProducts as jest.Mock).mockResolvedValueOnce(
      expectedRecentlyViewedRemotePayload,
    );

    const result = await fetchRecentlyViewedProducts(query, expectedConfig)(
      store.dispatch,
      store.getState as () => StoreState,
    );
    const actionResults = store.getActions();

    expect(result).toBe(expectedRecentlyViewedRemotePayload);
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
        payload: expectedRecentlyViewedRemotePayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS,
      }),
    ).toMatchSnapshot('fetch recently viewed products success payload');

    store = mockRecentlyViewedStore({
      products: {
        recentlyViewed: {
          result: {
            remote: {
              entries: [{ productId: 123123, lastVisitDate: '10000' }],
              totalItems: 1,
              totalPages: 1,
              number: 1,
            },
            computed: undefined,
            pagination: undefined,
          },
          error: undefined,
          isLoading: false,
        },
      },
    } as StoreState);

    await fetchRecentlyViewedProducts(query, expectedConfig)(
      store.dispatch,
      store.getState as () => StoreState,
    );

    expect(console.warn).toHaveBeenCalledWith(`
              @farfetch/blackout-redux/products - Seems you are trying to fetch recently viewed products more than once.
              Please make sure you only request the products once, and use the "saveRecentlyViewedProduct" action to mark the product as viewed when a product page is visited.
              Keep in mind that "saveRecentlyViewedProduct" will only store locally the recently viewed product and will not persist it on the server.
              For that, make sure you are using analytics with Omnitracking integration.
          `);
  });
});

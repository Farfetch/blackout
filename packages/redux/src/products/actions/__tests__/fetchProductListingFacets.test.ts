import * as normalizr from 'normalizr';
import { fetchProductListingFacets } from '../index.js';
import { getProductListingFacets } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/lists.js';
import {
  mockListingFacets,
  mockListingFacetsNormalizedResponse,
  mockListingFacetsQuery,
} from 'tests/__fixtures__/products/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import { productsActionTypes } from '../../index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getProductListingFacets: jest.fn(),
}));

const productListingFacetsMockStore = (state = {}) =>
  mockStore({ products: { lists: INITIAL_STATE } }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof productListingFacetsMockStore>;

describe('fetchProductListingFacets() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const state = {
    products: {
      lists: {},
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = productListingFacetsMockStore(state);
  });

  it('should create the correct actions for when the fetch listing facets procedure fails', async () => {
    const expectedError = new Error('Fetch listing facets error');

    (getProductListingFacets as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await fetchProductListingFacets(mockListingFacetsQuery)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getProductListingFacets).toHaveBeenCalledTimes(1);
    expect(getProductListingFacets).toHaveBeenCalledWith(
      mockListingFacetsQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        type: productsActionTypes.FETCH_PRODUCT_LISTING_FACETS_REQUEST,
      },
      {
        payload: { error: expectedError },
        type: productsActionTypes.FETCH_PRODUCT_LISTING_FACETS_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the fetch listing procedure is successful', async () => {
    (getProductListingFacets as jest.Mock).mockResolvedValueOnce(
      mockListingFacets,
    );

    await fetchProductListingFacets(mockListingFacetsQuery)(
      store.dispatch,
    ).then(clientResult => {
      expect(clientResult).toBe(mockListingFacets);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductListingFacets).toHaveBeenCalledTimes(1);
    expect(getProductListingFacets).toHaveBeenCalledWith(
      mockListingFacetsQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        type: productsActionTypes.FETCH_PRODUCT_LISTING_FACETS_REQUEST,
      },
      {
        payload: mockListingFacetsNormalizedResponse,
        type: productsActionTypes.FETCH_PRODUCT_LISTING_FACETS_SUCCESS,
      },
    ]);
  });
});

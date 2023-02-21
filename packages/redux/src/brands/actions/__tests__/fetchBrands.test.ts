import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import { fetchBrands } from '../';
import { getBrands } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import {
  mockBrandsNormalizedResponse,
  mockBrandsResponse,
  mockHash,
  mockQuery,
  mockState,
} from 'tests/__fixtures__/brands';
import { mockStore } from '../../../../tests';
import type { StoreState } from '../../../types';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getBrands: jest.fn(),
}));

const brandsMockStore = (state = {}) =>
  mockStore({ brands: INITIAL_STATE }, state);
const expectedConfig = undefined;
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const ACTION_SET_HASH = {
  meta: {
    hash: mockHash,
    query: mockQuery,
  },
  type: actionTypes.SET_BRANDS_HASH,
};
const ACTION_RESET = {
  type: actionTypes.RESET_BRANDS_STATE,
};
const ACTION_REQUEST = {
  meta: {
    hash: mockHash,
    query: mockQuery,
  },
  type: actionTypes.FETCH_BRANDS_REQUEST,
};
const ACTION_SUCCESS = {
  meta: {
    hash: mockHash,
    query: mockQuery,
  },
  payload: mockBrandsNormalizedResponse,
  type: actionTypes.FETCH_BRANDS_SUCCESS,
};
let store: ReturnType<typeof brandsMockStore>;

describe('fetchBrands() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = brandsMockStore(mockState);
  });

  it('should return undefined if the brands result is in cache, `useCache` is true and `setBrandsHash` is false', async () => {
    const useCache = true;
    const setBrandsHash = false;

    await fetchBrands(
      mockQuery,
      useCache,
      setBrandsHash,
    )(store.dispatch, store.getState as () => StoreState).then(clientResult => {
      expect(clientResult).toBeUndefined();
    });

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getBrands).not.toHaveBeenCalled();
  });

  it('should return and set brand hash if result is in cache, useCache is true and setBrandsaHash is true', async () => {
    const useCache = true;

    await fetchBrands(mockQuery, useCache)(
      store.dispatch,
      store.getState as () => StoreState,
    ).then(clientResult => {
      expect(clientResult).toBeUndefined();
    });

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getBrands).not.toHaveBeenCalled();
    expect(store.getActions()).toEqual([ACTION_SET_HASH]);
  });

  it('should create the correct actions for a successful request without setting the brands hash', async () => {
    (getBrands as jest.Mock).mockResolvedValueOnce(mockBrandsResponse);

    const useCache = false;
    const setBrandsHash = false;

    await fetchBrands(
      mockQuery,
      useCache,
      setBrandsHash,
    )(store.dispatch, store.getState as () => StoreState).then(clientResult => {
      expect(clientResult).toBe(mockBrandsResponse);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getBrands).toHaveBeenCalledTimes(1);
    expect(getBrands).toHaveBeenCalledWith(mockQuery, expectedConfig);
    expect(store.getActions()).toEqual([
      ACTION_RESET,
      ACTION_REQUEST,
      ACTION_SUCCESS,
    ]);
  });

  it('should create the correct actions for when the fetch brands procedure fails', async () => {
    const expectedError = new Error('Fetch brands error');

    (getBrands as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await fetchBrands(mockQuery)(
          store.dispatch,
          store.getState as () => StoreState,
        ),
    ).rejects.toThrow(expectedError);

    expect(getBrands).toHaveBeenCalledTimes(1);
    expect(getBrands).toHaveBeenCalledWith(mockQuery, expectedConfig);
    expect(store.getActions()).toEqual([
      ACTION_RESET,
      ACTION_SET_HASH,
      ACTION_REQUEST,
      {
        meta: {
          hash: mockHash,
          query: mockQuery,
        },
        payload: { error: expectedError },
        type: actionTypes.FETCH_BRANDS_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the fetch brands procedure is successful', async () => {
    (getBrands as jest.Mock).mockResolvedValueOnce(mockBrandsResponse);

    await fetchBrands(mockQuery)(
      store.dispatch,
      store.getState as () => StoreState,
    ).then(clientResult => {
      expect(clientResult).toBe(mockBrandsResponse);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getBrands).toHaveBeenCalledTimes(1);
    expect(getBrands).toHaveBeenCalledWith(mockQuery, expectedConfig);
    expect(store.getActions()).toEqual([
      ACTION_RESET,
      ACTION_SET_HASH,
      ACTION_REQUEST,
      ACTION_SUCCESS,
    ]);
  });
});

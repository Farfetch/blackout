import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import { fetchBrands } from '..//index.js';
import { getBrands } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import {
  mockBrandsNormalizedResponse,
  mockBrandsQuery,
  mockBrandsResponse,
  mockHash,
  mockState,
} from 'tests/__fixtures__/brands/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import type { StoreState } from '../../../types/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getBrands: jest.fn(),
}));

const brandsMockStore = (state = {}) =>
  mockStore({ brands: INITIAL_STATE }, state);
const expectedConfig = undefined;
const normalizeSpy = jest.spyOn(normalizr, 'normalize');

const ACTION_REQUEST = {
  meta: {
    hash: mockHash,
    query: mockBrandsQuery,
  },
  type: actionTypes.FETCH_BRANDS_REQUEST,
};

const ACTION_SUCCESS = {
  meta: {
    hash: mockHash,
    query: mockBrandsQuery,
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

  it('should return undefined if the brands result is in cache and `useCache` is true', async () => {
    const useCache = true;

    await fetchBrands(mockBrandsQuery, useCache)(
      store.dispatch,
      store.getState as () => StoreState,
    ).then(clientResult => {
      expect(clientResult).toBeUndefined();
    });

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getBrands).not.toHaveBeenCalled();
  });

  it('should return if result is in cache and `useCache` is true', async () => {
    const useCache = true;

    await fetchBrands(mockBrandsQuery, useCache)(
      store.dispatch,
      store.getState as () => StoreState,
    ).then(clientResult => {
      expect(clientResult).toBeUndefined();
    });

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getBrands).not.toHaveBeenCalled();
  });

  it('should create the correct actions for when the fetch brands procedure fails', async () => {
    const expectedError = new Error('Fetch brands error');

    (getBrands as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await fetchBrands(mockBrandsQuery)(
          store.dispatch,
          store.getState as () => StoreState,
        ),
    ).rejects.toThrow(expectedError);

    expect(getBrands).toHaveBeenCalledTimes(1);
    expect(getBrands).toHaveBeenCalledWith(mockBrandsQuery, expectedConfig);
    expect(store.getActions()).toEqual([
      ACTION_REQUEST,
      {
        meta: {
          hash: mockHash,
          query: mockBrandsQuery,
        },
        payload: { error: expectedError },
        type: actionTypes.FETCH_BRANDS_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the fetch brands procedure is successful', async () => {
    (getBrands as jest.Mock).mockResolvedValueOnce(mockBrandsResponse);

    await fetchBrands(mockBrandsQuery)(
      store.dispatch,
      store.getState as () => StoreState,
    ).then(clientResult => {
      expect(clientResult).toBe(mockBrandsResponse);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getBrands).toHaveBeenCalledTimes(1);
    expect(getBrands).toHaveBeenCalledWith(mockBrandsQuery, expectedConfig);
    expect(store.getActions()).toEqual([ACTION_REQUEST, ACTION_SUCCESS]);
  });
});

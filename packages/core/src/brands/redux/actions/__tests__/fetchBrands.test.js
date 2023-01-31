import { fetchBrands } from '../';
import { generateBrandsHash } from '../../utils';
import {
  mockBrandsResponse,
  mockQuery,
  mockState,
} from 'tests/__fixtures__/brands';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const hash = generateBrandsHash(mockQuery);
const brandsMockStore = (state = {}) => mockStore({ brands: reducer() }, state);

describe('fetchBrands() action creator', () => {
  let store;
  const expectedConfig = undefined;
  const getBrands = jest.fn();
  const action = fetchBrands(getBrands);
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();
    store = brandsMockStore();
  });

  it('should do nothing if brands result is in cache, useCache is true and setBrandsHash is false', async () => {
    const useCache = true;
    const setBrandsHash = false;

    store = brandsMockStore(mockState);

    await store.dispatch(action(mockQuery, useCache, setBrandsHash));

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getBrands).not.toHaveBeenCalled();
  });

  it('should return if brands result is in cache, useCache is true and setBrandsaHash is true', async () => {
    const useCache = true;

    store = brandsMockStore(mockState);

    await store.dispatch(action(mockQuery, useCache));

    const actionResults = store.getActions();

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getBrands).not.toHaveBeenCalled();
    expect(actionResults).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: actionTypes.SET_BRANDS_HASH }),
      ]),
    );
  });

  it('should create the correct actions for a successful request without setting the brands hash', async () => {
    getBrands.mockResolvedValueOnce(mockBrandsResponse);

    const setBrandsHash = false;

    await store.dispatch(action(mockQuery, false, setBrandsHash));

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getBrands).toHaveBeenCalledTimes(1);
    expect(getBrands).toHaveBeenCalledWith(mockQuery, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            meta: { hash, query: mockQuery },
            type: actionTypes.FETCH_BRANDS_REQUEST,
          },
          {
            meta: { hash, query: mockQuery },
            payload: mockBrandsResponse,
            type: actionTypes.FETCH_BRANDS_SUCCESS,
          },
        ),
      ]),
    );
  });

  it('should create the correct actions for when the fetch brands procedure fails', async () => {
    const expectedError = new Error('Fetch brands error');

    getBrands.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockQuery));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getBrands).toHaveBeenCalledTimes(1);
      expect(getBrands).toHaveBeenCalledWith(mockQuery, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            {
              meta: { hash, query: mockQuery },
              type: actionTypes.SET_BRANDS_HASH,
            },
            {
              meta: { hash, query: mockQuery },
              type: actionTypes.FETCH_BRANDS_REQUEST,
            },
            {
              meta: { hash, query: mockQuery },
              payload: { error: expectedError },
              type: actionTypes.FETCH_BRANDS_FAILURE,
            },
          ),
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch brands procedure is successful', async () => {
    getBrands.mockResolvedValueOnce(mockBrandsResponse);

    await store.dispatch(action(mockQuery));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getBrands).toHaveBeenCalledTimes(1);
    expect(getBrands).toHaveBeenCalledWith(mockQuery, expectedConfig);
    expect(actionResults).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            meta: { hash, query: mockQuery },
            type: actionTypes.SET_BRANDS_HASH,
          },
          {
            meta: { hash, query: mockQuery },
            type: actionTypes.FETCH_BRANDS_REQUEST,
          },
          {
            meta: { hash, query: mockQuery },
            payload: mockBrandsResponse,
            type: actionTypes.FETCH_BRANDS_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, { type: actionTypes.FETCH_BRANDS_SUCCESS }),
    ).toMatchSnapshot('Fetch brands success payload');
  });

  it('should reset brands state when brands result is in cache but cache is not activated', async () => {
    store = brandsMockStore(mockState);

    getBrands.mockResolvedValueOnce(mockBrandsResponse);

    await store.dispatch(action(mockQuery));

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getBrands).toHaveBeenCalledTimes(1);
    expect(getBrands).toHaveBeenCalledWith(mockQuery, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.RESET_BRANDS_STATE,
          },
          {
            meta: { hash, query: mockQuery },
            type: actionTypes.SET_BRANDS_HASH,
          },
          {
            meta: { hash, query: mockQuery },
            type: actionTypes.FETCH_BRANDS_REQUEST,
          },
          {
            meta: { hash, query: mockQuery },
            payload: mockBrandsResponse,
            type: actionTypes.FETCH_BRANDS_SUCCESS,
          },
        ),
      ]),
    );
  });
});

import * as normalizr from 'normalizr';
import { fetchProductListing } from '../index.js';
import { getProductListing } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/lists.js';
import {
  mockProductsList,
  mockProductsListHash,
  mockProductsListNormalized,
  mockProductsListNormalizedPayload,
  mockProductsListNormalizedWithoutImageOptions,
  mockProductsListSlug,
  mockQuery,
} from 'tests/__fixtures__/products/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import { productsActionTypes } from '../../index.js';
import thunk from 'redux-thunk';
import type { GetOptionsArgument, StoreState } from '../../../types/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getProductListing: jest.fn(),
}));

const getOptions = () => ({ productImgQueryParam: '?c=2' });
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions,
  }),
];
const productsListsMockStore = (state = {}) =>
  mockStore({ products: { lists: INITIAL_STATE } }, state, mockMiddlewares);
const productsListsMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ products: { lists: INITIAL_STATE } }, state);
const expectedConfig = undefined;
let store: ReturnType<
  | typeof productsListsMockStore
  | typeof productsListsMockStoreWithoutMiddlewares
>;

describe('fetchListing() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const state = {
    products: {
      lists: {
        hash: mockProductsListHash,
      },
    },
    entities: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = productsListsMockStore(state);
  });

  it('should do nothing if listing in cache, cache is enabled but set products list hash is false', async () => {
    const mockUseCache = true;
    const mockSetProductsListHash = false;

    store = productsListsMockStore({
      products: {
        lists: {
          ...state.products.lists,
          isLoading: { [mockProductsListHash]: false },
        },
      },
      entities: mockProductsListNormalizedPayload.entities,
    });

    await fetchProductListing(mockProductsListSlug, mockQuery, {
      useCache: mockUseCache,
      setProductsListHash: mockSetProductsListHash,
    })(store.dispatch, store.getState as () => StoreState, { getOptions });

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getProductListing).not.toHaveBeenCalled();
  });

  it('should create the correct actions for when the fetch listing procedure fails', async () => {
    const expectedError = new Error('Fetch listing error');

    (getProductListing as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await fetchProductListing(mockProductsListSlug, mockQuery)(
          store.dispatch,
          store.getState as () => StoreState,
          { getOptions },
        ),
    ).rejects.toThrow(expectedError);

    expect(getProductListing).toHaveBeenCalledTimes(1);
    expect(getProductListing).toHaveBeenCalledWith(
      mockProductsListSlug,
      mockQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { hash: mockProductsListHash },
        type: productsActionTypes.SET_PRODUCTS_LIST_HASH,
      },
      {
        meta: { hash: mockProductsListHash },
        type: productsActionTypes.FETCH_PRODUCTS_LIST_REQUEST,
      },
      {
        meta: { hash: mockProductsListHash },
        payload: { error: expectedError },
        type: productsActionTypes.FETCH_PRODUCTS_LIST_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the fetch listing procedure is successful', async () => {
    (getProductListing as jest.Mock).mockResolvedValueOnce(mockProductsList);

    await fetchProductListing(mockProductsListSlug, mockQuery)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBe(mockProductsList);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductListing).toHaveBeenCalledTimes(1);
    expect(getProductListing).toHaveBeenCalledWith(
      mockProductsListSlug,
      mockQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { hash: mockProductsListHash },
        type: productsActionTypes.SET_PRODUCTS_LIST_HASH,
      },
      {
        meta: { hash: mockProductsListHash },
        type: productsActionTypes.FETCH_PRODUCTS_LIST_REQUEST,
      },
      {
        meta: { hash: mockProductsListHash },
        payload: mockProductsListNormalized,
        type: productsActionTypes.FETCH_PRODUCTS_LIST_SUCCESS,
      },
    ]);
  });

  it('should create the correct actions for when the fetch listing procedure is successful without receiving options', async () => {
    store = productsListsMockStoreWithoutMiddlewares(state);
    (getProductListing as jest.Mock).mockResolvedValueOnce(mockProductsList);

    await fetchProductListing(mockProductsListSlug, mockQuery)(
      store.dispatch,
      store.getState as () => StoreState,
      {} as GetOptionsArgument,
    ).then(clientResult => {
      expect(clientResult).toBe(mockProductsList);
    });

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductListing).toHaveBeenCalledTimes(1);
    expect(getProductListing).toHaveBeenCalledWith(
      mockProductsListSlug,
      mockQuery,
      expectedConfig,
    );
    expect(actionResults).toEqual([
      {
        meta: { hash: mockProductsListHash },
        type: productsActionTypes.SET_PRODUCTS_LIST_HASH,
      },
      {
        meta: { hash: mockProductsListHash },
        type: productsActionTypes.FETCH_PRODUCTS_LIST_REQUEST,
      },
      {
        meta: { hash: mockProductsListHash },
        payload: mockProductsListNormalizedWithoutImageOptions,
        type: productsActionTypes.FETCH_PRODUCTS_LIST_SUCCESS,
      },
    ]);
  });

  it('should reset state when listing is in cache but cache is not activated', async () => {
    store = productsListsMockStore({
      products: {
        lists: { hash: mockProductsListHash },
      },
      entities: {
        productsLists: {
          [mockProductsListHash]: { hash: mockProductsListHash },
        },
      },
    });

    (getProductListing as jest.Mock).mockResolvedValueOnce(mockProductsList);

    await fetchProductListing(mockProductsListSlug, mockQuery)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBe(mockProductsList);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductListing).toHaveBeenCalledTimes(1);
    expect(getProductListing).toHaveBeenCalledWith(
      mockProductsListSlug,
      mockQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        type: productsActionTypes.RESET_PRODUCTS_LISTS_STATE,
      },
      {
        meta: { hash: mockProductsListHash },
        type: productsActionTypes.SET_PRODUCTS_LIST_HASH,
      },
      {
        meta: { hash: mockProductsListHash },
        type: productsActionTypes.FETCH_PRODUCTS_LIST_REQUEST,
      },
      {
        meta: { hash: mockProductsListHash },
        payload: mockProductsListNormalized,
        type: productsActionTypes.FETCH_PRODUCTS_LIST_SUCCESS,
      },
    ]);
  });

  it('should create the correct actions for when the fetch listing procedure is successful from server', async () => {
    store = productsListsMockStore({
      products: {
        lists: {
          ...state.products.lists,
          isHydrated: { [mockProductsListHash]: true },
        },
      },
      entities: {},
    });

    await fetchProductListing(mockProductsListSlug, mockQuery)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBeUndefined();
    });

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getProductListing).not.toHaveBeenCalled();
    expect(store.getActions()).toEqual([
      {
        meta: { hash: mockProductsListHash },
        type: productsActionTypes.DEHYDRATE_PRODUCTS_LIST,
      },
    ]);
  });

  it('should return if listing already exists and useCache flag is true', async () => {
    store = productsListsMockStore({
      products: {
        lists: {
          ...state.products.lists,
          isLoading: { [mockProductsListHash]: false },
        },
      },
      entities: { ...mockProductsListNormalizedPayload.entities },
    });

    await fetchProductListing(mockProductsListSlug, mockQuery, {
      useCache: true,
    })(store.dispatch, store.getState as () => StoreState, { getOptions }).then(
      clientResult => {
        expect(clientResult).toBeUndefined();
      },
    );

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getProductListing).not.toHaveBeenCalled();
    expect(store.getActions()).toEqual([
      {
        meta: { hash: mockProductsListHash },
        type: productsActionTypes.SET_PRODUCTS_LIST_HASH,
      },
    ]);
  });

  it('should create the correct actions for a successful request without setting the hash', async () => {
    (getProductListing as jest.Mock).mockResolvedValueOnce(mockProductsList);

    await fetchProductListing(mockProductsListSlug, mockQuery, {
      setProductsListHash: false,
    })(store.dispatch, store.getState as () => StoreState, { getOptions }).then(
      clientResult => {
        expect(clientResult).toBe(mockProductsList);
      },
    );

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductListing).toHaveBeenCalledTimes(1);
    expect(getProductListing).toHaveBeenCalledWith(
      mockProductsListSlug,
      mockQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { hash: mockProductsListHash },
        type: productsActionTypes.FETCH_PRODUCTS_LIST_REQUEST,
      },
      {
        meta: { hash: mockProductsListHash },
        payload: mockProductsListNormalized,
        type: productsActionTypes.FETCH_PRODUCTS_LIST_SUCCESS,
      },
    ]);
  });
});

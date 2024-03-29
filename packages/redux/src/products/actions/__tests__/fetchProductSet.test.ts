import * as normalizr from 'normalizr';
import { fetchProductSet } from '../index.js';
import { getProductSet } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/lists.js';
import {
  mockProductsListForSetsWithIdNormalized,
  mockProductsListForSetsWithIdNormalizedWithoutImageOptions,
  mockProductsListHashForSetsWithId,
  mockSet,
  mockSetId,
} from 'tests/__fixtures__/products/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import { productsActionTypes } from '../../index.js';
import thunk from 'redux-thunk';
import type { GetOptionsArgument, StoreState } from '../../../types/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getProductSet: jest.fn(),
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

describe('fetchProductSet() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const state = {
    products: {
      lists: { hash: mockProductsListHashForSetsWithId },
    },
    entities: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = productsListsMockStore(state);
  });

  it('should do nothing if set is in cache, cache is enabled but set product list hash is false', async () => {
    const mockUseCache = true;
    const mockSetProductsListHash = false;

    store = productsListsMockStore({
      products: {
        lists: {
          ...state.products.lists,
          isLoading: { [mockProductsListHashForSetsWithId]: false },
        },
      },
      entities: mockProductsListForSetsWithIdNormalized.entities,
    });

    await fetchProductSet(
      mockSetId,
      {},
      {
        useCache: mockUseCache,
        setProductsListHash: mockSetProductsListHash,
      },
    )(store.dispatch, store.getState as () => StoreState, { getOptions });

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getProductSet).not.toHaveBeenCalled();
  });

  it('should create the correct actions for when the fetch set procedure fails', async () => {
    const expectedError = new Error('Fetch set error');

    (getProductSet as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await fetchProductSet(mockSetId)(
          store.dispatch,
          store.getState as () => StoreState,
          { getOptions },
        ),
    ).rejects.toThrow(expectedError);

    expect(getProductSet).toHaveBeenCalledTimes(1);
    expect(getProductSet).toHaveBeenCalledWith(mockSetId, {}, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        type: productsActionTypes.SET_PRODUCT_LISTING_HASH,
      },
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        type: productsActionTypes.FETCH_PRODUCT_LISTING_REQUEST,
      },
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        payload: {
          error: expectedError,
        },
        type: productsActionTypes.FETCH_PRODUCT_LISTING_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the fetch set procedure is successful', async () => {
    (getProductSet as jest.Mock).mockResolvedValueOnce(mockSet);

    await fetchProductSet(mockSetId)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBe(mockSet);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductSet).toHaveBeenCalledTimes(1);
    expect(getProductSet).toHaveBeenCalledWith(mockSetId, {}, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        type: productsActionTypes.SET_PRODUCT_LISTING_HASH,
      },
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        type: productsActionTypes.FETCH_PRODUCT_LISTING_REQUEST,
      },
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        payload: mockProductsListForSetsWithIdNormalized,
        type: productsActionTypes.FETCH_PRODUCT_LISTING_SUCCESS,
      },
    ]);
  });

  it('should create the correct actions for when the fetch set procedure is successful without receiving options', async () => {
    store = productsListsMockStoreWithoutMiddlewares(state);
    (getProductSet as jest.Mock).mockResolvedValueOnce(mockSet);

    await fetchProductSet(mockSetId)(
      store.dispatch,
      store.getState as () => StoreState,
      {} as GetOptionsArgument,
    ).then(clientResult => {
      expect(clientResult).toBe(mockSet);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductSet).toHaveBeenCalledTimes(1);
    expect(getProductSet).toHaveBeenCalledWith(mockSetId, {}, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        type: productsActionTypes.SET_PRODUCT_LISTING_HASH,
      },
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        type: productsActionTypes.FETCH_PRODUCT_LISTING_REQUEST,
      },
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        payload: mockProductsListForSetsWithIdNormalizedWithoutImageOptions,
        type: productsActionTypes.FETCH_PRODUCT_LISTING_SUCCESS,
      },
    ]);
  });

  it('should reset state when set is in cache but cache is not activated', async () => {
    store = productsListsMockStore({
      products: {
        lists: { hash: mockProductsListHashForSetsWithId },
      },
      entities: {
        productsLists: {
          [mockProductsListHashForSetsWithId]: {
            hash: mockProductsListHashForSetsWithId,
          },
        },
      },
    });

    (getProductSet as jest.Mock).mockResolvedValueOnce(mockSet);

    await fetchProductSet(mockSetId)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBe(mockSet);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductSet).toHaveBeenCalledTimes(1);
    expect(getProductSet).toHaveBeenCalledWith(mockSetId, {}, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        type: productsActionTypes.RESET_PRODUCT_LISTINGS_STATE,
      },
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        type: productsActionTypes.SET_PRODUCT_LISTING_HASH,
      },
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        type: productsActionTypes.FETCH_PRODUCT_LISTING_REQUEST,
      },
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        payload: mockProductsListForSetsWithIdNormalized,
        type: productsActionTypes.FETCH_PRODUCT_LISTING_SUCCESS,
      },
    ]);
  });

  it('should create the correct actions for when the fetch set procedure is successful from server', async () => {
    store = productsListsMockStore({
      products: {
        lists: {
          ...state.products.lists,
          isHydrated: { [mockProductsListHashForSetsWithId]: true },
        },
      },
      entities: {},
    });

    await fetchProductSet(mockSetId)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBeUndefined();
    });

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getProductSet).not.toHaveBeenCalled();
    expect(store.getActions()).toEqual([
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        type: productsActionTypes.DEHYDRATE_PRODUCT_LISTING,
      },
    ]);
  });

  it('should return if set already exists and useCache flag is true', async () => {
    store = productsListsMockStore({
      products: {
        lists: {
          ...state.products.lists,
          isLoading: { [mockProductsListHashForSetsWithId]: false },
        },
      },
      entities: { ...mockProductsListForSetsWithIdNormalized.entities },
    });

    await fetchProductSet(mockSetId, {}, { useCache: true })(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBeUndefined();
    });

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getProductSet).not.toHaveBeenCalled();
    expect(store.getActions()).toEqual([
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        type: productsActionTypes.SET_PRODUCT_LISTING_HASH,
      },
    ]);
  });

  it('should create the correct actions for a successful request without setting the list', async () => {
    (getProductSet as jest.Mock).mockResolvedValueOnce(mockSet);

    await fetchProductSet(
      mockSetId,
      {},
      {
        setProductsListHash: false,
      },
    )(store.dispatch, store.getState as () => StoreState, { getOptions }).then(
      clientResult => {
        expect(clientResult).toBe(mockSet);
      },
    );

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductSet).toHaveBeenCalledTimes(1);
    expect(getProductSet).toHaveBeenCalledWith(mockSetId, {}, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        type: productsActionTypes.FETCH_PRODUCT_LISTING_REQUEST,
      },
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        payload: mockProductsListForSetsWithIdNormalized,
        type: productsActionTypes.FETCH_PRODUCT_LISTING_SUCCESS,
      },
    ]);
  });
});

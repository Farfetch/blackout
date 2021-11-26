import * as normalizr from 'normalizr';
import { actionTypes } from '../..';
import { fetchListing } from '..';
import { getListing } from '@farfetch/blackout-client/products';
import { INITIAL_STATE } from '../../reducer/lists';
import {
  mockProductsList,
  mockProductsListHash,
  mockProductsListNormalized,
  mockProductsListNormalizedPayload,
  mockProductsListNormalizedWithoutImageOptions,
  mockProductsListSlug,
  mockQuery,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../tests';
import thunk from 'redux-thunk';

jest.mock('@farfetch/blackout-client/products', () => ({
  ...jest.requireActual('@farfetch/blackout-client/products'),
  getListing: jest.fn(),
}));

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];
const productsListsMockStore = (state = {}) =>
  mockStore({ products: { lists: INITIAL_STATE } }, state, mockMiddlewares);
const productsListsMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ products: { lists: INITIAL_STATE } }, state);
const expectedConfig = undefined;
let store;

describe('fetchListing() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const state = {
    products: {
      lists: { hash: mockProductsListHash },
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

    expect.assertions(2);

    await store.dispatch(
      fetchListing(mockProductsListSlug, mockQuery, {
        useCache: mockUseCache,
        setProductsListHash: mockSetProductsListHash,
      }),
    );

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getListing).not.toHaveBeenCalled();
  });

  it('should create the correct actions for when the fetch listing procedure fails', async () => {
    const expectedError = new Error('Fetch listing error');

    getListing.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store
      .dispatch(fetchListing(mockProductsListSlug, mockQuery))
      .catch(error => {
        expect(error).toBe(expectedError);
        expect(getListing).toHaveBeenCalledTimes(1);
        expect(getListing).toHaveBeenCalledWith(
          mockProductsListSlug,
          mockQuery,
          expectedConfig,
        );
        expect(store.getActions()).toEqual([
          {
            meta: { hash: mockProductsListHash },
            type: actionTypes.SET_PRODUCTS_LIST_HASH,
          },
          {
            meta: { hash: mockProductsListHash },
            type: actionTypes.FETCH_PRODUCTS_LIST_REQUEST,
          },
          {
            meta: { hash: mockProductsListHash },
            payload: { error: expectedError },
            type: actionTypes.FETCH_PRODUCTS_LIST_FAILURE,
          },
        ]);
      });
  });

  it('should create the correct actions for when the fetch listing procedure is successful', async () => {
    getListing.mockResolvedValueOnce(mockProductsList);

    expect.assertions(5);

    await store
      .dispatch(fetchListing(mockProductsListSlug, mockQuery))
      .then(clientResult => {
        expect(clientResult).toBe(mockProductsList);
      });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getListing).toHaveBeenCalledTimes(1);
    expect(getListing).toHaveBeenCalledWith(
      mockProductsListSlug,
      mockQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { hash: mockProductsListHash },
        type: actionTypes.SET_PRODUCTS_LIST_HASH,
      },
      {
        meta: { hash: mockProductsListHash },
        type: actionTypes.FETCH_PRODUCTS_LIST_REQUEST,
      },
      {
        meta: { hash: mockProductsListHash },
        payload: mockProductsListNormalized,
        type: actionTypes.FETCH_PRODUCTS_LIST_SUCCESS,
      },
    ]);
  });

  it('should create the correct actions for when the fetch listing procedure is successful without receiving options', async () => {
    store = productsListsMockStoreWithoutMiddlewares(state);
    getListing.mockResolvedValueOnce(mockProductsList);

    expect.assertions(5);

    await store
      .dispatch(fetchListing(mockProductsListSlug, mockQuery))
      .then(clientResult => {
        expect(clientResult).toBe(mockProductsList);
      });

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getListing).toHaveBeenCalledTimes(1);
    expect(getListing).toHaveBeenCalledWith(
      mockProductsListSlug,
      mockQuery,
      expectedConfig,
    );
    expect(actionResults).toEqual([
      {
        meta: { hash: mockProductsListHash },
        type: actionTypes.SET_PRODUCTS_LIST_HASH,
      },
      {
        meta: { hash: mockProductsListHash },
        type: actionTypes.FETCH_PRODUCTS_LIST_REQUEST,
      },
      {
        meta: { hash: mockProductsListHash },
        payload: mockProductsListNormalizedWithoutImageOptions,
        type: actionTypes.FETCH_PRODUCTS_LIST_SUCCESS,
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

    getListing.mockResolvedValueOnce(mockProductsList);

    expect.assertions(5);

    await store
      .dispatch(fetchListing(mockProductsListSlug, mockQuery))
      .then(clientResult => {
        expect(clientResult).toBe(mockProductsList);
      });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getListing).toHaveBeenCalledTimes(1);
    expect(getListing).toHaveBeenCalledWith(
      mockProductsListSlug,
      mockQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.RESET_PRODUCTS_LISTS_STATE,
      },
      {
        meta: { hash: mockProductsListHash },
        type: actionTypes.SET_PRODUCTS_LIST_HASH,
      },
      {
        meta: { hash: mockProductsListHash },
        type: actionTypes.FETCH_PRODUCTS_LIST_REQUEST,
      },
      {
        meta: { hash: mockProductsListHash },
        payload: mockProductsListNormalized,
        type: actionTypes.FETCH_PRODUCTS_LIST_SUCCESS,
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

    await store
      .dispatch(fetchListing(mockProductsListSlug, mockQuery))
      .then(clientResult => {
        expect(clientResult).toBeUndefined();
      });

    expect.assertions(4);

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getListing).not.toHaveBeenCalled();
    expect(store.getActions()).toEqual([
      {
        meta: { hash: mockProductsListHash },
        type: actionTypes.DEHYDRATE_PRODUCTS_LIST,
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

    expect.assertions(4);

    await store
      .dispatch(
        fetchListing(mockProductsListSlug, mockQuery, { useCache: true }),
      )
      .then(clientResult => {
        expect(clientResult).toBeUndefined();
      });

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getListing).not.toHaveBeenCalled();
    expect(store.getActions()).toEqual([
      {
        meta: { hash: mockProductsListHash },
        type: actionTypes.SET_PRODUCTS_LIST_HASH,
      },
    ]);
  });

  it('should create the correct actions for a successful request without setting the hash', async () => {
    getListing.mockResolvedValueOnce(mockProductsList);

    expect.assertions(5);

    await store
      .dispatch(
        fetchListing(mockProductsListSlug, mockQuery, {
          setProductsListHash: false,
        }),
      )
      .then(clientResult => {
        expect(clientResult).toBe(mockProductsList);
      });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getListing).toHaveBeenCalledTimes(1);
    expect(getListing).toHaveBeenCalledWith(
      mockProductsListSlug,
      mockQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { hash: mockProductsListHash },
        type: actionTypes.FETCH_PRODUCTS_LIST_REQUEST,
      },
      {
        meta: { hash: mockProductsListHash },
        payload: mockProductsListNormalized,
        type: actionTypes.FETCH_PRODUCTS_LIST_SUCCESS,
      },
    ]);
  });
});

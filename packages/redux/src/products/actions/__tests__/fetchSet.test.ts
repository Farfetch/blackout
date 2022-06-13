import * as normalizr from 'normalizr';
import { actionTypesProducts } from '../..';
import { fetchSet } from '..';
import { getSet } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/lists';
import {
  mockProductsListForSetsWithIdNormalized,
  mockProductsListForSetsWithIdNormalizedWithoutImageOptions,
  mockProductsListHashForSetsWithId,
  mockSet,
  mockSetId,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../tests';
import thunk from 'redux-thunk';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getSet: jest.fn(),
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

describe('fetchSet() action creator', () => {
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

  it('should do nothing if set is in cache, cache is enabled but set products list hash is false', async () => {
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

    expect.assertions(2);

    await store.dispatch(
      fetchSet(
        mockSetId,
        {},
        {
          useCache: mockUseCache,
          setProductsListHash: mockSetProductsListHash,
        },
      ),
    );

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getSet).not.toHaveBeenCalled();
  });

  it('should create the correct actions for when the fetch set procedure fails', async () => {
    const expectedError = new Error('Fetch set error');

    getSet.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(fetchSet(mockSetId)).catch(error => {
      expect(error).toBe(expectedError);
      expect(getSet).toHaveBeenCalledTimes(1);
      expect(getSet).toHaveBeenCalledWith(mockSetId, {}, expectedConfig);
      expect(store.getActions()).toEqual([
        {
          meta: { hash: mockProductsListHashForSetsWithId },
          type: actionTypesProducts.SET_PRODUCTS_LIST_HASH,
        },
        {
          meta: { hash: mockProductsListHashForSetsWithId },
          type: actionTypesProducts.FETCH_PRODUCTS_LIST_REQUEST,
        },
        {
          meta: { hash: mockProductsListHashForSetsWithId },
          payload: {
            error: expectedError,
          },
          type: actionTypesProducts.FETCH_PRODUCTS_LIST_FAILURE,
        },
      ]);
    });
  });

  it('should create the correct actions for when the fetch set procedure is successful', async () => {
    getSet.mockResolvedValueOnce(mockSet);

    expect.assertions(5);

    await store.dispatch(fetchSet(mockSetId)).then(clientResult => {
      expect(clientResult).toBe(mockSet);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getSet).toHaveBeenCalledTimes(1);
    expect(getSet).toHaveBeenCalledWith(mockSetId, {}, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        type: actionTypesProducts.SET_PRODUCTS_LIST_HASH,
      },
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        type: actionTypesProducts.FETCH_PRODUCTS_LIST_REQUEST,
      },
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        payload: mockProductsListForSetsWithIdNormalized,
        type: actionTypesProducts.FETCH_PRODUCTS_LIST_SUCCESS,
      },
    ]);
  });

  it('should create the correct actions for when the fetch set procedure is successful without receiving options', async () => {
    store = productsListsMockStoreWithoutMiddlewares(state);
    getSet.mockResolvedValueOnce(mockSet);

    expect.assertions(5);

    await store.dispatch(fetchSet(mockSetId)).then(clientResult => {
      expect(clientResult).toBe(mockSet);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getSet).toHaveBeenCalledTimes(1);
    expect(getSet).toHaveBeenCalledWith(mockSetId, {}, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        type: actionTypesProducts.SET_PRODUCTS_LIST_HASH,
      },
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        type: actionTypesProducts.FETCH_PRODUCTS_LIST_REQUEST,
      },
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        payload: mockProductsListForSetsWithIdNormalizedWithoutImageOptions,
        type: actionTypesProducts.FETCH_PRODUCTS_LIST_SUCCESS,
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

    getSet.mockResolvedValueOnce(mockSet);

    expect.assertions(5);

    await store.dispatch(fetchSet(mockSetId)).then(clientResult => {
      expect(clientResult).toBe(mockSet);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getSet).toHaveBeenCalledTimes(1);
    expect(getSet).toHaveBeenCalledWith(mockSetId, {}, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        type: actionTypesProducts.RESET_PRODUCTS_LISTS_STATE,
      },
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        type: actionTypesProducts.SET_PRODUCTS_LIST_HASH,
      },
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        type: actionTypesProducts.FETCH_PRODUCTS_LIST_REQUEST,
      },
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        payload: mockProductsListForSetsWithIdNormalized,
        type: actionTypesProducts.FETCH_PRODUCTS_LIST_SUCCESS,
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

    await store.dispatch(fetchSet(mockSetId)).then(clientResult => {
      expect(clientResult).toBeUndefined();
    });

    expect.assertions(4);

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getSet).not.toHaveBeenCalled();
    expect(store.getActions()).toEqual([
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        type: actionTypesProducts.DEHYDRATE_PRODUCTS_LIST,
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

    expect.assertions(4);

    await store
      .dispatch(fetchSet(mockSetId, {}, { useCache: true }))
      .then(clientResult => {
        expect(clientResult).toBeUndefined();
      });

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getSet).not.toHaveBeenCalled();
    expect(store.getActions()).toEqual([
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        type: actionTypesProducts.SET_PRODUCTS_LIST_HASH,
      },
    ]);
  });

  it('should create the correct actions for a successful request without setting the list', async () => {
    getSet.mockResolvedValueOnce(mockSet);

    expect.assertions(5);

    await store
      .dispatch(
        fetchSet(
          mockSetId,
          {},
          {
            setProductsListHash: false,
          },
        ),
      )
      .then(clientResult => {
        expect(clientResult).toBe(mockSet);
      });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getSet).toHaveBeenCalledTimes(1);
    expect(getSet).toHaveBeenCalledWith(mockSetId, {}, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        type: actionTypesProducts.FETCH_PRODUCTS_LIST_REQUEST,
      },
      {
        meta: { hash: mockProductsListHashForSetsWithId },
        payload: mockProductsListForSetsWithIdNormalized,
        type: actionTypesProducts.FETCH_PRODUCTS_LIST_SUCCESS,
      },
    ]);
  });
});

import * as normalizr from 'normalizr';
import { fetchProductDetails } from '..';
import { getProduct } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/details';
import {
  mockProductId,
  mockProductResponseNormalized,
  mockProductResponseNormalizedWithoutImageOptions,
  mockResponse,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../tests';
import { productsActionTypes } from '../..';
import thunk from 'redux-thunk';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getProduct: jest.fn(),
}));

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];
const productDetailsMockStore = (state = {}) =>
  mockStore({ products: { details: INITIAL_STATE } }, state, mockMiddlewares);
const productDetailsMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ products: { details: INITIAL_STATE } }, state);
const expectedConfig = undefined;
let store;

describe('fetchProductDetails() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();

    store = productDetailsMockStore();
  });

  it('should create the correct actions for when the fetch product details procedure fails', async () => {
    const expectedError = new Error('Fetch product details error');

    getProduct.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(fetchProductDetails(mockProductId)).catch(error => {
      expect(error).toBe(expectedError);
      expect(getProduct).toHaveBeenCalledTimes(1);
      expect(getProduct).toHaveBeenCalledWith(
        mockProductId,
        {},
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          meta: { productId: mockProductId },
          type: productsActionTypes.FETCH_PRODUCT_DETAILS_REQUEST,
        },
        {
          meta: { productId: mockProductId },
          payload: { error: expectedError },
          type: productsActionTypes.FETCH_PRODUCT_DETAILS_FAILURE,
        },
      ]);
    });
  });

  it('should create the correct actions for when the fetch product details procedure is successful', async () => {
    getProduct.mockResolvedValueOnce(mockResponse);

    const query = { merchantId: 'foo' };

    expect.assertions(4);

    await store.dispatch(fetchProductDetails(mockProductId, query));

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProduct).toHaveBeenCalledTimes(1);
    expect(getProduct).toHaveBeenCalledWith(
      mockProductId,
      query,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: productsActionTypes.FETCH_PRODUCT_DETAILS_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: mockProductResponseNormalized,
        type: productsActionTypes.FETCH_PRODUCT_DETAILS_SUCCESS,
      },
    ]);
  });

  it('should create the correct actions for when the fetch product details procedure is successful without receiving options', async () => {
    store = productDetailsMockStoreWithoutMiddlewares();

    getProduct.mockResolvedValueOnce(mockResponse);

    const query = { merchantId: 'foo' };

    expect.assertions(5);

    await store
      .dispatch(fetchProductDetails(mockProductId, query))
      .then(clientResult => {
        expect(clientResult).toBe(mockResponse);
      });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProduct).toHaveBeenCalledTimes(1);
    expect(getProduct).toHaveBeenCalledWith(
      mockProductId,
      query,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: productsActionTypes.FETCH_PRODUCT_DETAILS_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: mockProductResponseNormalizedWithoutImageOptions,
        type: productsActionTypes.FETCH_PRODUCT_DETAILS_SUCCESS,
      },
    ]);
  });

  it('should create the correct actions for when the fetch product details procedure is successful from server', async () => {
    store = productDetailsMockStore({
      products: {
        details: {
          isHydrated: { [mockProductId]: true },
        },
      },
    });

    expect.assertions(4);

    await store
      .dispatch(fetchProductDetails(mockProductId))
      .then(clientResult => {
        expect(clientResult).toBeUndefined();
      });

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getProduct).not.toHaveBeenCalled();
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: productsActionTypes.DEHYDRATE_PRODUCT_DETAILS,
      },
    ]);
  });

  it('should create the correct actions for when we want to force the dispatch', async () => {
    getProduct.mockResolvedValueOnce(mockResponse);

    const query = { merchantId: 'foo' };
    const forceDispatch = true;

    expect.assertions(6);

    await store
      .dispatch(fetchProductDetails(mockProductId, query, forceDispatch))
      .then(clientResult => {
        expect(clientResult).toBe(mockResponse);
      });

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProduct).toHaveBeenCalledTimes(1);
    expect(getProduct).toHaveBeenCalledWith(
      mockProductId,
      query,
      expectedConfig,
    );

    expect(actionResults).not.toEqual([
      {
        meta: { productId: mockProductId },
        payload: mockProductResponseNormalized,
        type: productsActionTypes.DEHYDRATE_PRODUCT_DETAILS,
      },
    ]);

    expect(actionResults).toEqual([
      {
        meta: { productId: mockProductId },
        type: productsActionTypes.FETCH_PRODUCT_DETAILS_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: mockProductResponseNormalized,
        type: productsActionTypes.FETCH_PRODUCT_DETAILS_SUCCESS,
      },
    ]);
  });
});

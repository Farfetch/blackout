import * as normalizr from 'normalizr';
import { fetchProductDetails } from '..';
import { getProduct } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/details';
import {
  mockMerchantId,
  mockProductDetails,
  mockProductId,
  mockProductResponseNormalized,
  mockProductResponseNormalizedWithoutImageOptions,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../tests';
import { productsActionTypes } from '../..';
import thunk from 'redux-thunk';
import type { GetOptionsArgument, StoreState } from '../../../types';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getProduct: jest.fn(),
}));

const getOptions = () => ({ productImgQueryParam: '?c=2' });
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions,
  }),
];
const productDetailsMockStore = (state = {}) =>
  mockStore({ products: { details: INITIAL_STATE } }, state, mockMiddlewares);
const productDetailsMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ products: { details: INITIAL_STATE } }, state);
const expectedConfig = undefined;
let store: ReturnType<
  | typeof productDetailsMockStore
  | typeof productDetailsMockStoreWithoutMiddlewares
>;

describe('fetchProductDetails() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();

    store = productDetailsMockStore();
  });

  it('should create the correct actions for when the fetch product details procedure fails', async () => {
    const expectedError = new Error('Fetch product details error');

    (getProduct as jest.Mock).mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await fetchProductDetails(mockProductId)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).catch(error => {
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
    (getProduct as jest.Mock).mockResolvedValueOnce(mockProductDetails);

    const query = { merchantId: mockMerchantId };

    expect.assertions(4);

    await fetchProductDetails(mockProductId, query)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    );

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

    (getProduct as jest.Mock).mockResolvedValueOnce(mockProductDetails);

    const query = { merchantId: mockMerchantId };

    expect.assertions(5);

    await fetchProductDetails(mockProductId, query)(
      store.dispatch,
      store.getState as () => StoreState,
      {} as GetOptionsArgument,
    ).then(clientResult => {
      expect(clientResult).toBe(mockProductDetails);
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

    await fetchProductDetails(mockProductId)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
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
    (getProduct as jest.Mock).mockResolvedValueOnce(mockProductDetails);

    const query = { merchantId: mockMerchantId };
    const forceDispatch = true;

    expect.assertions(6);

    await fetchProductDetails(mockProductId, query, forceDispatch)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBe(mockProductDetails);
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

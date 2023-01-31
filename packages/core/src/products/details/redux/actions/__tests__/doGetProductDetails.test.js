import { doGetProductDetails } from '../';
import { mockProductId, mockResponse } from 'tests/__fixtures__/products';
import { mockStore } from '../../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';
import thunk from 'redux-thunk';

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];
const productDetailsMockStore = (state = {}) =>
  mockStore({ details: reducer() }, state, mockMiddlewares);
const productDetailsMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ details: reducer() }, state);

describe('doGetProductDetails() action creator', () => {
  let store;
  const getProductDetails = jest.fn();
  const action = doGetProductDetails(getProductDetails);
  const expectedConfig = undefined;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();

    store = productDetailsMockStore();
  });

  it('should create the correct actions for when the get product details procedure fails', async () => {
    const expectedError = new Error('Get product details error');

    getProductDetails.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockProductId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getProductDetails).toHaveBeenCalledTimes(1);
      expect(getProductDetails).toHaveBeenCalledWith(
        mockProductId,
        {},
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          payload: { productId: mockProductId },
          type: actionTypes.GET_PRODUCT_DETAILS_REQUEST,
        },
        {
          payload: { error: expectedError, productId: mockProductId },
          type: actionTypes.GET_PRODUCT_DETAILS_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the get product details procedure is successful', async () => {
    getProductDetails.mockResolvedValueOnce(mockResponse);

    const query = { merchantId: 'foo' };

    await store.dispatch(action(mockProductId, query));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductDetails).toHaveBeenCalledTimes(1);
    expect(getProductDetails).toHaveBeenCalledWith(
      mockProductId,
      query,
      expectedConfig,
    );
    expect(actionResults).toEqual([
      {
        payload: { productId: mockProductId },
        type: actionTypes.GET_PRODUCT_DETAILS_REQUEST,
      },
      expect.objectContaining({
        payload: expect.any(Object),
        type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
      }),
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
      }),
    ).toMatchSnapshot('Get product details success payload');
  });

  it('should create the correct actions for when the get product details procedure is successful without receiving options', async () => {
    store = productDetailsMockStoreWithoutMiddlewares();

    getProductDetails.mockResolvedValueOnce(mockResponse);

    const query = { merchantId: 'foo' };

    await store.dispatch(action(mockProductId, query));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductDetails).toHaveBeenCalledTimes(1);
    expect(getProductDetails).toHaveBeenCalledWith(
      mockProductId,
      query,
      expectedConfig,
    );
    expect(actionResults).toEqual([
      {
        payload: { productId: mockProductId },
        type: actionTypes.GET_PRODUCT_DETAILS_REQUEST,
      },
      expect.objectContaining({
        payload: expect.any(Object),
        type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
      }),
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
      }),
    ).toMatchSnapshot(
      'Get product details success payload without receiving options',
    );
  });

  it('should create the correct actions for when the get product details procedure is successful from server', async () => {
    store = productDetailsMockStore({
      details: {
        ...store.details,
        isHydrated: { [mockProductId]: true },
      },
    });

    await store.dispatch(action(mockProductId));

    const actionResults = store.getActions();

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getProductDetails).not.toHaveBeenCalled();
    expect(store.getActions()).toEqual([
      {
        payload: expect.any(Object),
        type: actionTypes.DEHYDRATE_PRODUCT_DETAILS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.DEHYDRATE_PRODUCT_DETAILS,
      }),
    ).toMatchSnapshot('Get product details hydrated');
  });

  it('should create the correct actions for when we want to force the dispatch', async () => {
    getProductDetails.mockResolvedValueOnce(mockResponse);

    const query = { merchantId: 'foo' };
    const forceDispatch = true;

    await store.dispatch(action(mockProductId, query, forceDispatch));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductDetails).toHaveBeenCalledTimes(1);
    expect(getProductDetails).toHaveBeenCalledWith(
      mockProductId,
      query,
      expectedConfig,
    );

    expect(actionResults).not.toMatchObject([
      {
        payload: expect.any(Object),
        type: actionTypes.DEHYDRATE_PRODUCT_DETAILS,
      },
    ]);

    expect(actionResults).toEqual([
      {
        payload: { productId: mockProductId },
        type: actionTypes.GET_PRODUCT_DETAILS_REQUEST,
      },
      expect.objectContaining({
        payload: expect.any(Object),
        type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
      }),
    ]);
  });
});

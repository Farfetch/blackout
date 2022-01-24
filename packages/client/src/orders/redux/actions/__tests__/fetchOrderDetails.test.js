import * as normalizr from 'normalizr';
import { actionTypes } from '../../';
import {
  expectedOrderDetailsNormalizedPayload,
  mockOrderDetailsResponse,
  orderId,
} from '../../__fixtures__/orders.fixtures';
import { fetchOrderDetails } from '../';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../../tests';
import thunk from 'redux-thunk';

const mockProductImgQueryParam = '?c=2';
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: mockProductImgQueryParam }),
  }),
];
const ordersMockStore = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state, mockMiddlewares);
const ordersMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state);
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

describe('fetchOrderDetails() action creator', () => {
  const getOrderDetails = jest.fn();
  const action = fetchOrderDetails(getOrderDetails);

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the fetch order details procedure fails', async () => {
    const expectedError = new Error('fetch order details error');

    getOrderDetails.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(action(orderId)).catch(error => {
      expect(error).toBe(expectedError);
      expect(getOrderDetails).toHaveBeenCalledTimes(1);
      expect(getOrderDetails).toHaveBeenCalledWith(orderId, expectedConfig);
      expect(store.getActions()).toEqual([
        {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_DETAILS_REQUEST,
        },
        {
          meta: { orderId },
          payload: { error: expectedError },
          type: actionTypes.FETCH_ORDER_DETAILS_FAILURE,
        },
      ]);
    });
  });

  it('should create the correct actions for when the fetch order details procedure is successful', async () => {
    getOrderDetails.mockResolvedValueOnce(mockOrderDetailsResponse);

    expect.assertions(5);

    await store.dispatch(action(orderId)).then(clientResult => {
      expect(clientResult).toEqual(mockOrderDetailsResponse);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getOrderDetails).toHaveBeenCalledTimes(1);
    expect(getOrderDetails).toHaveBeenCalledWith(orderId, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { orderId },
        type: actionTypes.FETCH_ORDER_DETAILS_REQUEST,
      },
      {
        meta: { orderId },
        payload: {
          ...expectedOrderDetailsNormalizedPayload,
          result: {
            ...expectedOrderDetailsNormalizedPayload.result,
            productImgQueryParam: mockProductImgQueryParam,
          },
        },
        type: actionTypes.FETCH_ORDER_DETAILS_SUCCESS,
        guest: false,
      },
    ]);
  });

  it('should create the correct actions for when the fetch order details procedure is successful without receiving options', async () => {
    store = ordersMockStoreWithoutMiddlewares();
    getOrderDetails.mockResolvedValueOnce(mockOrderDetailsResponse);

    expect.assertions(5);

    await store.dispatch(action(orderId)).then(clientResult => {
      expect(clientResult).toEqual(mockOrderDetailsResponse);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getOrderDetails).toHaveBeenCalledTimes(1);
    expect(getOrderDetails).toHaveBeenCalledWith(orderId, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { orderId },
        type: actionTypes.FETCH_ORDER_DETAILS_REQUEST,
      },
      {
        meta: { orderId },
        payload: expectedOrderDetailsNormalizedPayload,
        type: actionTypes.FETCH_ORDER_DETAILS_SUCCESS,
        guest: false,
      },
    ]);
  });
});

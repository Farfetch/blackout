import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import {
  expectedOrderDetailsNormalizedPayload,
  mockOrderDetailsResponse,
  orderId,
} from 'tests/__fixtures__/orders';
import { fetchOrderDetails } from '..';
import { getOrderDetails } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import thunk from 'redux-thunk';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getOrderDetails: jest.fn(),
}));

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
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the fetch order details procedure fails', async () => {
    const expectedError = new Error('fetch order details error');

    getOrderDetails.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(fetchOrderDetails(orderId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getOrderDetails).toHaveBeenCalledTimes(1);
      expect(getOrderDetails).toHaveBeenCalledWith(orderId, expectedConfig);
      expect(store.getActions()).toEqual([
        {
          type: actionTypes.FETCH_ORDER_DETAILS_REQUEST,
          meta: { orderId },
        },
        {
          payload: { error: expectedError },
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_DETAILS_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the fetch order details procedure is successful', async () => {
    getOrderDetails.mockResolvedValueOnce(mockOrderDetailsResponse);

    expect.assertions(5);

    await store.dispatch(fetchOrderDetails(orderId)).then(clientResult => {
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
        meta: {
          orderId,
          guest: false,
        },
        payload: {
          ...expectedOrderDetailsNormalizedPayload,
          result: {
            ...expectedOrderDetailsNormalizedPayload.result,
            productImgQueryParam: mockProductImgQueryParam,
          },
        },
        type: actionTypes.FETCH_ORDER_DETAILS_SUCCESS,
      },
    ]);
  });

  it('should create the correct actions for when the fetch order details procedure is successful without receiving options', async () => {
    store = ordersMockStoreWithoutMiddlewares();
    getOrderDetails.mockResolvedValueOnce(mockOrderDetailsResponse);

    expect.assertions(5);

    await store.dispatch(fetchOrderDetails(orderId)).then(clientResult => {
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
        meta: { orderId, guest: false },
        payload: expectedOrderDetailsNormalizedPayload,
        type: actionTypes.FETCH_ORDER_DETAILS_SUCCESS,
      },
    ]);
  });
});

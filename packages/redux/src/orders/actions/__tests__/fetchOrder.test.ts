import * as normalizr from 'normalizr';
import { actionTypes } from '../..';
import {
  expectedOrderDetailsNormalizedPayload,
  mockOrderDetailsResponse,
  orderId,
} from 'tests/__fixtures__/orders';
import { fetchOrder } from '..';
import { getOrder } from '@farfetch/blackout-client/orders';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import thunk from 'redux-thunk';

jest.mock('@farfetch/blackout-client/orders', () => ({
  ...jest.requireActual('@farfetch/blackout-client/orders'),
  getOrder: jest.fn(),
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

describe('fetchOrder() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the fetch order details procedure fails', async () => {
    const expectedError = new Error('fetch order details error');

    getOrder.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(fetchOrder(orderId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getOrder).toHaveBeenCalledTimes(1);
      expect(getOrder).toHaveBeenCalledWith(orderId, expectedConfig);
      expect(store.getActions()).toEqual([
        {
          type: actionTypes.FETCH_ORDER_REQUEST,
          meta: { orderId },
        },
        {
          payload: { error: expectedError },
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the fetch order details procedure is successful', async () => {
    getOrder.mockResolvedValueOnce(mockOrderDetailsResponse);

    expect.assertions(5);

    await store.dispatch(fetchOrder(orderId)).then(clientResult => {
      expect(clientResult).toEqual(mockOrderDetailsResponse);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getOrder).toHaveBeenCalledTimes(1);
    expect(getOrder).toHaveBeenCalledWith(orderId, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { orderId },
        type: actionTypes.FETCH_ORDER_REQUEST,
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
        type: actionTypes.FETCH_ORDER_SUCCESS,
        guest: false,
      },
    ]);
  });

  it('should create the correct actions for when the fetch order details procedure is successful without receiving options', async () => {
    store = ordersMockStoreWithoutMiddlewares();
    getOrder.mockResolvedValueOnce(mockOrderDetailsResponse);

    expect.assertions(5);

    await store.dispatch(fetchOrder(orderId)).then(clientResult => {
      expect(clientResult).toEqual(mockOrderDetailsResponse);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getOrder).toHaveBeenCalledTimes(1);
    expect(getOrder).toHaveBeenCalledWith(orderId, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { orderId },
        type: actionTypes.FETCH_ORDER_REQUEST,
      },
      {
        meta: { orderId },
        payload: expectedOrderDetailsNormalizedPayload,
        type: actionTypes.FETCH_ORDER_SUCCESS,
        guest: false,
      },
    ]);
  });
});

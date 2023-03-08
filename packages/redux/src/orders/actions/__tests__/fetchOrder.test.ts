import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import { fetchOrder } from '../index.js';
import {
  getExpectedOrderDetailsNormalizedPayload,
  mockOrderDetailsResponse,
  orderId,
} from 'tests/__fixtures__/orders/index.mjs';
import { getOrder } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import thunk from 'redux-thunk';
import type { GetOptionsArgument, StoreState } from '../../../types/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getOrder: jest.fn(),
}));

const mockProductImgQueryParam = '?c=2';
const getOptions = () => ({ productImgQueryParam: mockProductImgQueryParam });
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions,
  }),
];
const ordersMockStore = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state, mockMiddlewares);
const ordersMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state);
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store: ReturnType<typeof ordersMockStore>;

describe('fetchOrder() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the fetch order details procedure fails', async () => {
    const expectedError = new Error('fetch order details error');

    (getOrder as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await fetchOrder(orderId)(
          store.dispatch,
          store.getState as () => StoreState,
          { getOptions },
        ),
    ).rejects.toThrow(expectedError);

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
  });

  it('should create the correct actions for when the fetch order details procedure is successful', async () => {
    (getOrder as jest.Mock).mockResolvedValueOnce(mockOrderDetailsResponse);

    const expectedPayload = getExpectedOrderDetailsNormalizedPayload(
      mockProductImgQueryParam,
    );

    expectedPayload.entities.orders[orderId].totalItems = 3;

    await fetchOrder(orderId)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
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
        payload: expectedPayload,
        type: actionTypes.FETCH_ORDER_SUCCESS,
      },
    ]);
  });

  it('should create the correct actions for when the fetch order details procedure is successful without receiving options', async () => {
    store = ordersMockStoreWithoutMiddlewares();
    (getOrder as jest.Mock).mockResolvedValueOnce(mockOrderDetailsResponse);

    const expectedPayload = getExpectedOrderDetailsNormalizedPayload();

    expectedPayload.entities.orders[orderId].totalItems = 3;

    await fetchOrder(orderId)(
      store.dispatch,
      store.getState as () => StoreState,
      {} as GetOptionsArgument,
    ).then(clientResult => {
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
        payload: expectedPayload,
        type: actionTypes.FETCH_ORDER_SUCCESS,
      },
    ]);
  });
});

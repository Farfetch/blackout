import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import { fetchGuestOrderLegacy } from '..';
import {
  getExpectedOrderDetailsNormalizedPayload,
  mockGuestUserEmail,
  mockOrderDetailsResponse,
  orderId,
} from 'tests/__fixtures__/orders';
import { getGuestOrderLegacy } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import thunk from 'redux-thunk';
import type { GetOptionsArgument, StoreState } from '../../../types';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getGuestOrderLegacy: jest.fn(),
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

describe('fetchGuestOrderLegacy() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the fetch guest order legacy details procedure fails', async () => {
    const expectedError = new Error('fetch order details error');

    (getGuestOrderLegacy as jest.Mock).mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await fetchGuestOrderLegacy(orderId, mockGuestUserEmail)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).catch(error => {
      expect(error).toBe(expectedError);
      expect(getGuestOrderLegacy).toHaveBeenCalledTimes(1);
      expect(getGuestOrderLegacy).toHaveBeenCalledWith(
        orderId,
        mockGuestUserEmail,
        expectedConfig,
      );
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
  });

  it('should create the correct actions for when the fetch guest order details procedure is successful', async () => {
    (getGuestOrderLegacy as jest.Mock).mockResolvedValueOnce(
      mockOrderDetailsResponse,
    );

    const expectedPayload = getExpectedOrderDetailsNormalizedPayload(
      mockProductImgQueryParam,
    );
    expectedPayload.entities.orders[orderId].totalItems = 3;

    expect.assertions(5);

    await fetchGuestOrderLegacy(orderId, mockGuestUserEmail)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toEqual(mockOrderDetailsResponse);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getGuestOrderLegacy).toHaveBeenCalledTimes(1);
    expect(getGuestOrderLegacy).toHaveBeenCalledWith(
      orderId,
      mockGuestUserEmail,
      expectedConfig,
    );
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
    (getGuestOrderLegacy as jest.Mock).mockResolvedValueOnce(
      mockOrderDetailsResponse,
    );

    const expectedPayload = getExpectedOrderDetailsNormalizedPayload();
    expectedPayload.entities.orders[orderId].totalItems = 3;

    expect.assertions(5);

    await fetchGuestOrderLegacy(orderId, mockGuestUserEmail)(
      store.dispatch,
      store.getState as () => StoreState,
      {} as GetOptionsArgument,
    ).then(clientResult => {
      expect(clientResult).toEqual(mockOrderDetailsResponse);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getGuestOrderLegacy).toHaveBeenCalledTimes(1);
    expect(getGuestOrderLegacy).toHaveBeenCalledWith(
      orderId,
      mockGuestUserEmail,
      expectedConfig,
    );
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

import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import { fetchOrderReturns } from '../index.js';
import { find } from 'lodash-es';
import { getOrderReturns } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import {
  orderId,
  orderReturnsNormalizedPayload,
  responses,
} from 'tests/__fixtures__/returns/index.mjs';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getOrderReturns: jest.fn(),
}));

const returnsMockStore = (state = {}) =>
  mockStore({ returns: INITIAL_STATE }, state);

describe('fetchOrderReturns() action creator', () => {
  const expectedConfig = undefined;
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  let store: ReturnType<typeof returnsMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should create the correct actions for when the get order returns procedure fails', async () => {
    const expectedError = new Error('get order returns error');

    (getOrderReturns as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchOrderReturns(orderId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getOrderReturns).toHaveBeenCalledTimes(1);
    expect(getOrderReturns).toHaveBeenCalledWith(orderId, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_RETURNS_REQUEST,
        },
        {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_RETURNS_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the get order returns procedure is successful', async () => {
    (getOrderReturns as jest.Mock).mockResolvedValueOnce(
      responses.getReturnsFromOrder.get.success,
    );
    await fetchOrderReturns(orderId)(store.dispatch);

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getOrderReturns).toHaveBeenCalledTimes(1);
    expect(getOrderReturns).toHaveBeenCalledWith(orderId, expectedConfig);
    expect(actionResults).toMatchObject([
      {
        meta: { orderId },
        type: actionTypes.FETCH_ORDER_RETURNS_REQUEST,
      },
      {
        meta: { orderId },
        type: actionTypes.FETCH_ORDER_RETURNS_SUCCESS,
        payload: orderReturnsNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        meta: { orderId },
        type: actionTypes.FETCH_ORDER_RETURNS_SUCCESS,
      }),
    ).toMatchSnapshot('get order returns success payload');
  });
});

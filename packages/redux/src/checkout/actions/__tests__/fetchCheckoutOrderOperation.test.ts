import * as normalizr from 'normalizr';
import {
  FETCH_CHECKOUT_ORDER_OPERATION_FAILURE,
  FETCH_CHECKOUT_ORDER_OPERATION_REQUEST,
  FETCH_CHECKOUT_ORDER_OPERATION_SUCCESS,
} from '../../actionTypes';
import { getCheckoutOrderOperation } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import {
  mockGetOperationActionPayload,
  operation,
} from 'tests/__fixtures__/checkout';
import { mockStore } from '../../../../tests';
import fetchCheckoutOrderOperation from '../fetchCheckoutOrderOperation';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCheckoutOrderOperation: jest.fn(),
}));

describe('fetchCheckoutOrderOperation() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);

  const params = { orderId: 1, operationId: operation.id };
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const expectedConfig = undefined;
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({ checkout: INITIAL_STATE }, undefined) as typeof store;
  });

  it('should create the correct actions for when the fetch checkout order operation procedure fails', async () => {
    const expectedError = new Error('fetch checkout order operation error');

    (getCheckoutOrderOperation as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await fetchCheckoutOrderOperation(
          params.orderId,
          params.operationId,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getCheckoutOrderOperation).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrderOperation).toHaveBeenCalledWith(
      params.orderId,
      params.operationId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: FETCH_CHECKOUT_ORDER_OPERATION_REQUEST },
        {
          type: FETCH_CHECKOUT_ORDER_OPERATION_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the fetch checkout order operation procedure is successful', async () => {
    (getCheckoutOrderOperation as jest.Mock).mockResolvedValueOnce(operation);

    await fetchCheckoutOrderOperation(
      params.orderId,
      params.operationId,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(operation);
    });

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrderOperation).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrderOperation).toHaveBeenCalledWith(
      params.orderId,
      params.operationId,
      expectedConfig,
    );
    expect(actionResults).toEqual([
      { type: FETCH_CHECKOUT_ORDER_OPERATION_REQUEST },
      {
        type: FETCH_CHECKOUT_ORDER_OPERATION_SUCCESS,
        payload: mockGetOperationActionPayload,
      },
    ]);
  });
});

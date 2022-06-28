import * as normalizr from 'normalizr';
import {
  FETCH_CHECKOUT_ORDER_OPERATION_FAILURE,
  FETCH_CHECKOUT_ORDER_OPERATION_REQUEST,
  FETCH_CHECKOUT_ORDER_OPERATION_SUCCESS,
} from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer';
import {
  mockGetOperationActionPayload,
  operation,
} from 'tests/__fixtures__/checkout';
import { mockStore } from '../../../../tests';
import { getCheckoutOrderOperation as originalGetOperation } from '@farfetch/blackout-client';
import fetchCheckoutOrderOperation from '../fetchCheckoutOrderOperation';
import type { AnyAction } from 'redux';
import type { MockStoreEnhanced } from 'redux-mock-store';
import type { StoreState } from '../../../types';
import type { ThunkDispatch } from 'redux-thunk';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCheckoutOrderOperation: jest.fn(),
}));

const getOperation = originalGetOperation as jest.MockedFunction<
  typeof originalGetOperation
>;

describe('fetchCheckoutOrderOperation() action creator', () => {
  const params = { orderId: 1, operationId: operation.id };
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const expectedConfig = undefined;
  let store: MockStoreEnhanced<
    StoreState,
    ThunkDispatch<StoreState, undefined, AnyAction>
  >;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({ checkout: INITIAL_STATE }, undefined) as typeof store;
  });

  it('should create the correct actions for when the fetch checkout order operation procedure fails', async () => {
    const expectedError = new Error('fetch checkout error');
    getOperation.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchCheckoutOrderOperation(params));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getOperation).toHaveBeenCalledTimes(1);
      expect(getOperation).toHaveBeenCalledWith(params, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: FETCH_CHECKOUT_ORDER_OPERATION_REQUEST },
          {
            type: FETCH_CHECKOUT_ORDER_OPERATION_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch checkout order operation procedure is successful', async () => {
    getOperation.mockResolvedValueOnce(operation);
    await store.dispatch(fetchCheckoutOrderOperation(params));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getOperation).toHaveBeenCalledTimes(1);
    expect(getOperation).toHaveBeenCalledWith(params, expectedConfig);
    expect(actionResults).toEqual([
      { type: FETCH_CHECKOUT_ORDER_OPERATION_REQUEST },
      {
        type: FETCH_CHECKOUT_ORDER_OPERATION_SUCCESS,
        payload: mockGetOperationActionPayload,
      },
    ]);
  });
});

import * as normalizr from 'normalizr';
import {
  FETCH_CHECKOUT_ORDER_OPERATIONS_FAILURE,
  FETCH_CHECKOUT_ORDER_OPERATIONS_REQUEST,
  FETCH_CHECKOUT_ORDER_OPERATIONS_SUCCESS,
} from '../../actionTypes';
import { fetchCheckoutOrderOperations } from '..';
import {
  GetCheckoutOrderOperationsQuery,
  getCheckoutOrderOperations as originalGetOperations,
} from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import {
  mockGetOperationsActionPayload,
  mockGetOperationsResponse,
} from 'tests/__fixtures__/checkout';
import { mockStore } from '../../../../tests';
import type { AnyAction } from 'redux';
import type { MockStoreEnhanced } from 'redux-mock-store';
import type { StoreState } from '../../../types';
import type { ThunkDispatch } from 'redux-thunk';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCheckoutOrderOperations: jest.fn(),
}));

const getOperations = originalGetOperations as jest.MockedFunction<
  typeof originalGetOperations
>;

describe('fetchCheckoutOrderOperations() action creator', () => {
  const orderId = 1;
  const query: GetCheckoutOrderOperationsQuery = {
    page: 1,
    pageSize: 10,
    sort: ['createdDate:asc'],
  };
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

  it('should create the correct actions for when the fetch checkout order operations procedure fails', async () => {
    const expectedError = new Error('fetch checkout error');
    getOperations.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchCheckoutOrderOperations(orderId, query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getOperations).toHaveBeenCalledTimes(1);
      expect(getOperations).toHaveBeenCalledWith(
        orderId,
        query,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: FETCH_CHECKOUT_ORDER_OPERATIONS_REQUEST },
          {
            type: FETCH_CHECKOUT_ORDER_OPERATIONS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch checkout order operations procedure is successful', async () => {
    getOperations.mockResolvedValueOnce(mockGetOperationsResponse);

    await store.dispatch(fetchCheckoutOrderOperations(orderId, query));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getOperations).toHaveBeenCalledTimes(1);
    expect(getOperations).toHaveBeenCalledWith(orderId, query, expectedConfig);
    expect(actionResults).toEqual([
      { type: FETCH_CHECKOUT_ORDER_OPERATIONS_REQUEST },
      {
        type: FETCH_CHECKOUT_ORDER_OPERATIONS_SUCCESS,
        payload: mockGetOperationsActionPayload,
      },
    ]);
  });
});

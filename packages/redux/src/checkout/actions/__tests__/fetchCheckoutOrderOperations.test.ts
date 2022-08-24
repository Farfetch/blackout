import * as normalizr from 'normalizr';
import {
  FETCH_CHECKOUT_ORDER_OPERATIONS_FAILURE,
  FETCH_CHECKOUT_ORDER_OPERATIONS_REQUEST,
  FETCH_CHECKOUT_ORDER_OPERATIONS_SUCCESS,
} from '../../actionTypes';
import { fetchCheckoutOrderOperations } from '..';
import {
  getCheckoutOrderOperations,
  GetCheckoutOrderOperationsQuery,
} from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import {
  mockGetOperationsActionPayload,
  mockGetOperationsResponse,
} from 'tests/__fixtures__/checkout';
import { mockStore } from '../../../../tests';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCheckoutOrderOperations: jest.fn(),
}));

describe('fetchCheckoutOrderOperations() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);

  const orderId = 1;
  const query: GetCheckoutOrderOperationsQuery = {
    page: 1,
    pageSize: 10,
    sort: ['createdDate:asc'],
  };
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const expectedConfig = undefined;
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({ checkout: INITIAL_STATE }, undefined) as typeof store;
  });

  it('should create the correct actions for when the fetch checkout order operations procedure fails', async () => {
    const expectedError = new Error('fetch checkout order operations error');
    (getCheckoutOrderOperations as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );
    expect.assertions(4);

    await fetchCheckoutOrderOperations(
      orderId,
      query,
    )(store.dispatch).catch(error => {
      expect(error).toBe(expectedError);
      expect(getCheckoutOrderOperations).toHaveBeenCalledTimes(1);
      expect(getCheckoutOrderOperations).toHaveBeenCalledWith(
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
    });
  });

  it('should create the correct actions for when the fetch checkout order operations procedure is successful', async () => {
    (getCheckoutOrderOperations as jest.Mock).mockResolvedValueOnce(
      mockGetOperationsResponse,
    );

    await fetchCheckoutOrderOperations(
      orderId,
      query,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockGetOperationsResponse);
    });

    const actionResults = store.getActions();

    expect.assertions(5);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrderOperations).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrderOperations).toHaveBeenCalledWith(
      orderId,
      query,
      expectedConfig,
    );
    expect(actionResults).toEqual([
      { type: FETCH_CHECKOUT_ORDER_OPERATIONS_REQUEST },
      {
        type: FETCH_CHECKOUT_ORDER_OPERATIONS_SUCCESS,
        payload: mockGetOperationsActionPayload,
      },
    ]);
  });
});

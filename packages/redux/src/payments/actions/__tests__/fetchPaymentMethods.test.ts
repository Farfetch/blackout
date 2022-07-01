import * as actionTypes from '../../actionTypes';
import { getPaymentMethods } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockFetchPaymentMethodsResponse } from 'tests/__fixtures__/payments';
import { mockStore } from '../../../../tests';
import fetchPaymentMethods from '../fetchPaymentMethods';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getPaymentMethods: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('fetchPaymentMethods() action creator', () => {
  const orderId = 123123;

  const expectedPaymentMethodsResult = {
    entities: {
      checkout: {
        [orderId]: {
          paymentMethods: mockFetchPaymentMethodsResponse,
        },
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the fetch payment methods procedure fails', async () => {
    const expectedError = new Error('fetch payment methods error');

    getPaymentMethods.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchPaymentMethods(orderId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPaymentMethods).toHaveBeenCalledTimes(1);
      expect(getPaymentMethods).toHaveBeenCalledWith(orderId, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_PAYMENT_METHODS_REQUEST },
          {
            type: actionTypes.FETCH_PAYMENT_METHODS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch payment methods procedure is successful', async () => {
    getPaymentMethods.mockResolvedValueOnce(mockFetchPaymentMethodsResponse);
    await store.dispatch(fetchPaymentMethods(orderId));

    const actionResults = store.getActions();

    expect(getPaymentMethods).toHaveBeenCalledTimes(1);
    expect(getPaymentMethods).toHaveBeenCalledWith(orderId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_PAYMENT_METHODS_REQUEST },
      {
        type: actionTypes.FETCH_PAYMENT_METHODS_SUCCESS,
        payload: expectedPaymentMethodsResult,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_PAYMENT_METHODS_SUCCESS,
      }),
    ).toMatchSnapshot('fetch payment methods success payload');
  });
});

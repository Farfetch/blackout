import * as actionTypes from '../../actionTypes';
import { getPaymentMethodsByIntent } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockFetchPaymentMethodsResponse } from 'tests/__fixtures__/payments';
import { mockStore } from '../../../../tests';
import fetchPaymentMethodsByIntent from '../fetchPaymentMethodsByIntent';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getPaymentMethodsByIntent: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ payments: INITIAL_STATE }, state);

const intentId = '123123';
const expectedConfig = undefined;
let store;

describe('fetchPaymentMethodsByIntent() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions when the get payment methods by intent procedure fails', async () => {
    const expectedError = new Error('get payment methods by intent error');

    getPaymentMethodsByIntent.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchPaymentMethodsByIntent(intentId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPaymentMethodsByIntent).toHaveBeenCalledTimes(1);
      expect(getPaymentMethodsByIntent).toHaveBeenCalledWith(
        intentId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.FETCH_PAYMENT_METHODS_BY_INTENT_REQUEST,
          },
          {
            type: actionTypes.FETCH_PAYMENT_METHODS_BY_INTENT_FAILURE,

            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions when the get payment methods by intent procedure is successful', async () => {
    getPaymentMethodsByIntent.mockResolvedValueOnce(
      mockFetchPaymentMethodsResponse,
    );
    await store.dispatch(fetchPaymentMethodsByIntent(intentId));

    const actionResults = store.getActions();

    expect(getPaymentMethodsByIntent).toHaveBeenCalledTimes(1);
    expect(getPaymentMethodsByIntent).toHaveBeenCalledWith(
      intentId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.FETCH_PAYMENT_METHODS_BY_INTENT_REQUEST,
      },
      {
        type: actionTypes.FETCH_PAYMENT_METHODS_BY_INTENT_SUCCESS,
        payload: mockFetchPaymentMethodsResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_PAYMENT_METHODS_BY_INTENT_SUCCESS,
      }),
    ).toMatchSnapshot('get payment methods by intent success payload');
  });
});

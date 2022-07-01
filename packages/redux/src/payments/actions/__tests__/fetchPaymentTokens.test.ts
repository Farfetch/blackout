import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import {
  expectedPaymentTokensNormalizedPayload,
  mockPaymentTokensResponse,
} from 'tests/__fixtures__/payments';
import { getPaymentTokens } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import fetchPaymentTokens from '../fetchPaymentTokens';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getPaymentTokens: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: INITIAL_STATE }, state);

const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

describe('fetchPaymentTokens() action creator', () => {
  const query = {
    orderId: 1,
    showExpiredCards: false,
  };
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the fetch payment tokens procedure fails', async () => {
    const expectedError = new Error('fetch payment tokens error');

    getPaymentTokens.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchPaymentTokens(query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPaymentTokens).toHaveBeenCalledTimes(1);
      expect(getPaymentTokens).toHaveBeenCalledWith(query, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_PAYMENT_TOKENS_REQUEST },
          {
            type: actionTypes.FETCH_PAYMENT_TOKENS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch payment tokens procedure is successful', async () => {
    getPaymentTokens.mockResolvedValueOnce(mockPaymentTokensResponse);
    await store.dispatch(fetchPaymentTokens(query));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getPaymentTokens).toHaveBeenCalledTimes(1);
    expect(getPaymentTokens).toHaveBeenCalledWith(query, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_PAYMENT_TOKENS_REQUEST },
      {
        type: actionTypes.FETCH_PAYMENT_TOKENS_SUCCESS,
        payload: expectedPaymentTokensNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_PAYMENT_TOKENS_SUCCESS,
      }),
    ).toMatchSnapshot('fetch payment tokens success payload');
  });
});

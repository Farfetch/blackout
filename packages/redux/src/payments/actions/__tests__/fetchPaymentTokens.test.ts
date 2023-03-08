import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import {
  expectedPaymentTokensNormalizedPayload,
  mockPaymentTokensResponse,
} from 'tests/__fixtures__/payments/index.mjs';
import { find } from 'lodash-es';
import { getPaymentTokens } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import fetchPaymentTokens from '../fetchPaymentTokens.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getPaymentTokens: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: INITIAL_STATE }, state);

const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store: ReturnType<typeof paymentsMockStore>;

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

    (getPaymentTokens as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchPaymentTokens(query)(store.dispatch),
    ).rejects.toThrow(expectedError);

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
  });

  it('should create the correct actions for when the fetch payment tokens procedure is successful', async () => {
    (getPaymentTokens as jest.Mock).mockResolvedValueOnce(
      mockPaymentTokensResponse,
    );
    await fetchPaymentTokens(query)(store.dispatch);

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

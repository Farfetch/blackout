import * as actionTypes from '../../actionTypes.js';
import { find } from 'lodash-es';
import { getUserCreditBalance } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import { mockCreditBalanceResponse } from 'tests/__fixtures__/payments/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import fetchCreditBalance from '../fetchUserCreditBalance.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUserCreditBalance: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ payments: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof paymentsMockStore>;

describe('fetchUserCreditBalance() action creator', () => {
  const data = {
    creditUserId: '1234567',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the fetch user credit balance procedure fails', async () => {
    const expectedError = new Error('fetch user credit balance error');

    (getUserCreditBalance as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchCreditBalance(data)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getUserCreditBalance).toHaveBeenCalledTimes(1);
    expect(getUserCreditBalance).toHaveBeenCalledWith(data, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_USER_CREDIT_BALANCE_REQUEST },
        {
          type: actionTypes.FETCH_USER_CREDIT_BALANCE_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the fetch user credit balance procedure is successful', async () => {
    (getUserCreditBalance as jest.Mock).mockResolvedValueOnce(
      mockCreditBalanceResponse,
    );
    await fetchCreditBalance(data)(store.dispatch);

    const actionResults = store.getActions();

    expect(getUserCreditBalance).toHaveBeenCalledTimes(1);
    expect(getUserCreditBalance).toHaveBeenCalledWith(data, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_USER_CREDIT_BALANCE_REQUEST },
      {
        type: actionTypes.FETCH_USER_CREDIT_BALANCE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_USER_CREDIT_BALANCE_SUCCESS,
      }),
    ).toMatchSnapshot('fetch user credit balance success payload');
  });
});

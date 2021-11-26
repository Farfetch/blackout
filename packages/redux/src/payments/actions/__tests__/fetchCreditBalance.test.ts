import { actionTypes } from '../..';
import { INITIAL_STATE } from '../../reducer';
import { mockCreditBalanceResponse } from 'tests/__fixtures__/payments';
import { mockStore } from '../../../../tests';
import { postCheckCreditBalance } from '@farfetch/blackout-client/payments';
import fetchCreditBalance from '../fetchCreditBalance';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/payments', () => ({
  ...jest.requireActual('@farfetch/blackout-client/payments'),
  postCheckCreditBalance: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ payments: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('fetchCreditBalance() action creator', () => {
  const data = {
    creditUserId: '1234567',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the fetch credit balance procedure fails', async () => {
    const expectedError = new Error('fetch credit balance error');

    postCheckCreditBalance.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchCreditBalance(data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postCheckCreditBalance).toHaveBeenCalledTimes(1);
      expect(postCheckCreditBalance).toHaveBeenCalledWith(data, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_CREDIT_BALANCE_REQUEST },
          {
            type: actionTypes.FETCH_CREDIT_BALANCE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch credit balance procedure is successful', async () => {
    postCheckCreditBalance.mockResolvedValueOnce(mockCreditBalanceResponse);
    await store.dispatch(fetchCreditBalance(data));

    const actionResults = store.getActions();

    expect(postCheckCreditBalance).toHaveBeenCalledTimes(1);
    expect(postCheckCreditBalance).toHaveBeenCalledWith(data, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_CREDIT_BALANCE_REQUEST },
      {
        type: actionTypes.FETCH_CREDIT_BALANCE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_CREDIT_BALANCE_SUCCESS,
      }),
    ).toMatchSnapshot('fetch credit balance success payload');
  });
});

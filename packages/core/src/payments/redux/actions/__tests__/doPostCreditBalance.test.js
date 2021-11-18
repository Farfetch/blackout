import { mockCreditBalanceResponse } from '../../__fixtures__/credit.fixtures';
import { mockStore } from '../../../../../tests';
import doPostCreditBalance from '../doPostCreditBalance';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const paymentsMockStore = (state = {}) =>
  mockStore({ payments: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doPostCreditBalance() action creator', () => {
  const postCreditBalance = jest.fn();
  const action = doPostCreditBalance(postCreditBalance);
  const data = {
    creditUserId: '1234567',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the post credit balance procedure fails', async () => {
    const expectedError = new Error('post credit balance error');

    postCreditBalance.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postCreditBalance).toHaveBeenCalledTimes(1);
      expect(postCreditBalance).toHaveBeenCalledWith(data, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.POST_CREDIT_BALANCE_REQUEST },
          {
            type: actionTypes.POST_CREDIT_BALANCE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the post credit balance procedure is successful', async () => {
    postCreditBalance.mockResolvedValueOnce(mockCreditBalanceResponse);
    await store.dispatch(action(data));

    const actionResults = store.getActions();

    expect(postCreditBalance).toHaveBeenCalledTimes(1);
    expect(postCreditBalance).toHaveBeenCalledWith(data, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.POST_CREDIT_BALANCE_REQUEST },
      {
        type: actionTypes.POST_CREDIT_BALANCE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.POST_CREDIT_BALANCE_SUCCESS,
      }),
    ).toMatchSnapshot('post credit balance success payload');
  });
});

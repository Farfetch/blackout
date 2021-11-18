import { mockPayTransaction } from '../../__fixtures__/payTransaction.fixtures';
import { mockStore } from '../../../../../tests';
import doPayTransaction from '../doPayTransaction';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doPayTransaction() action creator', () => {
  const payTransaction = jest.fn();
  const action = doPayTransaction(payTransaction);
  const transactionId = 1;
  const data = {
    something: 'something',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the pay transaction procedure fails', async () => {
    const expectedError = new Error('pay transaction error');

    payTransaction.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(transactionId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(payTransaction).toHaveBeenCalledTimes(1);
      expect(payTransaction).toHaveBeenCalledWith(
        transactionId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.POST_TRANSACTION_REQUEST },
          {
            type: actionTypes.POST_TRANSACTION_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the pay transaction procedure is successful', async () => {
    payTransaction.mockResolvedValueOnce(mockPayTransaction);
    await store.dispatch(action(transactionId, data));

    const actionResults = store.getActions();

    expect(payTransaction).toHaveBeenCalledTimes(1);
    expect(payTransaction).toHaveBeenCalledWith(
      transactionId,
      data,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.POST_TRANSACTION_REQUEST },
      {
        type: actionTypes.POST_TRANSACTION_SUCCESS,
        payload: { result: mockPayTransaction },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.POST_TRANSACTION_SUCCESS,
      }),
    ).toMatchSnapshot('pay transaction success payload');
  });
});

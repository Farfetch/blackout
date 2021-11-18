import {
  expectedGetTransactionNormalizedPayload,
  mockGetTransaction,
} from '../../__fixtures__/getTransaction.fixtures';
import { mockStore } from '../../../../../tests';
import doGetTransaction from '../doGetTransaction';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: reducer() }, state);

const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
const expectedConfig = undefined;
let store;

describe('doGetTransaction() action creator', () => {
  const getTransaction = jest.fn();
  const action = doGetTransaction(getTransaction);
  const transactionId = 1;

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the get transaction procedure fails', async () => {
    const expectedError = new Error('get transaction error');

    getTransaction.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action({ transactionId }));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getTransaction).toHaveBeenCalledTimes(1);
      expect(getTransaction).toHaveBeenCalledWith(
        { transactionId },
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_TRANSACTION_REQUEST },
          {
            type: actionTypes.GET_TRANSACTION_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get transaction procedure is successful', async () => {
    getTransaction.mockResolvedValueOnce(mockGetTransaction);
    await store.dispatch(action({ transactionId }));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getTransaction).toHaveBeenCalledTimes(1);
    expect(getTransaction).toHaveBeenCalledWith(
      { transactionId },
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_TRANSACTION_REQUEST },
      {
        type: actionTypes.GET_TRANSACTION_SUCCESS,
        payload: expectedGetTransactionNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_TRANSACTION_SUCCESS,
      }),
    ).toMatchSnapshot('get transaction success payload');
  });
});

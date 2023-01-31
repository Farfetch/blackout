import {
  mockDeletePaymentTokenResponse,
  paymentTokenId,
} from '../../__fixtures__/paymentTokens.fixtures';
import { mockStore } from '../../../../../tests';
import doDeletePaymentToken from '../doDeletePaymentToken';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doDeletePaymentToken() action creator', () => {
  const deletePaymentToken = jest.fn();
  const action = doDeletePaymentToken(deletePaymentToken);

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the delete payment token procedure fails', async () => {
    const expectedError = new Error('delete payment token error');

    deletePaymentToken.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(paymentTokenId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(deletePaymentToken).toHaveBeenCalledTimes(1);
      expect(deletePaymentToken).toHaveBeenCalledWith(
        paymentTokenId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.DELETE_PAYMENT_TOKEN_REQUEST },
          {
            type: actionTypes.DELETE_PAYMENT_TOKEN_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the delete payment token procedure is successful', async () => {
    deletePaymentToken.mockResolvedValueOnce(mockDeletePaymentTokenResponse);
    await store.dispatch(action(paymentTokenId));

    const actionResults = store.getActions();

    expect(deletePaymentToken).toHaveBeenCalledTimes(1);
    expect(deletePaymentToken).toHaveBeenCalledWith(
      paymentTokenId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.DELETE_PAYMENT_TOKEN_REQUEST },
      {
        meta: { id: paymentTokenId },
        type: actionTypes.DELETE_PAYMENT_TOKEN_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.DELETE_PAYMENT_TOKEN_SUCCESS,
      }),
    ).toMatchSnapshot('delete payment token success payload');
  });
});

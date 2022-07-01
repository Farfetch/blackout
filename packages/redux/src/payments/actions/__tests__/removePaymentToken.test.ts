import * as actionTypes from '../../actionTypes';
import { deletePaymentToken } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import {
  mockRemovePaymentTokenResponse,
  paymentTokenId,
} from 'tests/__fixtures__/payments';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import removePaymentToken from '../removePaymentToken';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deletePaymentToken: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('removePaymentToken() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the remove payment token procedure fails', async () => {
    const expectedError = new Error('remove payment token error');

    deletePaymentToken.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(removePaymentToken(paymentTokenId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(deletePaymentToken).toHaveBeenCalledTimes(1);
      expect(deletePaymentToken).toHaveBeenCalledWith(
        paymentTokenId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.REMOVE_PAYMENT_TOKEN_REQUEST },
          {
            type: actionTypes.REMOVE_PAYMENT_TOKEN_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the remove payment token procedure is successful', async () => {
    deletePaymentToken.mockResolvedValueOnce(mockRemovePaymentTokenResponse);
    await store.dispatch(removePaymentToken(paymentTokenId));

    const actionResults = store.getActions();

    expect(deletePaymentToken).toHaveBeenCalledTimes(1);
    expect(deletePaymentToken).toHaveBeenCalledWith(
      paymentTokenId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.REMOVE_PAYMENT_TOKEN_REQUEST },
      {
        meta: { id: paymentTokenId },
        type: actionTypes.REMOVE_PAYMENT_TOKEN_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REMOVE_PAYMENT_TOKEN_SUCCESS,
      }),
    ).toMatchSnapshot('remove payment token success payload');
  });
});

import * as actionTypes from '../../actionTypes.js';
import { deletePaymentToken } from '@farfetch/blackout-client';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import {
  mockRemovePaymentTokenResponse,
  paymentTokenId,
} from 'tests/__fixtures__/payments/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import removePaymentToken from '../removePaymentToken.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deletePaymentToken: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof paymentsMockStore>;

describe('removePaymentToken() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the remove payment token procedure fails', async () => {
    const expectedError = new Error('remove payment token error');

    (deletePaymentToken as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await removePaymentToken(paymentTokenId)(store.dispatch),
    ).rejects.toThrow(expectedError);

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
  });

  it('should create the correct actions for when the remove payment token procedure is successful', async () => {
    (deletePaymentToken as jest.Mock).mockResolvedValueOnce(
      mockRemovePaymentTokenResponse,
    );
    await removePaymentToken(paymentTokenId)(store.dispatch);

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

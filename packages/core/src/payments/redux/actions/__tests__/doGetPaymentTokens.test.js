import {
  expectedPaymentTokensNormalizedPayload,
  mockPaymentTokensResponse,
} from '../../__fixtures__/paymentTokens.fixtures';
import { mockStore } from '../../../../../tests';
import doGetPaymentTokens from '../doGetPaymentTokens';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: reducer() }, state);

const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
const expectedConfig = undefined;
let store;

describe('doGetPaymentTokens() action creator', () => {
  const getPaymentTokens = jest.fn();
  const action = doGetPaymentTokens(getPaymentTokens);
  const query = {
    orderId: 1,
    showExpiredCards: false,
  };
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the get payment tokens procedure fails', async () => {
    const expectedError = new Error('get payment tokens error');

    getPaymentTokens.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPaymentTokens).toHaveBeenCalledTimes(1);
      expect(getPaymentTokens).toHaveBeenCalledWith(query, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_PAYMENT_TOKENS_REQUEST },
          {
            type: actionTypes.GET_PAYMENT_TOKENS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get payment tokens procedure is successful', async () => {
    getPaymentTokens.mockResolvedValueOnce(mockPaymentTokensResponse);
    await store.dispatch(action(query));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getPaymentTokens).toHaveBeenCalledTimes(1);
    expect(getPaymentTokens).toHaveBeenCalledWith(query, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_PAYMENT_TOKENS_REQUEST },
      {
        type: actionTypes.GET_PAYMENT_TOKENS_SUCCESS,
        payload: expectedPaymentTokensNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_PAYMENT_TOKENS_SUCCESS,
      }),
    ).toMatchSnapshot('get payment tokens success payload');
  });
});

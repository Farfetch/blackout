import { mockGetPaymentMethodsResponse } from '../../__fixtures__/getPaymentMethods.fixtures';
import { mockStore } from '../../../../../tests';
import doGetPaymentMethodsByIntent from '../doGetPaymentMethodsByIntent';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const paymentsMockStore = (state = {}) =>
  mockStore({ payments: reducer() }, state);

const intentId = '123123';
const expectedConfig = undefined;
let store;

describe('doGetPaymentMethodsByIntent() action creator', () => {
  const getPaymentMethodsByIntent = jest.fn();
  const action = doGetPaymentMethodsByIntent(getPaymentMethodsByIntent);

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions when the get payment methods by intent procedure fails', async () => {
    const expectedError = new Error('get payment methods by intent error');

    getPaymentMethodsByIntent.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(intentId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPaymentMethodsByIntent).toHaveBeenCalledTimes(1);
      expect(getPaymentMethodsByIntent).toHaveBeenCalledWith(
        intentId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.GET_PAYMENT_METHODS_BY_INTENT_REQUEST,
          },
          {
            type: actionTypes.GET_PAYMENT_METHODS_BY_INTENT_FAILURE,

            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions when the get payment methods by intent procedure is successful', async () => {
    getPaymentMethodsByIntent.mockResolvedValueOnce(
      mockGetPaymentMethodsResponse,
    );
    await store.dispatch(action(intentId));

    const actionResults = store.getActions();

    expect(getPaymentMethodsByIntent).toHaveBeenCalledTimes(1);
    expect(getPaymentMethodsByIntent).toHaveBeenCalledWith(
      intentId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.GET_PAYMENT_METHODS_BY_INTENT_REQUEST,
      },
      {
        type: actionTypes.GET_PAYMENT_METHODS_BY_INTENT_SUCCESS,
        payload: mockGetPaymentMethodsResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_PAYMENT_METHODS_BY_INTENT_SUCCESS,
      }),
    ).toMatchSnapshot('get payment methods by intent success payload');
  });
});

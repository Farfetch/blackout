import { mockGetPaymentMethodsResponse } from '../../__fixtures__/getPaymentMethods.fixtures';
import { mockStore } from '../../../../../tests';
import doGetPaymentMethods from '../doGetPaymentMethods';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doGetPaymentMethods() action creator', () => {
  const orderId = '123123';
  const getPaymentMethods = jest.fn();
  const action = doGetPaymentMethods(getPaymentMethods);

  const expectedPaymentMethodsResult = {
    entities: {
      checkout: {
        [orderId]: {
          paymentMethods: mockGetPaymentMethodsResponse,
        },
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the payment methods procedure fails', async () => {
    const expectedError = new Error('payment methods methods error');

    getPaymentMethods.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(orderId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPaymentMethods).toHaveBeenCalledTimes(1);
      expect(getPaymentMethods).toHaveBeenCalledWith(orderId, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_PAYMENT_METHODS_REQUEST },
          {
            type: actionTypes.GET_PAYMENT_METHODS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the payment methods procedure is successful', async () => {
    getPaymentMethods.mockResolvedValueOnce(mockGetPaymentMethodsResponse);
    await store.dispatch(action(orderId));

    const actionResults = store.getActions();

    expect(getPaymentMethods).toHaveBeenCalledTimes(1);
    expect(getPaymentMethods).toHaveBeenCalledWith(orderId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_PAYMENT_METHODS_REQUEST },
      {
        type: actionTypes.GET_PAYMENT_METHODS_SUCCESS,
        payload: expectedPaymentMethodsResult,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_PAYMENT_METHODS_SUCCESS,
      }),
    ).toMatchSnapshot('payment methods success payload');
  });
});

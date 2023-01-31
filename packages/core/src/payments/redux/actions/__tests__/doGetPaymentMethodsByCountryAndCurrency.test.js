import { mockGetPaymentMethodsResponse } from '../../__fixtures__/getPaymentMethods.fixtures';
import { mockStore } from '../../../../../tests';
import doGetPaymentMethodsByCountryAndCurrency from '../doGetPaymentMethodsByCountryAndCurrency';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const paymentsMockStore = (state = {}) =>
  mockStore({ payments: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doGetPaymentMethodsByCountryAndCurrency() action creator', () => {
  const getPaymentMethodsByCountryAndCurrency = jest.fn();
  const action = doGetPaymentMethodsByCountryAndCurrency(
    getPaymentMethodsByCountryAndCurrency,
  );

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions when the get payment methods procedure fails', async () => {
    const expectedError = new Error('get payment methods error');

    getPaymentMethodsByCountryAndCurrency.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action());
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPaymentMethodsByCountryAndCurrency).toHaveBeenCalledTimes(1);
      expect(getPaymentMethodsByCountryAndCurrency).toHaveBeenCalledWith(
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.GET_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_REQUEST,
          },
          {
            type: actionTypes.GET_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_FAILURE,

            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions when the get payment methods procedure is successful', async () => {
    getPaymentMethodsByCountryAndCurrency.mockResolvedValueOnce(
      mockGetPaymentMethodsResponse,
    );
    await store.dispatch(action());

    const actionResults = store.getActions();

    expect(getPaymentMethodsByCountryAndCurrency).toHaveBeenCalledTimes(1);
    expect(getPaymentMethodsByCountryAndCurrency).toHaveBeenCalledWith(
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.GET_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_REQUEST,
      },
      {
        type: actionTypes.GET_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_SUCCESS,
        payload: mockGetPaymentMethodsResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_SUCCESS,
      }),
    ).toMatchSnapshot('get payment methods success payload');
  });
});

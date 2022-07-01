import * as actionTypes from '../../actionTypes';
import { fetchCheckoutOrderCharge } from '..';
import { getCheckoutOrderCharge } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockCharges } from 'tests/__fixtures__/checkout';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCheckoutOrderCharge: jest.fn(),
}));

describe('fetchCheckoutOrderCharge() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const orderId = '12345';
  const chargeId = 'eb92d414-68de-496e-96db-a0c6582b74d4';
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the charge procedure fails', async () => {
    const expectedError = new Error('charges error');

    getCheckoutOrderCharge.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchCheckoutOrderCharge(orderId, chargeId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCheckoutOrderCharge).toHaveBeenCalledTimes(1);
      expect(getCheckoutOrderCharge).toHaveBeenCalledWith(
        orderId,
        chargeId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_CHECKOUT_ORDER_CHARGE_REQUEST },
          {
            type: actionTypes.FETCH_CHECKOUT_ORDER_CHARGE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the charge procedure is successful', async () => {
    getCheckoutOrderCharge.mockResolvedValueOnce(mockCharges);
    await store.dispatch(fetchCheckoutOrderCharge(orderId, chargeId));

    const actionResults = store.getActions();

    expect(getCheckoutOrderCharge).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrderCharge).toHaveBeenCalledWith(
      orderId,
      chargeId,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_CHECKOUT_ORDER_CHARGE_REQUEST },
      {
        type: actionTypes.FETCH_CHECKOUT_ORDER_CHARGE_SUCCESS,
        payload: mockCharges,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_CHECKOUT_ORDER_CHARGE_SUCCESS,
      }),
    ).toMatchSnapshot('charge success payload');
  });
});

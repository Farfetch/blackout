import { checkoutActionTypes } from '../..';
import { createCheckoutOrderCharge } from '..';
import { INITIAL_STATE } from '../../reducer';
import { mockCharges } from 'tests/__fixtures__/checkout';
import { mockStore } from '../../../../tests';
import { postCheckoutOrderCharges } from '@farfetch/blackout-client';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postCheckoutOrderCharges: jest.fn(),
}));

describe('createCheckoutOrderCharge() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const data = {
    redirectUrl: 'string',
    returnUrl: 'string',
    cancelUrl: 'string',
  };
  const orderId = 12345;
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the charge procedure fails', async () => {
    const expectedError = new Error('charges error');

    postCheckoutOrderCharges.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(createCheckoutOrderCharge(orderId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postCheckoutOrderCharges).toHaveBeenCalledTimes(1);
      expect(postCheckoutOrderCharges).toHaveBeenCalledWith(
        orderId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: checkoutActionTypes.CREATE_CHECKOUT_ORDER_CHARGE_REQUEST },
          {
            type: checkoutActionTypes.CREATE_CHECKOUT_ORDER_CHARGE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the charge procedure is successful', async () => {
    postCheckoutOrderCharges.mockResolvedValueOnce(mockCharges);
    await store.dispatch(createCheckoutOrderCharge(orderId, data));

    const actionResults = store.getActions();

    expect(postCheckoutOrderCharges).toHaveBeenCalledTimes(1);
    expect(postCheckoutOrderCharges).toHaveBeenCalledWith(
      orderId,
      data,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: checkoutActionTypes.CREATE_CHECKOUT_ORDER_CHARGE_REQUEST },
      {
        type: checkoutActionTypes.CREATE_CHECKOUT_ORDER_CHARGE_SUCCESS,
        payload: mockCharges,
      },
    ]);
    expect(
      find(actionResults, {
        type: checkoutActionTypes.CREATE_CHECKOUT_ORDER_CHARGE_SUCCESS,
      }),
    ).toMatchSnapshot('createCheckoutOrderCharge success payload');
  });
});

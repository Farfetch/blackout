import { checkoutActionTypes } from '../../index.js';
import { createCheckoutOrderCharge } from '../index.js';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockCharges } from 'tests/__fixtures__/checkout/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import { postCheckoutOrderCharge } from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postCheckoutOrderCharge: jest.fn(),
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
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the charge procedure fails', async () => {
    const expectedError = new Error('charges error');

    (postCheckoutOrderCharge as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await createCheckoutOrderCharge(orderId, data)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(postCheckoutOrderCharge).toHaveBeenCalledTimes(1);
    expect(postCheckoutOrderCharge).toHaveBeenCalledWith(
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
  });

  it('should create the correct actions for when the charge procedure is successful', async () => {
    (postCheckoutOrderCharge as jest.Mock).mockResolvedValueOnce(mockCharges);

    await createCheckoutOrderCharge(
      orderId,
      data,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockCharges);
    });

    const actionResults = store.getActions();

    expect(postCheckoutOrderCharge).toHaveBeenCalledTimes(1);
    expect(postCheckoutOrderCharge).toHaveBeenCalledWith(
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

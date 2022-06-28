import { actionTypes } from '../..';
import { charge } from '..';
import { INITIAL_STATE } from '../../reducer';
import { mockCharges } from 'tests/__fixtures__/checkout';
import { mockStore } from '../../../../tests';
import { postCheckoutOrderCharges } from '@farfetch/blackout-client';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postCheckoutOrderCharges: jest.fn(),
}));

describe('charge() action creator', () => {
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
      await store.dispatch(charge(orderId, data));
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
          { type: actionTypes.CHARGE_REQUEST },
          {
            type: actionTypes.CHARGE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the charge procedure is successful', async () => {
    postCheckoutOrderCharges.mockResolvedValueOnce(mockCharges);
    await store.dispatch(charge(orderId, data));

    const actionResults = store.getActions();

    expect(postCheckoutOrderCharges).toHaveBeenCalledTimes(1);
    expect(postCheckoutOrderCharges).toHaveBeenCalledWith(
      orderId,
      data,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.CHARGE_REQUEST },
      {
        type: actionTypes.CHARGE_SUCCESS,
        payload: mockCharges,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CHARGE_SUCCESS,
      }),
    ).toMatchSnapshot('charge success payload');
  });
});

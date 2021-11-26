import { actionTypes } from '../..';
import {
  chargeId,
  mockCharge,
  mockChargeWithoutHeaders,
} from 'tests/__fixtures__/payments';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { postCharges } from '@farfetch/blackout-client/payments';
import charge from '../charge';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/payments', () => ({
  ...jest.requireActual('@farfetch/blackout-client/payments'),
  postCharges: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ payments: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('charge() action creator', () => {
  const intentId = '123123';
  const data = {
    returnUrl: '',
    cancelUrl: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the charge procedure fails', async () => {
    const expectedError = new Error('charge error');

    postCharges.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(charge(intentId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postCharges).toHaveBeenCalledTimes(1);
      expect(postCharges).toHaveBeenCalledWith(intentId, data, expectedConfig);
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
    postCharges.mockResolvedValueOnce(mockCharge);
    await store.dispatch(charge(intentId, data));

    const actionResults = store.getActions();

    expect(postCharges).toHaveBeenCalledTimes(1);
    expect(postCharges).toHaveBeenCalledWith(intentId, data, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.CHARGE_REQUEST },
      {
        type: actionTypes.CHARGE_SUCCESS,
        payload: mockCharge.data,
        meta: { chargeId },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CHARGE_SUCCESS,
      }),
    ).toMatchSnapshot('charge success payload');
  });

  it('should create the correct actions for when the charge procedure is successful even if location header is missing', async () => {
    postCharges.mockResolvedValueOnce(mockChargeWithoutHeaders);
    await store.dispatch(charge(intentId, data));

    const actionResults = store.getActions();

    expect(postCharges).toHaveBeenCalledTimes(1);
    expect(postCharges).toHaveBeenCalledWith(intentId, data, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.CHARGE_REQUEST },
      {
        type: actionTypes.CHARGE_SUCCESS,
        payload: mockChargeWithoutHeaders.data,
        meta: { chargeId: '' },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CHARGE_SUCCESS,
      }),
    ).toMatchSnapshot('charge success payload');
  });
});

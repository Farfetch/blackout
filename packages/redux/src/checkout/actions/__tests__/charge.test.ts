import { actionTypes } from '../..';
import { charge } from '..';
import { INITIAL_STATE } from '../../reducer';
import { mockCharges } from 'tests/__fixtures__/checkout';
import { mockStore } from '../../../../tests';
import { postCharges } from '@farfetch/blackout-client/checkout';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/checkout', () => ({
  ...jest.requireActual('@farfetch/blackout-client/checkout'),
  postCharges: jest.fn(),
}));

describe('charge() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const data = {};
  const orderId = 12345;
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the charge procedure fails', async () => {
    const expectedError = new Error('charges error');

    postCharges.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(charge(orderId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postCharges).toHaveBeenCalledTimes(1);
      expect(postCharges).toHaveBeenCalledWith(orderId, data, expectedConfig);
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
    postCharges.mockResolvedValueOnce(mockCharges);
    await store.dispatch(charge(orderId, data));

    const actionResults = store.getActions();

    expect(postCharges).toHaveBeenCalledTimes(1);
    expect(postCharges).toHaveBeenCalledWith(orderId, data, expectedConfig);

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

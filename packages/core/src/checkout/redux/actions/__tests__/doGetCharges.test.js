import { mockCharges } from '../../__fixtures__/checkout.fixtures';
import { mockStore } from '../../../../../tests';
import doGetCharges from '../doGetCharges';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

describe('doGetCharges() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: reducer() }, state);
  const getCharges = jest.fn();
  const action = doGetCharges(getCharges);
  const orderId = 12345;
  const chargeId = '5c2855d7-f1c0-4d2a-8ce4-5bf7c37f0dc7';
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the post charges procedure fails', async () => {
    const expectedError = new Error('post charges error');

    getCharges.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(orderId, chargeId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCharges).toHaveBeenCalledTimes(1);
      expect(getCharges).toHaveBeenCalledWith(
        orderId,
        chargeId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_CHARGES_REQUEST },
          {
            type: actionTypes.GET_CHARGES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the post charges procedure is successful', async () => {
    getCharges.mockResolvedValueOnce(mockCharges);
    await store.dispatch(action(orderId, chargeId));

    const actionResults = store.getActions();

    expect(getCharges).toHaveBeenCalledTimes(1);
    expect(getCharges).toHaveBeenCalledWith(orderId, chargeId, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_CHARGES_REQUEST },
      {
        type: actionTypes.GET_CHARGES_SUCCESS,
        payload: mockCharges,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_CHARGES_SUCCESS,
      }),
    ).toMatchSnapshot('post charge success payload');
  });
});

import { chargeId, mockPostCharges } from '../../__fixtures__/charges.fixtures';
import { mockStore } from '../../../../../tests';
import doPostCharges from '../doPostCharges';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const paymentsMockStore = (state = {}) =>
  mockStore({ payments: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doPostCharges() action creator', () => {
  const intentId = '123123';
  const data = {
    returnUrl: 'string',
    cancelUrl: 'string',
  };
  const postCharges = jest.fn();
  const action = doPostCharges(postCharges);

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the post charges procedure fails', async () => {
    const expectedError = new Error('post charges error');

    postCharges.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(intentId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postCharges).toHaveBeenCalledTimes(1);
      expect(postCharges).toHaveBeenCalledWith(intentId, data, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.POST_CHARGES_REQUEST },
          {
            type: actionTypes.POST_CHARGES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the post charges procedure is successful', async () => {
    postCharges.mockResolvedValueOnce(mockPostCharges);
    await store.dispatch(action(intentId, data));

    const actionResults = store.getActions();

    expect(postCharges).toHaveBeenCalledTimes(1);
    expect(postCharges).toHaveBeenCalledWith(intentId, data, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.POST_CHARGES_REQUEST },
      {
        type: actionTypes.POST_CHARGES_SUCCESS,
        payload: mockPostCharges.data,
        meta: { chargeId },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.POST_CHARGES_SUCCESS,
      }),
    ).toMatchSnapshot('post charge success payload');
  });
});

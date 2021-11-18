import { mockCharges } from '../../__fixtures__/checkout.fixtures';
import { mockStore } from '../../../../../tests';
import doPostCharges from '../doPostCharges';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

describe('doPostCharges() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: reducer() }, state);
  const data = {};
  const postCharges = jest.fn();
  const action = doPostCharges(postCharges);
  const orderId = 12345;
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the post charges procedure fails', async () => {
    const expectedError = new Error('post charges error');

    postCharges.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(orderId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postCharges).toHaveBeenCalledTimes(1);
      expect(postCharges).toHaveBeenCalledWith(orderId, data, expectedConfig);
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
    postCharges.mockResolvedValueOnce(mockCharges);
    await store.dispatch(action(orderId, data));

    const actionResults = store.getActions();

    expect(postCharges).toHaveBeenCalledTimes(1);
    expect(postCharges).toHaveBeenCalledWith(orderId, data, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.POST_CHARGES_REQUEST },
      {
        type: actionTypes.POST_CHARGES_SUCCESS,
        payload: mockCharges,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.POST_CHARGES_SUCCESS,
      }),
    ).toMatchSnapshot('post charge success payload');
  });
});

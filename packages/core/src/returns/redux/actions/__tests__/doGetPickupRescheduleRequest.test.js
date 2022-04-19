import { mockStore } from '../../../../../tests';
import { responses } from '../../__fixtures__/returns.fixtures';
import doGetPickupRescheduleRequest from '../../actions/doGetPickupRescheduleRequest';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const returnsMockStore = (state = {}) =>
  mockStore({ returns: reducer() }, state);

describe('doGetPickupRescheduleRequest action creator', () => {
  const expectedConfig = undefined;
  let store;

  const getPickupRescheduleRequest = jest.fn();
  const action = doGetPickupRescheduleRequest(getPickupRescheduleRequest);
  const id = '123456';
  const pickupRescheduleId = '5926969';

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should create the correct actions for when the get pickup reschedule request procedure fails', async () => {
    const expectedError = new Error('get pickup reschedule request error');

    getPickupRescheduleRequest.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(id, pickupRescheduleId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPickupRescheduleRequest).toHaveBeenCalledTimes(1);
      expect(getPickupRescheduleRequest).toHaveBeenCalledWith(
        id,
        pickupRescheduleId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_PICKUP_RESCHEDULE_REQUEST_REQUEST },
          {
            type: actionTypes.GET_PICKUP_RESCHEDULE_REQUEST_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get pickup reschedule request procedure is successful', async () => {
    getPickupRescheduleRequest.mockResolvedValueOnce(
      responses.getPickupRescheduleRequest.success,
    );
    await store.dispatch(action(id, pickupRescheduleId));

    const actionResults = store.getActions();

    expect(getPickupRescheduleRequest).toHaveBeenCalledTimes(1);
    expect(getPickupRescheduleRequest).toHaveBeenCalledWith(
      id,
      pickupRescheduleId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_PICKUP_RESCHEDULE_REQUEST_REQUEST },
      {
        type: actionTypes.GET_PICKUP_RESCHEDULE_REQUEST_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_PICKUP_RESCHEDULE_REQUEST_SUCCESS,
      }),
    ).toMatchSnapshot('get pickup reschedule request success payload');
  });
});

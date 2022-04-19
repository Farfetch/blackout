import { mockStore } from '../../../../../tests';
import { responses } from '../../__fixtures__/returns.fixtures';
import doGetPickupRescheduleRequests from '../../actions/doGetPickupRescheduleRequests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const returnsMockStore = (state = {}) =>
  mockStore({ returns: reducer() }, state);

describe('doGetPickupRescheduleRequests action creator', () => {
  const expectedConfig = undefined;
  let store;

  const getPickupRescheduleRequests = jest.fn();
  const action = doGetPickupRescheduleRequests(getPickupRescheduleRequests);
  const id = '123456';

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should create the correct actions for when the get pickup reschedule requests procedure fails', async () => {
    const expectedError = new Error('get pickup reschedule requests error');

    getPickupRescheduleRequests.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(id));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPickupRescheduleRequests).toHaveBeenCalledTimes(1);
      expect(getPickupRescheduleRequests).toHaveBeenCalledWith(
        id,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_PICKUP_RESCHEDULE_REQUESTS_REQUEST },
          {
            type: actionTypes.GET_PICKUP_RESCHEDULE_REQUESTS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get pickup reschedule requests procedure is successful', async () => {
    getPickupRescheduleRequests.mockResolvedValueOnce(responses.get.success);
    await store.dispatch(action(id));

    const actionResults = store.getActions();

    expect(getPickupRescheduleRequests).toHaveBeenCalledTimes(1);
    expect(getPickupRescheduleRequests).toHaveBeenCalledWith(
      id,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_PICKUP_RESCHEDULE_REQUESTS_REQUEST },
      {
        type: actionTypes.GET_PICKUP_RESCHEDULE_REQUESTS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_PICKUP_RESCHEDULE_REQUESTS_SUCCESS,
      }),
    ).toMatchSnapshot('get pickup reschedule requests success payload');
  });
});

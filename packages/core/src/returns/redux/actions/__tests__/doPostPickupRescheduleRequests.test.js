import { mockStore } from '../../../../../tests';
import { responses } from '../../__fixtures__/returns.fixtures';
import doPostPickupRescheduleRequests from '../../actions/doPostPickupRescheduleRequests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const returnsMockStore = (state = {}) =>
  mockStore({ returns: reducer() }, state);

describe('doPostPickupRescheduleRequests() action creator', () => {
  const expectedConfig = undefined;
  let store;

  const postPickupRescheduleRequests = jest.fn();
  const action = doPostPickupRescheduleRequests(postPickupRescheduleRequests);
  const data = {
    id: 'string',
    timeWindow: {
      start: '2022-05-05T10:14:10.938Z',
      end: '2022-05-05T10:14:10.938Z',
    },
    status: 'InProgress',
  };
  const id = '123456';

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should create the correct actions when the post pickup reschedule requests procedure fails', async () => {
    const expectedError = new Error('post pickup reschedule requests error');

    postPickupRescheduleRequests.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(id, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postPickupRescheduleRequests).toHaveBeenCalledTimes(1);
      expect(postPickupRescheduleRequests).toHaveBeenCalledWith(
        id,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.POST_PICKUP_RESCHEDULE_REQUESTS_REQUEST },
          {
            type: actionTypes.POST_PICKUP_RESCHEDULE_REQUESTS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the post pickup reschedule requests procedure is successful', async () => {
    postPickupRescheduleRequests.mockResolvedValueOnce(
      responses.postRescheduleRequests.success,
    );

    await store.dispatch(action(id, data));

    const actionResults = store.getActions();

    expect(postPickupRescheduleRequests).toHaveBeenCalledTimes(1);
    expect(postPickupRescheduleRequests).toHaveBeenCalledWith(
      id,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.POST_PICKUP_RESCHEDULE_REQUESTS_REQUEST },
      {
        type: actionTypes.POST_PICKUP_RESCHEDULE_REQUESTS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.POST_PICKUP_RESCHEDULE_REQUESTS_SUCCESS,
      }),
    ).toMatchSnapshot('post pickup reschedule requests success payload');
  });
});

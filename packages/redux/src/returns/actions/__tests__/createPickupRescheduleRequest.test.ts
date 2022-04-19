import { actionTypes } from '../..';
import { createPickupRescheduleRequest } from '../';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { postPickupRescheduleRequest } from '@farfetch/blackout-client/returns';
import { RescheduleStatus } from '@farfetch/blackout-client/returns/types';
import { responses } from 'tests/__fixtures__/returns';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/returns', () => ({
  ...jest.requireActual('@farfetch/blackout-client/returns'),
  postPickupRescheduleRequest: jest.fn(),
}));

const returnsMockStore = (state = {}) =>
  mockStore({ returns: INITIAL_STATE }, state);

describe('createPickupRescheduleRequest action creator', () => {
  let store = returnsMockStore();
  const id = '12345';
  const data = {
    id: '',
    timeWindow: {
      start: '',
      end: '',
    },
    status: RescheduleStatus.InProgress,
  };
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should create the correct actions for when the create pickup reschedule request procedure fails', async () => {
    const expectedError = new Error('create pickup reschedule request error');

    (postPickupRescheduleRequest as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );
    expect.assertions(4);

    try {
      await store.dispatch(createPickupRescheduleRequest(id, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postPickupRescheduleRequest).toHaveBeenCalledTimes(1);
      expect(postPickupRescheduleRequest).toHaveBeenCalledWith(
        id,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.CREATE_PICKUP_RESCHEDULE_REQUEST_REQUEST },
          {
            type: actionTypes.CREATE_PICKUP_RESCHEDULE_REQUEST_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the create pickup reschedule request procedure is successful', async () => {
    (postPickupRescheduleRequest as jest.Mock).mockResolvedValueOnce(
      responses.postPickupRescheduleRequests.success,
    );
    await store.dispatch(createPickupRescheduleRequest(id, data));

    const actionResults = store.getActions();

    expect(postPickupRescheduleRequest).toHaveBeenCalledTimes(1);
    expect(postPickupRescheduleRequest).toHaveBeenCalledWith(
      id,
      data,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_PICKUP_RESCHEDULE_REQUEST_REQUEST },
      {
        payload: responses.postPickupRescheduleRequests.success,
        type: actionTypes.CREATE_PICKUP_RESCHEDULE_REQUEST_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_PICKUP_RESCHEDULE_REQUEST_SUCCESS,
      }),
    ).toMatchSnapshot('create pickup reschedule request success payload');
  });
});

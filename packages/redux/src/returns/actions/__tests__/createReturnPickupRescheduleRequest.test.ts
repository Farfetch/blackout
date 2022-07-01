import * as actionTypes from '../../actionTypes';
import { createReturnPickupRescheduleRequest } from '..';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import {
  postReturnPickupRescheduleRequest,
  RescheduleStatus,
} from '@farfetch/blackout-client';
import { responses } from 'tests/__fixtures__/returns';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postReturnPickupRescheduleRequest: jest.fn(),
}));

const returnsMockStore = (state = {}) =>
  mockStore({ returns: INITIAL_STATE }, state);

describe('createReturnPickupRescheduleRequest action creator', () => {
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

    (postReturnPickupRescheduleRequest as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );
    expect.assertions(4);

    try {
      await store.dispatch(createReturnPickupRescheduleRequest(id, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postReturnPickupRescheduleRequest).toHaveBeenCalledTimes(1);
      expect(postReturnPickupRescheduleRequest).toHaveBeenCalledWith(
        id,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.CREATE_RETURN_PICKUP_RESCHEDULE_REQUEST_REQUEST },
          {
            type: actionTypes.CREATE_RETURN_PICKUP_RESCHEDULE_REQUEST_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the create pickup reschedule request procedure is successful', async () => {
    (postReturnPickupRescheduleRequest as jest.Mock).mockResolvedValueOnce(
      responses.postReturnPickupRescheduleRequests.success,
    );
    await store.dispatch(createReturnPickupRescheduleRequest(id, data));

    const actionResults = store.getActions();

    expect(postReturnPickupRescheduleRequest).toHaveBeenCalledTimes(1);
    expect(postReturnPickupRescheduleRequest).toHaveBeenCalledWith(
      id,
      data,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_RETURN_PICKUP_RESCHEDULE_REQUEST_REQUEST },
      {
        payload: responses.postReturnPickupRescheduleRequests.success,
        type: actionTypes.CREATE_RETURN_PICKUP_RESCHEDULE_REQUEST_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_RETURN_PICKUP_RESCHEDULE_REQUEST_SUCCESS,
      }),
    ).toMatchSnapshot('create pickup reschedule request success payload');
  });
});

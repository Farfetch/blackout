import * as actionTypes from '../../actionTypes';
import { fetchReturnPickupRescheduleRequest } from '..';
import { getReturnPickupRescheduleRequest } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import {
  mockPickupCapabilityResponse,
  rescheduleRequestId,
} from 'tests/__fixtures__/returns';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getReturnPickupRescheduleRequest: jest.fn(),
}));

const returnsMockStore = (state = {}) =>
  mockStore({ returns: INITIAL_STATE }, state);

describe('getReturnPickupRescheduleRequest() action creator', () => {
  let store = returnsMockStore();
  const id = '12345';
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should create the correct actions for when the fetch return pickup reschedule request procedure fails', async () => {
    const expectedError = new Error(
      'fetch return pickup reschedule request error',
    );

    (getReturnPickupRescheduleRequest as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );
    expect.assertions(4);

    await fetchReturnPickupRescheduleRequest(
      id,
      rescheduleRequestId,
    )(store.dispatch).catch(error => {
      expect(error).toBe(expectedError);
      expect(getReturnPickupRescheduleRequest).toHaveBeenCalledTimes(1);
      expect(getReturnPickupRescheduleRequest).toHaveBeenCalledWith(
        id,
        rescheduleRequestId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUEST_REQUEST,
          },
          {
            type: actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUEST_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    });
  });

  it('should create the correct actions for when the fetch return pickup reschedule request procedure is successful', async () => {
    (getReturnPickupRescheduleRequest as jest.Mock).mockResolvedValueOnce(
      mockPickupCapabilityResponse,
    );

    await fetchReturnPickupRescheduleRequest(
      id,
      rescheduleRequestId,
    )(store.dispatch);

    const actionResults = store.getActions();

    expect(getReturnPickupRescheduleRequest).toHaveBeenCalledTimes(1);
    expect(getReturnPickupRescheduleRequest).toHaveBeenCalledWith(
      id,
      rescheduleRequestId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUEST_REQUEST },
      {
        type: actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUEST_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUEST_SUCCESS,
      }),
    ).toMatchSnapshot('fetch return pickup reschedule request success payload');
  });
});

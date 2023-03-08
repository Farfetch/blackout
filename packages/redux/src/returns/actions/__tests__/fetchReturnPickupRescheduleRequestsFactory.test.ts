import * as actionTypes from '../../actionTypes.js';
import { fetchReturnPickupRescheduleRequests } from '../index.js';
import { find } from 'lodash-es';
import { getReturnPickupRescheduleRequests } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import { mockPickupReschedulesResponse } from 'tests/__fixtures__/returns/index.mjs';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getReturnPickupRescheduleRequests: jest.fn(),
}));

const returnsMockStore = (state = {}) =>
  mockStore({ returns: INITIAL_STATE }, state);

describe('getReturnPickupRescheduleRequests() action creator', () => {
  let store = returnsMockStore();
  const id = 12345;
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should create the correct actions for when the fetch return pickup reschedule requests procedure fails', async () => {
    const expectedError = new Error(
      'fetch return pickup reschedule requests error',
    );

    (getReturnPickupRescheduleRequests as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () => await fetchReturnPickupRescheduleRequests(id)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getReturnPickupRescheduleRequests).toHaveBeenCalledTimes(1);
    expect(getReturnPickupRescheduleRequests).toHaveBeenCalledWith(
      id,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          type: actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUESTS_REQUEST,
        },
        {
          type: actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUESTS_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the fetch return pickup reschedule requests procedure is successful', async () => {
    (getReturnPickupRescheduleRequests as jest.Mock).mockResolvedValueOnce(
      mockPickupReschedulesResponse,
    );

    await fetchReturnPickupRescheduleRequests(id)(store.dispatch);

    const actionResults = store.getActions();

    expect(getReturnPickupRescheduleRequests).toHaveBeenCalledTimes(1);
    expect(getReturnPickupRescheduleRequests).toHaveBeenCalledWith(
      id,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUESTS_REQUEST },
      {
        type: actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUESTS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUESTS_SUCCESS,
      }),
    ).toMatchSnapshot(
      'fetch return pickup reschedule requests success payload',
    );
  });
});

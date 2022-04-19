import { actionTypes } from '../..';
import { fetchPickupRescheduleRequests } from '..';
import { getPickupRescheduleRequests } from '@farfetch/blackout-client/returns';
import { INITIAL_STATE } from '../../reducer';
import { mockPickupCapabilitiesResponse } from 'tests/__fixtures__/returns';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/returns', () => ({
  ...jest.requireActual('@farfetch/blackout-client/returns'),
  getPickupRescheduleRequests: jest.fn(),
}));

const returnsMockStore = (state = {}) =>
  mockStore({ returns: INITIAL_STATE }, state);

describe('getPickupRescheduleRequests action creator', () => {
  let store = returnsMockStore();
  const id = '12345';
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should create the correct actions for when the fetch pickup reschedule requests procedure fails', async () => {
    const expectedError = new Error('fetch pickup reschedule requests error');

    (getPickupRescheduleRequests as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );
    expect.assertions(4);

    try {
      await store.dispatch(fetchPickupRescheduleRequests(id));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPickupRescheduleRequests).toHaveBeenCalledTimes(1);
      expect(getPickupRescheduleRequests).toHaveBeenCalledWith(
        id,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.FETCH_PICKUP_RESCHEDULE_REQUESTS_REQUEST,
          },
          {
            type: actionTypes.FETCH_PICKUP_RESCHEDULE_REQUESTS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch pickup reschedule requests procedure is successful', async () => {
    (getPickupRescheduleRequests as jest.Mock).mockResolvedValueOnce(
      mockPickupCapabilitiesResponse,
    );

    await store.dispatch(fetchPickupRescheduleRequests(id));

    const actionResults = store.getActions();

    expect(getPickupRescheduleRequests).toHaveBeenCalledTimes(1);
    expect(getPickupRescheduleRequests).toHaveBeenCalledWith(
      id,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_PICKUP_RESCHEDULE_REQUESTS_REQUEST },
      {
        type: actionTypes.FETCH_PICKUP_RESCHEDULE_REQUESTS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_PICKUP_RESCHEDULE_REQUESTS_SUCCESS,
      }),
    ).toMatchSnapshot('fetch pickup reschedule requests success payload');
  });
});

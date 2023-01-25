import * as actionTypes from '../../actionTypes';
import { fetchRaffleParticipation } from '..';
import { getRaffleParticipation } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import {
  mockFetchRaffleParticipationsNormalizedPayload,
  mockRaffleParticipationResponse,
  participationId,
  raffleId,
} from 'tests/__fixtures__/raffles';
import { mockStore } from '../../../../tests';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getRaffleParticipation: jest.fn(),
}));

const buildRaffleParticipationMockStore = (state = {}) =>
  mockStore({ result: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store: ReturnType<typeof buildRaffleParticipationMockStore>;

describe('fetchRaffleParticipation() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = buildRaffleParticipationMockStore();
  });

  it('should create the correct actions in case the fetch raffle participation procedure fails', async () => {
    const expectedError = new Error('fetch raffle participation error');

    (getRaffleParticipation as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(async () => {
      await fetchRaffleParticipation(raffleId, participationId)(store.dispatch);
    }).rejects.toThrow(expectedError);

    expect(getRaffleParticipation).toHaveBeenCalledTimes(1);
    expect(getRaffleParticipation).toHaveBeenCalledWith(
      raffleId,
      participationId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_RAFFLE_PARTICIPATION_REQUEST,
        meta: { raffleId, participationId },
      },
      {
        meta: { raffleId, participationId },
        type: actionTypes.FETCH_RAFFLE_PARTICIPATION_FAILURE,
        payload: { error: expectedError },
      },
    ]);
  });

  it('should create the correct actions in case the fetch raffle participation procedure is successful', async () => {
    (getRaffleParticipation as jest.Mock).mockResolvedValueOnce(
      mockRaffleParticipationResponse,
    );

    const clientResult = await fetchRaffleParticipation(
      raffleId,
      participationId,
    )(store.dispatch);

    expect(clientResult).toBe(mockRaffleParticipationResponse);
    expect(getRaffleParticipation).toHaveBeenCalledTimes(1);
    expect(getRaffleParticipation).toHaveBeenCalledWith(
      raffleId,
      participationId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_RAFFLE_PARTICIPATION_REQUEST,
        meta: { raffleId, participationId },
      },
      {
        meta: { raffleId, participationId },
        payload: mockFetchRaffleParticipationsNormalizedPayload,
        type: actionTypes.FETCH_RAFFLE_PARTICIPATION_SUCCESS,
      },
    ]);
  });
});

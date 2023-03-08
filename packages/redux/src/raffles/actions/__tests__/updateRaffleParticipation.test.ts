import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import {
  participationId,
  raffleId,
} from 'tests/__fixtures__/raffles/index.mjs';
import {
  patchRaffleParticipation,
  type PatchRaffleParticipationOperation,
  RaffleParticipationStatus,
} from '@farfetch/blackout-client';
import updateRaffleParticipation from '../updateRaffleParticipation.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  patchRaffleParticipation: jest.fn(),
}));

const buildRaffleParticipationsMockStore = (state = {}) =>
  mockStore({ result: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof buildRaffleParticipationsMockStore>;

describe('updateRaffleParticipation() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = buildRaffleParticipationsMockStore();
  });

  const data: PatchRaffleParticipationOperation[] = [
    {
      value: RaffleParticipationStatus.Cancelled,
      path: '/status',
      op: 'replace',
    },
  ];

  it('should create the correct actions for when the modification raffle participation procedure fails', async () => {
    const expectedError = new Error('participation error');

    (patchRaffleParticipation as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );
    await expect(async () => {
      await updateRaffleParticipation(
        raffleId,
        participationId,
        data,
      )(store.dispatch);
    }).rejects.toThrow(expectedError);
    expect(patchRaffleParticipation).toHaveBeenCalledTimes(1);
    expect(patchRaffleParticipation).toHaveBeenCalledWith(
      raffleId,
      participationId,
      data,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.UPDATE_RAFFLE_PARTICIPATION_REQUEST,
        meta: { raffleId, participationId },
      },
      {
        meta: { raffleId, participationId },
        type: actionTypes.UPDATE_RAFFLE_PARTICIPATION_FAILURE,
        payload: { error: expectedError },
      },
    ]);
  });

  it('should create the correct actions for when the modification raffle participation procedure is successful', async () => {
    (patchRaffleParticipation as jest.Mock).mockResolvedValue(204);
    await updateRaffleParticipation(
      raffleId,
      participationId,
      data,
    )(store.dispatch);

    expect(patchRaffleParticipation).toHaveBeenCalledTimes(1);
    expect(patchRaffleParticipation).toHaveBeenCalledWith(
      raffleId,
      participationId,
      data,
      expectedConfig,
    );

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.UPDATE_RAFFLE_PARTICIPATION_REQUEST,
        meta: { raffleId, participationId },
      },
      {
        meta: { raffleId, participationId },
        type: actionTypes.UPDATE_RAFFLE_PARTICIPATION_SUCCESS,
      },
    ]);
  });
});

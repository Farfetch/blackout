import * as actionTypes from '../../actionTypes';
import { fetchRaffleEstimation } from '..';
import { getRaffleEstimation } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import {
  mockRaffleEstimationNormalizedPayload,
  mockRaffleEstimationResponse,
  raffleId,
} from 'tests/__fixtures__/raffles';
import { mockStore } from '../../../../tests';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getRaffleEstimation: jest.fn(),
}));

const buildRafflesEstimationMockStore = (state = {}) =>
  mockStore({ result: INITIAL_STATE }, state);
const expectedConfig = undefined;
const expectedQuery = undefined;
let store: ReturnType<typeof buildRafflesEstimationMockStore>;

describe('fetchRaffleEstimation() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = buildRafflesEstimationMockStore();
  });

  it('should create the correct actions in case the fetch raffle estimation procedure fails', async () => {
    const expectedError = new Error('fetch raffle estimation error');

    (getRaffleEstimation as jest.Mock).mockRejectedValueOnce(expectedError);
    await expect(async () => {
      await fetchRaffleEstimation(raffleId)(store.dispatch);
    }).rejects.toThrow(expectedError);

    expect(getRaffleEstimation).toHaveBeenCalledTimes(1);
    expect(getRaffleEstimation).toHaveBeenCalledWith(
      raffleId,
      expectedQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      { type: actionTypes.FETCH_RAFFLE_ESTIMATION_REQUEST, meta: { raffleId } },
      {
        meta: { raffleId },
        type: actionTypes.FETCH_RAFFLE_ESTIMATION_FAILURE,
        payload: { error: expectedError },
      },
    ]);
  });

  it('should create the correct actions in case the fetch raffle estimation procedure is successful', async () => {
    (getRaffleEstimation as jest.Mock).mockResolvedValueOnce(
      mockRaffleEstimationResponse,
    );
    const clientResult = await fetchRaffleEstimation(raffleId)(store.dispatch);

    expect(clientResult).toBe(mockRaffleEstimationResponse);
    expect(getRaffleEstimation).toHaveBeenCalledTimes(1);
    expect(getRaffleEstimation).toHaveBeenCalledWith(
      raffleId,
      expectedQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      { type: actionTypes.FETCH_RAFFLE_ESTIMATION_REQUEST, meta: { raffleId } },
      {
        meta: { raffleId },
        payload: mockRaffleEstimationNormalizedPayload,
        type: actionTypes.FETCH_RAFFLE_ESTIMATION_SUCCESS,
      },
    ]);
  });
});

import * as actionTypes from '../../actionTypes.js';
import { fetchRaffle } from '../index.js';
import { getRaffle } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import {
  mockFetchRaffleNormalizedPayload,
  mockRaffleResponse,
  raffleId,
} from 'tests/__fixtures__/raffles/index.mjs';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getRaffle: jest.fn(),
}));

const buildRaffleMockStore = (state = {}) =>
  mockStore({ result: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store: ReturnType<typeof buildRaffleMockStore>;

describe('fetchRaffle() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = buildRaffleMockStore();
  });

  it('should create the correct actions in case the fetch raffle procedure fails', async () => {
    const expectedError = new Error('fetch raffle error');

    (getRaffle as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(async () => {
      await fetchRaffle(raffleId)(store.dispatch);
    }).rejects.toThrow(expectedError);

    expect(getRaffle).toHaveBeenCalledTimes(1);
    expect(getRaffle).toHaveBeenCalledWith(raffleId, expectedConfig);
    expect(store.getActions()).toEqual([
      { type: actionTypes.FETCH_RAFFLE_REQUEST, meta: { raffleId } },
      {
        meta: { raffleId },
        type: actionTypes.FETCH_RAFFLE_FAILURE,
        payload: { error: expectedError },
      },
    ]);
  });

  it('should create the correct actions in case the fetch raffles procedure is successful', async () => {
    (getRaffle as jest.Mock).mockResolvedValueOnce(mockRaffleResponse);

    const clientResult = await fetchRaffle(raffleId)(store.dispatch);

    expect(clientResult).toBe(mockRaffleResponse);

    expect(getRaffle).toHaveBeenCalledTimes(1);
    expect(getRaffle).toHaveBeenCalledWith(raffleId, expectedConfig);
    expect(store.getActions()).toEqual([
      { type: actionTypes.FETCH_RAFFLE_REQUEST, meta: { raffleId } },
      {
        meta: { raffleId },
        payload: mockFetchRaffleNormalizedPayload,
        type: actionTypes.FETCH_RAFFLE_SUCCESS,
      },
    ]);
  });
});

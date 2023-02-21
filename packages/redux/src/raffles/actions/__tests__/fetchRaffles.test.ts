import * as actionTypes from '../../actionTypes';
import { fetchRaffles } from '..';
import { getRaffles } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import {
  mockFetchRafflesNormalizedPayload,
  mockRafflesResponse,
} from 'tests/__fixtures__/raffles';
import { mockStore } from '../../../../tests';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getRaffles: jest.fn(),
}));

const buildRafflesMockStore = (state = {}) =>
  mockStore({ result: INITIAL_STATE }, state);
const expectedQuery = undefined;
const expectedConfig = undefined;
let store: ReturnType<typeof buildRafflesMockStore>;

describe('fetchRaffles() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = buildRafflesMockStore();
  });

  const hash = '';

  it('should create the correct actions in case the fetch raffles procedure fails', async () => {
    const expectedError = new Error('fetch raffles error');

    (getRaffles as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(async () => {
      await fetchRaffles(expectedQuery)(store.dispatch);
    }).rejects.toThrow(expectedError);

    expect(getRaffles).toHaveBeenCalledTimes(1);
    expect(getRaffles).toHaveBeenCalledWith(expectedQuery, expectedConfig);
    expect(store.getActions()).toEqual([
      { type: actionTypes.FETCH_RAFFLES_REQUEST, meta: { hash } },
      {
        type: actionTypes.FETCH_RAFFLES_FAILURE,
        payload: { error: expectedError },
        meta: { hash },
      },
    ]);
  });

  it('should create the correct actions in case the fetch raffles procedure is successful', async () => {
    (getRaffles as jest.Mock).mockResolvedValueOnce(mockRafflesResponse);

    const clientResult = await fetchRaffles(expectedQuery)(store.dispatch);

    expect(clientResult).toBe(mockRafflesResponse);
    expect(getRaffles).toHaveBeenCalledTimes(1);
    expect(getRaffles).toHaveBeenCalledWith(expectedQuery, expectedConfig);
    expect(store.getActions()).toEqual([
      { type: actionTypes.FETCH_RAFFLES_REQUEST, meta: { hash } },
      {
        payload: mockFetchRafflesNormalizedPayload,
        type: actionTypes.FETCH_RAFFLES_SUCCESS,
        meta: { hash },
      },
    ]);
  });
});

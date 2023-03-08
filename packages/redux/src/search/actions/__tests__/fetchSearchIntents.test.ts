import * as actionTypes from '../../actionTypes.js';
import { fetchSearchIntents } from '../index.js';
import { getSearchIntents } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/searchIntents.js';
import {
  mockSearchIntentsHash,
  mockSearchIntentsQuery,
  mockSearchIntentsResponse,
} from 'tests/__fixtures__/search/index.mjs';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getSearchIntents: jest.fn(),
}));

const searchMockStore = (state = {}) =>
  mockStore({ search: INITIAL_STATE }, state);
const expectedConfig = undefined;
const query = mockSearchIntentsQuery;
const hash = mockSearchIntentsHash;
let store: ReturnType<typeof searchMockStore>;

describe('fetchSearchIntents() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = searchMockStore();
  });

  it('should create the correct actions for when the fetch search intents procedure fails', async () => {
    const expectedError = new Error('Fetch search intents error');

    (getSearchIntents as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchSearchIntents(query)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getSearchIntents).toHaveBeenCalledTimes(1);
    expect(getSearchIntents).toHaveBeenCalledWith(query, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { query, hash },
        type: actionTypes.FETCH_SEARCH_INTENTS_REQUEST,
      },
      {
        meta: { query, hash },
        payload: { error: expectedError },
        type: actionTypes.FETCH_SEARCH_INTENTS_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the fetch search intents procedure is successful', async () => {
    (getSearchIntents as jest.Mock).mockResolvedValueOnce(
      mockSearchIntentsResponse,
    );

    await fetchSearchIntents(query)(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockSearchIntentsResponse);
    });

    expect(getSearchIntents).toHaveBeenCalledTimes(1);
    expect(getSearchIntents).toHaveBeenCalledWith(query, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { query, hash },
        type: actionTypes.FETCH_SEARCH_INTENTS_REQUEST,
      },
      {
        meta: { query, hash },
        payload: { result: mockSearchIntentsResponse },
        type: actionTypes.FETCH_SEARCH_INTENTS_SUCCESS,
      },
    ]);
  });
});

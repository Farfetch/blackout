import * as actionTypes from '../../actionTypes.js';
import { fetchSearchDidYouMean } from '../index.js';
import { getSearchDidYouMean } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/searchDidYouMean.js';
import {
  mockSearchDidYouMeanHash,
  mockSearchDidYouMeanQuery,
  mockSearchDidYouMeanResponse,
} from 'tests/__fixtures__/search/index.mjs';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getSearchDidYouMean: jest.fn(),
}));

const searchMockStore = (state = {}) =>
  mockStore({ search: INITIAL_STATE }, state);
const expectedConfig = undefined;
const query = mockSearchDidYouMeanQuery;
const hash = mockSearchDidYouMeanHash;
let store: ReturnType<typeof searchMockStore>;

describe('fetchSearchDidYouMean() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = searchMockStore();
  });

  it('should create the correct actions for when the fetch search did you mean procedure fails', async () => {
    const expectedError = new Error('Fetch search did you mean error');

    (getSearchDidYouMean as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchSearchDidYouMean(query)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getSearchDidYouMean).toHaveBeenCalledTimes(1);
    expect(getSearchDidYouMean).toHaveBeenCalledWith(query, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { query, hash },
        type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_REQUEST,
      },
      {
        meta: { query, hash },
        payload: { error: expectedError },
        type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the fetch search did you mean procedure is successful', async () => {
    (getSearchDidYouMean as jest.Mock).mockResolvedValueOnce(
      mockSearchDidYouMeanResponse,
    );

    await fetchSearchDidYouMean(query)(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockSearchDidYouMeanResponse);
    });

    expect(getSearchDidYouMean).toHaveBeenCalledTimes(1);
    expect(getSearchDidYouMean).toHaveBeenCalledWith(query, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { query, hash },
        type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_REQUEST,
      },
      {
        meta: { query, hash },
        payload: { result: mockSearchDidYouMeanResponse },
        type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_SUCCESS,
      },
    ]);
  });
});

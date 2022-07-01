import * as actionTypes from '../../actionTypes';
import { fetchSearchDidYouMean } from '..';
import { getSearchDidYouMean } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/searchDidYouMean';
import {
  mockSearchDidYouMeanQuery,
  mockSearchDidYouMeanResponse,
} from 'tests/__fixtures__/search';
import { mockStore } from '../../../../tests';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getSearchDidYouMean: jest.fn(),
}));

const searchMockStore = (state = {}) =>
  mockStore({ search: INITIAL_STATE }, state);
const expectedConfig = undefined;
const query = mockSearchDidYouMeanQuery;
let store;

describe('fetchSearchDidYouMean() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = searchMockStore();
  });

  it('should create the correct actions for when the fetch search did you mean procedure fails', async () => {
    const expectedError = new Error('Fetch search did you mean error');

    getSearchDidYouMean.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(fetchSearchDidYouMean(query)).catch(error => {
      expect(error).toBe(expectedError);
      expect(getSearchDidYouMean).toHaveBeenCalledTimes(1);
      expect(getSearchDidYouMean).toHaveBeenCalledWith(query, expectedConfig);
      expect(store.getActions()).toEqual([
        {
          meta: { query },
          type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_REQUEST,
        },
        {
          meta: { query },
          payload: { error: expectedError },
          type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_FAILURE,
        },
      ]);
    });
  });

  it('should create the correct actions for when the fetch search did you mean procedure is successful', async () => {
    getSearchDidYouMean.mockResolvedValueOnce(mockSearchDidYouMeanResponse);

    expect.assertions(4);

    await store.dispatch(fetchSearchDidYouMean(query)).then(clientResult => {
      expect(clientResult).toBe(mockSearchDidYouMeanResponse);
    });

    expect(getSearchDidYouMean).toHaveBeenCalledTimes(1);
    expect(getSearchDidYouMean).toHaveBeenCalledWith(query, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { query },
        type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_REQUEST,
      },
      {
        meta: { query },
        payload: { result: mockSearchDidYouMeanResponse },
        type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_SUCCESS,
      },
    ]);
  });
});

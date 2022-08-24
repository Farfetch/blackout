import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import {
  contentHash,
  contentNormalizedPayload,
  contentQuery,
  mockContents,
} from 'tests/__fixtures__/contents';
import { fetchContents } from '..';
import { getSearchContents } from '@farfetch/blackout-client';
import { INITIAL_STATE_CONTENT } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getSearchContents: jest.fn(),
}));
const normalizeSpy = jest.spyOn(normalizr, 'normalize');

const contentsMockStore = (state = {}) =>
  mockStore({ contents: INITIAL_STATE_CONTENT }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof contentsMockStore>;

describe('fetchContent() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = contentsMockStore();
  });

  it('should create the correct actions for when the fetch content procedure fails', async () => {
    const expectedError = new Error('Get content error');

    (getSearchContents as jest.Mock).mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await fetchContents(contentQuery)(store.dispatch).catch(error => {
      expect(error).toBe(expectedError);
      expect(getSearchContents).toHaveBeenCalledTimes(1);
      expect(getSearchContents).toHaveBeenCalledWith(
        contentQuery,
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          meta: { query: contentQuery },
          payload: { hash: contentHash },
          type: actionTypes.FETCH_CONTENTS_REQUEST,
        },
        {
          meta: { query: contentQuery },
          payload: { error: expectedError, hash: contentHash },
          type: actionTypes.FETCH_CONTENTS_FAILURE,
        },
      ]);
    });
  });

  it('should create the correct actions for when the fetch content procedure is successful', async () => {
    (getSearchContents as jest.Mock).mockResolvedValueOnce(mockContents);

    await fetchContents(contentQuery)(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockContents);
    });

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getSearchContents).toHaveBeenCalledTimes(1);
    expect(getSearchContents).toHaveBeenCalledWith(
      contentQuery,
      expectedConfig,
    );

    expect(actionResults).toEqual([
      {
        meta: { query: contentQuery },
        payload: { hash: contentHash },
        type: actionTypes.FETCH_CONTENTS_REQUEST,
      },
      {
        meta: { query: contentQuery },
        payload: { ...contentNormalizedPayload, hash: contentHash },
        type: actionTypes.FETCH_CONTENTS_SUCCESS,
      },
    ]);

    expect(
      find(actionResults, { type: actionTypes.FETCH_CONTENTS_SUCCESS }),
    ).toMatchSnapshot('Get content payload');
  });
});

import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import {
  contentHash,
  contentNormalizedPayload,
  contentQuery,
  mockContents,
} from 'tests/__fixtures__/contents/index.mjs';
import { fetchContents } from '../index.js';
import { find } from 'lodash-es';
import { getSearchContents } from '@farfetch/blackout-client';
import { INITIAL_STATE_CONTENT } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getSearchContents: jest.fn(),
}));

const normalizeSpy = jest.spyOn(normalizr, 'normalize');

const contentsMockStore = (state = {}) =>
  mockStore({ contents: INITIAL_STATE_CONTENT }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof contentsMockStore>;

describe('fetchContents() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = contentsMockStore();
  });

  it('should create the correct actions for when the fetch content procedure fails', async () => {
    const expectedError = new Error('Get content error');

    (getSearchContents as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchContents(contentQuery)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getSearchContents).toHaveBeenCalledTimes(1);
    expect(getSearchContents).toHaveBeenCalledWith(
      contentQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        payload: { hash: contentHash },
        type: actionTypes.FETCH_CONTENTS_REQUEST,
      },
      {
        payload: { error: expectedError, hash: contentHash },
        type: actionTypes.FETCH_CONTENTS_FAILURE,
      },
    ]);
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
        payload: { hash: contentHash },
        type: actionTypes.FETCH_CONTENTS_REQUEST,
      },
      {
        payload: { ...contentNormalizedPayload, hash: contentHash },
        type: actionTypes.FETCH_CONTENTS_SUCCESS,
      },
    ]);

    expect(
      find(actionResults, { type: actionTypes.FETCH_CONTENTS_SUCCESS }),
    ).toMatchSnapshot('Get content payload');
  });
});

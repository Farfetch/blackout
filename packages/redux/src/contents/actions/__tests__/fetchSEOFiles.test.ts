import * as actionTypes from '../../actionTypes.js';
import { fetchSEOFiles } from '../index.js';
import { find } from 'lodash-es';
import { getSEOFiles } from '@farfetch/blackout-client';
import {
  hash,
  seoFilesData,
  seoFilesQuery,
} from 'tests/__fixtures__/contents/seoFiles.fixtures.mjs';
import { INITIAL_STATE_CONTENT } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getSEOFiles: jest.fn(),
}));

const contentsSEOFilesMockStore = (state = {}) =>
  mockStore({ contents: INITIAL_STATE_CONTENT }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof contentsSEOFilesMockStore>;

describe('feachSEOFiles action create', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = contentsSEOFilesMockStore();
  });

  it('should create the correct actions for when featch SEO procedute fails', async () => {
    const expectedError = new Error('Get SEO Files error');

    (getSEOFiles as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchSEOFiles(seoFilesQuery)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getSEOFiles).toHaveBeenCalledTimes(1);
    expect(getSEOFiles).toHaveBeenCalledWith(seoFilesQuery, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        payload: { hash },
        type: actionTypes.FETCH_SEO_FILES_REQUEST,
      },
      {
        payload: { error: expectedError, hash },
        type: actionTypes.FETCH_SEO_FILES_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the fetch SEO Files procedure is successful', async () => {
    (getSEOFiles as jest.Mock).mockResolvedValueOnce(seoFilesData);

    await fetchSEOFiles(seoFilesQuery)(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(seoFilesData);
    });

    const actionResults = store.getActions();

    expect(getSEOFiles).toHaveBeenCalledWith(seoFilesQuery, expectedConfig);
    expect(actionResults).toEqual([
      {
        payload: { hash },
        type: actionTypes.FETCH_SEO_FILES_REQUEST,
      },
      {
        payload: { result: seoFilesData, hash },
        type: actionTypes.FETCH_SEO_FILES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.FETCH_SEO_FILES_SUCCESS }),
    ).toMatchSnapshot('Get SEO Files payload');
  });
});

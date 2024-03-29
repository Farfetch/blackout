import * as actionTypes from '../../actionTypes.js';
import { fetchSEOMetadata } from '../index.js';
import { find } from 'lodash-es';
import { getSEOMetadata } from '@farfetch/blackout-client';
import { INITIAL_STATE_CONTENT } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import {
  pathname,
  seoQuery,
  seoResponse,
} from 'tests/__fixtures__/contents/index.mjs';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getSEOMetadata: jest.fn(),
}));

const contentsSEOMockStore = (state = {}) =>
  mockStore({ contents: INITIAL_STATE_CONTENT }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof contentsSEOMockStore>;

describe('fetchSEOMetadata action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = contentsSEOMockStore();
  });

  it('should create the correct actions for when the fetch SEO procedure fails', async () => {
    const expectedError = new Error('Get SEO error');

    (getSEOMetadata as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchSEOMetadata(seoQuery)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getSEOMetadata).toHaveBeenCalledTimes(1);
    expect(getSEOMetadata).toHaveBeenCalledWith(seoQuery, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        payload: { pathname },
        type: actionTypes.FETCH_SEO_METADATA_REQUEST,
      },
      {
        payload: { error: expectedError, pathname },
        type: actionTypes.FETCH_SEO_METADATA_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the fetch SEO procedure is successful', async () => {
    (getSEOMetadata as jest.Mock).mockResolvedValueOnce(seoResponse);

    await fetchSEOMetadata(seoQuery)(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(seoResponse);
    });

    const actionResults = store.getActions();

    expect(getSEOMetadata).toHaveBeenCalledTimes(1);
    expect(getSEOMetadata).toHaveBeenCalledWith(seoQuery, expectedConfig);
    expect(actionResults).toEqual([
      {
        payload: { pathname },
        type: actionTypes.FETCH_SEO_METADATA_REQUEST,
      },
      {
        payload: { result: seoResponse, pathname },
        type: actionTypes.FETCH_SEO_METADATA_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.FETCH_SEO_METADATA_SUCCESS }),
    ).toMatchSnapshot('Get SEO payload');
  });
});

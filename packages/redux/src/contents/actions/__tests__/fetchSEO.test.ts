import * as actionTypes from '../../actionTypes';
import { fetchSEO } from '..';
import { getSEO } from '@farfetch/blackout-client';
import { INITIAL_STATE_CONTENT } from '../../reducer';
import { mockStore } from '../../../../tests';
import { pathname, seoQuery, seoResponse } from 'tests/__fixtures__/contents';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getSEO: jest.fn(),
}));
const contentsSEOMockStore = (state = {}) =>
  mockStore({ contents: INITIAL_STATE_CONTENT }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof contentsSEOMockStore>;

describe('fetchSEO action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = contentsSEOMockStore();
  });

  it('should create the correct actions for when the fetch SEO procedure fails', async () => {
    const expectedError = new Error('Get SEO error');

    (getSEO as jest.Mock).mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await fetchSEO(seoQuery)(store.dispatch).catch(error => {
      expect(error).toBe(expectedError);
      expect(getSEO).toHaveBeenCalledTimes(1);
      expect(getSEO).toHaveBeenCalledWith(seoQuery, expectedConfig);
      expect(store.getActions()).toEqual([
        {
          meta: { query: seoQuery },
          payload: { pathname },
          type: actionTypes.FETCH_SEO_REQUEST,
        },
        {
          meta: { query: seoQuery },
          payload: { error: expectedError, pathname },
          type: actionTypes.FETCH_SEO_FAILURE,
        },
      ]);
    });
  });

  it('should create the correct actions for when the fetch SEO procedure is successful', async () => {
    (getSEO as jest.Mock).mockResolvedValueOnce(seoResponse);

    await fetchSEO(seoQuery)(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(seoResponse);
    });

    const actionResults = store.getActions();

    expect(getSEO).toHaveBeenCalledTimes(1);
    expect(getSEO).toHaveBeenCalledWith(seoQuery, expectedConfig);
    expect(actionResults).toEqual([
      {
        meta: { query: seoQuery },
        payload: { pathname },
        type: actionTypes.FETCH_SEO_REQUEST,
      },
      {
        meta: { query: seoQuery },
        payload: { result: seoResponse, pathname },
        type: actionTypes.FETCH_SEO_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.FETCH_SEO_SUCCESS }),
    ).toMatchSnapshot('Get SEO payload');
  });
});

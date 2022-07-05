import * as normalizr from 'normalizr';
import { actionTypesContent as actionTypes } from '../..';
import {
  contentPagesQuery,
  contentType,
  expectedContentPagesNormalizedPayload,
  mockContentPages,
  slugContent,
} from 'tests/__fixtures__/contents';
import { fetchContentPages } from '..';
import { getContentPages } from '@farfetch/blackout-client/contents';
import { INITIAL_STATE_CONTENT } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('../../utils', () => ({
  generateContentHash: () => 'content_pages!woman/gucci',
  generateSEOPathname: jest.fn(),
}));

jest.mock('@farfetch/blackout-client/contents', () => ({
  ...jest.requireActual('@farfetch/blackout-client/contents'),
  getContentPages: jest.fn(),
}));

const normalizeSpy = jest.spyOn(normalizr, 'normalize');

const contentPagesMockStore = (state = {}) =>
  mockStore({ contents: INITIAL_STATE_CONTENT }, state);

const expectedConfig = undefined;
let store;

describe('fetchContentPages() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = contentPagesMockStore();
  });

  it('should create the correct actions for when the get content pages procedure fails', async () => {
    const expectedError = new Error('Get contet pages error');

    getContentPages.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store
      .dispatch(fetchContentPages(slugContent, contentType))
      .catch(error => {
        expect(error).toBe(expectedError);
        expect(getContentPages).toHaveBeenCalledTimes(1);
        expect(getContentPages).toHaveBeenCalledWith(
          contentType,
          { slug: slugContent, strategy: undefined },
          expectedConfig,
        );
        expect(store.getActions()).toEqual([
          {
            meta: {
              query: contentPagesQuery,
            },
            payload: {
              hash: 'content_pages!woman/gucci',
            },
            type: actionTypes.FETCH_CONTENT_PAGES_REQUEST,
          },
          {
            meta: {
              query: contentPagesQuery,
            },
            payload: {
              error: expectedError,
              hash: 'content_pages!woman/gucci',
            },
            type: actionTypes.FETCH_CONTENT_PAGES_FAILURE,
          },
        ]);
      });
  });

  it('should create the correct actions for when the get content pages procedure is successful', async () => {
    getContentPages.mockResolvedValueOnce(mockContentPages);

    await store.dispatch(fetchContentPages(slugContent, contentType));

    const actionResults = store.getActions();
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getContentPages).toHaveBeenCalledTimes(1);
    expect(getContentPages).toHaveBeenCalledWith(
      contentType,
      { slug: slugContent, strategy: undefined },
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        meta: {
          query: contentPagesQuery,
        },
        payload: {
          hash: 'content_pages!woman/gucci',
        },
        type: actionTypes.FETCH_CONTENT_PAGES_REQUEST,
      },
      {
        meta: {
          query: contentPagesQuery,
        },
        payload: expectedContentPagesNormalizedPayload,
        type: actionTypes.FETCH_CONTENT_PAGES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.FETCH_CONTENT_PAGES_SUCCESS }),
    ).toMatchSnapshot('Get content pages payload');
  });
});

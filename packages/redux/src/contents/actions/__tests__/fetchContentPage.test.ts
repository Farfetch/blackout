import * as normalizr from 'normalizr';
import { contentsActionTypes as actionTypes } from '../..';
import {
  contentPagesType,
  expectedContentPageNormalizedPayload,
  mockContentPage,
  slugContent,
} from 'tests/__fixtures__/contents';
import { fetchContentPage } from '..';
import { getContentPage } from '@farfetch/blackout-client';
import { INITIAL_STATE_CONTENT } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('../../utils', () => ({
  generateContentHash: () => 'content_pages!woman/gucci',
  generateSEOPathname: jest.fn(),
}));

jest.mock('@farfetch/blackout-client/contents', () => ({
  ...jest.requireActual('@farfetch/blackout-client/contents'),
  getContentPage: jest.fn(),
}));

const normalizeSpy = jest.spyOn(normalizr, 'normalize');

const contentPagesMockStore = (state = {}) =>
  mockStore({ contents: INITIAL_STATE_CONTENT }, state);

const expectedConfig = undefined;
let store;

describe('fetchContentPage() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = contentPagesMockStore();
  });

  it('should create the correct actions for when the get content pages procedure fails', async () => {
    const expectedError = new Error('Get contet pages error');

    getContentPage.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store
      .dispatch(fetchContentPage(contentPagesType, { slug: slugContent }))
      .catch(error => {
        expect(error).toBe(expectedError);
        expect(getContentPage).toHaveBeenCalledTimes(1);
        expect(getContentPage).toHaveBeenCalledWith(
          contentPagesType,
          { slug: slugContent, strategy: undefined },
          expectedConfig,
        );
        expect(store.getActions()).toEqual([
          {
            payload: {
              hash: 'content_pages!woman/gucci',
            },
            type: actionTypes.FETCH_CONTENT_PAGES_REQUEST,
          },
          {
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
    getContentPage.mockResolvedValueOnce(mockContentPage);

    await store.dispatch(
      fetchContentPage(contentPagesType, { slug: slugContent }),
    );

    const actionResults = store.getActions();
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getContentPage).toHaveBeenCalledTimes(1);
    expect(getContentPage).toHaveBeenCalledWith(
      contentPagesType,
      { slug: slugContent, strategy: undefined },
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        payload: {
          hash: 'content_pages!woman/gucci',
        },
        type: actionTypes.FETCH_CONTENT_PAGES_REQUEST,
      },
      {
        payload: expectedContentPageNormalizedPayload,
        type: actionTypes.FETCH_CONTENT_PAGES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.FETCH_CONTENT_PAGES_SUCCESS }),
    ).toMatchSnapshot('Get content pages payload');
  });
});

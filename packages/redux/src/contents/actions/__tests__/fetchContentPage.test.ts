import * as normalizr from 'normalizr';
import { contentsActionTypes as actionTypes } from '../../index.js';
import {
  contentPageType,
  expectedContentPageNormalizedPayload,
  mockContentPage,
  slugContent,
  slugContentWithoutQuery,
} from 'tests/__fixtures__/contents/index.mjs';
import { fetchContentPage } from '../index.js';
import { find } from 'lodash-es';
import { getContentPage } from '@farfetch/blackout-client';
import { INITIAL_STATE_CONTENT } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';

jest.mock('../../utils', () => ({
  generateContentHash: () => 'content_pages!woman/gucci',
  generateSEOPathname: jest.fn(),
  generateSEOFilesHash: jest.fn(),
}));

jest.mock('@farfetch/blackout-client/contents', () => ({
  ...jest.requireActual('@farfetch/blackout-client/contents'),
  getContentPage: jest.fn(),
}));

const normalizeSpy = jest.spyOn(normalizr, 'normalize');

const contentPagesMockStore = (state = {}) =>
  mockStore({ contents: INITIAL_STATE_CONTENT }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof contentPagesMockStore>;

describe('fetchContentPage() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = contentPagesMockStore();
  });

  it('should create the correct actions for when the get content pages procedure fails', async () => {
    const expectedError = new Error('Get contet pages error');

    (getContentPage as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await fetchContentPage(contentPageType, { slug: slugContent })(
          store.dispatch,
        ),
    ).rejects.toThrow(expectedError);

    expect(getContentPage).toHaveBeenCalledTimes(1);
    expect(getContentPage).toHaveBeenCalledWith(
      contentPageType,
      { slug: slugContentWithoutQuery, strategy: undefined },
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        payload: {
          hash: 'content_pages!woman/gucci',
        },
        type: actionTypes.FETCH_CONTENT_PAGE_REQUEST,
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

  it('should create the correct actions for when the get content pages procedure is successful', async () => {
    (getContentPage as jest.Mock).mockResolvedValueOnce(mockContentPage);

    await fetchContentPage(contentPageType, { slug: slugContent })(
      store.dispatch,
    );

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getContentPage).toHaveBeenCalledTimes(1);
    expect(getContentPage).toHaveBeenCalledWith(
      contentPageType,
      { slug: slugContentWithoutQuery, strategy: undefined },
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        payload: {
          hash: 'content_pages!woman/gucci',
        },
        type: actionTypes.FETCH_CONTENT_PAGE_REQUEST,
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

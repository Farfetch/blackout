import * as normalizr from 'normalizr';
import { contentsActionTypes as actionTypes } from '../..';
import {
  commercePagesQuery,
  expectedCommercePagesNormalizedPayload,
  mockCommercePages,
} from 'tests/__fixtures__/contents';
import { fetchCommercePages } from '..';
import { getCommercePages } from '@farfetch/blackout-client/contents';
import { INITIAL_STATE_CONTENT } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('../../utils', () => ({
  generateContentHash: () => 'commerce_pages!woman',
  generateSEOPathname: jest.fn(),
  getRankedCommercePage: jest.fn(() => mockCommercePages[0]),
}));

jest.mock('@farfetch/blackout-client/contents', () => ({
  ...jest.requireActual('@farfetch/blackout-client/contents'),
  getCommercePages: jest.fn(),
}));

const normalizeSpy = jest.spyOn(normalizr, 'normalize');

const commercePagesMockStore = (state = {}) =>
  mockStore({ contents: INITIAL_STATE_CONTENT }, state);

const expectedConfig = undefined;
let store;

describe('fetchCommercePages() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = commercePagesMockStore();
  });

  it('should create the correct actions for when the get commerce pages procedure fails', async () => {
    const expectedError = new Error('Get commerce pages error');

    getCommercePages.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store
      .dispatch(fetchCommercePages(commercePagesQuery))
      .catch(error => {
        expect(error).toBe(expectedError);
        expect(getCommercePages).toHaveBeenCalledTimes(1);
        expect(getCommercePages).toHaveBeenCalledWith(
          commercePagesQuery,
          expectedConfig,
        );
        expect(store.getActions()).toEqual([
          {
            meta: {
              query: commercePagesQuery,
            },
            payload: {
              hash: 'commerce_pages!woman',
            },
            type: actionTypes.FETCH_COMMERCE_PAGES_REQUEST,
          },
          {
            meta: {
              query: commercePagesQuery,
            },
            payload: {
              error: expectedError,
              hash: 'commerce_pages!woman',
            },
            type: actionTypes.FETCH_COMMERCE_PAGES_FAILURE,
          },
        ]);
      });
  });

  it('should create the correct actions for when the get commerce pages procedure is successful', async () => {
    getCommercePages.mockResolvedValueOnce(mockCommercePages);

    await store.dispatch(fetchCommercePages(commercePagesQuery)).then(result =>
      expect(result).toEqual({
        number: 1,
        totalItems: 1,
        totalPages: 1,
        entries: mockCommercePages,
      }),
    );

    const actionResults = store.getActions();
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCommercePages).toHaveBeenCalledTimes(1);
    expect(getCommercePages).toHaveBeenCalledWith(
      commercePagesQuery,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        meta: {
          query: commercePagesQuery,
        },
        payload: {
          hash: 'commerce_pages!woman',
        },
        type: actionTypes.FETCH_COMMERCE_PAGES_REQUEST,
      },
      {
        meta: {
          query: commercePagesQuery,
        },
        payload: expectedCommercePagesNormalizedPayload,
        type: actionTypes.FETCH_COMMERCE_PAGES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.FETCH_COMMERCE_PAGES_SUCCESS }),
    ).toMatchSnapshot('Get commerce pages payload');
  });
});

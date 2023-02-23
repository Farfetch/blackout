import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import {
  commercePagesQuery,
  expectedCommercePagesNormalizedPayload,
  mockCommercePages,
} from 'tests/__fixtures__/contents';
import { fetchCommercePages } from '..';
import { getCommercePages } from '@farfetch/blackout-client';
import { INITIAL_STATE_CONTENT } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('../../utils', () => ({
  generateContentHash: () => 'commerce_pages!woman',
  generateSEOPathname: jest.fn(),
  getRankedCommercePage: jest.fn(() => mockCommercePages.entries[0]),
}));

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCommercePages: jest.fn(),
}));

const normalizeSpy = jest.spyOn(normalizr, 'normalize');

const commercePagesMockStore = (state = {}) =>
  mockStore({ contents: INITIAL_STATE_CONTENT }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof commercePagesMockStore>;

describe('fetchCommercePages() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = commercePagesMockStore();
  });

  it('should create the correct actions for when the get commerce pages procedure fails', async () => {
    const expectedError = new Error('Get commerce pages error');

    (getCommercePages as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchCommercePages(commercePagesQuery)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getCommercePages).toHaveBeenCalledTimes(1);
    expect(getCommercePages).toHaveBeenCalledWith(
      commercePagesQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        payload: {
          hash: 'commerce_pages!woman',
        },
        type: actionTypes.FETCH_COMMERCE_PAGES_REQUEST,
      },
      {
        payload: {
          error: expectedError,
          hash: 'commerce_pages!woman',
        },
        type: actionTypes.FETCH_COMMERCE_PAGES_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the get commerce pages procedure is successful', async () => {
    (getCommercePages as jest.Mock).mockResolvedValueOnce(mockCommercePages);

    await fetchCommercePages(commercePagesQuery)(store.dispatch).then(
      clientResult => {
        expect(clientResult).toBe(mockCommercePages);
      },
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
        payload: {
          hash: 'commerce_pages!woman',
        },
        type: actionTypes.FETCH_COMMERCE_PAGES_REQUEST,
      },
      {
        payload: expectedCommercePagesNormalizedPayload,
        type: actionTypes.FETCH_COMMERCE_PAGES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.FETCH_COMMERCE_PAGES_SUCCESS }),
    ).toMatchSnapshot('Get commerce pages payload');
  });
});

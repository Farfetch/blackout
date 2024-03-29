import * as actionTypes from '../../actionTypes.js';
import {
  contentTypesResult,
  types,
} from 'tests/__fixtures__/contents/index.mjs';
import { fetchContentTypes } from '../index.js';
import { find } from 'lodash-es';
import { getContentTypes } from '@farfetch/blackout-client';
import { INITIAL_STATE_CONTENT } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getContentTypes: jest.fn(),
}));

const contentTypesMockStore = (state = {}) =>
  mockStore({ contents: INITIAL_STATE_CONTENT }, state);
const expectedConfig = undefined;
const spaceCode = 'website';
let store: ReturnType<typeof contentTypesMockStore>;

describe('fetchContentTypes() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = contentTypesMockStore();
  });

  it('should create the correct actions for fetching content types when procedure is failure', async () => {
    const expectedError = new Error('Get content error');

    (getContentTypes as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchContentTypes(spaceCode)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getContentTypes).toHaveBeenCalledTimes(1);
    expect(getContentTypes).toHaveBeenCalledWith(spaceCode, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: actionTypes.FETCH_CONTENT_TYPES_FAILURE,
          payload: { error: expectedError },
        }),
      ]),
    );
  });

  it('should create the correct actions for fetching content types when procedure is successful', async () => {
    (getContentTypes as jest.Mock).mockResolvedValueOnce(types);

    await fetchContentTypes(spaceCode)(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(types);
    });

    const actionResults = store.getActions();

    expect(getContentTypes).toHaveBeenCalledTimes(1);
    expect(getContentTypes).toHaveBeenCalledWith(spaceCode, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: actionTypes.FETCH_CONTENT_TYPES_SUCCESS,
          payload: contentTypesResult,
        }),
      ]),
    );
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_CONTENT_TYPES_SUCCESS,
      }),
    ).toMatchSnapshot();
  });
});

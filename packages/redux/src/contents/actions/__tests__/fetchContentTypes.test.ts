import { contentsActionTypes as actionTypes } from '../..';
import { contentTypesResult, types } from 'tests/__fixtures__/contents';
import { fetchContentTypes } from '..';
import { getContentTypes } from '@farfetch/blackout-client/contents';
import { INITIAL_STATE_CONTENT } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/contents', () => ({
  ...jest.requireActual('@farfetch/blackout-client/contents'),
  getContentTypes: jest.fn(),
}));

const contentTypesMockStore = (state = {}) =>
  mockStore({ contents: INITIAL_STATE_CONTENT }, state);
const expectedConfig = undefined;
const spaceCode = 'website';
let store;

describe('fetchContentTypes() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = contentTypesMockStore();
  });

  it('should create the correct actions for fetching content types when procedure is failure', async () => {
    const expectedError = new Error('Get content error');

    getContentTypes.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(fetchContentTypes(spaceCode)).catch(error => {
      expect(error).toBe(expectedError);
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
  });

  it('should create the correct actions for fetching content types when procedure is successful', async () => {
    getContentTypes.mockResolvedValueOnce(types);

    await store
      .dispatch(fetchContentTypes(spaceCode))
      .then(result => expect(result).toBe(types));

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

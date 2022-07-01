import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import {
  contentNormalizedPayload,
  contentQuery,
  mockContentResult,
} from 'tests/__fixtures__/contents';
import { fetchContent } from '..';
import { getSearchContents } from '@farfetch/blackout-client';
import { INITIAL_STATE_CONTENT } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getSearchContents: jest.fn(),
}));
const normalizeSpy = jest.spyOn(normalizr, 'normalize');

const contentsMockStore = (state = {}) =>
  mockStore({ contents: INITIAL_STATE_CONTENT }, state);

const expectedConfig = undefined;
let store;

describe('fetchContent() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = contentsMockStore();
  });

  it('should create the correct actions for when the get content procedure fails', async () => {
    const expectedError = new Error('Get content error');

    getSearchContents.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(fetchContent(contentQuery)).catch(error => {
      expect(error).toBe(expectedError);
      expect(getSearchContents).toHaveBeenCalledTimes(1);
      expect(getSearchContents).toHaveBeenCalledWith(
        contentQuery,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            {
              type: actionTypes.FETCH_CONTENT_FAILURE,
            },
            {
              payload: { error: expectedError },
              type: actionTypes.FETCH_CONTENT_FAILURE,
            },
          ),
        ]),
      );
    });
  });

  it('should create the correct actions for when the get content procedure is successful', async () => {
    getSearchContents.mockResolvedValueOnce(mockContentResult);

    await store
      .dispatch(fetchContent(contentQuery))
      .then(result => expect(result).toBe(mockContentResult));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getSearchContents).toHaveBeenCalledTimes(1);
    expect(getSearchContents).toHaveBeenCalledWith(
      contentQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.FETCH_CONTENT_REQUEST,
          },
          {
            payload: contentNormalizedPayload,
            type: actionTypes.FETCH_CONTENT_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, { type: actionTypes.FETCH_CONTENT_SUCCESS }),
    ).toMatchSnapshot('Get content payload');
  });
});

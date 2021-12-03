import * as normalizr from 'normalizr';
import {
  expectedTitlesNormalizedPayload,
  mockGetTitlesResponse,
} from '../../__fixtures__/titles.fixtures';
import { fetchTitles } from '..';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const usersMockStore = (state = {}) => mockStore({ users: reducer() }, state);
const expectedConfig = undefined;
let store;
const normalizeSpy = jest.spyOn(normalizr, 'normalize');

describe('doGetTitles action creator', () => {
  const getTitles = jest.fn();
  const action = fetchTitles(getTitles);
  const query = {};

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get titles procedure fails', async () => {
    const expectedError = new Error('get titles error');

    getTitles.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getTitles).toHaveBeenCalledTimes(1);
      expect(getTitles).toHaveBeenCalledWith(query, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_TITLES_REQUEST },
          {
            type: actionTypes.FETCH_TITLES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get titles procedure is successful', async () => {
    getTitles.mockResolvedValueOnce(mockGetTitlesResponse);

    await store.dispatch(action(query));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getTitles).toHaveBeenCalledTimes(1);
    expect(getTitles).toHaveBeenCalledWith(query, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_TITLES_REQUEST },
      {
        payload: expectedTitlesNormalizedPayload,
        type: actionTypes.FETCH_TITLES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_TITLES_SUCCESS,
      }),
    ).toMatchSnapshot('get titles success payload');
  });
});

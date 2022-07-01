import * as actionTypes from '../../actionTypes';
import { fetchTopCategories } from '..';
import { getTopCategories } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/topCategories';
import { mockStore } from '../../../../tests';
import {
  mockTopCategories,
  normalizedTopResponse,
} from 'tests/__fixtures__/categories';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getTopCategories: jest.fn(),
}));

const buildCategoriesMockStore = (state = {}) =>
  mockStore({ categories: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store;

describe('fetchTopCategories() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = buildCategoriesMockStore();
  });

  it('should create the correct actions in case the fetch top categories procedure fails', async () => {
    const expectedError = new Error('fetch top categories error');

    getTopCategories.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(fetchTopCategories()).catch(error => {
      expect(error).toBe(expectedError);
      expect(getTopCategories).toHaveBeenCalledTimes(1);
      expect(getTopCategories).toHaveBeenCalledWith(expectedConfig);
      expect(store.getActions()).toEqual([
        { type: actionTypes.FETCH_TOP_CATEGORIES_REQUEST },
        {
          type: actionTypes.FETCH_TOP_CATEGORIES_FAILURE,
          payload: { error: expectedError },
        },
      ]);
    });
  });

  it('should create the correct actions in case the fetch top categories procedure is successful', async () => {
    getTopCategories.mockResolvedValueOnce(mockTopCategories);

    expect.assertions(4);

    await store.dispatch(fetchTopCategories()).then(clientResult => {
      expect(clientResult).toBe(mockTopCategories);
    });

    const actionResults = store.getActions();

    expect(getTopCategories).toHaveBeenCalledTimes(1);
    expect(getTopCategories).toHaveBeenCalledWith(expectedConfig);
    expect(actionResults).toEqual([
      { type: actionTypes.FETCH_TOP_CATEGORIES_REQUEST },
      {
        payload: normalizedTopResponse,
        type: actionTypes.FETCH_TOP_CATEGORIES_SUCCESS,
      },
    ]);
  });
});

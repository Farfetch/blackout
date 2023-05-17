import * as actionTypes from '../../actionTypes.js';
import { fetchTopCategories } from '../index.js';
import { getTopCategories } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/topCategories.js';
import { mockStore } from '../../../../tests/index.js';
import {
  mockTopCategories,
  normalizedTopResponse,
} from 'tests/__fixtures__/categories/index.mjs';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getTopCategories: jest.fn(),
}));

const buildCategoriesMockStore = (state = {}) =>
  mockStore({ categories: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store: ReturnType<typeof buildCategoriesMockStore>;

describe('fetchTopCategories() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = buildCategoriesMockStore();
  });

  it('should create the correct actions in case the fetch top categories procedure fails', async () => {
    const expectedError = new Error('fetch top categories error');

    (getTopCategories as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchTopCategories()(store.dispatch),
    ).rejects.toThrow(expectedError);

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

  it('should create the correct actions in case the fetch top categories procedure is successful', async () => {
    (getTopCategories as jest.Mock).mockResolvedValueOnce(mockTopCategories);

    await fetchTopCategories()(store.dispatch).then(clientResult => {
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

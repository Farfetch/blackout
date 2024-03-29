import * as actionTypes from '../../actionTypes.js';
import { fetchCategories } from '../index.js';
import { getCategories } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/categories.js';
import {
  mockCategories,
  mockNormalizedResponse,
} from 'tests/__fixtures__/categories/index.mjs';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCategories: jest.fn(),
}));

const buildCategoriesMockStore = (state = {}) =>
  mockStore({ categories: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store: ReturnType<typeof buildCategoriesMockStore>;

describe('fetchCategories() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = buildCategoriesMockStore();
  });

  it('should create the correct actions in case the fetch categories procedure fails', async () => {
    const expectedError = new Error('fetch categories error');

    (getCategories as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchCategories()(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getCategories).toHaveBeenCalledTimes(1);
    expect(getCategories).toHaveBeenCalledWith(expectedConfig);
    expect(store.getActions()).toEqual([
      { type: actionTypes.FETCH_CATEGORIES_REQUEST },
      {
        type: actionTypes.FETCH_CATEGORIES_FAILURE,
        payload: { error: expectedError },
      },
    ]);
  });

  it('should create the correct actions in case the fetch categories procedure is successful', async () => {
    (getCategories as jest.Mock).mockResolvedValueOnce(mockCategories);

    await fetchCategories()(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockCategories);
    });

    expect(getCategories).toHaveBeenCalledTimes(1);
    expect(getCategories).toHaveBeenCalledWith(expectedConfig);
    expect(store.getActions()).toEqual([
      { type: actionTypes.FETCH_CATEGORIES_REQUEST },
      {
        payload: mockNormalizedResponse,
        type: actionTypes.FETCH_CATEGORIES_SUCCESS,
      },
    ]);
  });
});

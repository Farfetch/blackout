import * as actionTypes from '../../actionTypes';
import { fetchCategory } from '..';
import { getCategory } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/categories';
import {
  mockCategories,
  mockCategoryId,
  mockNormalizedResponse,
} from 'tests/__fixtures__/categories';
import { mockStore } from '../../../../tests';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCategory: jest.fn(),
}));

const buildCategoriesMockStore = (state = {}) =>
  mockStore({ categories: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store: ReturnType<typeof buildCategoriesMockStore>;

describe('fetchCategory() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = buildCategoriesMockStore();
  });

  it('should create the correct actions in case the fetch category procedure fails', async () => {
    const expectedError = new Error('fetch categories error');

    (getCategory as jest.Mock).mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await fetchCategory(mockCategoryId)(store.dispatch).catch(error => {
      expect(error).toBe(expectedError);
      expect(getCategory).toHaveBeenCalledTimes(1);
      expect(getCategory).toHaveBeenCalledWith(mockCategoryId, expectedConfig);
      expect(store.getActions()).toEqual([
        {
          type: actionTypes.FETCH_CATEGORY_REQUEST,
          meta: { id: mockCategoryId },
        },
        {
          type: actionTypes.FETCH_CATEGORY_FAILURE,
          payload: { error: expectedError },
          meta: { id: mockCategoryId },
        },
      ]);
    });
  });

  it('should create the correct actions in case the fetch category procedure is successful', async () => {
    (getCategory as jest.Mock).mockResolvedValueOnce(mockCategories);
    expect.assertions(4);

    await fetchCategory(mockCategoryId)(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockCategories);
    });

    expect(getCategory).toHaveBeenCalledTimes(1);
    expect(getCategory).toHaveBeenCalledWith(mockCategoryId, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_CATEGORY_REQUEST,
        meta: { id: mockCategoryId },
      },
      {
        payload: mockNormalizedResponse,
        meta: { id: mockCategoryId },
        type: actionTypes.FETCH_CATEGORY_SUCCESS,
      },
    ]);
  });
});

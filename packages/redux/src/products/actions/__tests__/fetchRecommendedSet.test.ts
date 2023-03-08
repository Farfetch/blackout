import { fetchRecommendedSet } from '../index.js';
import { getProductRecommendedSet } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/recommendedSet.js';
import {
  mockRecommendedSet,
  mockRecommendedSetId,
} from 'tests/__fixtures__/products/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import { productsActionTypes } from '../../index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getProductRecommendedSet: jest.fn(),
}));

const recommendedSetMockStore = (state = {}) =>
  mockStore({ recommendedSets: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store: ReturnType<typeof recommendedSetMockStore>;

describe('fetchRecommendedSet() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = recommendedSetMockStore();
  });

  it('should create the correct actions for when the fetch recommended set procedure fails', async () => {
    const expectedError = new Error('Fetch recommended set error');

    (getProductRecommendedSet as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await fetchRecommendedSet(mockRecommendedSetId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getProductRecommendedSet).toHaveBeenCalledTimes(1);
    expect(getProductRecommendedSet).toHaveBeenCalledWith(
      mockRecommendedSetId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { recommendedSetId: mockRecommendedSetId },
        type: productsActionTypes.FETCH_RECOMMENDED_SET_REQUEST,
      },
      {
        meta: { recommendedSetId: mockRecommendedSetId },
        payload: { error: expectedError },
        type: productsActionTypes.FETCH_RECOMMENDED_SET_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the fetch recommended set procedure is successful', async () => {
    (getProductRecommendedSet as jest.Mock).mockResolvedValueOnce(
      mockRecommendedSet,
    );

    await fetchRecommendedSet(mockRecommendedSetId)(store.dispatch).then(
      clientResult => {
        expect(clientResult).toEqual(mockRecommendedSet);
      },
    );

    expect(getProductRecommendedSet).toHaveBeenCalledTimes(1);
    expect(getProductRecommendedSet).toHaveBeenCalledWith(
      mockRecommendedSetId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { recommendedSetId: mockRecommendedSetId },
        type: productsActionTypes.FETCH_RECOMMENDED_SET_REQUEST,
      },
      {
        meta: { recommendedSetId: mockRecommendedSetId },
        payload: { result: mockRecommendedSet },
        type: productsActionTypes.FETCH_RECOMMENDED_SET_SUCCESS,
      },
    ]);
  });
});

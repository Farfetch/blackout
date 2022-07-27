import { fetchRecommendedSet } from '..';
import { getProductRecommendedSet } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/recommendedSet';
import {
  mockRecommendedSet,
  mockRecommendedSetId,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../tests';
import { productsActionTypes } from '../..';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getProductRecommendedSet: jest.fn(),
}));

const recommendedSetMockStore = (state = {}) =>
  mockStore({ recommendedSets: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store;

describe('fetchRecommendedSet() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = recommendedSetMockStore();
  });

  it('should create the correct actions for when the fetch recommended set procedure fails', async () => {
    const expectedError = new Error('Fetch recommended set error');

    getProductRecommendedSet.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store
      .dispatch(fetchRecommendedSet(mockRecommendedSetId))
      .catch(error => {
        expect(error).toBe(expectedError);
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
  });

  it('should create the correct actions for when the fetch recommended set procedure is successful', async () => {
    getProductRecommendedSet.mockResolvedValueOnce(mockRecommendedSet);

    expect.assertions(4);

    await store
      .dispatch(fetchRecommendedSet(mockRecommendedSetId))
      .then(clientResult => {
        expect(clientResult).toEqual(mockRecommendedSet);
      });

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
import { actionTypes } from '../..';
import { fetchRecommendedSet } from '..';
import { getRecommendedSet } from '@farfetch/blackout-client/products';
import { INITIAL_STATE } from '../../reducer/recommendedSet';
import {
  mockRecommendedSet,
  mockRecommendedSetId,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../tests';

jest.mock('@farfetch/blackout-client/products', () => ({
  ...jest.requireActual('@farfetch/blackout-client/products'),
  getRecommendedSet: jest.fn(),
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

    getRecommendedSet.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store
      .dispatch(fetchRecommendedSet(mockRecommendedSetId))
      .catch(error => {
        expect(error).toBe(expectedError);
        expect(getRecommendedSet).toHaveBeenCalledTimes(1);
        expect(getRecommendedSet).toHaveBeenCalledWith(
          mockRecommendedSetId,
          expectedConfig,
        );
        expect(store.getActions()).toEqual([
          {
            meta: { recommendedSetId: mockRecommendedSetId },
            type: actionTypes.FETCH_RECOMMENDED_SET_REQUEST,
          },
          {
            meta: { recommendedSetId: mockRecommendedSetId },
            payload: { error: expectedError },
            type: actionTypes.FETCH_RECOMMENDED_SET_FAILURE,
          },
        ]);
      });
  });

  it('should create the correct actions for when the fetch recommended set procedure is successful', async () => {
    getRecommendedSet.mockResolvedValueOnce(mockRecommendedSet);

    expect.assertions(4);

    await store
      .dispatch(fetchRecommendedSet(mockRecommendedSetId))
      .then(clientResult => {
        expect(clientResult).toEqual(mockRecommendedSet);
      });

    expect(getRecommendedSet).toHaveBeenCalledTimes(1);
    expect(getRecommendedSet).toHaveBeenCalledWith(
      mockRecommendedSetId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { recommendedSetId: mockRecommendedSetId },
        type: actionTypes.FETCH_RECOMMENDED_SET_REQUEST,
      },
      {
        meta: { recommendedSetId: mockRecommendedSetId },
        payload: { result: mockRecommendedSet },
        type: actionTypes.FETCH_RECOMMENDED_SET_SUCCESS,
      },
    ]);
  });
});

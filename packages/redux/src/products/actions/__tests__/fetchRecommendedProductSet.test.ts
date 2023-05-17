import { fetchRecommendedProductSet } from '../index.js';
import { getRecommendedProductSet } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/recommendedProductSet.js';
import {
  mockRecommendedProductSet,
  mockRecommendedProductSetId,
} from 'tests/__fixtures__/products/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import { productsActionTypes } from '../../index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getRecommendedProductSet: jest.fn(),
}));

const recommendedProductSetMockStore = (state = {}) =>
  mockStore({ recommendedSets: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store: ReturnType<typeof recommendedProductSetMockStore>;

describe('fetchRecommendedProductSet() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = recommendedProductSetMockStore();
  });

  it('should create the correct actions for when the fetch recommended product set procedure fails', async () => {
    const expectedError = new Error('Fetch recommended product set error');

    (getRecommendedProductSet as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await fetchRecommendedProductSet(mockRecommendedProductSetId)(
          store.dispatch,
        ),
    ).rejects.toThrow(expectedError);

    expect(getRecommendedProductSet).toHaveBeenCalledTimes(1);
    expect(getRecommendedProductSet).toHaveBeenCalledWith(
      mockRecommendedProductSetId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { recommendedProductSetId: mockRecommendedProductSetId },
        type: productsActionTypes.FETCH_RECOMMENDED_PRODUCT_SET_REQUEST,
      },
      {
        meta: { recommendedProductSetId: mockRecommendedProductSetId },
        payload: { error: expectedError },
        type: productsActionTypes.FETCH_RECOMMENDED_PRODUCT_SET_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the fetch recommended product set procedure is successful', async () => {
    (getRecommendedProductSet as jest.Mock).mockResolvedValueOnce(
      mockRecommendedProductSet,
    );

    await fetchRecommendedProductSet(mockRecommendedProductSetId)(
      store.dispatch,
    ).then(clientResult => {
      expect(clientResult).toEqual(mockRecommendedProductSet);
    });

    expect(getRecommendedProductSet).toHaveBeenCalledTimes(1);
    expect(getRecommendedProductSet).toHaveBeenCalledWith(
      mockRecommendedProductSetId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { recommendedProductSetId: mockRecommendedProductSetId },
        type: productsActionTypes.FETCH_RECOMMENDED_PRODUCT_SET_REQUEST,
      },
      {
        meta: { recommendedProductSetId: mockRecommendedProductSetId },
        payload: { result: mockRecommendedProductSet },
        type: productsActionTypes.FETCH_RECOMMENDED_PRODUCT_SET_SUCCESS,
      },
    ]);
  });
});

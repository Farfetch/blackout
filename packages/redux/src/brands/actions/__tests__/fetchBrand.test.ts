import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import { fetchBrand } from '..//index.js';
import { getBrand } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import {
  mockBrandId,
  mockBrandResponse,
  mockState,
} from 'tests/__fixtures__/brands/index.mjs';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getBrand: jest.fn(),
}));

const brandsMockStore = (state = {}) =>
  mockStore({ brands: INITIAL_STATE }, state);
const expectedConfig = undefined;
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
let store: ReturnType<typeof brandsMockStore>;

describe('fetchBrand() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = brandsMockStore(mockState);
  });

  it('should create the correct actions for when the fetch brand procedure fails', async () => {
    const expectedError = new Error('Fetch brand error');

    (getBrand as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchBrand(mockBrandId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getBrand).toHaveBeenCalledTimes(1);
    expect(getBrand).toHaveBeenCalledWith(mockBrandId, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { brandId: mockBrandId },
        type: actionTypes.FETCH_BRAND_REQUEST,
      },
      {
        meta: { brandId: mockBrandId },
        payload: { error: expectedError },
        type: actionTypes.FETCH_BRAND_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the fetch brand procedure is successful', async () => {
    (getBrand as jest.Mock).mockResolvedValueOnce(mockBrandResponse);

    await fetchBrand(mockBrandId)(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockBrandResponse);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getBrand).toHaveBeenCalledTimes(1);
    expect(getBrand).toHaveBeenCalledWith(mockBrandId, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { brandId: mockBrandId },
        type: actionTypes.FETCH_BRAND_REQUEST,
      },
      {
        meta: { brandId: mockBrandId },
        payload: {
          entities: {
            brands: {
              [mockBrandId]: mockBrandResponse,
            },
          },
          result: mockBrandId,
        },
        type: actionTypes.FETCH_BRAND_SUCCESS,
      },
    ]);
  });
});

import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import { fetchSizeScale } from '../';
import { getSizeScale } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import {
  mockNormalizedResponse,
  mockScaleId,
  mockSizeScale,
  mockState,
} from 'tests/__fixtures__/sizeScales';
import { mockStore } from '../../../../tests';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getSizeScale: jest.fn(),
}));

const sizeScalesMockStore = (state = {}) =>
  mockStore({ details: INITIAL_STATE }, state);
const expectedConfig = undefined;
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
let store: ReturnType<typeof sizeScalesMockStore>;

describe('fetchSizeScale() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = sizeScalesMockStore(mockState);
  });

  it('should create the correct actions for when the fetch size scale procedure fails', async () => {
    const expectedError = new Error('Fetch size scale error');

    (getSizeScale as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchSizeScale(mockScaleId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getSizeScale).toHaveBeenCalledTimes(1);
    expect(getSizeScale).toHaveBeenCalledWith(mockScaleId, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_SIZE_SCALE_REQUEST,
        meta: { sizeScaleId: mockScaleId },
      },
      {
        payload: {
          error: expectedError,
        },
        meta: {
          sizeScaleId: mockScaleId,
        },
        type: actionTypes.FETCH_SIZE_SCALE_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the fetch size scale procedure is successful', async () => {
    (getSizeScale as jest.Mock).mockResolvedValueOnce(mockSizeScale);

    await fetchSizeScale(mockScaleId)(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockSizeScale);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getSizeScale).toHaveBeenCalledTimes(1);
    expect(getSizeScale).toHaveBeenCalledWith(mockScaleId, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_SIZE_SCALE_REQUEST,
        meta: {
          sizeScaleId: mockScaleId,
        },
      },
      {
        payload: mockNormalizedResponse,
        meta: {
          sizeScaleId: mockScaleId,
        },
        type: actionTypes.FETCH_SIZE_SCALE_SUCCESS,
      },
    ]);
  });
});

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
let store;

describe('fetchSizeScale() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = sizeScalesMockStore(mockState);
  });

  it('should create the correct actions for when the fetch product size scale procedure fails', async () => {
    const expectedError = new Error('Fetch product size scale error');

    getSizeScale.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(fetchSizeScale(mockScaleId)).catch(error => {
      expect(error).toBe(expectedError);
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
  });

  it('should create the correct actions for when the fetch product size scale procedure is successful', async () => {
    getSizeScale.mockResolvedValueOnce(mockSizeScale);

    expect.assertions(5);

    await store.dispatch(fetchSizeScale(mockScaleId)).then(clientResult => {
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

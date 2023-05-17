import * as actionTypes from '../../actionTypes.js';
import { fetchSizeScales } from '..//index.js';
import { getSizeScales } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import {
  mockNormalizedResponse,
  mockQuery,
  mockSizeScale,
} from 'tests/__fixtures__/sizeScales/index.mjs';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getSizeScales: jest.fn(),
}));

const sizeScalesMockStore = (state = {}) =>
  mockStore({ sizeScales: INITIAL_STATE }, state);
const mockSizeScales = [mockSizeScale];
const expectedConfig = undefined;
let store: ReturnType<typeof mockStore>;

describe('fetchSizeScales() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = sizeScalesMockStore();
  });

  it('should create the correct actions for when fetching size scales fail', async () => {
    const expectedError = new Error('Fetch size scales error');

    (getSizeScales as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchSizeScales(mockQuery)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getSizeScales).toHaveBeenCalledTimes(1);
    expect(getSizeScales).toHaveBeenCalledWith(mockQuery, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_SIZE_SCALES_REQUEST,
        meta: { query: mockQuery },
      },
      {
        meta: { query: mockQuery },
        payload: { error: expectedError },
        type: actionTypes.FETCH_SIZE_SCALES_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the fetch size scales procedure is successful', async () => {
    (getSizeScales as jest.Mock).mockResolvedValueOnce(mockSizeScales);

    await fetchSizeScales(mockQuery)(store.dispatch);

    const actionResults = store.getActions();

    expect(getSizeScales).toHaveBeenCalledTimes(1);
    expect(getSizeScales).toHaveBeenCalledWith(mockQuery, expectedConfig);
    expect(actionResults).toEqual([
      {
        type: actionTypes.FETCH_SIZE_SCALES_REQUEST,
        meta: { query: mockQuery },
      },
      {
        meta: { query: mockQuery },
        payload: {
          ...mockNormalizedResponse,
          result: [mockNormalizedResponse.result],
        },
        type: actionTypes.FETCH_SIZE_SCALES_SUCCESS,
      },
    ]);
  });
});

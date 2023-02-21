import * as actionTypes from '../../actionTypes';
import { fetchSizeGuides } from '../';
import { getSizeGuides } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockQuery, mockSizeGuides } from 'tests/__fixtures__/sizeGuides';
import { mockStore } from '../../../../tests';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getSizeGuides: jest.fn(),
}));

const sizeGuidesMockStore = (state = {}) =>
  mockStore({ sizeGuides: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store: ReturnType<typeof sizeGuidesMockStore>;

describe('fetchSizeGuides() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = sizeGuidesMockStore();
  });

  it('should create the correct actions for when the fetch sizeGuides procedure fails', async () => {
    const expectedError = new Error('Fetch sizeGuides error');

    (getSizeGuides as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchSizeGuides(mockQuery)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getSizeGuides).toHaveBeenCalledTimes(1);
    expect(getSizeGuides).toHaveBeenCalledWith(mockQuery, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_SIZE_GUIDES_REQUEST,
        meta: { query: mockQuery },
      },
      {
        meta: { query: mockQuery },
        payload: { error: expectedError },
        type: actionTypes.FETCH_SIZE_GUIDES_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the fetch sizeGuides procedure is successful', async () => {
    (getSizeGuides as jest.Mock).mockResolvedValueOnce(mockSizeGuides);

    await fetchSizeGuides(mockQuery)(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockSizeGuides);
    });

    expect(getSizeGuides).toHaveBeenCalledTimes(1);
    expect(getSizeGuides).toHaveBeenCalledWith(mockQuery, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_SIZE_GUIDES_REQUEST,
        meta: { query: mockQuery },
      },
      {
        meta: { query: mockQuery },
        payload: { result: mockSizeGuides },
        type: actionTypes.FETCH_SIZE_GUIDES_SUCCESS,
      },
    ]);
  });
});

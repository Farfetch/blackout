import * as actionTypes from '../../actionTypes';
import { fetchSizeScaleMappings } from '../';
import { getSizeScaleMappings } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import {
  mockSizeScaleMappings,
  mockSizeScaleMappingsQuery,
} from 'tests/__fixtures__/sizeScales';
import { mockStore } from '../../../../tests';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getSizeScaleMappings: jest.fn(),
}));

const sizeScaleMappingsMockStore = (state = {}) =>
  mockStore({ sizeScaleMappings: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store;

describe('fetchSizeScaleMappings() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = sizeScaleMappingsMockStore();
  });

  it('should create the correct actions for when fetching size scales fail', async () => {
    const expectedError = new Error('Fetch size scale mappings error');

    getSizeScaleMappings.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store
      .dispatch(fetchSizeScaleMappings(mockSizeScaleMappingsQuery))
      .catch(error => {
        expect(error).toBe(expectedError);
        expect(getSizeScaleMappings).toHaveBeenCalledTimes(1);
        expect(getSizeScaleMappings).toHaveBeenCalledWith(
          mockSizeScaleMappingsQuery,
          expectedConfig,
        );
        expect(store.getActions()).toEqual([
          {
            type: actionTypes.FETCH_SIZESCALE_MAPPINGS_REQUEST,
            meta: {
              query: mockSizeScaleMappingsQuery,
              hash: '?brand=1664&gender=0&sizeScale=453',
            },
          },
          {
            meta: {
              query: mockSizeScaleMappingsQuery,
              hash: '?brand=1664&gender=0&sizeScale=453',
            },
            payload: { error: expectedError },
            type: actionTypes.FETCH_SIZESCALE_MAPPINGS_FAILURE,
          },
        ]);
      });
  });

  it('should create the correct actions for when the fetch size scale mappings procedure is successful', async () => {
    const response = mockSizeScaleMappings;

    getSizeScaleMappings.mockResolvedValueOnce(response);

    expect.assertions(4);

    await store
      .dispatch(fetchSizeScaleMappings(mockSizeScaleMappingsQuery))
      .then(clientResult => {
        expect(clientResult).toBe(response);
      });

    expect(getSizeScaleMappings).toHaveBeenCalledTimes(1);
    expect(getSizeScaleMappings).toHaveBeenCalledWith(
      mockSizeScaleMappingsQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_SIZESCALE_MAPPINGS_REQUEST,
        meta: {
          query: mockSizeScaleMappingsQuery,
          hash: '?brand=1664&gender=0&sizeScale=453',
        },
      },
      {
        meta: {
          query: mockSizeScaleMappingsQuery,
          hash: '?brand=1664&gender=0&sizeScale=453',
        },
        payload: { result: response },
        type: actionTypes.FETCH_SIZESCALE_MAPPINGS_SUCCESS,
      },
    ]);
  });
});

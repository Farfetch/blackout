import { fetchSizeScaleMappings } from '../';
import {
  mockSizeScaleMappings,
  mockSizeScaleMappingsQuery,
} from 'tests/__fixtures__/sizeScales';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const sizeScaleMappingsMockStore = (state = {}) =>
  mockStore({ sizeScaleMappings: reducer() }, state);

describe('doGetSizeScales() action creator', () => {
  let store;
  const expectedConfig = undefined;
  const getSizeScaleMappings = jest.fn();
  const action = fetchSizeScaleMappings(getSizeScaleMappings);

  beforeEach(() => {
    jest.clearAllMocks();
    store = sizeScaleMappingsMockStore();
  });

  it('should create the correct actions for when fetching size scales fail', async () => {
    const expectedError = new Error('Fetch size scale mappings error');

    getSizeScaleMappings.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockSizeScaleMappingsQuery));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getSizeScaleMappings).toHaveBeenCalledTimes(1);
      expect(getSizeScaleMappings).toHaveBeenCalledWith(
        mockSizeScaleMappingsQuery,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            {
              type: actionTypes.FETCH_SIZESCALE_MAPPINGS_REQUEST,
            },
            {
              meta: mockSizeScaleMappingsQuery,
              payload: { error: expectedError },
              type: actionTypes.FETCH_SIZESCALE_MAPPINGS_FAILURE,
            },
          ),
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch size scale mappings procedure is successful', async () => {
    const response = mockSizeScaleMappings;

    getSizeScaleMappings.mockResolvedValueOnce(response);

    await store.dispatch(action(mockSizeScaleMappingsQuery));

    const actionResults = store.getActions();

    expect(getSizeScaleMappings).toHaveBeenCalledTimes(1);
    expect(getSizeScaleMappings).toHaveBeenCalledWith(
      mockSizeScaleMappingsQuery,
      expectedConfig,
    );
    expect(actionResults).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.FETCH_SIZESCALE_MAPPINGS_REQUEST,
          },
          {
            meta: mockSizeScaleMappingsQuery,
            payload: response,
            type: actionTypes.FETCH_SIZESCALE_MAPPINGS_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_SIZESCALE_MAPPINGS_SUCCESS,
      }),
    ).toMatchSnapshot('Fetch size scale mappings success payload');
  });
});

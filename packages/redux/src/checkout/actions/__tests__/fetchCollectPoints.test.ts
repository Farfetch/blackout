import * as actionTypes from '../../actionTypes';
import {
  checkoutId,
  mockCollectPointsResponse,
} from 'tests/__fixtures__/checkout';
import { fetchCollectPoints } from '..';
import { getCollectPoints } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCollectPoints: jest.fn(),
}));

describe('fetchCollectPoints() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const query = {
    orderId: checkoutId,
  };

  const expectedCollectPointsResult = {
    entities: {
      collectpoints: mockCollectPointsResponse,
    },
  };
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the fetch collect points procedure fails', async () => {
    const expectedError = new Error('fetch collect points error');

    getCollectPoints.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchCollectPoints(query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCollectPoints).toHaveBeenCalledTimes(1);
      expect(getCollectPoints).toHaveBeenCalledWith(query, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_COLLECT_POINTS_REQUEST },
          {
            type: actionTypes.FETCH_COLLECT_POINTS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch collect points procedure is successful', async () => {
    getCollectPoints.mockResolvedValueOnce(mockCollectPointsResponse);
    await store.dispatch(fetchCollectPoints(query));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(getCollectPoints).toHaveBeenCalledTimes(1);
    expect(getCollectPoints).toHaveBeenCalledWith(query, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_COLLECT_POINTS_REQUEST },
      {
        type: actionTypes.FETCH_COLLECT_POINTS_SUCCESS,
        meta: { id: checkoutId },
        payload: expectedCollectPointsResult,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_COLLECT_POINTS_SUCCESS,
      }),
    ).toMatchSnapshot('fetch collect points success payload');
  });
});

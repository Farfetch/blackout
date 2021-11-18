import {
  checkoutId,
  mockCollectPointsResponse,
} from '../../__fixtures__/checkout.fixtures';
import { mockStore } from '../../../../../tests';
import doGetCollectPoints from '../doGetCollectPoints';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

describe('doGetCollectPoints() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: reducer() }, state);
  const query = {
    orderId: checkoutId,
  };
  const getCollectPoints = jest.fn();
  const action = doGetCollectPoints(getCollectPoints);

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

  it('should create the correct actions for when the get collect points procedure fails', async () => {
    const expectedError = new Error('get collect points error');

    getCollectPoints.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCollectPoints).toHaveBeenCalledTimes(1);
      expect(getCollectPoints).toHaveBeenCalledWith(query, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_COLLECTPOINTS_REQUEST },
          {
            type: actionTypes.GET_COLLECTPOINTS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get collect points procedure is successful', async () => {
    getCollectPoints.mockResolvedValueOnce(mockCollectPointsResponse);
    await store.dispatch(action(query));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(getCollectPoints).toHaveBeenCalledTimes(1);
    expect(getCollectPoints).toHaveBeenCalledWith(query, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_COLLECTPOINTS_REQUEST },
      {
        type: actionTypes.GET_COLLECTPOINTS_SUCCESS,
        meta: { id: checkoutId },
        payload: expectedCollectPointsResult,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_COLLECTPOINTS_SUCCESS,
      }),
    ).toMatchSnapshot('get collect points success payload');
  });
});

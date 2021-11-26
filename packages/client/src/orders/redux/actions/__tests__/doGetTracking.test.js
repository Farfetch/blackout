import * as normalizr from 'normalizr';
import {
  expectedTrackingNormalizedPayload,
  mockTrackingResponse,
} from '../../__fixtures__/orders.fixtures';
import { mockStore } from '../../../../../tests';
import doGetTracking from '../doGetTracking';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';
import thunk from 'redux-thunk';

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];
const ordersMockStore = (state = {}) =>
  mockStore({ orders: reducer() }, state, mockMiddlewares);

const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

describe('doGetTracking() action creator', () => {
  const getTrackings = jest.fn();
  const action = doGetTracking(getTrackings);
  const trackingNumbers = '1';

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the get tracking procedure fails', async () => {
    const expectedError = new Error('get tracking error');

    getTrackings.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(trackingNumbers));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getTrackings).toHaveBeenCalledTimes(1);
      expect(getTrackings).toHaveBeenCalledWith(
        trackingNumbers,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_TRACKINGS_REQUEST },
          {
            type: actionTypes.GET_TRACKINGS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get tracking procedure is successful', async () => {
    getTrackings.mockResolvedValueOnce(mockTrackingResponse);
    await store.dispatch(action(trackingNumbers));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getTrackings).toHaveBeenCalledTimes(1);
    expect(getTrackings).toHaveBeenCalledWith(trackingNumbers, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_TRACKINGS_REQUEST },
      {
        type: actionTypes.GET_TRACKINGS_SUCCESS,
        payload: expectedTrackingNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_TRACKINGS_SUCCESS,
      }),
    ).toMatchSnapshot('get tracking success payload');
  });
});

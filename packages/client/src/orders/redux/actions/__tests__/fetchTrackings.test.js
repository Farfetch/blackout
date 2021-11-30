import * as normalizr from 'normalizr';
import {
  expectedTrackingNormalizedPayload,
  mockTrackingResponse,
} from '../../__fixtures__/orders.fixtures';
import { fetchTrackings } from '../';
import { mockStore } from '../../../../../tests';
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

describe('fetchTrackings() action creator', () => {
  const getTrackings = jest.fn();
  const action = fetchTrackings(getTrackings);
  const trackingNumbers = '1';

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the fetch trackings procedure fails', async () => {
    const expectedError = new Error('get tracking error');

    getTrackings.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(action(trackingNumbers)).catch(error => {
      expect(error).toBe(expectedError);
      expect(getTrackings).toHaveBeenCalledTimes(1);
      expect(getTrackings).toHaveBeenCalledWith(
        trackingNumbers,
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        { type: actionTypes.FETCH_TRACKINGS_REQUEST },
        {
          payload: { error: expectedError },
          type: actionTypes.FETCH_TRACKINGS_FAILURE,
        },
      ]);
    });
  });

  it('should create the correct actions for when the fetch trackings procedure is successful', async () => {
    getTrackings.mockResolvedValueOnce(mockTrackingResponse);

    expect.assertions(5);

    await store.dispatch(action(trackingNumbers)).then(clientResult => {
      expect(clientResult).toEqual(mockTrackingResponse);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getTrackings).toHaveBeenCalledTimes(1);
    expect(getTrackings).toHaveBeenCalledWith(trackingNumbers, expectedConfig);
    expect(store.getActions()).toMatchObject([
      { type: actionTypes.FETCH_TRACKINGS_REQUEST },
      {
        payload: expectedTrackingNormalizedPayload,
        type: actionTypes.FETCH_TRACKINGS_SUCCESS,
      },
    ]);
  });
});

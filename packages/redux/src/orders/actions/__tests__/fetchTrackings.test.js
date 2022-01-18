import * as normalizr from 'normalizr';
import { actionTypes } from '../../';
import {
  expectedTrackingNormalizedPayload,
  mockTrackingResponse,
} from '../../__fixtures__/orders.fixtures';
import { fetchTrackings } from '../';
import { getTrackings } from '@farfetch/blackout-client/orders';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import thunk from 'redux-thunk';

jest.mock('@farfetch/blackout-client/orders', () => ({
  ...jest.requireActual('@farfetch/blackout-client/orders'),
  getTrackings: jest.fn(),
}));

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];
const ordersMockStore = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state, mockMiddlewares);
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

describe('fetchTrackings() action creator', () => {
  const trackingNumbers = '1';

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the fetch trackings procedure fails', async () => {
    const expectedError = new Error('get tracking error');

    getTrackings.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(fetchTrackings(trackingNumbers)).catch(error => {
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

    await store.dispatch(fetchTrackings(trackingNumbers)).then(clientResult => {
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

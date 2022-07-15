import * as normalizr from 'normalizr';
import { actionTypes } from '../..';
import {
  expectedTrackingNormalizedPayload,
  mockTrackingResponse,
} from 'tests/__fixtures__/orders';
import { fetchShipmentTrackings } from '..';
import { getShipmentTrackings } from '@farfetch/blackout-client/orders';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import thunk from 'redux-thunk';

jest.mock('@farfetch/blackout-client/orders', () => ({
  ...jest.requireActual('@farfetch/blackout-client/orders'),
  getShipmentTrackings: jest.fn(),
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

describe('fetchShipmentTrackings() action creator', () => {
  const trackingNumbers = '1';

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the fetch trackings procedure fails', async () => {
    const expectedError = new Error('get tracking error');

    getShipmentTrackings.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(fetchShipmentTrackings(trackingNumbers));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getShipmentTrackings).toHaveBeenCalledTimes(1);
      expect(getShipmentTrackings).toHaveBeenCalledWith(
        trackingNumbers,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_SHIPMENT_TRACKINGS_REQUEST },
          {
            type: actionTypes.FETCH_SHIPMENT_TRACKINGS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch trackings procedure is successful', async () => {
    getShipmentTrackings.mockResolvedValueOnce(mockTrackingResponse);

    expect.assertions(5);

    await store
      .dispatch(fetchShipmentTrackings(trackingNumbers))
      .then(clientResult => {
        expect(clientResult).toEqual(mockTrackingResponse);
      });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getShipmentTrackings).toHaveBeenCalledTimes(1);
    expect(getShipmentTrackings).toHaveBeenCalledWith(
      trackingNumbers,
      expectedConfig,
    );
    expect(store.getActions()).toMatchObject([
      { type: actionTypes.FETCH_SHIPMENT_TRACKINGS_REQUEST },
      {
        payload: expectedTrackingNormalizedPayload,
        type: actionTypes.FETCH_SHIPMENT_TRACKINGS_SUCCESS,
      },
    ]);
  });
});

import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import {
  expectedTrackingNormalizedPayload,
  mockTrackingResponse,
} from 'tests/__fixtures__/orders/index.mjs';
import { fetchShipmentTrackings } from '../index.js';
import { getShipmentTrackings } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import thunk from 'redux-thunk';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getShipmentTrackings: jest.fn(),
}));

const getOptions = () => ({ productImgQueryParam: '?c=2' });
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions,
  }),
];
const ordersMockStore = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state, mockMiddlewares);
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store: ReturnType<typeof ordersMockStore>;

describe('fetchShipmentTrackings() action creator', () => {
  const trackingNumbers = '1';

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the fetch shipment trackings procedure fails', async () => {
    const expectedError = new Error('get shipment tracking error');

    (getShipmentTrackings as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchShipmentTrackings(trackingNumbers)(store.dispatch),
    ).rejects.toThrow(expectedError);

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
  });

  it('should create the correct actions for when the fetch shipment trackings procedure is successful', async () => {
    (getShipmentTrackings as jest.Mock).mockResolvedValueOnce(
      mockTrackingResponse,
    );

    await fetchShipmentTrackings(trackingNumbers)(store.dispatch).then(
      clientResult => {
        expect(clientResult).toEqual(mockTrackingResponse);
      },
    );

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

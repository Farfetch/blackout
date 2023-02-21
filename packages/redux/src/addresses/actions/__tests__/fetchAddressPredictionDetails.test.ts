import * as actionTypes from '../../actionTypes';
import { fetchAddressPredictionDetails } from '..';
import { getAddressPredictionDetails } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockAddressPredictionResponse } from 'tests/__fixtures__/addresses';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getAddressPredictionDetails: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const expectedConfig = undefined;
const predictionId = 'predictionid';
const sessionToken = 'sessionToken';
let store: ReturnType<typeof addressesMockStore>;

describe('fetchAddressPredictionDetails() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the get prediction details procedure fails', async () => {
    const expectedError = new Error('get prediction details error');

    (getAddressPredictionDetails as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await fetchAddressPredictionDetails(
          { predictionId },
          { sessionToken },
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getAddressPredictionDetails).toHaveBeenCalledTimes(1);
    expect(getAddressPredictionDetails).toHaveBeenCalledWith(
      { predictionId },
      { sessionToken },
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_ADDRESS_PREDICTION_DETAILS_REQUEST },
        {
          type: actionTypes.FETCH_ADDRESS_PREDICTION_DETAILS_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the get prediction details procedure is successful', async () => {
    (getAddressPredictionDetails as jest.Mock).mockResolvedValueOnce(
      mockAddressPredictionResponse,
    );

    await fetchAddressPredictionDetails(
      { predictionId },
      { sessionToken },
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockAddressPredictionResponse);
    });

    const actionResults = store.getActions();

    expect(getAddressPredictionDetails).toHaveBeenCalledTimes(1);
    expect(getAddressPredictionDetails).toHaveBeenCalledWith(
      { predictionId },
      { sessionToken },
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_ADDRESS_PREDICTION_DETAILS_REQUEST },
      {
        type: actionTypes.FETCH_ADDRESS_PREDICTION_DETAILS_SUCCESS,
        payload: mockAddressPredictionResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_ADDRESS_PREDICTION_DETAILS_SUCCESS,
      }),
    ).toMatchSnapshot('get prediction details success payload');
  });
});

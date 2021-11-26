import { fetchPredictionDetails } from '..';
import { getPredictionDetails } from '@farfetch/blackout-client/addresses';
import { mockPredictionDetailsResponse } from 'tests/__fixtures__/addresses';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

jest.mock('@farfetch/blackout-client/addresses', () => ({
  ...jest.requireActual('@farfetch/blackout-client/addresses'),
  getPredictionDetails: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: reducer() }, state);

const expectedConfig = undefined;
const predictionId = 'predictionid';
const sessionToken = 'sessionToken';
let store;

describe('fetchPredictionDetails() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the get prediction details procedure fails', async () => {
    const expectedError = new Error('get prediction details error');

    getPredictionDetails.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(
        fetchPredictionDetails({ predictionId }, { sessionToken }),
      );
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPredictionDetails).toHaveBeenCalledTimes(1);
      expect(getPredictionDetails).toHaveBeenCalledWith(
        { predictionId },
        { sessionToken },
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_PREDICTION_DETAILS_REQUEST },
          {
            type: actionTypes.FETCH_PREDICTION_DETAILS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get prediction details procedure is successful', async () => {
    getPredictionDetails.mockResolvedValueOnce(mockPredictionDetailsResponse);
    await store.dispatch(
      fetchPredictionDetails({ predictionId }, { sessionToken }),
    );

    const actionResults = store.getActions();

    expect(getPredictionDetails).toHaveBeenCalledTimes(1);
    expect(getPredictionDetails).toHaveBeenCalledWith(
      { predictionId },
      { sessionToken },
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_PREDICTION_DETAILS_REQUEST },
      {
        type: actionTypes.FETCH_PREDICTION_DETAILS_SUCCESS,
        payload: mockPredictionDetailsResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_PREDICTION_DETAILS_SUCCESS,
      }),
    ).toMatchSnapshot('get prediction details success payload');
  });
});

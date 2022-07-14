import { actionTypes } from '../..';
import { fetchAddressPrediction } from '..';
import { getAddressPrediction } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockAddressPredictionResponse } from 'tests/__fixtures__/addresses';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getAddressPrediction: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const expectedConfig = undefined;
const predictionId = 'predictionid';
const sessionToken = 'sessionToken';
let store;

describe('fetchAddressPrediction() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the get prediction details procedure fails', async () => {
    const expectedError = new Error('get prediction details error');

    getAddressPrediction.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(
        fetchAddressPrediction({ predictionId }, { sessionToken }),
      );
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getAddressPrediction).toHaveBeenCalledTimes(1);
      expect(getAddressPrediction).toHaveBeenCalledWith(
        { predictionId },
        { sessionToken },
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_ADDRESS_PREDICTION_REQUEST },
          {
            type: actionTypes.FETCH_ADDRESS_PREDICTION_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get prediction details procedure is successful', async () => {
    getAddressPrediction.mockResolvedValueOnce(mockAddressPredictionResponse);
    await store.dispatch(
      fetchAddressPrediction({ predictionId }, { sessionToken }),
    );

    const actionResults = store.getActions();

    expect(getAddressPrediction).toHaveBeenCalledTimes(1);
    expect(getAddressPrediction).toHaveBeenCalledWith(
      { predictionId },
      { sessionToken },
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_ADDRESS_PREDICTION_REQUEST },
      {
        type: actionTypes.FETCH_ADDRESS_PREDICTION_SUCCESS,
        payload: mockAddressPredictionResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_ADDRESS_PREDICTION_SUCCESS,
      }),
    ).toMatchSnapshot('get prediction details success payload');
  });
});

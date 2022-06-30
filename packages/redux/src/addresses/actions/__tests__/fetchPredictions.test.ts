import { actionTypes } from '../..';
import { fetchPredictions } from '..';
import { getPredictions } from '@farfetch/blackout-client/addresses';
import { INITIAL_STATE } from '../../reducer';
import { mockPredictionsResponse } from 'tests/__fixtures__/addresses';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/addresses', () => ({
  ...jest.requireActual('@farfetch/blackout-client/addresses'),
  getPredictions: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('fetchPredictions() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the get address procedure fails', async () => {
    const expectedError = new Error('get addresses error');

    getPredictions.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchPredictions('', ''));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPredictions).toHaveBeenCalledTimes(1);
      expect(getPredictions).toHaveBeenCalledWith('', '', expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_PREDICTION_REQUEST },
          {
            type: actionTypes.FETCH_PREDICTION_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get payment procedure is successful', async () => {
    getPredictions.mockResolvedValueOnce(mockPredictionsResponse);
    await store.dispatch(fetchPredictions('', ''));

    const actionResults = store.getActions();

    expect(getPredictions).toHaveBeenCalledTimes(1);
    expect(getPredictions).toHaveBeenCalledWith('', '', expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_PREDICTION_REQUEST },
      {
        type: actionTypes.FETCH_PREDICTION_SUCCESS,
        payload: mockPredictionsResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_PREDICTION_SUCCESS,
      }),
    ).toMatchSnapshot('get prediction success payload');
  });
});

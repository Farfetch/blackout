import { mockPredictionResponse } from '../../__fixtures__/addresses.fixtures';
import { mockStore } from '../../../../../tests';
import doGetPredictions from '../doGetPredictions';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doGetPredictions() action creator', () => {
  const getPredictions = jest.fn();
  const action = doGetPredictions(getPredictions);

  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the get address procedure fails', async () => {
    const expectedError = new Error('get addresses error');

    getPredictions.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action('', ''));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPredictions).toHaveBeenCalledTimes(1);
      expect(getPredictions).toHaveBeenCalledWith('', '', expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_PREDICTION_REQUEST },
          {
            type: actionTypes.GET_PREDICTION_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get payment procedure is successful', async () => {
    getPredictions.mockResolvedValueOnce(mockPredictionResponse);
    await store.dispatch(action('', ''));

    const actionResults = store.getActions();

    expect(getPredictions).toHaveBeenCalledTimes(1);
    expect(getPredictions).toHaveBeenCalledWith('', '', expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_PREDICTION_REQUEST },
      {
        type: actionTypes.GET_PREDICTION_SUCCESS,
        payload: mockPredictionResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_PREDICTION_SUCCESS,
      }),
    ).toMatchSnapshot('get prediction success payload');
  });
});

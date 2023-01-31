import { mockPredictionDetailsResponse } from '../../__fixtures__/addresses.fixtures';
import { mockStore } from '../../../../../tests';
import doGetPredictionDetails from '../doGetPredictionDetails';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doGetPredictionDetails() action creator', () => {
  const getPredictionDetails = jest.fn();
  const action = doGetPredictionDetails(getPredictionDetails);

  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  describe('with query params', () => {
    const props = { predictionId: 'prediction' };
    const query = { sessionToken: 'session-token' };
    it('should create the correct actions for when the get prediction details procedure fails', async () => {
      const expectedError = new Error('get prediction details error');

      getPredictionDetails.mockRejectedValueOnce(expectedError);
      expect.assertions(4);

      try {
        await store.dispatch(action(props, query));
      } catch (error) {
        expect(error).toBe(expectedError);
        expect(getPredictionDetails).toHaveBeenCalledTimes(1);
        expect(getPredictionDetails).toHaveBeenCalledWith(
          props,
          query,
          expectedConfig,
        );
        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            { type: actionTypes.GET_PREDICTION_DETAILS_REQUEST },
            {
              type: actionTypes.GET_PREDICTION_DETAILS_FAILURE,
              payload: { error: expectedError },
            },
          ]),
        );
      }
    });

    it('should create the correct actions for when the get prediction details procedure is successful', async () => {
      getPredictionDetails.mockResolvedValueOnce(mockPredictionDetailsResponse);
      await store.dispatch(action(props, query));

      const actionResults = store.getActions();

      expect(getPredictionDetails).toHaveBeenCalledTimes(1);
      expect(getPredictionDetails).toHaveBeenCalledWith(
        props,
        query,
        expectedConfig,
      );
      expect(actionResults).toMatchObject([
        { type: actionTypes.GET_PREDICTION_DETAILS_REQUEST },
        {
          type: actionTypes.GET_PREDICTION_DETAILS_SUCCESS,
          payload: mockPredictionDetailsResponse,
        },
      ]);
      expect(
        find(actionResults, {
          type: actionTypes.GET_PREDICTION_DETAILS_SUCCESS,
        }),
      ).toMatchSnapshot('get prediction details success payload');
    });
  });

  describe('without query params', () => {
    it('should create the correct actions for when the get prediction details procedure fails', async () => {
      const expectedError = new Error('get prediction details error');

      getPredictionDetails.mockRejectedValueOnce(expectedError);
      expect.assertions(4);

      try {
        await store.dispatch(action(''));
      } catch (error) {
        expect(error).toBe(expectedError);
        expect(getPredictionDetails).toHaveBeenCalledTimes(1);
        expect(getPredictionDetails).toHaveBeenCalledWith('', expectedConfig);
        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            { type: actionTypes.GET_PREDICTION_DETAILS_REQUEST },
            {
              type: actionTypes.GET_PREDICTION_DETAILS_FAILURE,
              payload: { error: expectedError },
            },
          ]),
        );
      }
    });

    it('should create the correct actions for when the get prediction details procedure is successful', async () => {
      getPredictionDetails.mockResolvedValueOnce(mockPredictionDetailsResponse);
      await store.dispatch(action(''));

      const actionResults = store.getActions();

      expect(getPredictionDetails).toHaveBeenCalledTimes(1);
      expect(getPredictionDetails).toHaveBeenCalledWith('', expectedConfig);
      expect(actionResults).toMatchObject([
        { type: actionTypes.GET_PREDICTION_DETAILS_REQUEST },
        {
          type: actionTypes.GET_PREDICTION_DETAILS_SUCCESS,
          payload: mockPredictionDetailsResponse,
        },
      ]);
      expect(
        find(actionResults, {
          type: actionTypes.GET_PREDICTION_DETAILS_SUCCESS,
        }),
      ).toMatchSnapshot('get prediction details success payload');
    });
  });
});

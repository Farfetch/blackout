import * as actionTypes from '../../actionTypes';
import { fetchAddressPredictions } from '..';
import { getAddressPredictions } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockAddressPredictionsResponse } from 'tests/__fixtures__/addresses';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getAddressPredictions: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof addressesMockStore>;

describe('fetchAddressPredictions() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the get address predictions procedure fails', async () => {
    const expectedError = new Error('get address predictions error');

    (getAddressPredictions as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    fetchAddressPredictions(
      'street',
      {},
    )(store.dispatch).catch(error => {
      expect(error).toBe(expectedError);
      expect(getAddressPredictions).toHaveBeenCalledTimes(1);
      expect(getAddressPredictions).toHaveBeenCalledWith(
        'street',
        {},
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_ADDRESS_PREDICTIONS_REQUEST },
          {
            type: actionTypes.FETCH_ADDRESS_PREDICTIONS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    });
  });

  it('should create the correct actions for when the get address predictions procedure is successful', async () => {
    (getAddressPredictions as jest.Mock).mockResolvedValueOnce(
      mockAddressPredictionsResponse,
    );

    await fetchAddressPredictions(
      'street',
      {},
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockAddressPredictionsResponse);
    });
    const actionResults = store.getActions();

    expect(getAddressPredictions).toHaveBeenCalledTimes(1);
    expect(getAddressPredictions).toHaveBeenCalledWith(
      'street',
      {},
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_ADDRESS_PREDICTIONS_REQUEST },
      {
        type: actionTypes.FETCH_ADDRESS_PREDICTIONS_SUCCESS,
        payload: mockAddressPredictionsResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_ADDRESS_PREDICTIONS_SUCCESS,
      }),
    ).toMatchSnapshot('get address predictions success payload');
  });
});

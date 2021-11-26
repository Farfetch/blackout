import { actionTypes } from '../..';
import { getIntent } from '@farfetch/blackout-client/payments';
import { INITIAL_STATE } from '../../reducer';
import { mockFetchIntentResponse } from 'tests/__fixtures__/payments';
import { mockStore } from '../../../../tests';
import fetchIntent from '../fetchIntent';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/payments', () => ({
  ...jest.requireActual('@farfetch/blackout-client/payments'),
  getIntent: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ payments: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('fetchIntent() action creator', () => {
  const intentId = '123123';

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions when the fetch intent procedure fails', async () => {
    const expectedError = new Error('fetch intent error');

    getIntent.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchIntent(intentId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getIntent).toHaveBeenCalledTimes(1);
      expect(getIntent).toHaveBeenCalledWith(intentId, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_INTENT_REQUEST },
          {
            type: actionTypes.FETCH_INTENT_FAILURE,

            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions when the fetch intent procedure is successful', async () => {
    getIntent.mockResolvedValueOnce(mockFetchIntentResponse);
    await store.dispatch(fetchIntent(intentId));

    const actionResults = store.getActions();

    expect(getIntent).toHaveBeenCalledTimes(1);
    expect(getIntent).toHaveBeenCalledWith(intentId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_INTENT_REQUEST },
      {
        type: actionTypes.FETCH_INTENT_SUCCESS,
        payload: mockFetchIntentResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_INTENT_SUCCESS,
      }),
    ).toMatchSnapshot('fetch intent success payload');
  });
});

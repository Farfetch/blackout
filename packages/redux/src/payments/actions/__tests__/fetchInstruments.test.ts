import { actionTypes } from '../..';
import { getInstruments } from '@farfetch/blackout-client/payments';
import { INITIAL_STATE } from '../../reducer';
import {
  mockFetchInstrumentsNormalizedPayload,
  mockFetchInstrumentsResponse,
} from 'tests/__fixtures__/payments';
import { mockStore } from '../../../../tests';
import fetchInstruments from '../fetchInstruments';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/payments', () => ({
  ...jest.requireActual('@farfetch/blackout-client/payments'),
  getInstruments: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('fetchInstruments() action creator', () => {
  const intentId = '123123';

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions when the fetch instruments procedure fails', async () => {
    const expectedError = new Error('fetch instruments error');

    getInstruments.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchInstruments(intentId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getInstruments).toHaveBeenCalledTimes(1);
      expect(getInstruments).toHaveBeenCalledWith(intentId, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_INSTRUMENTS_REQUEST },
          {
            type: actionTypes.FETCH_INSTRUMENTS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions when the fetch instruments procedure is successful', async () => {
    getInstruments.mockResolvedValueOnce(mockFetchInstrumentsResponse);
    await store.dispatch(fetchInstruments(intentId));

    const actionResults = store.getActions();

    expect(getInstruments).toHaveBeenCalledTimes(1);
    expect(getInstruments).toHaveBeenCalledWith(intentId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_INSTRUMENTS_REQUEST },
      {
        type: actionTypes.FETCH_INSTRUMENTS_SUCCESS,
        payload: mockFetchInstrumentsNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_INSTRUMENTS_SUCCESS,
      }),
    ).toMatchSnapshot('fetch instruments success payload');
  });
});

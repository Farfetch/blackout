import { actionTypes } from '../..';
import { getInstrument } from '@farfetch/blackout-client/payments';
import { INITIAL_STATE } from '../../reducer';
import {
  mockFetchInstrumentNormalizedPayload,
  mockFetchInstrumentResponse,
} from 'tests/__fixtures__/payments';
import { mockStore } from '../../../../tests';
import fetchInstrument from '../fetchInstrument';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/payments', () => ({
  ...jest.requireActual('@farfetch/blackout-client/payments'),
  getInstrument: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('fetchInstrument() action creator', () => {
  const intentId = '123123';
  const instrumentId = '123123';

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions when the fetch instrument procedure fails', async () => {
    const expectedError = new Error('fetch instrument error');

    getInstrument.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchInstrument(intentId, instrumentId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getInstrument).toHaveBeenCalledTimes(1);
      expect(getInstrument).toHaveBeenCalledWith(
        intentId,
        instrumentId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_INSTRUMENT_REQUEST },
          {
            type: actionTypes.FETCH_INSTRUMENT_FAILURE,

            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions when the fetch instrument procedure is successful', async () => {
    getInstrument.mockResolvedValueOnce(mockFetchInstrumentResponse);
    await store.dispatch(fetchInstrument(intentId, instrumentId));

    const actionResults = store.getActions();

    expect(getInstrument).toHaveBeenCalledTimes(1);
    expect(getInstrument).toHaveBeenCalledWith(
      intentId,
      instrumentId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_INSTRUMENT_REQUEST },
      {
        type: actionTypes.FETCH_INSTRUMENT_SUCCESS,
        payload: mockFetchInstrumentNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_INSTRUMENT_SUCCESS,
      }),
    ).toMatchSnapshot('fetch instrument success payload');
  });
});

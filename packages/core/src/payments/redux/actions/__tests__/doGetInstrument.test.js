import {
  mockGetInstrumentNormalizedPayload,
  mockGetInstrumentResponse,
} from '../../__fixtures__/getInstrument.fixtures';
import { mockStore } from '../../../../../tests';
import doGetInstrument from '../doGetInstrument';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doGetInstrument() action creator', () => {
  const intentId = '123123';
  const instrumentId = '123123';
  const getInstrument = jest.fn();
  const action = doGetInstrument(getInstrument);

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions when the get instruments procedure fails', async () => {
    const expectedError = new Error('instrument error');

    getInstrument.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(intentId, instrumentId));
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
          { type: actionTypes.GET_INSTRUMENT_REQUEST },
          {
            type: actionTypes.GET_INSTRUMENT_FAILURE,

            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions when the get instruments procedure is successful', async () => {
    getInstrument.mockResolvedValueOnce(mockGetInstrumentResponse);
    await store.dispatch(action(intentId, instrumentId));

    const actionResults = store.getActions();

    expect(getInstrument).toHaveBeenCalledTimes(1);
    expect(getInstrument).toHaveBeenCalledWith(
      intentId,
      instrumentId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_INSTRUMENT_REQUEST },
      {
        type: actionTypes.GET_INSTRUMENT_SUCCESS,
        payload: mockGetInstrumentNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_INSTRUMENT_SUCCESS,
      }),
    ).toMatchSnapshot('instrument success payload');
  });
});

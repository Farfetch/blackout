import { actionTypes } from '../..';
import { INITIAL_STATE } from '../../reducer';
import { mockPaymentsResponse } from 'tests/__fixtures__/payments';
import { mockStore } from '../../../../tests';
import { putInstruments } from '@farfetch/blackout-client/payments';
import find from 'lodash/find';
import updateInstruments from '../updateInstruments';

jest.mock('@farfetch/blackout-client/payments', () => ({
  ...jest.requireActual('@farfetch/blackout-client/payments'),
  putInstruments: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('updateInstruments() action creator', () => {
  const intentId = '123123';
  const instrumentId = '123123';
  const data = {
    something: 'something',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the update instruments procedure fails', async () => {
    const expectedError = new Error('update instruments error');

    putInstruments.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(updateInstruments(intentId, instrumentId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(putInstruments).toHaveBeenCalledTimes(1);
      expect(putInstruments).toHaveBeenCalledWith(
        intentId,
        instrumentId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.UPDATE_INSTRUMENT_REQUEST },
          {
            type: actionTypes.UPDATE_INSTRUMENT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update instruments procedure is successful', async () => {
    putInstruments.mockResolvedValueOnce(mockPaymentsResponse);
    await store.dispatch(updateInstruments(intentId, instrumentId, data));

    const actionResults = store.getActions();

    expect(putInstruments).toHaveBeenCalledTimes(1);
    expect(putInstruments).toHaveBeenCalledWith(
      intentId,
      instrumentId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_INSTRUMENT_REQUEST },
      {
        type: actionTypes.UPDATE_INSTRUMENT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_INSTRUMENT_SUCCESS,
      }),
    ).toMatchSnapshot('update instruments success payload');
  });
});

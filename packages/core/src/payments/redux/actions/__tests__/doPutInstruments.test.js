import { mockPaymentsResponse } from '../../__fixtures__/postPayments.fixtures';
import { mockStore } from '../../../../../tests';
import doPutInstruments from '../doPutInstruments';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doPutInstruments() action creator', () => {
  const intentId = '123123';
  const instrumentId = '123123';
  const putPayments = jest.fn();
  const action = doPutInstruments(putPayments);
  const data = {
    something: 'something',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the put instruments procedure fails', async () => {
    const expectedError = new Error('put instruments error');

    putPayments.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(intentId, instrumentId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(putPayments).toHaveBeenCalledTimes(1);
      expect(putPayments).toHaveBeenCalledWith(
        intentId,
        instrumentId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.PUT_INSTRUMENT_REQUEST },
          {
            type: actionTypes.PUT_INSTRUMENT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the put instruments procedure is successful', async () => {
    putPayments.mockResolvedValueOnce(mockPaymentsResponse);
    await store.dispatch(action(intentId, instrumentId, data));

    const actionResults = store.getActions();

    expect(putPayments).toHaveBeenCalledTimes(1);
    expect(putPayments).toHaveBeenCalledWith(
      intentId,
      instrumentId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.PUT_INSTRUMENT_REQUEST },
      {
        type: actionTypes.PUT_INSTRUMENT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.PUT_INSTRUMENT_SUCCESS,
      }),
    ).toMatchSnapshot('put instruments success payload');
  });
});

import { mockStore } from '../../../../../tests';
import doDeleteInstrument from '../doDeleteInstrument';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doDeleteInstrument() action creator', () => {
  const intentId = '123123';
  const instrumentId = '123123';
  const deleteInstrument = jest.fn();
  const action = doDeleteInstrument(deleteInstrument);

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions when the get instruments procedure fails', async () => {
    const expectedError = new Error('delete instrument error');

    deleteInstrument.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(intentId, instrumentId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(deleteInstrument).toHaveBeenCalledTimes(1);
      expect(deleteInstrument).toHaveBeenCalledWith(
        intentId,
        instrumentId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.DELETE_INSTRUMENT_REQUEST },
          {
            type: actionTypes.DELETE_INSTRUMENT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions when the get instruments procedure is successful', async () => {
    deleteInstrument.mockResolvedValueOnce();
    await store.dispatch(action(intentId, instrumentId));

    const actionResults = store.getActions();

    expect(deleteInstrument).toHaveBeenCalledTimes(1);
    expect(deleteInstrument).toHaveBeenCalledWith(
      intentId,
      instrumentId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.DELETE_INSTRUMENT_REQUEST },
      {
        meta: {
          instrumentId: '123123',
        },
        type: actionTypes.DELETE_INSTRUMENT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.DELETE_INSTRUMENT_SUCCESS,
      }),
    ).toMatchSnapshot('delete instrument success payload');
  });
});

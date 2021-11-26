import { actionTypes } from '../..';
import { deleteInstrument } from '@farfetch/blackout-client/payments';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import removeInstrument from '../removeInstrument';

jest.mock('@farfetch/blackout-client/payments', () => ({
  ...jest.requireActual('@farfetch/blackout-client/payments'),
  deleteInstrument: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('removeInstrument() action creator', () => {
  const intentId = '123123';
  const instrumentId = '123123';

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions when the remove instrument procedure fails', async () => {
    const expectedError = new Error('remove instrument error');

    deleteInstrument.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(removeInstrument(intentId, instrumentId));
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
          { type: actionTypes.REMOVE_INSTRUMENT_REQUEST },
          {
            type: actionTypes.REMOVE_INSTRUMENT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions when the remove instrument procedure is successful', async () => {
    deleteInstrument.mockResolvedValueOnce();
    await store.dispatch(removeInstrument(intentId, instrumentId));

    const actionResults = store.getActions();

    expect(deleteInstrument).toHaveBeenCalledTimes(1);
    expect(deleteInstrument).toHaveBeenCalledWith(
      intentId,
      instrumentId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.REMOVE_INSTRUMENT_REQUEST },
      {
        meta: {
          instrumentId: '123123',
        },
        type: actionTypes.REMOVE_INSTRUMENT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REMOVE_INSTRUMENT_SUCCESS,
      }),
    ).toMatchSnapshot('remove instrument success payload');
  });
});

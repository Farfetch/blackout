import { actionTypes } from '../..';
import { INITIAL_STATE } from '../../reducer';
import { mockPaymentsResponse } from 'tests/__fixtures__/payments';
import { mockStore } from '../../../../tests';
import { postInstruments } from '@farfetch/blackout-client/payments';
import createInstruments from '../createInstruments';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/payments', () => ({
  ...jest.requireActual('@farfetch/blackout-client/payments'),
  postInstruments: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('createInstruments() action creator', () => {
  const intentId = '123123';
  const data = {
    something: 'something',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the create instruments procedure fails', async () => {
    const expectedError = new Error('create instruments error');

    postInstruments.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(createInstruments(intentId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postInstruments).toHaveBeenCalledTimes(1);
      expect(postInstruments).toHaveBeenCalledWith(
        intentId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.CREATE_INSTRUMENT_REQUEST },
          {
            type: actionTypes.CREATE_INSTRUMENT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the create instruments procedure is successful', async () => {
    postInstruments.mockResolvedValueOnce(mockPaymentsResponse);
    await store.dispatch(createInstruments(intentId, data));

    const actionResults = store.getActions();

    expect(postInstruments).toHaveBeenCalledTimes(1);
    expect(postInstruments).toHaveBeenCalledWith(
      intentId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_INSTRUMENT_REQUEST },
      {
        type: actionTypes.CREATE_INSTRUMENT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_INSTRUMENT_SUCCESS,
      }),
    ).toMatchSnapshot('create instruments success payload');
  });
});

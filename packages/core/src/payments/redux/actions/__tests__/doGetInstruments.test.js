import {
  mockGetInstrumentsNormalizedPayload,
  mockGetInstrumentsResponse,
} from '../../__fixtures__/getInstruments.fixtures';
import { mockStore } from '../../../../../tests';
import doGetInstruments from '../doGetInstruments';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doGetInstruments() action creator', () => {
  const intentId = '123123';
  const getInstruments = jest.fn();
  const action = doGetInstruments(getInstruments);

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions when the get instruments procedure fails', async () => {
    const expectedError = new Error('instruments error');

    getInstruments.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(intentId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getInstruments).toHaveBeenCalledTimes(1);
      expect(getInstruments).toHaveBeenCalledWith(intentId, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_INSTRUMENTS_REQUEST },
          {
            type: actionTypes.GET_INSTRUMENTS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions when the get instruments procedure is successful', async () => {
    getInstruments.mockResolvedValueOnce(mockGetInstrumentsResponse);
    await store.dispatch(action(intentId));

    const actionResults = store.getActions();

    expect(getInstruments).toHaveBeenCalledTimes(1);
    expect(getInstruments).toHaveBeenCalledWith(intentId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_INSTRUMENTS_REQUEST },
      {
        type: actionTypes.GET_INSTRUMENTS_SUCCESS,
        payload: mockGetInstrumentsNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_INSTRUMENTS_SUCCESS,
      }),
    ).toMatchSnapshot('instruments success payload');
  });
});

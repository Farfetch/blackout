import { mockPaymentsResponse } from '../../__fixtures__/postPayments.fixtures';
import { mockStore } from '../../../../../tests';
import doPostInstruments from '../doPostInstruments';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doPostInstruments() action creator', () => {
  const intentId = '123123';
  const postInstruments = jest.fn();
  const action = doPostInstruments(postInstruments);
  const data = {
    something: 'something',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the post instruments procedure fails', async () => {
    const expectedError = new Error('post instruments error');

    postInstruments.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(intentId, data));
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
          { type: actionTypes.POST_INSTRUMENT_REQUEST },
          {
            type: actionTypes.POST_INSTRUMENT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the post instruments procedure is successful', async () => {
    postInstruments.mockResolvedValueOnce(mockPaymentsResponse);
    await store.dispatch(action(intentId, data));

    const actionResults = store.getActions();

    expect(postInstruments).toHaveBeenCalledTimes(1);
    expect(postInstruments).toHaveBeenCalledWith(
      intentId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.POST_INSTRUMENT_REQUEST },
      {
        type: actionTypes.POST_INSTRUMENT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.POST_INSTRUMENT_SUCCESS,
      }),
    ).toMatchSnapshot('post instruments success payload');
  });
});

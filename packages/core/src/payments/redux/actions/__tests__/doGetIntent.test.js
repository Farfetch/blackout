import { mockGetIntentResponse } from '../../__fixtures__/getIntent.fixtures';
import { mockStore } from '../../../../../tests';
import doGetIntent from '../doGetIntent';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const paymentsMockStore = (state = {}) =>
  mockStore({ payments: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doGetIntent() action creator', () => {
  const intentId = '123123';
  const getIntent = jest.fn();
  const action = doGetIntent(getIntent);

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions when the get intent procedure fails', async () => {
    const expectedError = new Error('get intent error');

    getIntent.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(intentId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getIntent).toHaveBeenCalledTimes(1);
      expect(getIntent).toHaveBeenCalledWith(intentId, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_INTENT_REQUEST },
          {
            type: actionTypes.GET_INTENT_FAILURE,

            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions when the get intent procedure is successful', async () => {
    getIntent.mockResolvedValueOnce(mockGetIntentResponse);
    await store.dispatch(action(intentId));

    const actionResults = store.getActions();

    expect(getIntent).toHaveBeenCalledTimes(1);
    expect(getIntent).toHaveBeenCalledWith(intentId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_INTENT_REQUEST },
      {
        type: actionTypes.GET_INTENT_SUCCESS,
        payload: mockGetIntentResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_INTENT_SUCCESS,
      }),
    ).toMatchSnapshot('get intent success payload');
  });
});

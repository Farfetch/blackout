import { mockApplePaySessionResponse } from '../../__fixtures__/applePaySession.fixtures';
import { mockStore } from '../../../../../tests';
import doPostApplePaySession from '../doPostApplePaySession';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const paymentsMockStore = (state = {}) =>
  mockStore({ applePaySession: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doPostApplePaySession() action creator', () => {
  const postApplePaySession = jest.fn();
  const action = doPostApplePaySession(postApplePaySession);
  const data = {
    validationUrl: 'string',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the post apple pay session procedure fails', async () => {
    const expectedError = new Error('post apple pay session error');

    postApplePaySession.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postApplePaySession).toHaveBeenCalledTimes(1);
      expect(postApplePaySession).toHaveBeenCalledWith(data, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.POST_APPLE_PAY_SESSION_REQUEST },
          {
            type: actionTypes.POST_APPLE_PAY_SESSION_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the post apple pay session procedure is successful', async () => {
    postApplePaySession.mockResolvedValueOnce(mockApplePaySessionResponse);
    await store.dispatch(action(data));

    const actionResults = store.getActions();

    expect(postApplePaySession).toHaveBeenCalledTimes(1);
    expect(postApplePaySession).toHaveBeenCalledWith(data, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.POST_APPLE_PAY_SESSION_REQUEST },
      {
        type: actionTypes.POST_APPLE_PAY_SESSION_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.POST_APPLE_PAY_SESSION_SUCCESS,
      }),
    ).toMatchSnapshot('post apple pay session success payload');
  });
});

import { mockStore } from '../../../../../tests';
import doPostPhoneToken from '../doPostPhoneToken';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

describe('doPostPhoneToken action creator', () => {
  const profileMockStore = (state = {}) =>
    mockStore({ profile: reducer() }, state);

  let store;
  const data = {
    phoneNumber: '123456789',
  };

  const postPhoneToken = jest.fn();
  const action = doPostPhoneToken(postPhoneToken);
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the post user attributes procedure fails', async () => {
    const expectedError = new Error('post user attributes error');

    postPhoneToken.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postPhoneToken).toHaveBeenCalledTimes(1);
      expect(postPhoneToken).toHaveBeenCalledWith(data, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.POST_PHONE_TOKEN_REQUEST },
          {
            type: actionTypes.POST_PHONE_TOKEN_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the post user attributes procedure is successful', async () => {
    postPhoneToken.mockResolvedValueOnce({});
    await store.dispatch(action(data));

    const actionResults = store.getActions();

    expect(postPhoneToken).toHaveBeenCalledTimes(1);
    expect(postPhoneToken).toHaveBeenCalledWith(data, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.POST_PHONE_TOKEN_REQUEST },
      {
        payload: {},
        type: actionTypes.POST_PHONE_TOKEN_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.POST_PHONE_TOKEN_SUCCESS,
      }),
    ).toMatchSnapshot('post user attributes success payload');
  });
});

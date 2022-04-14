import { mockStore } from '../../../../../tests';
import doPostPhoneTokenValidations from '../doPostPhoneTokenValidations';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

describe('doPostPhoneTokenValidations action creator', () => {
  const profileMockStore = (state = {}) =>
    mockStore({ profile: reducer() }, state);

  let store;
  const data = {
    phoneNumber: '123456789',
    token: 'q1w2e3',
  };

  const postPhoneTokenValidations = jest.fn();
  const action = doPostPhoneTokenValidations(postPhoneTokenValidations);
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the post phone token validations procedure fails', async () => {
    const expectedError = new Error('post user attributes error');

    postPhoneTokenValidations.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postPhoneTokenValidations).toHaveBeenCalledTimes(1);
      expect(postPhoneTokenValidations).toHaveBeenCalledWith(
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.POST_PHONE_TOKEN_VALIDATIONS_REQUEST },
          {
            type: actionTypes.POST_PHONE_TOKEN_VALIDATIONS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the post phone token validations procedure is successful', async () => {
    postPhoneTokenValidations.mockResolvedValueOnce({});
    await store.dispatch(action(data));

    const actionResults = store.getActions();

    expect(postPhoneTokenValidations).toHaveBeenCalledTimes(1);
    expect(postPhoneTokenValidations).toHaveBeenCalledWith(
      data,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.POST_PHONE_TOKEN_VALIDATIONS_REQUEST },
      {
        payload: {},
        type: actionTypes.POST_PHONE_TOKEN_VALIDATIONS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.POST_PHONE_TOKEN_VALIDATIONS_SUCCESS,
      }),
    ).toMatchSnapshot('post user attributes success payload');
  });
});

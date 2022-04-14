import { mockStore } from '../../../../../tests';
import doPostPhoneNumberValidations from '../doPostPhoneNumberValidations';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

describe('doPostPhoneNumberValidations action creator', () => {
  const profileMockStore = (state = {}) =>
    mockStore({ profile: reducer() }, state);

  let store;
  const data = {
    phoneNumber: '123456789',
    token: 'q1w2e3',
  };

  const postPhoneNumberValidations = jest.fn();
  const action = doPostPhoneNumberValidations(postPhoneNumberValidations);
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the post phone number validations procedure fails', async () => {
    const expectedError = new Error('post user attributes error');

    postPhoneNumberValidations.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postPhoneNumberValidations).toHaveBeenCalledTimes(1);
      expect(postPhoneNumberValidations).toHaveBeenCalledWith(
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.POST_PHONE_NUMBER_VALIDATIONS_REQUEST },
          {
            type: actionTypes.POST_PHONE_NUMBER_VALIDATIONS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the post phone number validations procedure is successful', async () => {
    postPhoneNumberValidations.mockResolvedValueOnce({});
    await store.dispatch(action(data));

    const actionResults = store.getActions();

    expect(postPhoneNumberValidations).toHaveBeenCalledTimes(1);
    expect(postPhoneNumberValidations).toHaveBeenCalledWith(
      data,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.POST_PHONE_NUMBER_VALIDATIONS_REQUEST },
      {
        payload: {},
        type: actionTypes.POST_PHONE_NUMBER_VALIDATIONS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.POST_PHONE_NUMBER_VALIDATIONS_SUCCESS,
      }),
    ).toMatchSnapshot('post user attributes success payload');
  });
});

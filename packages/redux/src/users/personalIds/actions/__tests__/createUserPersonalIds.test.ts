import * as actionTypes from '../../actionTypes';
import { createUserPersonalId } from '../';
import { INITIAL_STATE } from '../../../reducer';
import { mockPostPersonalIdsResponse } from 'tests/__fixtures__/users';
import { mockStore } from '../../../../../tests';
import { postUserPersonalId } from '@farfetch/blackout-client';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postUserPersonalId: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('createUserPersonalIds action creator', () => {
  let store = usersMockStore();
  const data = {
    backImageId: '',
    frontImageId: '',
    idNumber: '',
    name: '',
  };
  const userId = 12345;
  const config = {
    'X-SUMMER-RequestId': 'test',
  };
  const expectedConfig = {
    'X-SUMMER-RequestId': 'test',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the create personal ids procedure fails', async () => {
    const expectedError = new Error('create user attributes error');

    (postUserPersonalId as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(createUserPersonalId(userId, data, config));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postUserPersonalId).toHaveBeenCalledTimes(1);
      expect(postUserPersonalId).toHaveBeenCalledWith(
        userId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.CREATE_USER_PERSONAL_ID_REQUEST },
          {
            type: actionTypes.CREATE_USER_PERSONAL_ID_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the create personal ids procedure is successful', async () => {
    (postUserPersonalId as jest.Mock).mockResolvedValueOnce(
      mockPostPersonalIdsResponse,
    );
    await store.dispatch(createUserPersonalId(userId, data, config));

    const actionResults = store.getActions();

    expect(postUserPersonalId).toHaveBeenCalledTimes(1);
    expect(postUserPersonalId).toHaveBeenCalledWith(
      userId,
      data,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_USER_PERSONAL_ID_REQUEST },
      {
        payload: mockPostPersonalIdsResponse,
        type: actionTypes.CREATE_USER_PERSONAL_ID_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_USER_PERSONAL_ID_SUCCESS,
      }),
    ).toMatchSnapshot('create personal ids success payload');
  });
});

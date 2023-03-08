import * as actionTypes from '../../actionTypes.js';
import { createUserAttributes } from '..//index.js';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../../reducer.js';
import {
  mockCreateUserAttributesData,
  mockPostUserAttributesResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { mockStore } from '../../../../../tests/index.js';
import { postUserAttribute } from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postUserAttribute: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('createUserAttributes action creator', () => {
  let store = usersMockStore();
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the create user attributes procedure fails', async () => {
    const expectedError = new Error('create user attributes error');

    (postUserAttribute as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await createUserAttributes(
          userId,
          mockCreateUserAttributesData,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(postUserAttribute).toHaveBeenCalledTimes(1);
    expect(postUserAttribute).toHaveBeenCalledWith(
      userId,
      mockCreateUserAttributesData,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.CREATE_USER_ATTRIBUTES_REQUEST },
        {
          type: actionTypes.CREATE_USER_ATTRIBUTES_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the create user attributes procedure is successful', async () => {
    (postUserAttribute as jest.Mock).mockResolvedValueOnce(
      mockPostUserAttributesResponse,
    );
    await createUserAttributes(
      userId,
      mockCreateUserAttributesData,
    )(store.dispatch);

    const actionResults = store.getActions();

    expect(postUserAttribute).toHaveBeenCalledTimes(1);
    expect(postUserAttribute).toHaveBeenCalledWith(
      userId,
      mockCreateUserAttributesData,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_USER_ATTRIBUTES_REQUEST },
      {
        payload: mockPostUserAttributesResponse,
        type: actionTypes.CREATE_USER_ATTRIBUTES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_USER_ATTRIBUTES_SUCCESS,
      }),
    ).toMatchSnapshot('create user attributes success payload');
  });
});

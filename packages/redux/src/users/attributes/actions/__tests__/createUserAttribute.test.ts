import * as actionTypes from '../../actionTypes.js';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../../reducer.js';
import {
  mockCreateUserAttributesData,
  mockPostUserAttributesResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { mockStore } from '../../../../../tests/index.js';
import { postUserAttribute } from '@farfetch/blackout-client';
import createUserAttribute from '../createUserAttribute.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postUserAttribute: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('createUserAttribute action creator', () => {
  let store = usersMockStore();
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the create user attribute procedure fails', async () => {
    const expectedError = new Error('create user attribute error');

    (postUserAttribute as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await createUserAttribute(
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
        { type: actionTypes.CREATE_USER_ATTRIBUTE_REQUEST },
        {
          type: actionTypes.CREATE_USER_ATTRIBUTE_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the create user attribute procedure is successful', async () => {
    (postUserAttribute as jest.Mock).mockResolvedValueOnce(
      mockPostUserAttributesResponse,
    );
    await createUserAttribute(
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
      { type: actionTypes.CREATE_USER_ATTRIBUTE_REQUEST },
      {
        payload: mockPostUserAttributesResponse,
        type: actionTypes.CREATE_USER_ATTRIBUTE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_USER_ATTRIBUTE_SUCCESS,
      }),
    ).toMatchSnapshot('create user attribute success payload');
  });
});

import * as actionTypes from '../../actionTypes.js';
import {
  config,
  expectedConfig,
  mockPersonalIdResponse,
  personalIdImageData,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { createUserPersonalIdImage } from '..//index.js';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { postUserPersonalIdImage } from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postUserPersonalIdImage: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('createUserPersonalIdImage() action creator', () => {
  let store = usersMockStore();

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the create user personal id image procedure fails', async () => {
    const expectedError = new Error('create user personal id image error');

    (postUserPersonalIdImage as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await createUserPersonalIdImage(
          userId,
          personalIdImageData,
          config,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(postUserPersonalIdImage).toHaveBeenCalledTimes(1);
    expect(postUserPersonalIdImage).toHaveBeenCalledWith(
      userId,
      personalIdImageData,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.CREATE_USER_PERSONAL_ID_IMAGE_REQUEST },
        {
          type: actionTypes.CREATE_USER_PERSONAL_ID_IMAGE_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the create user personal id image procedure is successful', async () => {
    (postUserPersonalIdImage as jest.Mock).mockResolvedValueOnce(
      mockPersonalIdResponse,
    );
    await createUserPersonalIdImage(
      userId,
      personalIdImageData,
      config,
    )(store.dispatch);

    const actionResults = store.getActions();

    expect(postUserPersonalIdImage).toHaveBeenCalledTimes(1);
    expect(postUserPersonalIdImage).toHaveBeenCalledWith(
      userId,
      personalIdImageData,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_USER_PERSONAL_ID_IMAGE_REQUEST },
      {
        payload: mockPersonalIdResponse,
        type: actionTypes.CREATE_USER_PERSONAL_ID_IMAGE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_USER_PERSONAL_ID_IMAGE_SUCCESS,
      }),
    ).toMatchSnapshot('create user personal id image success payload');
  });
});

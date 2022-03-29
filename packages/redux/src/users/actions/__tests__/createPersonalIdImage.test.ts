import { actionTypes } from '../..';
import { createPersonalIdImage } from '../';
import { INITIAL_STATE } from '../../reducer';
import { mockPersonalIdResponse } from 'tests/__fixtures__/users';
import { mockStore } from '../../../../tests';
import { postPersonalIdImage } from '@farfetch/blackout-client/users';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/users', () => ({
  ...jest.requireActual('@farfetch/blackout-client/users'),
  postPersonalIdImage: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('createPersonalIdImage action creator', () => {
  let store = usersMockStore();
  const userId = 12345;
  const data = {
    file: 'string',
  };
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

  it('should create the correct actions for when the create personal id image procedure fails', async () => {
    const expectedError = new Error('create personal id image error');

    (postPersonalIdImage as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(createPersonalIdImage(userId, data, config));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postPersonalIdImage).toHaveBeenCalledTimes(1);
      expect(postPersonalIdImage).toHaveBeenCalledWith(
        userId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.CREATE_PERSONAL_ID_IMAGE_REQUEST },
          {
            type: actionTypes.CREATE_PERSONAL_ID_IMAGE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the create personal id image procedure is successful', async () => {
    (postPersonalIdImage as jest.Mock).mockResolvedValueOnce(
      mockPersonalIdResponse,
    );
    await store.dispatch(createPersonalIdImage(userId, data, config));

    const actionResults = store.getActions();

    expect(postPersonalIdImage).toHaveBeenCalledTimes(1);
    expect(postPersonalIdImage).toHaveBeenCalledWith(
      userId,
      data,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_PERSONAL_ID_IMAGE_REQUEST },
      {
        payload: mockPersonalIdResponse,
        type: actionTypes.CREATE_PERSONAL_ID_IMAGE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_PERSONAL_ID_IMAGE_SUCCESS,
      }),
    ).toMatchSnapshot('create personal id image success payload');
  });
});

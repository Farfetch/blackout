import * as actionTypes from '../../actionTypes';
import { deleteUserPersonalId } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../../reducer';
import { mockPersonalIdResponse } from 'tests/__fixtures__/users';
import { mockStore } from '../../../../../tests';
import { removeUserPersonalId } from '../';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteUserPersonalId: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('removeUserPersonalId action creator', () => {
  let store = usersMockStore();
  const userId = 123456789;
  const personalId = '123456';
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

  it('should create the correct actions for when the remove personal id procedure fails', async () => {
    const expectedError = new Error('remove personal id error');

    (deleteUserPersonalId as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(removeUserPersonalId(userId, personalId, config));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(deleteUserPersonalId).toHaveBeenCalledTimes(1);
      expect(deleteUserPersonalId).toHaveBeenCalledWith(
        userId,
        personalId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.REMOVE_USER_PERSONAL_ID_REQUEST },
          {
            type: actionTypes.REMOVE_USER_PERSONAL_ID_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the remove personal id procedure is successful', async () => {
    (deleteUserPersonalId as jest.Mock).mockResolvedValueOnce(
      mockPersonalIdResponse,
    );

    await store.dispatch(removeUserPersonalId(userId, personalId, config));

    const actionResults = store.getActions();

    expect(deleteUserPersonalId).toHaveBeenCalledTimes(1);
    expect(deleteUserPersonalId).toHaveBeenCalledWith(
      userId,
      personalId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.REMOVE_USER_PERSONAL_ID_REQUEST },
      {
        payload: mockPersonalIdResponse,
        type: actionTypes.REMOVE_USER_PERSONAL_ID_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REMOVE_USER_PERSONAL_ID_SUCCESS,
      }),
    ).toMatchSnapshot('remove personal id success payload');
  });
});

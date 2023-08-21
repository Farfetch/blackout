import * as actionTypes from '../../actionTypes.js';
import {
  closetId,
  closetItemId,
  config,
  expectedConfig,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { deleteUserClosetItem } from '@farfetch/blackout-client';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { removeUserClosetItem } from '../index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteUserClosetItem: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('removeUserClosetItem() action creator', () => {
  let store = usersMockStore();

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the remove user closet item procedure fails', async () => {
    const expectedError = new Error('remove user closet item error');

    (deleteUserClosetItem as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await removeUserClosetItem(
          userId,
          closetId,
          closetItemId,
          config,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(deleteUserClosetItem).toHaveBeenCalledTimes(1);
    expect(deleteUserClosetItem).toHaveBeenCalledWith(
      userId,
      closetId,
      closetItemId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.REMOVE_USER_CLOSET_ITEM_REQUEST },
        {
          type: actionTypes.REMOVE_USER_CLOSET_ITEM_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the remove user closet item procedure is successful', async () => {
    (deleteUserClosetItem as jest.Mock).mockResolvedValueOnce(200);

    await removeUserClosetItem(
      userId,
      closetId,
      closetItemId,
      config,
    )(store.dispatch);

    const actionResults = store.getActions();

    expect(deleteUserClosetItem).toHaveBeenCalledTimes(1);
    expect(deleteUserClosetItem).toHaveBeenCalledWith(
      userId,
      closetId,
      closetItemId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.REMOVE_USER_CLOSET_ITEM_REQUEST },
      {
        type: actionTypes.REMOVE_USER_CLOSET_ITEM_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REMOVE_USER_CLOSET_ITEM_SUCCESS,
      }),
    ).toMatchSnapshot('remove user closet item success payload');
  });
});

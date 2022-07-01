import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../../reducer';
import { mockPutDefaultPersonalIdResponse } from 'tests/__fixtures__/users';
import { mockStore } from '../../../../../tests';
import { putUserDefaultPersonalId } from '@farfetch/blackout-client';
import { setUserDefaultPersonalId } from '../';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  putUserDefaultPersonalId: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('setUserDefaultPersonalId action creator', () => {
  let store = usersMockStore();
  const data = {
    id: '',
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

  it('should create the correct actions for when the set default personal id procedure fails', async () => {
    const expectedError = new Error('set default personal id error');

    (putUserDefaultPersonalId as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );
    expect.assertions(4);

    try {
      await store.dispatch(setUserDefaultPersonalId(userId, data, config));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(putUserDefaultPersonalId).toHaveBeenCalledTimes(1);
      expect(putUserDefaultPersonalId).toHaveBeenCalledWith(
        userId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.SET_USER_DEFAULT_PERSONAL_ID_REQUEST },
          {
            type: actionTypes.SET_USER_DEFAULT_PERSONAL_ID_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the set default personal id procedure is successful', async () => {
    (putUserDefaultPersonalId as jest.Mock).mockResolvedValueOnce(
      mockPutDefaultPersonalIdResponse,
    );
    await store.dispatch(setUserDefaultPersonalId(userId, data, config));

    const actionResults = store.getActions();

    expect(putUserDefaultPersonalId).toHaveBeenCalledTimes(1);
    expect(putUserDefaultPersonalId).toHaveBeenCalledWith(
      userId,
      data,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.SET_USER_DEFAULT_PERSONAL_ID_REQUEST },
      {
        payload: mockPutDefaultPersonalIdResponse,
        type: actionTypes.SET_USER_DEFAULT_PERSONAL_ID_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.SET_USER_DEFAULT_PERSONAL_ID_SUCCESS,
      }),
    ).toMatchSnapshot('set default personal id success payload');
  });
});

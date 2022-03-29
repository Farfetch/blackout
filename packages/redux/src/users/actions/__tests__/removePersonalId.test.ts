import { actionTypes } from '../..';
import { deletePersonalId } from '@farfetch/blackout-client/users';
import { INITIAL_STATE } from '../../reducer';
import { mockPersonalIdResponse } from 'tests/__fixtures__/users';
import { mockStore } from '../../../../tests';
import { removePersonalId } from '../';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/users', () => ({
  ...jest.requireActual('@farfetch/blackout-client/users'),
  deletePersonalId: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('removePersonalId action creator', () => {
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

    (deletePersonalId as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(removePersonalId(userId, personalId, config));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(deletePersonalId).toHaveBeenCalledTimes(1);
      expect(deletePersonalId).toHaveBeenCalledWith(
        userId,
        personalId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.REMOVE_PERSONAL_ID_REQUEST },
          {
            type: actionTypes.REMOVE_PERSONAL_ID_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the remove personal id procedure is successful', async () => {
    (deletePersonalId as jest.Mock).mockResolvedValueOnce(
      mockPersonalIdResponse,
    );

    await store.dispatch(removePersonalId(userId, personalId, config));

    const actionResults = store.getActions();

    expect(deletePersonalId).toHaveBeenCalledTimes(1);
    expect(deletePersonalId).toHaveBeenCalledWith(
      userId,
      personalId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.REMOVE_PERSONAL_ID_REQUEST },
      {
        payload: mockPersonalIdResponse,
        type: actionTypes.REMOVE_PERSONAL_ID_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REMOVE_PERSONAL_ID_SUCCESS,
      }),
    ).toMatchSnapshot('remove personal id success payload');
  });
});

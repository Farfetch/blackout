import { mockStore } from '../../../../../tests';
import doDeletePersonalId from '../doDeletePersonalId';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const profileMockStore = (state = {}) =>
  mockStore({ profile: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doDeletePersonalId action creator', () => {
  const deletePersonalId = jest.fn();
  const action = doDeletePersonalId(deletePersonalId);
  const userId = 123456789;
  const personalId = '123456';

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the delete personal id procedure fails', async () => {
    const expectedError = new Error('delete personal id error');

    deletePersonalId.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId, personalId));
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
          { type: actionTypes.DELETE_PERSONAL_ID_REQUEST },
          {
            type: actionTypes.DELETE_PERSONAL_ID_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the delete personal id procedure is successful', async () => {
    deletePersonalId.mockResolvedValueOnce();

    await store.dispatch(action(userId, personalId, expectedConfig));

    const actionResults = store.getActions();

    expect(deletePersonalId).toHaveBeenCalledTimes(1);
    expect(deletePersonalId).toHaveBeenCalledWith(
      userId,
      personalId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.DELETE_PERSONAL_ID_REQUEST },
      {
        type: actionTypes.DELETE_PERSONAL_ID_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.DELETE_PERSONAL_ID_SUCCESS,
      }),
    ).toMatchSnapshot('delete personal id success payload');
  });
});

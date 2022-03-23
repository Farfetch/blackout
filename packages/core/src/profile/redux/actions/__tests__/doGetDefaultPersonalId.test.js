import { doGetDefaultPersonalId } from '..';
import {
  mockGetDefaultPersonalIdResponse,
  userId,
} from '../../__fixtures__/personalIds.fixtures';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const profileMockStore = (state = {}) =>
  mockStore({ profile: reducer() }, state);

describe('doGetDefaultPersonalId action creator', () => {
  let store;
  const getDefaultPersonalId = jest.fn();
  const action = doGetDefaultPersonalId(getDefaultPersonalId);
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the get default personal id procedure fails', async () => {
    const expectedError = new Error('get default personal id error');

    getDefaultPersonalId.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getDefaultPersonalId).toHaveBeenCalledTimes(1);
      expect(getDefaultPersonalId).toHaveBeenCalledWith(userId, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_DEFAULT_PERSONAL_ID_REQUEST },
          {
            type: actionTypes.GET_DEFAULT_PERSONAL_ID_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get default personal id procedure is successful', async () => {
    getDefaultPersonalId.mockResolvedValueOnce(
      mockGetDefaultPersonalIdResponse,
    );

    await store.dispatch(action(userId));

    const actionResults = store.getActions();

    expect(getDefaultPersonalId).toHaveBeenCalledTimes(1);
    expect(getDefaultPersonalId).toHaveBeenCalledWith(userId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_DEFAULT_PERSONAL_ID_REQUEST },
      {
        payload: mockGetDefaultPersonalIdResponse,
        type: actionTypes.GET_DEFAULT_PERSONAL_ID_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_DEFAULT_PERSONAL_ID_SUCCESS,
      }),
    ).toMatchSnapshot('get default personal id success payload');
  });
});

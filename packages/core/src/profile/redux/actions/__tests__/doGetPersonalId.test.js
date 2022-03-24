import { mockGetPersonalIdResponse } from '../../__fixtures__/personalId.fixtures';
import { mockStore } from '../../../../../tests';
import doGetPersonalId from '../doGetPersonalId';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const profileMockStore = (state = {}) =>
  mockStore({ profile: reducer() }, state);

describe('doGetPersonalId action creator', () => {
  let store;
  const getPersonalId = jest.fn();
  const action = doGetPersonalId(getPersonalId);
  const userId = 123456;
  const personalId = '123456';
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the get personal id procedure fails', async () => {
    const expectedError = new Error('get personal id error');

    getPersonalId.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId, personalId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPersonalId).toHaveBeenCalledTimes(1);
      expect(getPersonalId).toHaveBeenCalledWith(
        userId,
        personalId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_PERSONAL_ID_REQUEST },
          {
            type: actionTypes.GET_PERSONAL_ID_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get personal id procedure is successful', async () => {
    getPersonalId.mockResolvedValueOnce(mockGetPersonalIdResponse);

    await store.dispatch(action(userId, personalId));

    const actionResults = store.getActions();

    expect(getPersonalId).toHaveBeenCalledTimes(1);
    expect(getPersonalId).toHaveBeenCalledWith(
      userId,
      personalId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_PERSONAL_ID_REQUEST },
      {
        payload: mockGetPersonalIdResponse,
        type: actionTypes.GET_PERSONAL_ID_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_PERSONAL_ID_SUCCESS,
      }),
    ).toMatchSnapshot('get personal id success payload');
  });
});

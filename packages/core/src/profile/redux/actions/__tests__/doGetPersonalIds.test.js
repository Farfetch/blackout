import { doGetPersonalIds } from '../';
import {
  mockGetPersonalIdsResponse,
  userId,
} from '../../__fixtures__/personalIds.fixtures';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const profileMockStore = (state = {}) =>
  mockStore({ profile: reducer() }, state);

describe('doGetPersonalIds action creator', () => {
  let store;
  const getPersonalIds = jest.fn();
  const action = doGetPersonalIds(getPersonalIds);
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the get personal ids procedure fails', async () => {
    const expectedError = new Error('get personal ids error');

    getPersonalIds.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPersonalIds).toHaveBeenCalledTimes(1);
      expect(getPersonalIds).toHaveBeenCalledWith(userId, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_PERSONAL_IDS_REQUEST },
          {
            type: actionTypes.GET_PERSONAL_IDS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get personal ids procedure is successful', async () => {
    getPersonalIds.mockResolvedValueOnce(mockGetPersonalIdsResponse);

    await store.dispatch(action(userId));

    const actionResults = store.getActions();

    expect(getPersonalIds).toHaveBeenCalledTimes(1);
    expect(getPersonalIds).toHaveBeenCalledWith(userId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_PERSONAL_IDS_REQUEST },
      {
        payload: mockGetPersonalIdsResponse,
        type: actionTypes.GET_PERSONAL_IDS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_PERSONAL_IDS_SUCCESS,
      }),
    ).toMatchSnapshot('get personal ids success payload');
  });
});

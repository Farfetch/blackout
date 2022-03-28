import { actionTypes } from '../..';
import { fetchDefaultPersonalId } from '../';
import { getDefaultPersonalId } from '@farfetch/blackout-client/users';
import { INITIAL_STATE } from '../../reducer';
import { mockGetDefaultPersonalIdResponse } from 'tests/__fixtures__/users';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/users', () => ({
  ...jest.requireActual('@farfetch/blackout-client/users'),
  getDefaultPersonalId: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('fetchDefaultPersonalId action creator', () => {
  let store = usersMockStore();
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

  it('should create the correct actions for when the fetch default personal id procedure fails', async () => {
    const expectedError = new Error('fetch default personal id error');

    (getDefaultPersonalId as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchDefaultPersonalId(userId, config));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getDefaultPersonalId).toHaveBeenCalledTimes(1);
      expect(getDefaultPersonalId).toHaveBeenCalledWith(userId, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_DEFAULT_PERSONAL_ID_REQUEST },
          {
            type: actionTypes.FETCH_DEFAULT_PERSONAL_ID_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch default personal id procedure is successful', async () => {
    (getDefaultPersonalId as jest.Mock).mockResolvedValueOnce(
      mockGetDefaultPersonalIdResponse,
    );
    await store.dispatch(fetchDefaultPersonalId(userId, config));

    const actionResults = store.getActions();

    expect(getDefaultPersonalId).toHaveBeenCalledTimes(1);
    expect(getDefaultPersonalId).toHaveBeenCalledWith(userId, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_DEFAULT_PERSONAL_ID_REQUEST },
      {
        payload: mockGetDefaultPersonalIdResponse,
        type: actionTypes.FETCH_DEFAULT_PERSONAL_ID_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_DEFAULT_PERSONAL_ID_SUCCESS,
      }),
    ).toMatchSnapshot('fetch default personal id success payload');
  });
});

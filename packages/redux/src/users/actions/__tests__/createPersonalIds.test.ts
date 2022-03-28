import { actionTypes } from '../..';
import { createPersonalIds } from '../';
import { INITIAL_STATE } from '../../reducer';
import { mockPostPersonalIdsResponse } from 'tests/__fixtures__/users';
import { mockStore } from '../../../../tests';
import { postPersonalIds } from '@farfetch/blackout-client/users';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/users', () => ({
  ...jest.requireActual('@farfetch/blackout-client/users'),
  postPersonalIds: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('createPersonalIds action creator', () => {
  let store = usersMockStore();
  const data = {
    backImageId: '',
    frontImageId: '',
    idNumber: '',
    name: '',
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

  it('should create the correct actions for when the create personal ids procedure fails', async () => {
    const expectedError = new Error('create user attributes error');

    (postPersonalIds as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(createPersonalIds(userId, data, config));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postPersonalIds).toHaveBeenCalledTimes(1);
      expect(postPersonalIds).toHaveBeenCalledWith(
        userId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.CREATE_PERSONAL_IDS_REQUEST },
          {
            type: actionTypes.CREATE_PERSONAL_IDS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the create personal ids procedure is successful', async () => {
    (postPersonalIds as jest.Mock).mockResolvedValueOnce(
      mockPostPersonalIdsResponse,
    );
    await store.dispatch(createPersonalIds(userId, data, config));

    const actionResults = store.getActions();

    expect(postPersonalIds).toHaveBeenCalledTimes(1);
    expect(postPersonalIds).toHaveBeenCalledWith(userId, data, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_PERSONAL_IDS_REQUEST },
      {
        payload: mockPostPersonalIdsResponse,
        type: actionTypes.CREATE_PERSONAL_IDS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_PERSONAL_IDS_SUCCESS,
      }),
    ).toMatchSnapshot('create personal ids success payload');
  });
});

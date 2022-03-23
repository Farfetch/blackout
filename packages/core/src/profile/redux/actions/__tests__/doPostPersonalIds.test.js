import {
  mockPostPersonalIdsData,
  mockPostPersonalIdsResponse,
  userId,
} from '../../__fixtures__/personalIds.fixtures';
import { mockStore } from '../../../../../tests';
import doPostPersonalIds from '../doPostPersonalIds';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

describe('doPostPersonalIds action creator', () => {
  const profileMockStore = (state = {}) =>
    mockStore({ profile: reducer() }, state);

  let store;
  const data = mockPostPersonalIdsData;
  const postPersonalIds = jest.fn();
  const action = doPostPersonalIds(postPersonalIds);
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the post personal ids procedure fails', async () => {
    const expectedError = new Error('post personal ids error');

    postPersonalIds.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId, data));
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
          { type: actionTypes.POST_PERSONAL_IDS_REQUEST },
          {
            type: actionTypes.POST_PERSONAL_IDS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the post personal ids procedure is successful', async () => {
    postPersonalIds.mockResolvedValueOnce(mockPostPersonalIdsResponse);
    await store.dispatch(action(userId, data));

    const actionResults = store.getActions();

    expect(postPersonalIds).toHaveBeenCalledTimes(1);
    expect(postPersonalIds).toHaveBeenCalledWith(userId, data, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.POST_PERSONAL_IDS_REQUEST },
      {
        payload: mockPostPersonalIdsResponse,
        type: actionTypes.POST_PERSONAL_IDS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.POST_PERSONAL_IDS_SUCCESS,
      }),
    ).toMatchSnapshot('post personal ids success payload');
  });
});

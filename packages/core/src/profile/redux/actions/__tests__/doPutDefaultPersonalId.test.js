import {
  mockPutDefaultPersonalIdData,
  mockPutDefaultPersonalIdResponse,
  userId,
} from '../../__fixtures__/personalIds.fixtures';
import { mockStore } from '../../../../../tests';
import doPutDefaultPersonalId from '../doPutDefaultPersonalId';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

describe('doPutDefaultPersonalId action creator', () => {
  const profileMockStore = (state = {}) =>
    mockStore({ profile: reducer() }, state);

  let store;
  const data = mockPutDefaultPersonalIdData;
  const putDefaultPersonalId = jest.fn();
  const action = doPutDefaultPersonalId(putDefaultPersonalId);
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the put default personal id procedure fails', async () => {
    const expectedError = new Error('put default personal id error');

    putDefaultPersonalId.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(putDefaultPersonalId).toHaveBeenCalledTimes(1);
      expect(putDefaultPersonalId).toHaveBeenCalledWith(
        userId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.PUT_DEFAULT_PERSONAL_ID_REQUEST },
          {
            type: actionTypes.PUT_DEFAULT_PERSONAL_ID_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the put default personal id procedure is successful', async () => {
    putDefaultPersonalId.mockResolvedValueOnce(
      mockPutDefaultPersonalIdResponse,
    );
    await store.dispatch(action(userId, data));

    const actionResults = store.getActions();

    expect(putDefaultPersonalId).toHaveBeenCalledTimes(1);
    expect(putDefaultPersonalId).toHaveBeenCalledWith(
      userId,
      data,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.PUT_DEFAULT_PERSONAL_ID_REQUEST },
      {
        payload: mockPutDefaultPersonalIdResponse,
        type: actionTypes.PUT_DEFAULT_PERSONAL_ID_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.PUT_DEFAULT_PERSONAL_ID_SUCCESS,
      }),
    ).toMatchSnapshot('put default personal id success payload');
  });
});

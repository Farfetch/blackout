import { actionTypes } from '../..';
import { INITIAL_STATE } from '../../reducer';
import { mockPutUserAttributeResponse } from '../../__fixtures__/userAttribute.fixtures';
import { mockStore } from '../../../../tests';
import { putUserAttribute } from '@farfetch/blackout-client/users';
import { setUserAttribute } from '../';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/users', () => ({
  ...jest.requireActual('@farfetch/blackout-client/users'),
  putUserAttribute: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('setUserAttribute action creator', () => {
  let store;
  const userId = 123456;
  const attributeId = '123456';
  const data = {};
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the set user attribute procedure fails', async () => {
    const expectedError = new Error('set user attribute error');

    putUserAttribute.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(setUserAttribute(userId, attributeId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(putUserAttribute).toHaveBeenCalledTimes(1);
      expect(putUserAttribute).toHaveBeenCalledWith(
        userId,
        attributeId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.SET_USER_ATTRIBUTE_REQUEST },
          {
            type: actionTypes.SET_USER_ATTRIBUTE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the set user attribute procedure is successful', async () => {
    putUserAttribute.mockResolvedValueOnce(mockPutUserAttributeResponse);

    await store.dispatch(setUserAttribute(userId, attributeId, data));

    const actionResults = store.getActions();

    expect(putUserAttribute).toHaveBeenCalledTimes(1);
    expect(putUserAttribute).toHaveBeenCalledWith(
      userId,
      attributeId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.SET_USER_ATTRIBUTE_REQUEST },
      {
        payload: mockPutUserAttributeResponse,
        type: actionTypes.SET_USER_ATTRIBUTE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.SET_USER_ATTRIBUTE_SUCCESS,
      }),
    ).toMatchSnapshot('set user attribute success payload');
  });
});

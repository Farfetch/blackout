import { mockPutUserAttributeResponse } from '../../__fixtures__/userAttribute.fixtures';
import { mockStore } from '../../../../../tests';
import doPutUserAttribute from '../doPutUserAttribute';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const profileMockStore = (state = {}) =>
  mockStore({ profile: reducer() }, state);

let store;

describe('doPutUserAttribute action creator', () => {
  const userId = 123456;
  const attributeId = '123456';
  const data = {};
  const expectedConfig = undefined;
  const putUserAttribute = jest.fn();
  const action = doPutUserAttribute(putUserAttribute);

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the update user attribute procedure fails', async () => {
    const expectedError = new Error('update user attribute error');

    putUserAttribute.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId, attributeId, data));
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
          { type: actionTypes.PUT_USER_ATTRIBUTE_REQUEST },
          {
            type: actionTypes.PUT_USER_ATTRIBUTE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update user attribute procedure is successful', async () => {
    putUserAttribute.mockResolvedValueOnce(mockPutUserAttributeResponse);

    await store.dispatch(action(userId, attributeId, data));

    const actionResults = store.getActions();

    expect(putUserAttribute).toHaveBeenCalledTimes(1);
    expect(putUserAttribute).toHaveBeenCalledWith(
      userId,
      attributeId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.PUT_USER_ATTRIBUTE_REQUEST },
      {
        payload: mockPutUserAttributeResponse,
        type: actionTypes.PUT_USER_ATTRIBUTE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.PUT_USER_ATTRIBUTE_SUCCESS,
      }),
    ).toMatchSnapshot('update user attribute success payload');
  });
});

import { mockPostPersonalIdImageResponse } from '../../__fixtures__/personalId.fixtures';
import { mockStore } from '../../../../../tests';
import doPostPersonalIdImage from '../doPostPersonalIdImage';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

describe('doPostPersonalIdImage action creator', () => {
  const profileMockStore = (state = {}) =>
    mockStore({ profile: reducer() }, state);

  let store;
  const postPersonalIdImage = jest.fn();
  const action = doPostPersonalIdImage(postPersonalIdImage);
  const userId = 12345;
  const data = {
    file: 'string',
  };
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the post personal id image procedure fails', async () => {
    const expectedError = new Error('post personal id image error');

    postPersonalIdImage.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postPersonalIdImage).toHaveBeenCalledTimes(1);
      expect(postPersonalIdImage).toHaveBeenCalledWith(
        userId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.POST_PERSONAL_ID_IMAGE_REQUEST },
          {
            type: actionTypes.POST_PERSONAL_ID_IMAGE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the post personal id image procedure is successful', async () => {
    postPersonalIdImage.mockResolvedValueOnce(mockPostPersonalIdImageResponse);
    await store.dispatch(action(userId, data));

    const actionResults = store.getActions();

    expect(postPersonalIdImage).toHaveBeenCalledTimes(1);
    expect(postPersonalIdImage).toHaveBeenCalledWith(
      userId,
      data,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.POST_PERSONAL_ID_IMAGE_REQUEST },
      {
        payload: mockPostPersonalIdImageResponse,
        type: actionTypes.POST_PERSONAL_ID_IMAGE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.POST_PERSONAL_ID_IMAGE_SUCCESS,
      }),
    ).toMatchSnapshot('post personal id image success payload');
  });
});

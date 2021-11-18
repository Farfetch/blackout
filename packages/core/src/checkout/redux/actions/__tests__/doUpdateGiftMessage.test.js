import { checkoutId } from '../../__fixtures__/checkout.fixtures';
import { mockStore } from '../../../../../tests';
import doUpdateGiftMessage from '../doUpdateGiftMessage';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

describe('doUpdateGiftMessage() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: reducer() }, state);
  const expectedConfig = undefined;
  const patchGiftMessage = jest.fn();
  const action = doUpdateGiftMessage(patchGiftMessage);
  const data = {
    something: 'something',
  };
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the update gift message procedure fails', async () => {
    const expectedError = new Error('update gift message error');

    patchGiftMessage.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(checkoutId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(patchGiftMessage).toHaveBeenCalledTimes(1);
      expect(patchGiftMessage).toHaveBeenCalledWith(
        checkoutId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.UPDATE_GIFT_MESSAGE_REQUEST },
          {
            type: actionTypes.UPDATE_GIFT_MESSAGE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update gift message procedure is successful', async () => {
    patchGiftMessage.mockResolvedValueOnce();
    await store.dispatch(action(checkoutId, data));

    const actionResults = store.getActions();

    expect(patchGiftMessage).toHaveBeenCalledTimes(1);
    expect(patchGiftMessage).toHaveBeenCalledWith(
      checkoutId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_GIFT_MESSAGE_REQUEST },
      { type: actionTypes.UPDATE_GIFT_MESSAGE_SUCCESS },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_GIFT_MESSAGE_SUCCESS,
      }),
    ).toMatchSnapshot('update gift message success payload');
  });
});

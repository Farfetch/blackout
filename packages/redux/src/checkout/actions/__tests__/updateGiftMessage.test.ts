import { actionTypes } from '../..';
import { checkoutId } from 'tests/__fixtures__/checkout';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { patchGiftMessage } from '@farfetch/blackout-client/checkout';
import { updateGiftMessage } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/checkout', () => ({
  ...jest.requireActual('@farfetch/blackout-client/checkout'),
  patchGiftMessage: jest.fn(),
}));

describe('updateGiftMessage() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const expectedConfig = undefined;
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
      await store.dispatch(updateGiftMessage(checkoutId, data));
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
    await store.dispatch(updateGiftMessage(checkoutId, data));

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

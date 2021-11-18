import { doDeleteBagItem } from '../';
import {
  mockBagId,
  mockBagItemId,
  mockData,
  mockNormalizedPayload,
  mockResponse,
  mockState,
} from 'tests/__fixtures__/bags';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';
import thunk from 'redux-thunk';

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];
const bagMockStore = (state = {}) =>
  mockStore({ bag: reducer() }, state, mockMiddlewares);
const expectedConfig = undefined;

describe('doDeleteBagItem() action creator', () => {
  let store;

  const deleteBagItem = jest.fn();
  const action = doDeleteBagItem(deleteBagItem);

  beforeEach(() => {
    jest.clearAllMocks();

    store = bagMockStore(mockState);
  });

  it('should create the correct actions for when the delete bag item procedure fails', async () => {
    const expectedError = new Error('delete bag item error');

    deleteBagItem.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(mockBagItemId, mockData));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(deleteBagItem).toHaveBeenCalledTimes(1);
      expect(deleteBagItem).toHaveBeenCalledWith(
        mockBagId,
        mockBagItemId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            payload: { bagItemId: mockBagItemId },
            type: actionTypes.DELETE_BAG_ITEM_REQUEST,
          },
          {
            payload: {
              error: expectedError,
              bagItemId: mockBagItemId,
            },
            type: actionTypes.DELETE_BAG_ITEM_FAILURE,
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the delete bag item procedure is successful', async () => {
    deleteBagItem.mockResolvedValueOnce(mockResponse);
    const data = { productId: mockResponse.id };
    await store.dispatch(action(mockBagItemId, data));

    const actionResults = store.getActions();

    expect(deleteBagItem).toHaveBeenCalledTimes(1);
    expect(deleteBagItem).toHaveBeenCalledWith(
      mockBagId,
      mockBagItemId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.DELETE_BAG_ITEM_REQUEST },
      {
        payload: mockNormalizedPayload,
        type: actionTypes.DELETE_BAG_ITEM_SUCCESS,
        meta: {
          ...data,
          bagId: mockBagId,
          bagItemId: mockBagItemId,
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.DELETE_BAG_ITEM_SUCCESS,
      }),
    ).toMatchSnapshot('delete bag item success payload');
  });
});

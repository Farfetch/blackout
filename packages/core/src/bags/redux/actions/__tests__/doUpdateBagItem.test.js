import { doUpdateBagItem } from '../';
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
const bagMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ bag: reducer() }, state);
const expectedConfig = undefined;

describe('doUpdateBagItem() action creator', () => {
  let store;

  const patchBagItem = jest.fn();
  const action = doUpdateBagItem(patchBagItem);

  beforeEach(() => {
    jest.clearAllMocks();
    store = bagMockStore(mockState);
  });

  it('should create the correct actions for when updating a bag item procedure fails', async () => {
    const expectedError = new Error('update bag item error');

    patchBagItem.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(mockBagItemId, mockData));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(patchBagItem).toHaveBeenCalledTimes(1);
      expect(patchBagItem).toHaveBeenCalledWith(
        mockBagId,
        mockBagItemId,
        mockData,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            payload: { bagItemId: mockBagItemId },
            type: actionTypes.UPDATE_BAG_ITEM_REQUEST,
          },
          {
            payload: {
              error: expectedError,
              bagItemId: mockBagItemId,
            },
            type: actionTypes.UPDATE_BAG_ITEM_FAILURE,
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update bag item procedure is successful', async () => {
    patchBagItem.mockResolvedValueOnce(mockResponse);
    await store.dispatch(action(mockBagItemId, mockData));

    const actionResults = store.getActions();

    expect(patchBagItem).toHaveBeenCalledTimes(1);
    expect(patchBagItem).toHaveBeenCalledWith(
      mockBagId,
      mockBagItemId,
      mockData,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_BAG_ITEM_REQUEST },
      {
        payload: mockNormalizedPayload,
        type: actionTypes.UPDATE_BAG_ITEM_SUCCESS,
        meta: {
          ...mockData,
          bagId: mockBagId,
          bagItemId: mockBagItemId,
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_BAG_ITEM_SUCCESS,
      }),
    ).toMatchSnapshot('delete bag item success payload');
  });

  it('should create the correct actions for when the update bag item procedure is successful without receiving options', async () => {
    store = bagMockStoreWithoutMiddlewares(mockState);

    patchBagItem.mockResolvedValueOnce(mockResponse);
    await store.dispatch(action(mockBagItemId, mockData));

    const actionResults = store.getActions();

    expect(patchBagItem).toHaveBeenCalledTimes(1);
    expect(patchBagItem).toHaveBeenCalledWith(
      mockBagId,
      mockBagItemId,
      mockData,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_BAG_ITEM_REQUEST },
      {
        payload: mockNormalizedPayload,
        type: actionTypes.UPDATE_BAG_ITEM_SUCCESS,
        meta: {
          ...mockData,
          bagId: mockBagId,
          bagItemId: mockBagItemId,
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_BAG_ITEM_SUCCESS,
      }),
    ).toMatchSnapshot(
      'update bag item success payload without receiving options',
    );
  });
});

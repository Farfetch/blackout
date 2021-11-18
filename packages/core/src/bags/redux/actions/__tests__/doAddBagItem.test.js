import { doAddBagItem } from '../';
import {
  mockBagId,
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

describe('doAddBagItem() action creator', () => {
  let store;

  const postBagItem = jest.fn();
  const action = doAddBagItem(postBagItem);

  beforeEach(jest.clearAllMocks);

  it('should throw an error if the bagId is not set on state', async () => {
    store = bagMockStore({ bag: { id: null } });
    expect.assertions(2);

    try {
      await store.dispatch(action(mockData));
    } catch (error) {
      expect(error).toMatchSnapshot();
      expect(store.getActions()).toHaveLength(0);
    }
  });

  it('should create the correct actions for when updating a bag item procedure fails', async () => {
    const expectedError = new Error('post bag item error');

    store = bagMockStore({ bag: { id: mockBagId } });
    postBagItem.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockData));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postBagItem).toHaveBeenCalledTimes(1);
      expect(postBagItem).toHaveBeenCalledWith(
        mockBagId,
        mockData,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.ADD_ITEM_TO_BAG_REQUEST },
          {
            payload: { error: expectedError },
            type: actionTypes.ADD_ITEM_TO_BAG_FAILURE,
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update bag item procedure is successful', async () => {
    store = bagMockStore(mockState);
    postBagItem.mockResolvedValueOnce(mockResponse);

    await store.dispatch(action(mockData));

    const actionResults = store.getActions();

    expect(postBagItem).toHaveBeenCalledTimes(1);
    expect(postBagItem).toHaveBeenCalledWith(
      mockBagId,
      mockData,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.ADD_ITEM_TO_BAG_REQUEST },
      {
        payload: mockNormalizedPayload,
        type: actionTypes.ADD_ITEM_TO_BAG_SUCCESS,
        meta: {
          ...mockData,
          bagId: mockBagId,
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.ADD_ITEM_TO_BAG_SUCCESS,
      }),
    ).toMatchSnapshot('add bag item success payload');
  });

  it('should create the correct actions for when the update bag item procedure is successful without receiving options', async () => {
    store = bagMockStoreWithoutMiddlewares(mockState);
    postBagItem.mockResolvedValueOnce(mockResponse);

    await store.dispatch(action(mockData));

    const actionResults = store.getActions();

    expect(postBagItem).toHaveBeenCalledTimes(1);
    expect(postBagItem).toHaveBeenCalledWith(
      mockBagId,
      mockData,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.ADD_ITEM_TO_BAG_REQUEST },
      {
        payload: mockNormalizedPayload,
        type: actionTypes.ADD_ITEM_TO_BAG_SUCCESS,
        meta: {
          ...mockData,
          bagId: mockBagId,
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.ADD_ITEM_TO_BAG_SUCCESS,
      }),
    ).toMatchSnapshot('add bag item success payload without receiving options');
  });
});

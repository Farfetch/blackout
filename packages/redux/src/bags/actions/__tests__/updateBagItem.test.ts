import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer';
import {
  mockBagId,
  mockBagItemData,
  mockBagItemId,
  mockNormalizedPayload,
  mockResponse,
  mockState,
} from 'tests/__fixtures__/bags';
import { mockStore } from '../../../../tests';
import { patchBagItem } from '@farfetch/blackout-client';
import { updateBagItem } from '..';
import find from 'lodash/find';
import thunk from 'redux-thunk';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  patchBagItem: jest.fn(),
}));

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];
const bagMockStore = (state = {}) =>
  mockStore({ bag: INITIAL_STATE }, state, mockMiddlewares);
const bagMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ bag: INITIAL_STATE }, state);
const expectedConfig = undefined;
const expectedQuery = undefined;
let store;

describe('updateBagItem() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = bagMockStore(mockState);
  });

  it('should create the correct actions for when updating a bag item procedure fails', async () => {
    const expectedError = new Error('update bag item error');

    patchBagItem.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store
      .dispatch(updateBagItem(mockBagItemId, mockBagItemData))
      .catch(error => {
        expect(error).toBe(expectedError);
        expect(patchBagItem).toHaveBeenCalledTimes(1);
        expect(patchBagItem).toHaveBeenCalledWith(
          mockBagId,
          mockBagItemId,
          mockBagItemData,
          expectedQuery,
          expectedConfig,
        );
        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            {
              meta: {
                ...mockBagItemData,
                bagId: mockBagId,
                bagItemId: mockBagItemId,
              },
              type: actionTypes.UPDATE_BAG_ITEM_REQUEST,
            },
            {
              payload: {
                error: expectedError,
              },
              meta: {
                ...mockBagItemData,
                bagId: mockBagId,
                bagItemId: mockBagItemId,
              },
              type: actionTypes.UPDATE_BAG_ITEM_FAILURE,
            },
          ]),
        );
      });
  });

  it('should create the correct actions for when the update bag item procedure is successful', async () => {
    patchBagItem.mockResolvedValueOnce(mockResponse);

    expect.assertions(5);

    await store
      .dispatch(updateBagItem(mockBagItemId, mockBagItemData))
      .then(clientResult => {
        expect(clientResult).toBe(mockResponse);
      });

    const actionResults = store.getActions();

    expect(patchBagItem).toHaveBeenCalledTimes(1);
    expect(patchBagItem).toHaveBeenCalledWith(
      mockBagId,
      mockBagItemId,
      mockBagItemData,
      expectedQuery,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_BAG_ITEM_REQUEST },
      {
        payload: mockNormalizedPayload,
        type: actionTypes.UPDATE_BAG_ITEM_SUCCESS,
        meta: {
          ...mockBagItemData,
          bagId: mockBagId,
          bagItemId: mockBagItemId,
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_BAG_ITEM_SUCCESS,
      }),
    ).toMatchSnapshot('update bag item success payload');
  });

  it('should create the correct actions for when the update bag item procedure is successful without receiving options', async () => {
    store = bagMockStoreWithoutMiddlewares(mockState);

    patchBagItem.mockResolvedValueOnce(mockResponse);

    expect.assertions(5);

    await store
      .dispatch(updateBagItem(mockBagItemId, mockBagItemData))
      .then(clientResult => {
        expect(clientResult).toBe(mockResponse);
      });

    const actionResults = store.getActions();

    expect(patchBagItem).toHaveBeenCalledTimes(1);
    expect(patchBagItem).toHaveBeenCalledWith(
      mockBagId,
      mockBagItemId,
      mockBagItemData,
      expectedQuery,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_BAG_ITEM_REQUEST },
      {
        payload: mockNormalizedPayload,
        type: actionTypes.UPDATE_BAG_ITEM_SUCCESS,
        meta: {
          ...mockBagItemData,
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

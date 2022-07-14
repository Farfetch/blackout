import { doGetProductGroupingProperties } from '..';
import {
  mockGroupingProperties,
  mockProductId,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const productDetailsMockStore = (state = {}) =>
  mockStore({ details: reducer() }, state);

describe('doGetProductGroupingProperties() action creator', () => {
  let store;
  const getGroupingProperties = jest.fn();
  const action = doGetProductGroupingProperties(getGroupingProperties);
  const expectedConfig = undefined;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();

    store = productDetailsMockStore({
      entities: {
        products: {
          [mockProductId]: {
            id: mockProductId,
            groupingProperties: mockGroupingProperties,
          },
        },
      },
    });
  });

  it('should create the correct actions for when the get grouping properties procedure fails', async () => {
    const expectedError = new Error('Get grouping error');

    getGroupingProperties.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockProductId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getGroupingProperties).toHaveBeenCalledTimes(1);
      expect(getGroupingProperties).toHaveBeenCalledWith(
        mockProductId,
        {},
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          payload: { productId: mockProductId },
          type: actionTypes.GET_PRODUCT_GROUPING_PROPERTIES_REQUEST,
        },
        {
          payload: { error: expectedError, productId: mockProductId },
          type: actionTypes.GET_PRODUCT_GROUPING_PROPERTIES_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the get grouping properties procedure is successful', async () => {
    getGroupingProperties.mockResolvedValueOnce(mockGroupingProperties);

    const query = {};

    await store.dispatch(action(mockProductId, query));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getGroupingProperties).toHaveBeenCalledTimes(1);
    expect(getGroupingProperties).toHaveBeenCalledWith(
      mockProductId,
      query,
      expectedConfig,
    );
    expect(actionResults).toEqual([
      {
        payload: { productId: mockProductId },
        type: actionTypes.GET_PRODUCT_GROUPING_PROPERTIES_REQUEST,
      },
      expect.objectContaining({
        payload: expect.any(Object),
        type: actionTypes.GET_PRODUCT_GROUPING_PROPERTIES_SUCCESS,
      }),
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_PRODUCT_GROUPING_PROPERTIES_SUCCESS,
      }),
    ).toMatchSnapshot('Get grouping properties success payload');
  });

  it('should create the correct actions for when the get grouping properties procedure is successful with no previous data', async () => {
    // Store without a previous grouping entry
    store = productDetailsMockStore({
      entities: {
        products: {
          [mockProductId]: {
            id: mockProductId,
          },
        },
      },
    });

    getGroupingProperties.mockResolvedValueOnce(mockGroupingProperties);

    await store.dispatch(action(mockProductId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getGroupingProperties).toHaveBeenCalledTimes(1);
    expect(getGroupingProperties).toHaveBeenCalledWith(
      mockProductId,
      {},
      expectedConfig,
    );
    // Just ensure that the success happens
    expect(actionResults).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          payload: expect.any(Object),
          type: actionTypes.GET_PRODUCT_GROUPING_PROPERTIES_SUCCESS,
        }),
      ]),
    );
  });
});

import { doGetColorGrouping } from '../';
import { mockColorGrouping, mockProductId } from 'tests/__fixtures__/products';
import { mockStore } from '../../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const productDetailsMockStore = (state = {}) =>
  mockStore({ details: reducer() }, state);

describe('doGetColorGrouping() action creator', () => {
  let store;
  const getColorGrouping = jest.fn();
  const action = doGetColorGrouping(getColorGrouping);
  const expectedConfig = undefined;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();

    store = productDetailsMockStore({
      entities: {
        products: {
          [mockProductId]: {
            id: mockProductId,
            colorGrouping: [mockColorGrouping[0]],
          },
        },
      },
    });
  });

  it('should create the correct actions for when the get color grouping procedure fails', async () => {
    const expectedError = new Error('Get color grouping error');

    getColorGrouping.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockProductId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getColorGrouping).toHaveBeenCalledTimes(1);
      expect(getColorGrouping).toHaveBeenCalledWith(
        mockProductId,
        {},
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          payload: { productId: mockProductId },
          type: actionTypes.GET_COLOR_GROUPING_REQUEST,
        },
        {
          payload: { error: expectedError, productId: mockProductId },
          type: actionTypes.GET_COLOR_GROUPING_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the get color grouping procedure is successful', async () => {
    getColorGrouping.mockResolvedValueOnce(mockColorGrouping[1]);

    const query = { pageSize: 10 };

    await store.dispatch(action(mockProductId, query));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getColorGrouping).toHaveBeenCalledTimes(1);
    expect(getColorGrouping).toHaveBeenCalledWith(
      mockProductId,
      query,
      expectedConfig,
    );
    expect(actionResults).toEqual([
      {
        payload: { productId: mockProductId },
        type: actionTypes.GET_COLOR_GROUPING_REQUEST,
      },
      expect.objectContaining({
        payload: expect.any(Object),
        type: actionTypes.GET_COLOR_GROUPING_SUCCESS,
      }),
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_COLOR_GROUPING_SUCCESS,
      }),
    ).toMatchSnapshot('Get color grouping success payload');
  });

  it('should create the correct actions for when the get color grouping procedure is successful with no previous data', async () => {
    // Store without a previous color grouping entry
    store = productDetailsMockStore({
      entities: {
        products: {
          [mockProductId]: {
            id: mockProductId,
          },
        },
      },
    });

    getColorGrouping.mockResolvedValueOnce(mockColorGrouping[1]);

    await store.dispatch(action(mockProductId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getColorGrouping).toHaveBeenCalledTimes(1);
    expect(getColorGrouping).toHaveBeenCalledWith(
      mockProductId,
      {},
      expectedConfig,
    );
    // Just ensure that the success happens
    expect(actionResults).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          payload: expect.any(Object),
          type: actionTypes.GET_COLOR_GROUPING_SUCCESS,
        }),
      ]),
    );
  });
});

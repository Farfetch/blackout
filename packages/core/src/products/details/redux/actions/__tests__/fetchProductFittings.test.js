import { fetchProductFittings } from '..';
import { mockFittings, mockProductId } from 'tests/__fixtures__/products';
import { mockStore } from '../../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const productDetailsMockStore = (state = {}) =>
  mockStore({ details: reducer() }, state);

describe('fetchProductFittings() action creator', () => {
  let store;
  const getProductFittings = jest.fn();
  const action = fetchProductFittings(getProductFittings);
  const expectedConfig = undefined;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();

    store = productDetailsMockStore({
      entities: {
        products: {
          [mockProductId]: {
            id: mockProductId,
            fittings: mockFittings,
          },
        },
      },
    });
  });

  it('should dispatch the correct actions when fetch product fittings fails', async () => {
    const expectedError = new Error('Fetch product fittings error');

    getProductFittings.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockProductId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getProductFittings).toHaveBeenCalledTimes(1);
      expect(getProductFittings).toHaveBeenCalledWith(
        mockProductId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          meta: { productId: mockProductId },
          type: actionTypes.FETCH_PRODUCT_FITTINGS_REQUEST,
        },
        {
          meta: { productId: mockProductId },
          payload: { error: expectedError },
          type: actionTypes.FETCH_PRODUCT_FITTINGS_FAILURE,
        },
      ]);
    }
  });

  it('should dispatch the correct actions when fetch product fittings is successful', async () => {
    getProductFittings.mockResolvedValueOnce(mockFittings);

    await store.dispatch(action(mockProductId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductFittings).toHaveBeenCalledTimes(1);
    expect(getProductFittings).toHaveBeenCalledWith(
      mockProductId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            meta: { productId: mockProductId },
            type: actionTypes.FETCH_PRODUCT_FITTINGS_REQUEST,
          },
          {
            payload: expect.any(Object),
            type: actionTypes.FETCH_PRODUCT_FITTINGS_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_PRODUCT_FITTINGS_SUCCESS,
      }),
    ).toMatchSnapshot('Fetch product fittings success payload');
  });
});

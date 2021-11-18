import { doGetProductSizeguides } from '../';
import {
  mockProductId,
  mockSizeguides,
  mockState,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const productDetailsMockStore = (state = {}) =>
  mockStore({ details: reducer() }, state);

describe('doGetProductSizeguides() action creator', () => {
  let store;
  const getProductSizeguides = jest.fn();
  const action = doGetProductSizeguides(getProductSizeguides);
  const expectedConfig = undefined;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();

    store = productDetailsMockStore(mockState);
  });

  it('should create the correct actions for when the get product sizeguides procedure fails', async () => {
    const expectedError = new Error('Get product sizeguides error');

    getProductSizeguides.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockProductId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getProductSizeguides).toHaveBeenCalledTimes(1);
      expect(getProductSizeguides).toHaveBeenCalledWith(
        mockProductId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          meta: { productId: mockProductId },
          type: actionTypes.GET_PRODUCT_SIZEGUIDES_REQUEST,
        },
        {
          meta: { productId: mockProductId },
          payload: { error: expectedError },
          type: actionTypes.GET_PRODUCT_SIZEGUIDES_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the get product sizeguides procedure is successful', async () => {
    getProductSizeguides.mockResolvedValueOnce(mockSizeguides);

    await store.dispatch(action(mockProductId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductSizeguides).toHaveBeenCalledTimes(1);
    expect(getProductSizeguides).toHaveBeenCalledWith(
      mockProductId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: actionTypes.GET_PRODUCT_SIZEGUIDES_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: expect.any(Object),
        type: actionTypes.GET_PRODUCT_SIZEGUIDES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_PRODUCT_SIZEGUIDES_SUCCESS,
      }),
    ).toMatchSnapshot('Get product sizeguides success payload');
  });
});

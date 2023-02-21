import * as actionTypes from '../actionTypes';
import {
  createDefaultEntitiesReducer,
  createEntitiesReducer,
  defaultEntitiesReducers,
  type ProductEntity,
} from '..';
import type { StoreState } from '../../types';

describe('reducer', () => {
  const mockProductsState = {
    123: { brand: 1 } as ProductEntity,
    456: { brand: 1 } as ProductEntity,
  };
  const mockNewProduct = {
    789: {
      name: 'car',
    },
  };
  const getMockState = () =>
    ({
      products: { ...mockProductsState },
    } as NonNullable<StoreState['entities']>);
  const getMockAction = () => ({
    type: 'add_new_product',
    payload: {
      entities: {
        products: { ...mockNewProduct },
      },
    },
  });
  const getExpectedResult = () => ({
    products: {
      ...mockProductsState,
      ...mockNewProduct,
    },
  });

  describe('createEntitiesReducer', () => {
    it('should call entities mapper even when there is no payload', () => {
      const mockMapper = {
        FUNCTION_SUCCESS: jest.fn(getMockState),
      };
      const mockAction = {
        type: 'FUNCTION_SUCCESS',
      };

      createEntitiesReducer(mockMapper)({}, mockAction);

      expect(mockMapper.FUNCTION_SUCCESS).toHaveBeenCalled();
    });

    it('should reset all entities when the RESET_ENTITIES action is called', () => {
      const mockState = {
        brands: { 123: { id: 1, name: 'name', description: 'description' } },
        products: { 123: { brand: 1 } as ProductEntity },
      };
      const mockAction = { type: actionTypes.RESET_ENTITIES };

      expect(createEntitiesReducer({})(mockState, mockAction)).toEqual({});
    });

    it('should return the state unchanged when called without parameters', () => {
      // @ts-expect-error purposely without parameters
      expect(createEntitiesReducer()(undefined, {})).toEqual({});
    });

    it('should merge the state and the entities payload', () => {
      expect(
        createEntitiesReducer({})(getMockState(), getMockAction()),
      ).toEqual(getExpectedResult());
    });
  });

  describe('createDefaultEntitiesReducer', () => {
    it('Should call `createEntitiesReducer` and merge the entities passed via action', () => {
      expect(
        createDefaultEntitiesReducer([])(getMockState(), getMockAction()),
      ).toEqual(getExpectedResult());
    });
  });

  describe('defaultEntitiesReducers', () => {
    it('Should export the default entities reducers', () => {
      expect(defaultEntitiesReducers).toMatchSnapshot();
    });
  });
});

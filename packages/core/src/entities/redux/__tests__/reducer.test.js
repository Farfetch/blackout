import {
  actionTypes,
  createEntitiesReducer,
  defaultMappers,
  entitiesMapperReducer,
} from '..';

describe('reducer', () => {
  const getMockState = () => ({
    products: {
      123: { foo: 'bar' },
      456: { foo: 'bar' },
    },
  });
  const getMockAction = () => ({
    payload: {
      entities: {
        products: {
          789: {
            name: 'car',
          },
        },
      },
    },
  });
  const getExpectedResult = () => ({
    products: {
      123: { foo: 'bar' },
      456: { foo: 'bar' },
      789: { name: 'car' },
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
        bags: { 123: { foo: 'bar' } },
        products: { 123: { foo: 'bar' } },
      };
      const mockAction = { type: actionTypes.RESET_ENTITIES };

      expect(createEntitiesReducer()(mockState, mockAction)).toEqual({});
    });

    it('should return the state unchanged when called without parameters', () => {
      expect(createEntitiesReducer()()).toEqual({});
    });

    it('should merge the state and the entities payload', () => {
      expect(createEntitiesReducer()(getMockState(), getMockAction())).toEqual(
        getExpectedResult(),
      );
    });
  });

  describe('entitiesMapperReducer', () => {
    it('Should call `createEntitiesReducer` and merge the entities passed via action', () => {
      expect(entitiesMapperReducer()(getMockState(), getMockAction())).toEqual(
        getExpectedResult(),
      );
    });
  });
  describe('defaultMappers', () => {
    expect(defaultMappers).toMatchSnapshot();
  });
});

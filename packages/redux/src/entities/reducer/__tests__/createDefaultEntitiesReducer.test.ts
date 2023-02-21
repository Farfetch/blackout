import {
  type CustomEntitiesReducerByAction,
  mergeEntitiesReducersByAction,
} from '../createDefaultEntitiesReducer';

describe('mergeEntitiesReducersByAction', () => {
  it('should return the correct result for mergeEntitiesReducersByAction when receiving duplicated action keys', () => {
    const state = {};
    const action = { type: 'actionTypeName' };
    const ordersEntities = { orders: { ABCD3F: { id: 'ABCD3F' } } };
    const userEntity = { user: { id: 10000 } };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const firstSpy = jest.fn((state, _) => {
      return {
        ...state,
        entities: {
          ...state.entities,
          ...ordersEntities,
        },
      };
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const secondSpy = jest.fn((state, _) => {
      return {
        ...state,
        entities: {
          ...state.entities,
          ...userEntity,
        },
      };
    });
    const entitiesMappers: CustomEntitiesReducerByAction[] = [
      {
        actionTypeName: (state, action) => firstSpy(state, action),
      },
      {
        actionTypeName: (state, action) => secondSpy(state, action),
      },
    ];
    const mergedEntitiesMapper = mergeEntitiesReducersByAction(entitiesMappers);
    const result = mergedEntitiesMapper['actionTypeName']?.(state, action);

    expect(firstSpy).toHaveBeenCalledWith(state, action);
    expect(secondSpy).toHaveBeenCalledWith(
      { entities: { ...ordersEntities } },
      action,
    );

    expect(result).toStrictEqual({
      entities: { ...ordersEntities, ...userEntity },
    });
  });
});

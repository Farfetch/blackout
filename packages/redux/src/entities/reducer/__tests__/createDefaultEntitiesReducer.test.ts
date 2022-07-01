import {
  EntitiesReducerByAction,
  mergeEntitiesReducersByAction,
} from '../createDefaultEntitiesReducer';

describe('mergeEntitiesReducersByAction', () => {
  it('should return the correct result for mergeEntitiesReducersByAction when receiving duplicated action keys', () => {
    const state = {};
    const action = { type: 'actionTypeName' };
    const firstSpy = jest.fn();
    const secondSpy = jest.fn();
    const entitiesMappers: EntitiesReducerByAction[] = [
      {
        actionTypeName: (state, action) => firstSpy(state, action),
      },
      {
        actionTypeName: (state, action) => secondSpy(state, action),
      },
    ];
    const mergedEntitiesMapper = mergeEntitiesReducersByAction(entitiesMappers);
    mergedEntitiesMapper['actionTypeName']?.(state, action);

    expect(firstSpy).toBeCalled();
    expect(secondSpy).toBeCalled();
  });
});

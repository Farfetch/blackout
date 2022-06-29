import { EntityMapper, mergeEntitiesMapper } from '../entitiesMapper';

describe('entitiesMapper', () => {
  it('should return the correct result for mergeEntitiesMapper when receiving duplicated action keys', () => {
    const state = {};
    const action = { type: 'actionTypeName' };
    const firstSpy = jest.fn();
    const secondSpy = jest.fn();
    const entitiesMappers: EntityMapper[] = [
      {
        actionTypeName: (state, action) => firstSpy(state, action),
      },
      {
        actionTypeName: (state, action) => secondSpy(state, action),
      },
    ];
    const mergedEntitiesMapper = mergeEntitiesMapper(entitiesMappers);
    mergedEntitiesMapper['actionTypeName']?.(state, action);

    expect(firstSpy).toBeCalled();
    expect(secondSpy).toBeCalled();
  });
});

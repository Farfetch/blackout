import type { StoreState } from '../../types';

type StateEntities = NonNullable<StoreState['entities']>;
type SchemaName = keyof StateEntities;

type StoreStateWithEntitiesSet = Omit<NonNullable<StoreState>, 'entities'> & {
  entities: NonNullable<StateEntities>;
};

type GetEntityIdType<Path extends SchemaName> = keyof NonNullable<
  StateEntities[Path]
>;

function isStateWithEntitiesSet(
  state: StoreState,
): state is StoreStateWithEntitiesSet {
  return state && typeof state.entities !== 'undefined';
}

function throwError(): never {
  const error = new Error(
    [
      'It looks like you are trying to access the `entities` state property but it does not exist.',
      'You need to add an `entities` reducer to the top level of your state tree.',
    ].join('\n'),
  );
  error.name = 'Invariant Violation';

  throw error;
}

/**
 * Gets all entities of a given schema name.
 * Will throw an error if state.entities is undefined.
 *
 * @param state - Application state.
 * @param name  - Entity/schema name.
 *
 * @returns - All entities of the given schema name, undefined if none is found.
 */
export const getEntities = <S extends SchemaName>(
  state: StoreState,
  name: S,
) => {
  if (!isStateWithEntitiesSet(state)) {
    throwError();
  }

  return state.entities[name];
};

/**
 * Gets a specific entity of the given schema name, by id.
 *
 * @param state - Application state.
 * @param name  - Entity/schema name.
 * @param id    - Entity identifier.
 *
 * @returns - The specific entity of the given id, undefined if it isn't found.
 */
export const getEntityById = <S extends SchemaName>(
  state: StoreState,
  entityName: S,
  id: GetEntityIdType<S>,
) => {
  const schemaEntities = getEntities(state, entityName);

  if (!schemaEntities) {
    return undefined;
  }

  // We have to cast here to remove the undefined from the type so typescript
  // can accept this access. Not sure why though because the check for undefined should be enough.
  return (schemaEntities as NonNullable<typeof schemaEntities>)[id];
};

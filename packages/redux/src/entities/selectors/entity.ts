import invariant from 'invariant';
import type { StoreState } from '../../types';

type StateEntities = StoreState['entities'];
type SchemaName = keyof NonNullable<StateEntities>;
type EntityId = keyof NonNullable<NonNullable<StateEntities>[SchemaName]>;

const throwError = (state: StoreState) => {
  invariant(
    !state || typeof state.entities !== 'undefined',
    [
      'It looks like you are trying to access the `entities` state property but it does not exist.',
      'You need to add an `entities` reducer to the top level of your state tree.',
    ].join('\n'),
  );
};

/**
 * Gets all entities of a given schema name.
 *
 * @param state - Application state.
 * @param name  - Entity/schema name.
 *
 * @returns - All entities of the given schema name, undefined if none is found.
 */
export const getEntities = (
  state: StoreState,
  name: SchemaName,
): NonNullable<StateEntities>[SchemaName] | never => {
  throwError(state);

  // As throwError (maybe another name was more clear) throws when the entities
  // is undefined, we can safely make the type cast. Ideally we should convert
  // throwError function to be detected as a type guard, so we do not need the cast.
  return state?.entities?.[name];
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
export const getEntityById = <T>(
  state: StoreState,
  name: SchemaName,
  id: EntityId,
): T | undefined => getEntities(state, name)?.[id];

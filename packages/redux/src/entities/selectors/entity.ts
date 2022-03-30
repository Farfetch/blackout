import invariant from 'invariant';
import type { StoreState } from '../../types';

type StateEntities = StoreState['entities'];

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
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {string} name - Entity/schema name.
 *
 * @returns {object|undefined} - All entities of the given schema name, undefined
 * if none is found.
 */
export const getEntities = <
  SchemaName extends keyof NonNullable<StateEntities>,
>(
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
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {string} name - Entity/schema name.
 * @param {string|number} id - Entity identifier.
 *
 * @returns {object|undefined} - The specific entity of the given id, undefined
 * if it isn't found.
 */
export const getEntityById = <
  SchemaName extends keyof NonNullable<StateEntities>,
  EntityId extends keyof NonNullable<NonNullable<StateEntities>[SchemaName]>,
>(
  state: StoreState,
  name: SchemaName,
  id: EntityId,
): NonNullable<StateEntities>[SchemaName][EntityId] | undefined =>
  getEntities(state, name)?.[id];

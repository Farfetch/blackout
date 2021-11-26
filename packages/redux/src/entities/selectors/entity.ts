import invariant from 'invariant';
import type { StoreState } from '../../types';

type StateEntities = StoreState['entities'];

const throwError = (state: StoreState) =>
  invariant(
    !state || typeof state.entities !== 'undefined',
    [
      'It looks like you are trying to access the `entities` state property but it does not exist.',
      'You need to add an `entities` reducer to the top level of your state tree.',
    ].join('\n'),
  );

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
export const getEntities = <SchemaName extends keyof StateEntities>(
  state: StoreState,
  name: SchemaName,
): StateEntities[SchemaName] | undefined => {
  throwError(state);

  return state?.entities[name];
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
  SchemaName extends keyof StateEntities,
  // EntityId extends keyof StateEntities[SchemaName]
>(
  state: StoreState,
  name: SchemaName,
  // id: EntityId,
  // @FIXME: the type of `id` should be `EntityId`, but since `StateEntities` is
  // a `Partial`, it's always never, because it can't reach something that may
  // not exists. Don't know how to get around this for now.
  id: string | number,
  // @FIXME: the return type should be `StateEntities[SchemaName][EntityId]` but
  // again, since `StateEntities` is a `Partial`, theres no way to achieve this.
  // When using this selector, its advisable to define your variable
  // `as <CurrentEntity>Entity`. For example:
  // const wishlistItem = getEntityById(state, 'wishlistItems', id) as WishlistItemEntity;
): any | undefined => getEntities(state, name)?.[id];

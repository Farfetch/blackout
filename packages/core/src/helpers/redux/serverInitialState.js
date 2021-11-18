import merge from 'lodash/merge';
import reduce from 'lodash/reduce';

export default (...reducers) =>
  reduce(
    reducers,
    (result, reducer) => ({
      ...result,
      ...reducer,
      entities: merge(result.entities, reducer.entities),
    }),
    {},
  );

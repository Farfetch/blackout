import merge from 'lodash/merge';
import reduce from 'lodash/reduce';

export default (...reducers: any[]) =>
  reduce(
    reducers,
    (result: { [k: string]: any }, reducer) => ({
      ...result,
      ...reducer,
      entities: merge(result.entities, reducer.entities),
    }),
    {},
  );

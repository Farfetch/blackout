import merge from 'lodash/merge';
import reduce from 'lodash/reduce';

const serverInitialState = (...reducers: any[]) =>
  reduce(
    reducers,
    (result: { entities?: any }, reducer) => ({
      ...result,
      ...reducer,
      entities: merge(result.entities, reducer.entities),
    }),
    {},
  );
export default serverInitialState;

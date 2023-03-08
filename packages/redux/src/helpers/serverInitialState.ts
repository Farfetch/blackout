import { merge, reduce } from 'lodash-es';

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

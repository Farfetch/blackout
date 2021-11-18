import { mockDesignersModel } from 'tests/__fixtures__/designers';
import { serverInitialState } from '../';

describe('designers serverInitialState()', () => {
  it('should initialise server state for desginers', () => {
    const model = mockDesignersModel;
    const state = serverInitialState({ model });

    expect(state).toMatchSnapshot();
  });

  it('should initialise server state for non designer result', () => {
    const model = {};
    const state = serverInitialState({ model });

    expect(state).toMatchSnapshot();
  });
});

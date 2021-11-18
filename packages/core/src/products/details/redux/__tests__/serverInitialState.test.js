import { mockDetailsModel } from 'tests/__fixtures__/products';
import { serverInitialState } from '..';

describe('details serverInitialState()', () => {
  it('should initialize server state', () => {
    const state = serverInitialState({ model: mockDetailsModel });

    expect(state).toMatchSnapshot();
  });
});

import serverInitialState from '../serverInitialState';

describe('serverInitialState()', () => {
  it('should initialise server state', () => {
    const modelFoo = {
      listing: {
        result: {
          products: [123],
        },
      },
      entities: {
        products: [{ 123: { name: 'foo' } }],
        brands: [{ 456: { name: 'bar' } }],
      },
    };
    const modelBar = {
      entities: {
        products: [{ 789: { name: 'foo-bar' } }],
        brands: [{ 567: { name: 'bar-foo' } }],
      },
    };
    const state = serverInitialState(modelFoo, modelBar);

    expect(state).toMatchSnapshot();
  });
});

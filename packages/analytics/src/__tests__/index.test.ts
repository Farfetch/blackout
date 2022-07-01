import * as index from '..';

describe('root index file', () => {
  it('should export all public modules', () => {
    expect(index).toMatchSnapshot();
  });
});

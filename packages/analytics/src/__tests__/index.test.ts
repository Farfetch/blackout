import * as index from '../index.js';

describe('root index file', () => {
  it('should export all public modules', () => {
    expect(index).toMatchSnapshot();
  });
});

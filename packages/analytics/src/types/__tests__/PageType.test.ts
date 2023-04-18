import PageType from '../PageType.js';

describe('PageType', () => {
  it('Should provide the list of PageType', () => {
    expect(PageType).toMatchSnapshot();
  });
});

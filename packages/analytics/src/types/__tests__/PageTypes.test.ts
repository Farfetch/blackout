import PageTypes from '../PageTypes.js';

describe('PageTypes', () => {
  it('Should provide the list of PageTypes', () => {
    expect(PageTypes).toMatchSnapshot();
  });
});

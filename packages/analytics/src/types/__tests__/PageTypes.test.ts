import PageTypes from '../PageTypes';

describe('PageTypes', () => {
  it('Should provide the list of PageTypes', () => {
    expect(PageTypes).toMatchSnapshot();
  });
});

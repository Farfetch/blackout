import pageTypes, { isValidPageType } from '../pageTypes';

describe('pageTypes', () => {
  it('Should provide the list of pageTypes', () => {
    expect(pageTypes).toMatchSnapshot();
  });

  it('Should return true if passed a valid pageType', () => {
    const type = 'homepage';
    const result = isValidPageType(pageTypes, type);

    expect(result).toEqual(true);
  });

  it('Should return false if passed an ivalid pageType', () => {
    const type = 'this is an invalid type page';
    const result = isValidPageType(pageTypes, type);

    expect(result).toEqual(false);
  });
});

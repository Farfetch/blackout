import { dateFormatTokens } from '../';

describe('dateFormatTokens', () => {
  it('default (dateFormatTokens)', () => {
    expect(dateFormatTokens).toBeDefined();
  });

  it('dateFormats', () => {
    expect(dateFormatTokens.dateFormats).toBeDefined();
  });
});

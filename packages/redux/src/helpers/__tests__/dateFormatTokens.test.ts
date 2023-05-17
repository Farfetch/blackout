import { dateFormatTokens } from '..//index.js';

describe('dateFormatTokens', () => {
  it('default (dateFormatTokens)', () => {
    expect(dateFormatTokens).toBeDefined();
  });

  it('dateFormats', () => {
    expect(dateFormatTokens.dateFormats).toBeDefined();
  });
});

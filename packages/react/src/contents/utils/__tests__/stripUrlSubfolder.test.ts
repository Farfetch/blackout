import { stripUrlSubfolder } from '../index.js';

describe('stripUrlSubfolder', () => {
  it('should remove the subfolder of a given url', () => {
    const mockUrl = '/us-US/foo/bar';
    const expectedUrl = '/foo/bar';
    const result = stripUrlSubfolder(mockUrl);

    expect(result).toBe(expectedUrl);
  });
});

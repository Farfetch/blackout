import {
  customContentTypeWithEventDate,
  customContentTypeWithMultipleCodes,
} from 'tests/__fixtures__/contents';
import { SortContentOption } from '../../types/base.types';
import sortContentType from '../sortContentType';

describe('sortContentType', () => {
  it('should sort by the most recent publication', () => {
    const result = sortContentType(
      customContentTypeWithMultipleCodes,
      SortContentOption.PublishDate,
    );

    expect(result).toBe(customContentTypeWithMultipleCodes);
  });

  it('should sort by the most recent event date', () => {
    const result = sortContentType(
      customContentTypeWithEventDate,
      SortContentOption.EventDate,
    );

    expect(result).toBe(customContentTypeWithEventDate);
  });

  it('should return the default value as content type', () => {
    const result = sortContentType(
      customContentTypeWithMultipleCodes,
      // @ts-expect-error Force undefined for test
      undefined,
    );

    expect(result).toBe(customContentTypeWithMultipleCodes);
  });
});

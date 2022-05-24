import {
  responseWithEventDate,
  responseWithMultipleCodes,
} from '../../components/base/__fixtures__/contentList.fixtures';
import { sortContentType } from '../';

describe('sortContentType', () => {
  it('should sort by the most recent publication', () => {
    const result = sortContentType(responseWithMultipleCodes, 'PublishDate');

    expect(result).toBe(responseWithMultipleCodes);
  });

  it('should sort by the most recent event date', () => {
    const result = sortContentType(responseWithEventDate, 'EventDate');

    expect(result).toBe(responseWithEventDate);
  });

  it('should return the default value as content type', () => {
    const result = sortContentType(responseWithMultipleCodes);

    expect(result).toBe(responseWithMultipleCodes);
  });
});

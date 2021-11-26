import { renderScriptTag } from '../../helpers';
import {
  videoObject,
  videoObjectResult,
} from '../__fixtures__/videoObject.fixtures';
import structuredVideoObject from '../videoObject';

const publicationDate = '2020-07-13T15:01:55.4526159Z';

describe('structuredVideoObject', () => {
  it('should correctly generate JSON-LD for a video', () => {
    const renderStructuredVideo = structuredVideoObject(
      videoObject,
      publicationDate,
    );

    expect(renderStructuredVideo).toEqual(renderScriptTag(videoObjectResult));
  });
});

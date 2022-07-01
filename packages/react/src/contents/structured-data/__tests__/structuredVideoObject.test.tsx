import {
  MockRenderScript,
  videoObject,
  videoObjectResult,
} from './__fixtures__';
import structuredVideoObject from '../structuredVideoObject';

const publicationDate = '2020-07-13T15:01:55.4526159Z';

describe('structuredVideoObject', () => {
  it('should correctly generate JSON-LD for a video', () => {
    const renderStructuredVideo = structuredVideoObject(
      videoObject,
      publicationDate,
    );

    expect(renderStructuredVideo).toEqual(
      MockRenderScript(JSON.stringify(videoObjectResult)),
    );
  });
});

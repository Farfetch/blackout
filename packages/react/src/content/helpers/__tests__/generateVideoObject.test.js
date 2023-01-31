import * as helpers from '../';
import media from '../../components/__fixtures__/media.fixtures.json';
import videoObjectResult from '../__fixtures__/videoObjectResult.fixtures.json';

const publicationDate = '2020-07-13T15:01:55.4526159Z';

describe('generateVideoObject', () => {
  it('should correctly generate JSON-LD for a video', () => {
    const video = helpers.generateVideoObject(media, publicationDate);

    expect(video).toMatchObject(videoObjectResult);
  });
});

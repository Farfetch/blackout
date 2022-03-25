import {
  article,
  articleResult,
  metadata,
  MockRenderScript,
} from './__fixtures__';
import structuredArticle from '../article';

const { date, url, title, image, author, breadcrumbs, publisher } = article;

describe('structuredArticle', () => {
  it('should correctly generate JSON-LD for a list of Editorial Pages', () => {
    const renderScructuredArticle = structuredArticle(
      metadata,
      date,
      url,
      title,
      image,
      author,
      breadcrumbs,
      publisher,
    );

    expect(renderScructuredArticle).toEqual(
      MockRenderScript(JSON.stringify(articleResult)),
    );
  });
});

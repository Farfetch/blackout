import {
  article,
  articleResult,
  metadata,
  MockRenderScript,
} from './__fixtures__';
import structuredArticle from '../structuredArticle';

const { date, url, title, image, author, breadcrumbs, publisher } = article;

describe('structuredArticle', () => {
  it('should correctly generate JSON-LD for a list of Editorial Pages', () => {
    const renderStructuredArticle = structuredArticle(
      metadata,
      date,
      url,
      title,
      image,
      author,
      breadcrumbs,
      publisher,
    );

    expect(renderStructuredArticle).toEqual(
      MockRenderScript(JSON.stringify(articleResult)),
    );
  });
});

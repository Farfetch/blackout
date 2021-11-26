import { article, articleResult } from '../__fixtures__/article.fixtures';
import { renderScriptTag } from '../../helpers';
import metadata from '../__fixtures__/metadata.fixtures.json';
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

    expect(renderScructuredArticle).toEqual(renderScriptTag(articleResult));
  });
});

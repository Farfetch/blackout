import * as helpers from '../';
import { article } from '../../components/__fixtures__/article.fixtures';
import {
  articleResult,
  noKeywords,
} from '../__fixtures__/articleResult.fixtures';
import metadata from '../../components/__fixtures__/metadata.fixtures.json';

describe('generateArticle', () => {
  it('should correctly generate JSON-LD for a list of Editorial Pages', () => {
    const { date, url, title, image, author, breadcrumbs, publisher } = article;
    const Article = helpers.generateArticle(
      metadata,
      date,
      url,
      title,
      image,
      author,
      breadcrumbs,
      publisher,
    );

    expect(Article).toMatchObject(articleResult);
  });

  it('should not return any keyword', () => {
    const { date, url, title, image, author, breadcrumbs, publisher } = article;
    const metadataWithoutKeywords = {
      keywords: null,
    };
    const Article = helpers.generateArticle(
      metadataWithoutKeywords,
      date,
      url,
      title,
      image,
      author,
      breadcrumbs,
      publisher,
    );

    expect(Article).toMatchObject(noKeywords);
  });
});

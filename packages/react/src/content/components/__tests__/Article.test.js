import { render } from '@testing-library/react';
import React from 'react';
// Components
import StructuredArticle from '../Article';
// Fixtures
import { article } from '../__fixtures__/article.fixtures';
import metadata from '../__fixtures__/metadata.fixtures.json';

describe('<Article />', () => {
  it('should render properly', () => {
    const { container } = render(
      <StructuredArticle
        metadata={metadata}
        date={article.date}
        url={article.url}
        title={article.title}
        image={article.image}
        author={article.author}
        breadcrumbs={article.breadcrumbs}
        publisher={article.publisher}
        space={2}
      />,
    );

    expect(container).toBeInTheDocument();
  });
});

import { render } from '@testing-library/react';
import React from 'react';
// Components
import StructuredVideoObject from '../VideoObject';
// Fixtures
import media from '../__fixtures__/media.fixtures.json';

const publicationDate = '2020-07-13T15:01:55.4526159Z';

describe('<VideoObject />', () => {
  it('should render properly', () => {
    const { container } = render(
      <StructuredVideoObject
        media={media}
        publicationDate={publicationDate}
        space={2}
      />,
    );

    expect(container).toBeInTheDocument();
  });
});

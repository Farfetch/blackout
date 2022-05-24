import { render } from '@testing-library/react';
import ComponentsList from '../componentsList/ComponentsList';
import React from 'react';

describe('<ComponentsList />', () => {
  const data = {
    components: [
      {
        type: 'text',
        value: 'foo',
      },
      {
        type: 'text',
        value: 'bar',
      },
    ],
  };

  it('should render properly', () => {
    const { getByText } = render(<ComponentsList data={data} />);

    expect(getByText('foo')).toBeInTheDocument();
    expect(getByText('bar')).toBeInTheDocument();
  });
});

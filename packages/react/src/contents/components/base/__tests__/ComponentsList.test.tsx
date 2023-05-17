import { render } from '@testing-library/react';
import ComponentList from '../componentList/ComponentList.jsx';
import React from 'react';

const location = {
  query: undefined,
};

describe('<ComponentList />', () => {
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
    const { getByText } = render(
      <ComponentList
        data={data}
        location={location}
        viewportBreakpoint={'lg'}
      />,
    );

    expect(getByText('foo')).toBeInTheDocument();
    expect(getByText('bar')).toBeInTheDocument();
  });
});

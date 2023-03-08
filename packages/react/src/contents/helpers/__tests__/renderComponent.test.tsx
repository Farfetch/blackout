import { renderComponent } from '../index.js';

describe('renderComponent', () => {
  it('should render component', () => {
    const data = {
      type: 'text',
      value: 'test',
    };

    expect(renderComponent('text', data, {})).toMatchSnapshot();
  });
});

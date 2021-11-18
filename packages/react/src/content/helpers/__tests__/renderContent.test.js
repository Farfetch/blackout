import renderContent from '../renderContent';

describe('renderContent', () => {
  it('should render components list', () => {
    const data = {
      components: [
        {
          type: 'testComponent',
          value: 'test',
        },
        {
          type: 'text',
          value: 'test',
        },
      ],
    };

    expect(renderContent(data)).toMatchSnapshot();
  });
});

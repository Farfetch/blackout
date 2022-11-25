import { render } from '@testing-library/react';
import Component, { registerComponent } from '../Component';
import React from 'react';

const MockComponent = (): React.ReactElement => {
  return <div>Content</div>;
};

describe('<Component />', () => {
  const originalWarn = console.warn;

  afterEach(() => (console.warn = originalWarn));

  describe('with console.warn', () => {
    let consoleOutput: Array<string> = [];
    const mockedWarn = (output: string) => consoleOutput.push(output);

    beforeEach(() => (console.warn = mockedWarn));

    afterEach(() => (consoleOutput = []));

    it('should render correctly', () => {
      const props = {
        type: 'testComponent',
        customType: 'MockComponent',
        value: 'Foo',
      };

      registerComponent('MockComponent', MockComponent);

      render(
        <Component component={props} location={{}} viewportBreakpoint="" />,
      );

      expect(consoleOutput).toEqual([]);
    });

    it('should not render when there is not component mapped', () => {
      const props = {
        type: 'test',
        value: 'Foo',
      };
      const { container } = render(
        <Component component={props} location={{}} viewportBreakpoint="" />,
      );

      expect(container.firstChild).toBeNull();
      expect(consoleOutput).toEqual([
        '[react-content] No component with "type=test" is defined.',
      ]);
    });

    it('should not render because component was registered twice', () => {
      registerComponent('MockComponent', MockComponent);

      expect(consoleOutput).toEqual([
        '[react-content] Component with "type=MockComponent" already registered on components. Will override with new component.',
      ]);
    });
  });
});

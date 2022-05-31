import { cleanup, render } from '@testing-library/react';
import { mockAudio, mockImage, mockVideo } from 'tests/__fixtures__/contents';
import Media from '../media/Media';
import React from 'react';

jest.mock('../media/components/audio', () => () => 'Audio');
jest.mock('../media/components/video', () => () => 'Video');
jest.mock('../media/components/image', () => () => 'Image');

describe('<Media />', () => {
  afterEach(cleanup);

  it('should render correctly with image', () => {
    const { queryByTestId } = render(
      <Media data={{ fields: { ...mockImage } }} viewportBreakpoint={'lg'} />,
    );
    const element = queryByTestId('mediaComponent');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Image');
  });

  it('should render correctly with video', () => {
    const { queryByTestId } = render(
      <Media
        data={{ fields: { ...mockImage, ...mockVideo } }}
        viewportBreakpoint={'lg'}
      />,
    );
    const element = queryByTestId('mediaComponent');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Video');
  });

  it('should render correctly with audio', () => {
    const { queryByTestId } = render(
      <Media
        data={{ fields: { ...mockImage, ...mockAudio } }}
        viewportBreakpoint={'lg'}
      />,
    );
    const element = queryByTestId('mediaComponent');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Audio');
  });

  it('should render null when no image, audio or video', () => {
    const { container } = render(
      <Media data={{ fields: {} }} viewportBreakpoint={'lg'} />,
    );

    expect(container.firstChild).toBeNull();
  });
});

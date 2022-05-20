import {
  mockAudio,
  mockImage,
  mockVideo,
} from '../media/__tests__/__mocks__/MediaMocks.js';
import { render } from '@testing-library/react';
import Media from '../media/Media';
import React from 'react';

jest.mock('../media/components/audio', () => () => 'Audio');
jest.mock('../media/components/video', () => () => 'Video');
jest.mock('../media/components/image', () => () => 'Image');

describe('<Media />', () => {
  it('should render correctly with image', () => {
    const { container } = render(<Media data={{ fields: { ...mockImage } }} />);

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with video', () => {
    const { container } = render(
      <Media data={{ fields: { ...mockImage, ...mockVideo } }} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with audio', () => {
    const { container } = render(
      <Media data={{ fields: { ...mockImage, ...mockAudio } }} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render null when no image, audio or video', () => {
    const { container } = render(<Media data={{ fields: {} }} />);

    expect(container).toMatchSnapshot();
  });
});

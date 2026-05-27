import React from 'react';
import {Composition} from 'remotion';
import {CodexLectureAnimation, FPS, HEIGHT, TOTAL_FRAMES, WIDTH} from './CodexLectureAnimation';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="CodexLectureAnimation"
      component={CodexLectureAnimation}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};

export default RemotionRoot;


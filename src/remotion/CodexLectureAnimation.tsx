import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {Audio} from '@remotion/media';
import {slideCaptions, type GuidedCaption} from './captions';
import {narrations} from './narration';
import {slides, type FocusPoint, type SlideSpec} from './slides';
import '../styles.css';

export const WIDTH = 1920;
export const HEIGHT = 1080;
export const FPS = 30;
export const SLIDE_DURATION_FRAMES = narrations.map((item) => Math.ceil(item.durationSec * FPS));
export const SLIDE_START_FRAMES = SLIDE_DURATION_FRAMES.reduce<number[]>((starts, duration, index) => {
  starts.push(index === 0 ? 0 : starts[index - 1] + SLIDE_DURATION_FRAMES[index - 1]);
  return starts;
}, []);
export const TOTAL_FRAMES = SLIDE_DURATION_FRAMES.reduce((sum, duration) => sum + duration, 0);

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const popEase = Easing.bezier(0.34, 1.56, 0.64, 1);
const clampInterpolate = (
  frame: number,
  input: [number, number],
  output: [number, number],
  easing = ease,
) =>
  interpolate(frame, input, output, {
    easing,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const getSlideIndex = (frame: number) => {
  const index = SLIDE_START_FRAMES.findIndex((start, currentIndex) => {
    const nextStart = SLIDE_START_FRAMES[currentIndex + 1] ?? TOTAL_FRAMES;
    return frame >= start && frame < nextStart;
  });

  return index === -1 ? slides.length - 1 : index;
};

const cameraAt = (localFrame: number, points: FocusPoint[], durationSec: number) => {
  const seconds = localFrame / FPS;
  const lastDesignedSecond = points[points.length - 1]?.at ?? durationSec;
  const playableSeconds = Math.max(1, durationSec - 1.2);
  const normalizedPoints = points.map((point) => ({
    ...point,
    at: lastDesignedSecond === 0 ? 0 : (point.at / lastDesignedSecond) * playableSeconds,
  }));
  let current = normalizedPoints[0];
  let next = normalizedPoints[normalizedPoints.length - 1];

  for (let i = 0; i < normalizedPoints.length - 1; i += 1) {
    if (seconds >= normalizedPoints[i].at && seconds <= normalizedPoints[i + 1].at) {
      current = normalizedPoints[i];
      next = normalizedPoints[i + 1];
      break;
    }
    if (seconds > normalizedPoints[i + 1].at) {
      current = normalizedPoints[i + 1];
      next = normalizedPoints[i + 1];
    }
  }

  if (current === next) return current;

  const progress = clampInterpolate(seconds, [current.at, next.at], [0, 1]);
  return {
    at: seconds,
    label: seconds < next.at - 0.4 ? current.label : next.label,
    scale: current.scale + (next.scale - current.scale) * progress,
    x: current.x + (next.x - current.x) * progress,
    y: current.y + (next.y - current.y) * progress,
  };
};

const Header: React.FC<{slide: SlideSpec; localFrame: number}> = ({slide, localFrame}) => {
  const show = clampInterpolate(localFrame, [0, 28], [0, 1]);
  return (
    <header
      className="sceneHeader"
      style={{opacity: show, transform: `translateY(${(1 - show) * -24}px)`}}
    >
      <div>
        <p>{slide.kicker}</p>
        <h2>{slide.title}</h2>
      </div>
      <span>{String(slide.id).padStart(2, '0')}/14</span>
    </header>
  );
};

const renderCaptionText = (caption: GuidedCaption) => {
  if (!caption.highlight || !caption.text.includes(caption.highlight)) return caption.text;

  const [before, ...rest] = caption.text.split(caption.highlight);
  return (
    <>
      {before}
      <strong>{caption.highlight}</strong>
      {rest.join(caption.highlight)}
    </>
  );
};

const CaptionBar: React.FC<{slideIndex: number; localFrame: number}> = ({slideIndex, localFrame}) => {
  const localMs = (localFrame / FPS) * 1000;
  const captions = slideCaptions[slideIndex] ?? [];
  const caption = captions.find((item) => localMs >= item.startMs && localMs <= item.endMs);

  if (!caption) return null;

  const startFrame = Math.round((caption.startMs / 1000) * FPS);
  const endFrame = Math.round((caption.endMs / 1000) * FPS);
  const fadeIn = clampInterpolate(localFrame, [startFrame, startFrame + 10], [0, 1]);
  const fadeOut = clampInterpolate(localFrame, [endFrame - 10, endFrame], [1, 0]);
  const show = Math.min(fadeIn, fadeOut);

  return (
    <div
      className="captionLayer"
      style={{
        opacity: show,
        transform: `translate(-50%, ${(1 - show) * 18}px)`,
      }}
    >
      <div className="businessCaption">
        <p>{renderCaptionText(caption)}</p>
      </div>
    </div>
  );
};

const CardsStage: React.FC<{slide: SlideSpec; localFrame: number; durationSec: number}> = ({
  slide,
  localFrame,
  durationSec,
}) => {
  const cam = cameraAt(localFrame, slide.focus, durationSec);
  return (
    <div className="smartStage cardsStage">
      <div
        className="cardRow"
        style={{
          transform: `translate(${cam.x}px, ${cam.y}px) scale(${cam.scale})`,
        }}
      >
        {slide.cards?.map((card, index) => {
          const show = clampInterpolate(localFrame, [50 + index * 45, 85 + index * 45], [0, 1], popEase);
          return (
            <div
              className="newsCard"
              key={card}
              style={{
                opacity: show,
                transform: `translateY(${(1 - show) * 40}px) scale(${0.9 + show * 0.1})`,
              }}
            >
              <Img src={staticFile(`assets/${card}`)} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ImageStage: React.FC<{slide: SlideSpec; localFrame: number; durationSec: number}> = ({
  slide,
  localFrame,
  durationSec,
}) => {
  if (slide.cards) return <CardsStage slide={slide} localFrame={localFrame} durationSec={durationSec} />;

  const cam = cameraAt(localFrame, slide.focus, durationSec);

  return (
    <div className="smartStage">
      <div
        className="cameraLayer"
        style={{
          transform: `translate(${cam.x}px, ${cam.y}px) scale(${cam.scale})`,
        }}
      >
        <Img
          className={`stageImage ${slide.fit === 'contain' ? 'contain' : 'cover'}`}
          src={staticFile(`assets/${slide.asset}`)}
        />
      </div>
    </div>
  );
};

const Scene: React.FC<{
  slide: SlideSpec;
  slideIndex: number;
  localFrame: number;
  durationFrames: number;
  durationSec: number;
}> = ({slide, slideIndex, localFrame, durationFrames, durationSec}) => {
  const enter = slideIndex === 0 ? 1 : clampInterpolate(localFrame, [0, 22], [0, 1]);
  const exit = clampInterpolate(localFrame, [durationFrames - 34, durationFrames - 1], [1, 0]);
  const opacity = Math.min(enter, exit);

  return (
    <AbsoluteFill className="videoRoot" style={{opacity}}>
      <Header slide={slide} localFrame={localFrame} />
      <ImageStage slide={slide} localFrame={localFrame} durationSec={durationSec} />
      <CaptionBar slideIndex={slideIndex} localFrame={localFrame} />
    </AbsoluteFill>
  );
};

const AudioTracks: React.FC = () => {
  return (
    <>
      {narrations.map((item, index) => (
        <Sequence
          key={item.id}
          from={SLIDE_START_FRAMES[index]}
          durationInFrames={SLIDE_DURATION_FRAMES[index]}
          layout="none"
        >
          <Audio src={staticFile(`audio/${item.audio}`)} volume={0.96} />
        </Sequence>
      ))}
    </>
  );
};

export const CodexLectureAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const slideIndex = getSlideIndex(frame);
  const localFrame = frame - SLIDE_START_FRAMES[slideIndex];
  const durationFrames = SLIDE_DURATION_FRAMES[slideIndex];
  const durationSec = narrations[slideIndex]?.durationSec ?? durationFrames / FPS;
  const slide = slides[slideIndex];

  return (
    <>
      <Scene
        slide={slide}
        slideIndex={slideIndex}
        localFrame={localFrame}
        durationFrames={durationFrames}
        durationSec={durationSec}
      />
      <AudioTracks />
    </>
  );
};

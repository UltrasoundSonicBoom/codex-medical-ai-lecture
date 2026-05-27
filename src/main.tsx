import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Player, type PlayerRef} from '@remotion/player';
import {
  CodexLectureAnimation,
  FPS,
  HEIGHT,
  SLIDE_DURATION_FRAMES,
  SLIDE_START_FRAMES,
  TOTAL_FRAMES,
  WIDTH,
} from './remotion/CodexLectureAnimation';
import {downloads, slides} from './remotion/slides';
import './styles.css';

type PromptSpec = {
  goal: string;
  prompt?: string;
  files?: string[];
};

const promptBySlide: Record<number, PromptSpec> = {
  1: {
    goal:
      '이 슬라이드에는 실습 프롬프트가 없습니다. 아래 목차에서 Chapter 실습 슬라이드 또는 프롬프트 공식 슬라이드를 선택하면 해당 프롬프트가 여기에 표시됩니다.',
  },
  2: {
    goal:
      '오늘 실습의 기준을 정합니다. 자료 하나, 산출물 하나, 검토 방식 하나를 먼저 고르는 연습입니다.',
    prompt:
      '내가 제공하는 자료 하나를 보고, Codex에게 맡길 수 있는 작은 업무로 바꿔주세요. 입력 자료, 해야 할 작업, 받을 산출물, 검토 기준을 각각 한 줄로 정리해 주세요.',
  },
  6: {
    goal: '실습 키트를 풀고 HTML 가이드와 프로젝트 폴더를 같은 출발선으로 맞춥니다.',
    prompt:
      '이 폴더 구조를 확인하고, 수강생이 HTML 가이드를 열어 실습을 시작할 수 있도록 필요한 파일과 실행 순서를 점검해 주세요. 누락된 파일이 있으면 목록으로 알려주세요.',
    files: ['Codex 실습 키트 ZIP', '강의록 PPT'],
  },
  7: {
    goal: '웹페이지를 읽고 다음 행동 목록으로 바꾸는 인앱 브라우저 실습입니다.',
    prompt:
      '인앱 브라우저로 현재 페이지를 확인한 뒤, 핵심 내용 세 가지와 내가 다음에 해야 할 행동 목록 다섯 가지를 업무 브리핑 형식으로 정리해 주세요.',
  },
  8: {
    goal: '컴퓨터 정리는 바로 실행하지 않고, 제안과 검토를 먼저 합니다.',
    prompt:
      '현재 폴더의 파일을 분석해서 정리 기준을 제안해 주세요. 삭제나 이동은 하지 말고, 드라이 런 형태로 이동 후보, 삭제 후보, 보관 후보를 표로 정리해 주세요.',
  },
  9: {
    goal: '근무표 이미지를 구조화 표와 Calendar 후보로 바꾸는 실습입니다.',
    prompt:
      '첨부한 근무표 이미지를 읽고 날짜별 근무 코드를 표로 추출해 주세요. 이후 Google Calendar에 넣기 쉬운 일정 후보 목록으로 바꾸고, 사람이 검토해야 할 애매한 항목을 따로 표시해 주세요.',
    files: ['근무표 이미지', '근무표 실습 ZIP'],
  },
  10: {
    goal: 'AI 의료 일자리 데이터를 Excel 분석과 차트로 바꾸는 실습입니다.',
    prompt:
      'CSV 데이터를 확인하고 Excel 분석 파일을 만들어 주세요. 주요 변화가 보이도록 차트 두 개를 포함하고, 강의에서 설명할 수 있는 인사이트 세 가지를 함께 정리해 주세요.',
    files: ['AI 의료 일자리 CSV', 'AI 의료 일자리 Excel'],
  },
  11: {
    goal: '위내시경 환자 안내문을 카드뉴스로 바꾸는 실습입니다.',
    prompt:
      '위내시경 환자 안내문을 읽고, 환자가 바로 이해할 수 있도록 핵심 메시지를 세 문장으로 요약해 주세요. 이어서 인스타그램 카드뉴스 세 장 구성으로 제목, 본문, 주의 문구를 작성해 주세요.',
    files: ['위내시경 환자 안내문 DOCX', '위내시경 환자 안내문 MD'],
  },
  12: {
    goal: '해외 의료 AI 논문을 비교표, 학습 노트, 강의자료 초안으로 확장합니다.',
    prompt:
      '두 개의 의료 AI 관련 논문 내용을 비교해 주세요. 연구 목적, 적용 분야, 데이터, 장점, 한계, 국내 의료 현장 적용 가능성을 Excel 비교표 형식으로 정리하고, 강의 슬라이드로 만들 핵심 메시지도 제안해 주세요.',
    files: ['해외 의료 AI 비교 Excel', '논문 학습 노트'],
  },
  13: {
    goal: 'Codex에게 맡길 업무를 다섯 칸 프롬프트로 정리합니다.',
    prompt:
      '다음 업무를 Codex에게 맡길 수 있도록 자료, 작업, 산출물, 제약, 검토 기준의 다섯 칸으로 프롬프트를 작성해 주세요. 결과는 그대로 복사해서 사용할 수 있는 형태로 만들어 주세요.',
  },
  14: {
    goal: '오늘 한 가지 업무를 파일 결과물로 맡기는 마무리 CTA입니다.',
    prompt:
      '내 업무 중 하나를 골라 Codex에게 맡길 프롬프트를 만들어 주세요. 작은 자료 하나에서 시작하고, 결과 파일 형식과 검토 기준을 명확히 포함해 주세요.',
  },
};

const root = createRoot(document.getElementById('root') as HTMLElement);

const visibleDownloads = downloads.filter((file) => file.type === 'JPG');

const formatSize = (bytes: number) => {
  if (bytes > 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
  if (bytes > 1024) return `${Math.round(bytes / 1024)}KB`;
  return `${bytes}B`;
};

const getSlideIndexFromFrame = (frame: number) => {
  const index = SLIDE_START_FRAMES.findIndex((start, currentIndex) => {
    const nextStart = SLIDE_START_FRAMES[currentIndex + 1] ?? TOTAL_FRAMES;
    return frame >= start && frame < nextStart;
  });

  return index === -1 ? slides.length - 1 : index;
};

const shortTitle = (title: string) => {
  if (title.includes('파일로 받으면')) return '실습 기준';
  if (title.includes('Assistant')) return 'Assistant 정의';
  if (title.includes('ChatGPT')) return 'ChatGPT 활용';
  if (title.includes('복사')) return '한계 인식';
  if (title.includes('ZIP')) return '환경 세팅';
  if (title.includes('인앱')) return 'Ch1 브라우저';
  if (title.includes('컴퓨터')) return 'Ch2 정리';
  if (title.includes('근무표')) return 'Ch3 근무표';
  if (title.includes('일자리')) return 'Ch4 데이터';
  if (title.includes('환자')) return 'Ch5 카드뉴스';
  if (title.includes('논문')) return 'Ch6 논문';
  if (title.includes('다섯 칸')) return '프롬프트 공식';
  if (title.includes('오늘 한 가지')) return '마무리 CTA';
  return '표지';
};

const App: React.FC = () => {
  const playerRef = useRef<PlayerRef>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const activeSlideIndex = getSlideIndexFromFrame(currentFrame);
  const activeSlide = slides[activeSlideIndex];
  const activePrompt = promptBySlide[activeSlide.id] ?? {
    goal: '이 슬라이드에는 별도 실습 프롬프트가 없습니다.',
  };

  const slideProgress = useMemo(() => {
    const start = SLIDE_START_FRAMES[activeSlideIndex];
    const duration = SLIDE_DURATION_FRAMES[activeSlideIndex] || 1;
    return Math.min(100, Math.max(0, ((currentFrame - start) / duration) * 100));
  }, [activeSlideIndex, currentFrame]);

  const seekToSlide = useCallback((index: number, shouldPlay = false) => {
    const nextIndex = Math.min(Math.max(index, 0), slides.length - 1);
    const frame = SLIDE_START_FRAMES[nextIndex] ?? 0;
    playerRef.current?.seekTo(frame);
    setCurrentFrame(frame);
    if (shouldPlay) playerRef.current?.play();
  }, []);

  const goPrevious = useCallback(() => {
    seekToSlide(activeSlideIndex - 1);
  }, [activeSlideIndex, seekToSlide]);

  const goNext = useCallback(() => {
    seekToSlide(activeSlideIndex + 1);
  }, [activeSlideIndex, seekToSlide]);

  const replayFromStart = useCallback(() => {
    seekToSlide(0, true);
  }, [seekToSlide]);

  const togglePlayback = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    player.toggle();
  }, []);

  const copyPrompt = useCallback(async () => {
    if (!activePrompt.prompt) return;
    await navigator.clipboard.writeText(activePrompt.prompt);
  }, [activePrompt.prompt]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const onFrame = ({detail}: {detail: {frame: number}}) => setCurrentFrame(detail.frame);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    player.addEventListener('frameupdate', onFrame);
    player.addEventListener('play', onPlay);
    player.addEventListener('pause', onPause);
    player.addEventListener('ended', onEnded);

    return () => {
      player.removeEventListener('frameupdate', onFrame);
      player.removeEventListener('play', onPlay);
      player.removeEventListener('pause', onPause);
      player.removeEventListener('ended', onEnded);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, button, a')) return;

      if (event.code === 'Space') {
        event.preventDefault();
        togglePlayback();
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrevious();
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goNext, goPrevious, togglePlayback]);

  return (
    <main className="app-shell">
      <section className="player-zone" aria-label="Remotion 발표 애니메이션">
        <div className="topbar">
          <div>
            <p className="eyebrow">Codex Practice Lecture</p>
            <h1>AI에게 묻기에서 맡기기로</h1>
          </div>
          <a className="primary-link" href="#downloads">예제 파일 다운로드</a>
        </div>

        <div className="player-frame">
          <Player
            ref={playerRef}
            component={CodexLectureAnimation}
            durationInFrames={TOTAL_FRAMES}
            compositionWidth={WIDTH}
            compositionHeight={HEIGHT}
            fps={FPS}
            controls={false}
            clickToPlay
            doubleClickToFullscreen
            spaceKeyToPlayOrPause={false}
            autoPlay={false}
            loop={false}
            style={{width: '100%', aspectRatio: `${WIDTH} / ${HEIGHT}`}}
          />
        </div>

        <div className="lecture-controls" aria-label="슬라이드 조작">
          <div className="control-group">
            <button className="control-button" type="button" onClick={goPrevious} disabled={activeSlideIndex === 0}>
              <span aria-hidden>←</span>
              이전
            </button>
            <div className="slide-status" aria-live="polite">
              {String(activeSlide.id).padStart(2, '0')} / {String(slides.length).padStart(2, '0')} ·{' '}
              {shortTitle(activeSlide.title)}
            </div>
            <button
              className="control-button"
              type="button"
              onClick={goNext}
              disabled={activeSlideIndex === slides.length - 1}
            >
              다음
              <span aria-hidden>→</span>
            </button>
            <button className="replay-button" type="button" onClick={replayFromStart}>
              ↻ 처음부터 재생
            </button>
          </div>

          <div className="keyboard-help" aria-label="키보드 단축키 안내">
            <kbd>Space</kbd>
            <span>재생/정지</span>
            <span>·</span>
            <kbd>←</kbd>
            <span>/</span>
            <kbd>→</kbd>
            <span>이전/다음 슬라이드</span>
          </div>
        </div>

        <nav className="slide-toc" aria-label="강의 목차">
          {slides.map((slide, index) => (
            <button
              className={`toc-pill ${index === activeSlideIndex ? 'active' : ''}`}
              key={slide.id}
              type="button"
              onClick={() => seekToSlide(index)}
            >
              {String(slide.id).padStart(2, '0')}. {slide.id === 2 ? '📥 ' : ''}
              {shortTitle(slide.title)}
            </button>
          ))}
        </nav>

        <div className="slide-progress" aria-hidden>
          <span style={{width: `${slideProgress}%`}} />
        </div>
      </section>

      <section className="prompt-panel" aria-label="실습 프롬프트">
        <div className="prompt-heading">
          <h2>📝 실습 프롬프트</h2>
          {activePrompt.prompt ? (
            <button className="copy-button" type="button" onClick={copyPrompt}>
              프롬프트 복사
            </button>
          ) : null}
        </div>

        <div className="prompt-card">
          <p className="prompt-goal">{activePrompt.goal}</p>
          {activePrompt.prompt ? <pre>{activePrompt.prompt}</pre> : null}
          {activePrompt.files?.length ? (
            <div className="prompt-files">
              {activePrompt.files.map((fileLabel) => {
                const file = visibleDownloads.find((item) => item.label === fileLabel);
                return file ? (
                  <a key={file.href} href={file.href} download>
                    {file.label}
                  </a>
                ) : null;
              })}
            </div>
          ) : null}
        </div>
      </section>

      <section className="download-panel" id="downloads" aria-label="강의 예제 파일 다운로드">
        <div className="panel-heading">
          <p className="eyebrow">Practice Files</p>
          <h2>실습에 필요한 파일을 웹에서 바로 받기</h2>
        </div>
        <div className="download-grid">
          {visibleDownloads.map((file) => (
            <a className="download-card" key={file.href} href={file.href} download>
              <span className="file-type">{file.type}</span>
              <strong>{file.label}</strong>
              <p>{file.description}</p>
              <em>{formatSize(file.size)}</em>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

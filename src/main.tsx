import React from 'react';
import {createRoot} from 'react-dom/client';
import {Player} from '@remotion/player';
import {CodexLectureAnimation, FPS, HEIGHT, TOTAL_FRAMES, WIDTH} from './remotion/CodexLectureAnimation';
import {downloads} from './remotion/slides';
import './styles.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

const formatSize = (bytes: number) => {
  if (bytes > 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
  if (bytes > 1024) return `${Math.round(bytes / 1024)}KB`;
  return `${bytes}B`;
};

root.render(
  <React.StrictMode>
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
            component={CodexLectureAnimation}
            durationInFrames={TOTAL_FRAMES}
            compositionWidth={WIDTH}
            compositionHeight={HEIGHT}
            fps={FPS}
            controls
            autoPlay={false}
            loop
            style={{width: '100%', aspectRatio: `${WIDTH} / ${HEIGHT}`}}
          />
        </div>
      </section>

      <section className="download-panel" id="downloads" aria-label="강의 예제 파일 다운로드">
        <div className="panel-heading">
          <p className="eyebrow">Practice Files</p>
          <h2>실습에 필요한 파일을 웹에서 바로 받기</h2>
        </div>
        <div className="download-grid">
          {downloads.map((file) => (
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
  </React.StrictMode>,
);

# Codex Medical AI Lecture

Remotion 기반 Codex 실습 강의 웹앱입니다. 강의 슬라이드 애니메이션, TTS 내레이션, 실습 다운로드 파일을 포함합니다.

## 바로 실행

```bash
npm install
npm run dev
```

브라우저에서 표시되는 로컬 주소를 열면 됩니다.

## 빌드

```bash
npm run build
```

## Remotion 확인

```bash
npm run remotion:still
npm run remotion:studio
```

## 주요 경로

- `src/remotion/narration.ts`: 슬라이드별 강의 스크립트, CTA 의도, TTS 길이, 애니메이션 계획
- `src/remotion/CodexLectureAnimation.tsx`: Remotion 영상 타임라인과 오디오 삽입
- `docs/lecture_script_tts_timing_plan.md`: 강사용 스크립트 및 슬라이드별 타이밍 기획
- `public/audio`: Supertonic TTS WAV 파일
- `public/downloads`: 수강생용 실습 파일

## 배포

현재 배포 URL:

https://remotion-codex-lecture.vercel.app

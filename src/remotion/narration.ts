export type NarrationPhase = {
  from: number;
  to: number;
  focus: string;
  motion: string;
  intent: string;
};

export type NarrationSpec = {
  id: number;
  title: string;
  audio: string;
  durationSec: number;
  ctaIntent: string;
  visualRoute: string;
  script: string;
  phases: NarrationPhase[];
};

export const narrations: NarrationSpec[] = [
  {
    id: 1,
    title: 'AI에게 묻기에서, AI에게 맡기기로',
    audio: 'slide-01.wav',
    durationSec: 30,
    ctaIntent: '질문형 AI에서 결과물 제작형 AI로 관점을 전환합니다.',
    visualRoute: '전체 화면에서 시작해 Assistant 쪽을 보여준 뒤 Agent 쪽으로 이동하고, 마지막에는 두 개념을 한 화면에 다시 잡습니다.',
    script:
      '안녕하세요. 오늘은 인공지능을 단순히 질문에 답하는 도구로 쓰는 단계를 넘어, 실제 업무를 맡기는 방법을 배워보겠습니다. 왼쪽은 질문하고 답을 받는 어시스턴트의 장면이고, 오른쪽은 파일과 결과물을 만들어 내는 에이전트의 장면입니다. 오늘의 목표는 명확합니다. 설명을 듣고 끝내는 것이 아니라, 내 업무 하나를 실제 결과 파일로 받아 보는 경험을 만드는 것입니다.',
    phases: [
      {from: 0, to: 5, focus: '전체 맥락', motion: '천천히 줌인', intent: '오늘 강의의 방향을 엽니다.'},
      {from: 5, to: 12, focus: 'Assistant', motion: '좌측 또는 질문 영역으로 팬', intent: '답변을 받는 경험을 설명합니다.'},
      {from: 12, to: 22, focus: 'Agent', motion: '반대쪽 결과물 영역으로 팬', intent: '파일을 만드는 경험으로 전환합니다.'},
      {from: 22, to: 30, focus: '전체 비교', motion: '줌아웃 후 정지', intent: '오늘의 CTA를 한 번에 남깁니다.'},
    ],
  },
  {
    id: 2,
    title: '작게 요청하고, 파일로 받으면 실습이 쉬워집니다',
    audio: 'slide-02.wav',
    durationSec: 27,
    ctaIntent: '작은 자료, 명확한 산출물, 결과 검토라는 세 단계만 성공시키게 합니다.',
    visualRoute: '공식 전체를 보여준 뒤 작은 자료, 산출물, 검토 단계 순서로 이동합니다.',
    script:
      '처음부터 거대한 자동화를 만들려고 하면 누구나 막힙니다. 그래서 오늘은 작게 시작합니다. 자료 하나를 고르고, 원하는 산출물의 형태를 정하고, 결과 파일을 열어 확인합니다. 이 세 단계만 안정적으로 반복해도 Codex 실습은 훨씬 쉬워집니다. 작은 성공을 먼저 만들고, 잘 된 프롬프트를 다음 업무의 출발점으로 저장해 보겠습니다.',
    phases: [
      {from: 0, to: 4, focus: '전체 공식', motion: '전체에서 부드럽게 줌인', intent: '작게 시작한다는 기준을 만듭니다.'},
      {from: 4, to: 10, focus: '작은 자료', motion: '첫 단계로 팬', intent: '자료 하나를 고르는 행동을 강조합니다.'},
      {from: 10, to: 18, focus: '산출물 지정', motion: '가운데 단계로 이동', intent: '무엇을 받을지 먼저 정하게 합니다.'},
      {from: 18, to: 27, focus: '검토와 저장', motion: '마지막 단계로 팬 후 줌아웃', intent: '결과 파일 확인을 CTA로 남깁니다.'},
    ],
  },
  {
    id: 3,
    title: 'Assistant는 옆에서 돕고, Agent는 대신 수행합니다',
    audio: 'slide-03.wav',
    durationSec: 27,
    ctaIntent: 'Codex를 답변기가 아니라 실행 파트너로 이해하게 합니다.',
    visualRoute: '두 영역을 전체 비교로 보여준 뒤 Assistant에서 Agent로 이동합니다.',
    script:
      'Assistant와 Agent의 차이를 한 문장으로 정리해 보겠습니다. Assistant는 사용자가 질문하면 답을 제공합니다. 하지만 그 답을 복사하고 실행하고 저장하는 일은 여전히 사용자의 몫입니다. Agent는 한 단계 더 나아가 사용자가 해야 할 일을 대신 수행하고, 결과물까지 만들어 줍니다. Codex는 이 두 번째 방식, 즉 실행과 산출물에 가까운 도구입니다.',
    phases: [
      {from: 0, to: 5, focus: '비교 전체', motion: '전체 유지', intent: '두 개념을 동시에 놓습니다.'},
      {from: 5, to: 12, focus: 'Assistant', motion: 'Assistant 영역 줌인', intent: '답변 제공 역할을 설명합니다.'},
      {from: 12, to: 22, focus: 'Agent', motion: 'Agent 영역으로 팬', intent: '대신 수행과 산출물을 설명합니다.'},
      {from: 22, to: 27, focus: '역할 차이', motion: '전체로 복귀', intent: 'Codex의 위치를 정리합니다.'},
    ],
  },
  {
    id: 4,
    title: 'ChatGPT는 학습과 판단 기준을 빠르게 만들어줍니다',
    audio: 'slide-04.wav',
    durationSec: 27,
    ctaIntent: '모르는 업무는 먼저 학습 가능한 기준으로 바꾸게 합니다.',
    visualRoute: '학습 화면에서 질문, 예시, 기준 정리 영역을 차례로 보여줍니다.',
    script:
      'ChatGPT는 학습과 정리에 매우 강한 도구입니다. 예를 들어 엑셀의 브이룩업 함수가 낯설다면, 원리와 예시 데이터, 자주 하는 실수까지 한 번에 물어볼 수 있습니다. 이렇게 얻은 답변은 내가 더 잘 일하기 위한 기준이 됩니다. 즉 ChatGPT는 업무를 대신 끝내기보다는, 내가 업무를 이해하고 판단할 수 있도록 옆에서 도와주는 훌륭한 조력자입니다.',
    phases: [
      {from: 0, to: 5, focus: '학습 화면', motion: '전체에서 천천히 줌인', intent: 'ChatGPT의 강점을 엽니다.'},
      {from: 5, to: 11, focus: '개념 질문', motion: '질문 영역으로 팬', intent: '모르는 업무를 질문으로 바꾸게 합니다.'},
      {from: 11, to: 19, focus: '예시와 자료', motion: '중앙 예시 영역으로 이동', intent: '학습 자료를 받는 장면을 보여줍니다.'},
      {from: 19, to: 27, focus: '기준 정리', motion: '정리 영역으로 팬 후 안정화', intent: '판단 기준을 남깁니다.'},
    ],
  },
  {
    id: 5,
    title: '답변만으로는 복사, 실행, 저장이 여전히 내 일입니다',
    audio: 'slide-05.wav',
    durationSec: 28,
    ctaIntent: '반복 손작업을 Agent에게 넘길 필요를 느끼게 합니다.',
    visualRoute: '수작업 흐름 전체를 보여준 뒤 답변, 복사 실행, 저장 병목 순서로 이동합니다.',
    script:
      '좋은 답변을 받았다고 해서 일이 끝나는 것은 아닙니다. 코드를 복사하고, 파일에 붙여 넣고, 실행하고, 저장하는 과정은 여전히 사람의 손에 남습니다. 한두 번이면 괜찮지만, 파일이 많아지고 반복이 늘어나면 이 손작업이 병목이 됩니다. 이 지점에서 우리는 에이전트가 왜 필요한지 이해하게 됩니다. 반복되는 실행 과정을 Codex에게 맡길 준비를 하는 것입니다.',
    phases: [
      {from: 0, to: 5, focus: '수작업 흐름', motion: '전체 유지', intent: '답변 이후의 일을 보이게 합니다.'},
      {from: 5, to: 12, focus: '답변 받기', motion: '답변 영역 줌인', intent: '좋은 답변도 시작일 뿐임을 말합니다.'},
      {from: 12, to: 20, focus: '복사와 실행', motion: '중앙 작업 영역으로 팬', intent: '사람 손이 남는 부분을 강조합니다.'},
      {from: 20, to: 28, focus: '저장 병목', motion: '결과 파일 쪽으로 이동', intent: 'Agent 전환의 이유를 만듭니다.'},
    ],
  },
  {
    id: 6,
    title: 'ZIP을 풀고 HTML 가이드를 여는 것부터 시작합니다',
    audio: 'slide-06.wav',
    durationSec: 26,
    ctaIntent: '모든 수강생이 같은 출발선에서 실습하게 합니다.',
    visualRoute: '세팅 전체에서 ZIP, HTML 가이드, 프로젝트 폴더 순서로 이동합니다.',
    script:
      '이제 Codex 실습 환경을 맞춰 보겠습니다. 강의에서는 모두가 같은 화면에서 시작하는 것이 중요합니다. 먼저 실습 키트 압축 파일을 풀고, HTML 가이드를 열어 전체 흐름을 확인합니다. 그다음 Codex에서 이 프로젝트 폴더를 지정합니다. 이렇게 해 두면 수강생마다 다른 파일 구조 때문에 생기는 혼란을 줄이고, 바로 실습에 집중할 수 있습니다.',
    phases: [
      {from: 0, to: 4, focus: '세팅 전체', motion: '전체에서 시작', intent: '실습 환경의 목적을 설명합니다.'},
      {from: 4, to: 10, focus: 'ZIP 압축 해제', motion: '첫 단계로 줌인', intent: '파일을 먼저 준비하게 합니다.'},
      {from: 10, to: 18, focus: 'HTML 가이드', motion: '가운데로 팬', intent: '흐름 확인을 안내합니다.'},
      {from: 18, to: 26, focus: '프로젝트 폴더', motion: '폴더 영역으로 이동', intent: 'Codex 연결까지 마칩니다.'},
    ],
  },
  {
    id: 7,
    title: '인앱 브라우저는 웹 내용을 읽고 행동 목록으로 바꿉니다',
    audio: 'slide-07.wav',
    durationSec: 26,
    ctaIntent: '웹페이지를 단순 요약이 아니라 다음 행동으로 바꾸게 합니다.',
    visualRoute: '브라우저 전체에서 페이지 열기, 핵심 추출, 행동 목록 순서로 팬합니다.',
    script:
      '첫 번째 실습은 인앱 브라우저입니다. 브라우저는 단순히 웹페이지를 보는 공간이 아닙니다. Codex에게 페이지를 열고, 핵심 내용을 추출하고, 다음 행동 목록으로 정리하라고 요청할 수 있습니다. 병원 공지, 자료실, 업무 지침 페이지처럼 정보가 흩어져 있는 곳에서 특히 유용합니다. 보는 일을 행동 가능한 브리핑으로 바꾸는 연습입니다.',
    phases: [
      {from: 0, to: 4, focus: '브라우저 전체', motion: '전체 유지', intent: '브라우저 실습의 목적을 엽니다.'},
      {from: 4, to: 10, focus: '페이지 열기', motion: '웹페이지 영역으로 줌인', intent: '읽을 대상을 지정합니다.'},
      {from: 10, to: 18, focus: '핵심 추출', motion: '중앙 정보 영역으로 팬', intent: '정보를 요약하게 합니다.'},
      {from: 18, to: 26, focus: '행동 목록', motion: '오른쪽 산출물로 이동', intent: '업무 브리핑으로 마무리합니다.'},
    ],
  },
  {
    id: 8,
    title: '컴퓨터 정리는 제안, 검토, 실행 순서로 갑니다',
    audio: 'slide-08.wav',
    durationSec: 25,
    ctaIntent: '위험한 자동화일수록 검토 가능한 절차가 먼저라는 기준을 줍니다.',
    visualRoute: '정리 전체에서 후보 파일, 안전 검토, 승인 실행 순서로 이동합니다.',
    script:
      '두 번째 실습은 컴퓨터 정리입니다. 여기서 중요한 원칙은 바로 실행하지 않는 것입니다. 파일 삭제나 이동은 위험할 수 있으니, 먼저 정리 기준을 만들고, 드라이 런으로 후보 목록을 확인합니다. 그다음 사람이 승인한 뒤 실행합니다. 자동화의 핵심은 빠르게 지우는 것이 아니라, 검토 가능한 안전한 절차를 만드는 것입니다.',
    phases: [
      {from: 0, to: 4, focus: '정리 전체', motion: '전체에서 시작', intent: '정리 자동화의 위험을 암시합니다.'},
      {from: 4, to: 10, focus: '후보 파일', motion: '파일 분류 영역으로 팬', intent: '정리 기준을 먼저 세웁니다.'},
      {from: 10, to: 18, focus: '안전 검토', motion: '보안 검토 영역 줌인', intent: '드라이 런과 승인 절차를 강조합니다.'},
      {from: 18, to: 25, focus: '승인 실행', motion: '결과 체크로 이동', intent: '실행은 마지막이라는 CTA를 남깁니다.'},
    ],
  },
  {
    id: 9,
    title: '근무표 이미지는 구조화 표와 Calendar 후보로 바꿉니다',
    audio: 'slide-09.wav',
    durationSec: 28,
    ctaIntent: '근무표 이미지를 실제 일정 데이터로 바꾸는 과정을 이해시킵니다.',
    visualRoute: '원본 근무표 전체를 보여준 뒤 날짜와 근무 코드 행을 확대하고, Calendar 후보로 이어지는 흐름을 설명합니다.',
    script:
      '세 번째 실습은 근무표 이미지입니다. 이미지는 사람이 눈으로 읽을 수 있지만, 캘린더 앱은 바로 이해하지 못합니다. 그래서 Codex에게 먼저 근무표 이미지를 확인하게 하고, 날짜와 근무 코드를 구조화된 표로 추출하도록 요청합니다. 마지막으로 구글 캘린더에 넣을 수 있는 일정 후보로 정리합니다. 이미지 속 정보를 실제 일정 데이터로 바꾸는 과정입니다.',
    phases: [
      {from: 0, to: 5, focus: '원본 근무표', motion: '전체 contain 유지', intent: '원본 이미지의 성격을 설명합니다.'},
      {from: 5, to: 13, focus: '날짜와 근무 코드', motion: '근무 코드 행으로 강하게 줌인', intent: '추출해야 할 위치를 보입니다.'},
      {from: 13, to: 21, focus: '구조화 후보', motion: '표의 핵심 구간을 따라 팬', intent: '이미지를 데이터로 바꾸는 단계를 말합니다.'},
      {from: 21, to: 28, focus: 'Calendar 이동', motion: '전체로 줌아웃', intent: '캘린더 후보라는 산출물을 남깁니다.'},
    ],
  },
  {
    id: 10,
    title: 'AI 일자리 데이터는 Excel 분석과 차트로 설득합니다',
    audio: 'slide-10.wav',
    durationSec: 27,
    ctaIntent: '숫자 데이터를 보고와 강의에 쓸 수 있는 메시지로 바꾸게 합니다.',
    visualRoute: '원천 데이터에서 Excel 정리 화면을 거쳐 차트와 인사이트 영역으로 이동합니다.',
    script:
      '네 번째 실습은 데이터 분석입니다. 표 데이터는 그 자체로는 설득력이 약할 수 있습니다. 공개 자료를 CSV로 확인하고, Excel에서 정리한 다음, 차트와 인사이트로 바꾸어야 보고나 강의에 사용할 수 있습니다. Codex에게는 단순 요약이 아니라, 분석 파일을 만들고 차트까지 포함하라고 요청할 수 있습니다. 숫자를 메시지로 바꾸는 연습입니다.',
    phases: [
      {from: 0, to: 4, focus: '분석 전체', motion: '전체에서 시작', intent: '데이터 분석 실습을 소개합니다.'},
      {from: 4, to: 10, focus: '원천 데이터', motion: '왼쪽 자료 영역으로 팬', intent: 'CSV 확인을 설명합니다.'},
      {from: 10, to: 18, focus: 'Excel 정리', motion: '노트북 표로 줌인', intent: '정리 파일 제작을 보여줍니다.'},
      {from: 18, to: 27, focus: '차트와 인사이트', motion: '오른쪽 차트 영역으로 이동', intent: '숫자를 메시지로 바꿉니다.'},
    ],
  },
  {
    id: 11,
    title: '환자 안내문은 3문장과 3장 카드뉴스로 바꿉니다',
    audio: 'slide-11.wav',
    durationSec: 28,
    ctaIntent: '긴 의료 안내문을 환자가 바로 이해하는 카드뉴스로 재구성하게 합니다.',
    visualRoute: '카드뉴스 3장을 전체로 보여준 뒤 1장, 2장, 3장을 순서대로 훑습니다.',
    script:
      '다섯 번째 실습은 환자 안내문입니다. 긴 안내문은 정확하지만, 환자가 바로 행동하기에는 부담스러울 수 있습니다. Codex에게 문서를 읽고 핵심을 세 문장으로 줄인 뒤, 카드뉴스 세 장으로 나누게 합니다. 이때 의료 정보는 과장하지 않고, 환자가 무엇을 준비하고 어떤 점을 주의해야 하는지에 집중합니다. 긴 문서를 이해하기 쉬운 시각 자료로 바꾸는 과정입니다.',
    phases: [
      {from: 0, to: 5, focus: '카드 3장 전체', motion: '세 카드 전체 등장', intent: '결과물 형태를 먼저 보여줍니다.'},
      {from: 5, to: 12, focus: '카드 1', motion: '첫 카드로 줌인', intent: '핵심 요약을 설명합니다.'},
      {from: 12, to: 20, focus: '카드 2', motion: '두 번째 카드로 팬', intent: '준비와 주의점을 설명합니다.'},
      {from: 20, to: 28, focus: '카드 3', motion: '세 번째 카드 후 전체 복귀', intent: '배포 가능한 자료로 마무리합니다.'},
    ],
  },
  {
    id: 12,
    title: '해외 의료 AI 논문은 비교표와 강의자료로 확장합니다',
    audio: 'slide-12.wav',
    durationSec: 26,
    ctaIntent: '논문 읽기를 비교표, 노트, PPT, 인포그래픽 묶음으로 확장합니다.',
    visualRoute: '논문 PDF에서 비교표로 이동하고, 마지막에 강의자료 산출물 묶음을 보여줍니다.',
    script:
      '여섯 번째 실습은 논문 활용입니다. 논문을 읽는 데서 끝내지 않고, 비교표와 학습 노트, 강의 슬라이드와 인포그래픽 초안으로 확장합니다. 특히 의료 AI 주제에서는 출처와 한계를 남기는 것이 중요합니다. Codex에게 논문 두 개를 비교하게 하고, 핵심 차이와 적용 가능성을 정리하게 하면 강의 준비 시간이 크게 줄어듭니다.',
    phases: [
      {from: 0, to: 4, focus: '논문 워크플로우', motion: '전체에서 시작', intent: 'PDF 활용 실습을 소개합니다.'},
      {from: 4, to: 10, focus: 'PDF 읽기', motion: '왼쪽 논문 영역 줌인', intent: '입력 자료를 명확히 합니다.'},
      {from: 10, to: 18, focus: '비교표', motion: '중앙 표로 팬', intent: '논문을 비교 가능한 데이터로 바꿉니다.'},
      {from: 18, to: 26, focus: '강의자료', motion: '오른쪽 결과 묶음으로 이동', intent: '수업 산출물로 확장합니다.'},
    ],
  },
  {
    id: 13,
    title: 'Codex에게 맡길 때는 다섯 칸만 채우면 됩니다',
    audio: 'slide-13.wav',
    durationSec: 26,
    ctaIntent: '긴 프롬프트보다 빠진 칸 없는 프롬프트를 만들게 합니다.',
    visualRoute: '다섯 칸 전체에서 자료, 작업, 산출물, 제약과 검토 순서로 훑습니다.',
    script:
      'Codex에게 일을 맡길 때 프롬프트를 길게 쓰는 것보다 더 중요한 기준이 있습니다. 빠진 칸이 없어야 합니다. 자료가 무엇인지, 어떤 작업을 할지, 산출물은 어떤 형식인지, 지켜야 할 제약은 무엇인지, 마지막으로 어떻게 검토할지를 알려 주세요. 이 다섯 칸만 채우면 수강생도 자신의 업무에 바로 적용할 수 있는 요청문을 만들 수 있습니다.',
    phases: [
      {from: 0, to: 4, focus: '다섯 칸 전체', motion: '전체 공식 표시', intent: '프롬프트 기준을 제시합니다.'},
      {from: 4, to: 9, focus: '자료', motion: '첫 칸으로 줌인', intent: '입력 자료를 정하게 합니다.'},
      {from: 9, to: 15, focus: '작업과 산출물', motion: '가운데 칸들로 팬', intent: '무엇을 어떻게 만들지 정합니다.'},
      {from: 15, to: 22, focus: '제약과 검토', motion: '오른쪽 칸으로 이동', intent: '안전한 검토 기준을 붙입니다.'},
      {from: 22, to: 26, focus: '전체 공식', motion: '줌아웃', intent: '바로 적용 가능한 틀로 남깁니다.'},
    ],
  },
  {
    id: 14,
    title: '오늘 한 가지 업무를 Codex에게 파일로 맡겨보세요',
    audio: 'slide-14.wav',
    durationSec: 27,
    ctaIntent: '수강생이 지금 바로 파일 하나를 골라 Codex에게 맡기도록 마무리합니다.',
    visualRoute: 'CTA 전체에서 핵심 문장, Codex에게 맡기기, 파일 열어 검토 단계를 차례로 보여줍니다.',
    script:
      '마지막으로 오늘의 실천 과제입니다. 큰 자동화를 만들려고 하지 마세요. 오늘 한 가지 업무만 고르면 됩니다. 자료 하나를 선택하고, 원하는 산출물 형태를 정하고, 결과 파일을 열어 검토합니다. 잘 된 프롬프트는 저장해 두었다가 다음 업무에 다시 사용하세요. 작은 성공이 쌓이면, Codex는 단순한 도구가 아니라 나만의 업무 파트너가 됩니다.',
    phases: [
      {from: 0, to: 5, focus: 'CTA 전체', motion: '전체에서 부드럽게 줌인', intent: '마무리 과제를 제시합니다.'},
      {from: 5, to: 12, focus: '오늘 한 가지 업무', motion: '큰 문장으로 팬', intent: '과제를 작게 제한합니다.'},
      {from: 12, to: 20, focus: 'Codex에게 맡기기', motion: '핵심 CTA 문장으로 줌인', intent: '실행 행동을 요청합니다.'},
      {from: 20, to: 27, focus: '파일 열어 검토', motion: '단계 흐름으로 이동 후 전체 복귀', intent: '결과 확인과 재사용으로 닫습니다.'},
    ],
  },
];

export const totalNarrationSeconds = narrations.reduce((sum, item) => sum + item.durationSec, 0);

# 뉴스스탠드 (Newsstand)

데스크톱 퍼스트 한국어 뉴스 포털. 사용자는 6×4 그리드로 언론사를 탐색하고, 구독/해지하며, 언론사를 선택하면 카테고리별 기사 리스트 뷰로 진입한다.

> **스타일링 / 색상 / 폰트 / 컴포넌트 외관** 관련 작업 시 →
> `.claude/design-system.md` 를 반드시 참조할 것.
> "디자인", "스타일", "색상", "폰트", "레이아웃", "CSS" 키워드가 포함된 요청은 해당 파일 우선 참조.

---

## 기술 스택

- **React 19** (React Compiler 활성화)
- **TypeScript**
- **Vite 8**
- **Tailwind CSS v4**
- **shadcn/ui**
- **pnpm**

## 개발 커맨드

```bash
pnpm dev      # 개발 서버 시작
pnpm build    # 타입 체크 + 빌드
pnpm preview  # 빌드 결과 미리보기
```

## 초기 세팅 (최초 1회)

1. Tailwind CSS v4 + Vite 플러그인 설치
2. shadcn/ui 설치 및 초기화
3. Google Fonts: Pretendard, IBM Plex Mono, Noto Serif KR 로드
4. CSS 변수 정의 (`.claude/design-system.md` 컬러 토큰 참조)

---

## 기능 명세

### 1. 뉴스 헤드라인 티커 (Ticker)

항상 콘텐츠 컬럼 상단에 표시. 그리드 뷰와 리스트 뷰 모두에서 사라지지 않으며 닫을 수 없다.

- 동일한 너비의 **두 레인** 나란히 배치
- 각 레인은 동시에 **3.2초**마다 다음 헤드라인으로 교체 (무한 반복)
- hover 또는 focus 시 자동 전환 **일시정지**
- `prefers-reduced-motion` 설정 시 애니메이션 **전체 비활성화**

### 2. 그리드 보기 (Grid View)

페이지 진입 직후 기본 상태. 전체 언론사를 6×4 그리드로 탐색한다.

#### 탭 전환 — 전체 / 구독

| 탭 | 내용 |
|----|------|
| **전체 언론사** | 72개 언론사 전체, 3페이지 (24개/페이지) |
| **내가 구독한 언론사** | 구독 언론사만 스파스 그리드로 표시, 빈 셀은 흰색 |

탭 바 오른쪽에 구독 수 배지(20×20px)가 "내가 구독한 언론사" 옆에 붙는다. 탭 전환 시 페이지는 0으로 리셋된다.

#### 셀 Hover — 구독하기 / 해지하기

- hover 시 워드마크가 숨겨지고 중앙에 pill 버튼 출현
- **전체 언론사 탭**: `+ 구독하기` pill → 클릭 시 구독 추가, 배지 카운트 +1
- **내가 구독한 언론사 탭**: `− 해지하기` pill → 클릭 시 구독 제거, 배지 카운트 -1
- 키보드 focus(`:focus-within`)에서도 동일하게 pill 출현 (마우스 전용 금지)

#### 화살표 버튼으로 페이지 넘기기

- 콘텐츠 컬럼 **바깥** 좌우에 Chevron 버튼 배치
- **전체 언론사**: 최대 3페이지 (72개 ÷ 24개)
- **내가 구독한 언론사**: 구독 수에 따라 페이지 수 동적 결정 (페이지당 최대 24개)
- 첫 페이지: 왼쪽 chevron `opacity: 0` (레이아웃 유지, 시각 제거)
- 마지막 페이지: 오른쪽 chevron `opacity: 0`

#### 뷰 토글 (리스트 ↔ 그리드)

탭 바 오른쪽에 리스트 뷰 / 그리드 뷰 아이콘 토글. 상태는 `viewer: "grid" | "list"`로 관리.

### 3. 리스트 보기 (List View)

그리드의 언론사 셀을 클릭하면 진입. 그리드 영역 전체가 기사 리스트 뷰로 교체된다.

#### 구독하기 / 해지하기 (리스트 뷰)

리스트 뷰 헤드 행에도 구독/해지 pill 표시. 그리드 뷰와 동일하게 동작.

#### 카테고리별 뉴스 보기

카테고리 탭(FieldTab) 6개:

1. 종합/경제
2. 방송/통신
3. IT
4. 스포츠/연예
5. 매거진/전문지
6. 지역

탭 클릭 시 해당 카테고리로 즉시 전환. 활성 탭은 프로그레스 바가 채워지는 중임을 나타낸다.

#### 6초마다 자동 언론사 전환
6초마다 다음 언론사로 전환한다. 만약 하나의 카테고리 안에 속한 모든 언론사를 다 돌았다면 그 다음 카테고리로 전환한다.

```ts
const INTERVAL = 100   // ms
const DURATION = 6000  // ms
const STEPS = DURATION / INTERVAL  // 60 ticks = 100%

tick():
  progress += 1 / STEPS
  if progress >= 1:
    progress = 0
    currentInTab++
    if currentInTab > tabOutletCount:
      currentInTab = 1
      tabKey = nextCategory(tabKey)
      if all categories exhausted:
        tabKey = firstCategory  // 처음으로 루프
```

---

## 컴포넌트 구조

상태는 `<Newsstand>` 최상위에서 관리한다.

```tsx
<Newsstand>
  <Header date={today} />
  <Ticker items={tickerItems} />
  <TabBar
    activeTab={"all" | "sub"}
    subCount={n}
    viewer={"grid" | "list"}
    onTabChange={...}
    onViewerChange={...}
  />
  {opened
    ? <PressOpen press={activePress} tabKey={cat} />
    : <PressGrid
        items={pageItems}
        subscribedIds={set}
        onSubscribe={...}
        onUnsubscribe={...}
        onOpen={...}
      />
  }
  <Chevron dir="left"  disabled={page === 0}        onClick={...} />
  <Chevron dir="right" disabled={page === lastPage}  onClick={...} />
</Newsstand>
```

### 상태 Shape

```ts
{
  tab: "all" | "sub",        // 활성 메인 탭
  page: number,               // 현재 그리드 페이지 (0-indexed)
  viewer: "grid" | "list",   // 뷰 토글 상태
  opened: pressId | null,     // null = 그리드, pressId = 리스트 뷰
  tabKey: CategoryKey,        // 리스트 뷰 활성 카테고리
  progress: number,           // 0..1, FieldTab 프로그레스
  currentInTab: number,       // 탭 내 현재 언론사 인덱스 (1-indexed)
  subscribed: Set<pressId>,   // 구독 중인 언론사 ID 집합
}
```

### 컴포넌트 파일 목록

| 컴포넌트 | 파일 | 설명 |
|---------|------|------|
| `<Newsstand>` | `src/Newsstand.tsx` | 루트, 전체 상태 관리 |
| `<Header>` | `src/components/Header.tsx` | 로고 + 날짜 |
| `<Ticker>` | `src/components/Ticker.tsx` | 두 레인 자동 롤링 티커 |
| `<TabBar>` | `src/components/TabBar.tsx` | 탭 + 뷰 토글 |
| `<PressGrid>` | `src/components/PressGrid.tsx` | 6×4 그리드 |
| `<GridCell>` | `src/components/GridCell.tsx` | 단일 셀, hover 로직 |
| `<PressWordmark>` | `src/components/PressWordmark.tsx` | 타이포그래픽 워드마크 |
| `<SubscribePill>` | `src/components/SubscribePill.tsx` | 구독/해지 pill |
| `<Chevron>` | `src/components/Chevron.tsx` | 페이지 이동 버튼 |
| `<PressOpen>` | `src/components/PressOpen.tsx` | 리스트 뷰 레이아웃 |
| `<FieldTab>` | `src/components/FieldTab.tsx` | 카테고리 탭 + 프로그레스 |

---

## 데이터

### 언론사 목록 (72개 / 3페이지)

**Page 1 (24개):**
서울경제, 데일리안, 헤럴드경제, SBS Biz, 세계일보, 아시아경제,
이데일리, 朝鮮日報, 아이뉴스24, 파이낸셜뉴스, 스포츠서울, 스포츠동아,
석간문화일보, KBS WORLD, Korea JoongAng Daily, Insight,
법률방송뉴스, 시사저널e., 한국농어촌방송, 조이뉴스24, 에너지경제,
BUSINESS POST, CEO스코어데일리, KNN

**Page 2 (24개):**
The Korea Herald, MBC, 뉴스타파, NewDaily, 국민일보, 일간스포츠,
경향신문, ZDNET Korea, mydaily, MT머니투데이, SBS, OhmyNews,
매일경제, MBN, YTN, 시사위크, Digital Today, dataNews,
한국대학신문, 서울파이낸스, 엑스포츠뉴스, 맥스무비, OBS, 소년한국일보

**Page 3 (24개):** 추가 언론사로 채움

### 티커 샘플 데이터

- 연합뉴스 / [속보] 도심 공원 '조용한 독서존' 시범 운영… 시민 호응…
- 한국경제 / 중소기업 ESG 전담 인력 채용 확대… 지속 가능성 주목

---

## 접근성

| 요소 | 요건 |
|------|------|
| 탭 바 | `role="tablist"`, 각 탭 `role="tab"`, 활성 탭 `aria-selected="true"` |
| Chevron | `<button>`, `aria-label="이전 페이지"` / `"다음 페이지"`, 마지막 페이지면 `disabled` |
| 구독 수 배지 | `aria-label="구독 중인 언론사 N곳"` |
| 구독 pill | `:focus-within` 셀에서도 표시 (마우스 전용 금지) |
| 티커 | hover/focus 시 일시정지, `prefers-reduced-motion` → 전체 비활성화 |

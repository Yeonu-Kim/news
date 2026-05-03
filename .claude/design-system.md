# 뉴스스탠드 — 디자인 시스템

색상, 타이포그래피, 스페이싱, 컴포넌트 스펙 등 모든 시각 규칙을 정의한다.
**스타일링, 색상, 폰트, 레이아웃, 컴포넌트 외관** 작업 시 이 파일을 참조한다.

---

## 디자인 원칙 (위반 금지)

1. **그라디언트, 글로우 없음** — `#D2DAE0` hairline 테두리가 모든 시각 구분을 담당
2. **타입이 브랜드** — 언론사 로고는 이미지가 아닌 타이포그래픽 워드마크
3. **강조색 하나** — `#7890E7`은 구독 수 배지와 활성 FieldTab 배경에만 사용. 절대 그 외에 쓰지 말 것
4. **촘촘하고 차분하게** — 16px body, 12px meta, 타이트한 line-height (1.15–1.5)
5. **1px 선만** — 선 두께나 색상 변경 금지
6. **그림자는 구독 pill 하나** — `0 1px 2px rgba(20,33,43,0.04)` 외에 그림자 없음

---

## 컬러 토큰

`:root`에 CSS 변수로 정의하고 Tailwind config에 추가.

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--ink` | `#14212B` | 본문 텍스트, 굵은 레이블, 그리드 선 |
| `--ink-alt` | `#14202B` | `--ink`와 동일 역할, 혼용 가능 |
| `--sub` | `#5F6E76` | 보조 텍스트 (날짜, 캡션, 구독 라인) |
| `--mute` | `#879298` | 비활성 탭 레이블, 빈 chevron |
| `--line` | `#D2DAE0` | 1px 구분선, 카드 테두리, 그리드 선 |
| `--soft` | `#F5F7F9` | 티커 배경, FieldTab 배경, 셀 hover 배경 |
| `--soft-alt` | `#F7F7FC` | 예비 보조 서피스 |
| `--card` | `#FFFFFF` | 그리드 셀, 리스트 뷰 본문, 구독 pill |
| `--page` | `#FEFEFE` | 페이지 배경 |
| `--accent` | `#7890E7` | 구독 수 배지, 활성 탭 배경 |
| `--accent-deep` | `#4362D0` | 활성 탭 내부 프로그레스 바 |
| `--badge-ink` | `rgba(255,255,255,0.7)` | accent 서피스 위 숫자 텍스트 |
| `--danger` | `#FFD1CF` | 파괴적 상태용 예비 (현재 미사용) |

---

## 타이포그래피

### 폰트 패밀리

```css
/* 기본 */
font-family: 'Pretendard Variable', 'Pretendard', 'Noto Sans KR', sans-serif;

/* 숫자 전용 — 탭 카운터 "1 / 81"에만 사용 */
font-family: 'IBM Plex Mono', monospace;

/* 세리프 강조 — 朝鮮日報, Korea JoongAng Daily, Insight 등 */
font-family: 'Noto Serif KR', serif;
```

### 타입 스케일

| 토큰 | 크기 / 굵기 / 행간 | 사용처 |
|------|-------------------|--------|
| `display` | 24px / 700 / 100% | "뉴스스탠드" 헤더 워드마크 |
| `heading` | 16px / 700 / 100% | 활성 탭 레이블, 기사 헤드라인 |
| `body` | 16px / 500 / 22px | 비활성 탭 레이블, 날짜, 구독 레이블 |
| `list-item` | 14px / 500 / 1.5 | 기사 리스트 행 |
| `caption` | 12px / 500 / 1 | 편집 시각, 각주, 구독 pill |
| `badge` | 12px / 500 / 1 | 배지 카운트, 구독 pill |
| `mono-tab` | 12px / 500 / 1 | 탭 카운터 "1 / 81" (IBM Plex Mono) |
| `mono-label` | 10px / 500 / 1 | 페이지 레이블 / 워터마크 |

### 자간 (Letter Spacing)

```css
/* 한국어 body */    letter-spacing: -0.01em;
/* 한국어 display */ letter-spacing: -0.02em;
/* Latin */          letter-spacing: 0;
/* 朝鮮日報 override */ letter-spacing: 0.08em;
```

---

## 스페이싱

기본 단위: **8px**. 허용 값: `4, 8, 12, 16, 24, 32, 40, 48, 64px`

---

## 캔버스 레이아웃 (1280 × 720)

| 영역 | Y 좌표 | 높이 |
|------|--------|------|
| 좌/우 거터 | — | 각 175px |
| 헤더 | 58px | 29px |
| 티커 | 127px | 49px |
| 탭 바 | 208px | 24px |
| 콘텐츠 | 256px | 388px |
| Chevron | 430px | 40px (너비 24px) |
| 콘텐츠 너비 | — | 930px (1280 − 175 − 175) |
| Chevron 위치 | — | 왼쪽 103px / 오른쪽 1153px |

---

## 반경 (Radii)

| 토큰 | 값 | 사용처 |
|------|-----|--------|
| `r-0` | 0px | 그리드 셀, 티커 카드, 리스트 뷰 프레임 |
| `r-sub` | 2px | 언론사 로고 배경 칩 (KBS WORLD 등) |
| `r-pill` | 14px | 구독/해지 pill (높이 28px) |
| `r-badge` | 10px | 구독 수 배지 (20 × 20px) |

---

## 선(Stroke)과 그림자(Shadow)

- **선**: 항상 `1px solid #D2DAE0`. 다른 두께, 다른 색상 일체 금지
- **그림자**: 구독 pill 하나에만 `box-shadow: 0 1px 2px rgba(20,33,43,0.04)`. 그 외 없음

---

## 컴포넌트 스타일 스펙

### Header

```
왼쪽: 신문 아이콘 (24×24, stroke #14212B) + "뉴스스탠드" 24px/700
오른쪽: 날짜 "2026. 01. 14. 수요일" 16px/500, color: --sub
레이아웃: flex space-between, height: 29px
```

### Ticker

```
height: 49px
background: #F5F7F9
padding: 0 24px
두 레인, gap: 8px
각 레인 구성: [언론사명 14px/700 ink, width: 56px 고정] [헤드라인 14px/500 ink, overflow ellipsis, flex: 1]
```

### TabBar

```
flex row, justify-content: space-between, height: 24px

왼쪽 클러스터 (gap: 24px):
  탭 레이블 — 활성: 16px/700 ink  |  비활성: 16px/500 mute
  배지 — width: 20px, height: 20px, border-radius: 10px
          background: #7890E7, color: rgba(255,255,255,0.7), font: 12px/500

오른쪽 클러스터 (gap: 8px):
  뷰 토글 아이콘 24×24 — 활성: ink (#14212B) | 비활성: mute (#879298)
```

### PressGrid

```
width: 930px, height: 388px
background: #D2DAE0  /* gap을 통해 hairline 구분선으로 노출 */
border: 1px solid #D2DAE0
display: grid
grid-template-columns: repeat(6, 1fr)
grid-template-rows: repeat(4, 1fr)
gap: 1px
각 셀: background: #FFFFFF, display: flex, align/justify: center, 약 154 × 96px
```

### GridCell — Hover / Focus 상태

```css
/* 기본 */
background: #FFFFFF;

/* hover 또는 :focus-within */
background: #F5F7F9;
/* 워드마크 숨김, SubscribePill 표시 */
```

### PressWordmark Props

```ts
interface PressWordmarkProps {
  name: string
  color: string           // 텍스트 색상 hex
  bg?: string             // 칩 배경 hex (KBS WORLD, 이데일리 등)
  weight: 400 | 500 | 700
  family: 'sans' | 'serif'
  italic?: boolean
  underline?: boolean
  tracking?: string       // CSS letter-spacing 값, 예: '0.08em'
  accent?: string         // 강조 문자 색상 hex
  accentChar?: number     // accent 색상 적용할 문자 인덱스
  accentUnder?: number[]  // accent 색 밑줄 적용할 인덱스 배열
  accentBg?: boolean      // 강조 문자를 색상 대신 배경 칩으로
  flag?: boolean          // 빨간 깃발 글리프 추가 (아시아경제)
  latin?: boolean         // 한국어 -0.01em 자간 비활성화
  small?: boolean         // 16px 대신 14px (긴 Latin 이름)
}
```

렌더 규칙:
```css
display: inline-flex;
flex-wrap: wrap;
align-items: center;
justify-content: center;
max-width: 88%;        /* 셀 너비의 88% */
word-break: keep-all;
line-height: 1.15;
```

### SubscribePill

```
height: 28px
padding: 0 12px
border-radius: 14px
background: #FFFFFF
border: 1px solid #D2DAE0
font: 12px/500, color: #5F6E76
앞 아이콘: 10×10px SVG, plus(+) 또는 minus(−), stroke: #5F6E76, stroke-width: 1.3
box-shadow: 0 1px 2px rgba(20,33,43,0.04)
```

### Chevron

```
width: 24px, height: 40px
border: 1.4px solid #879298 (outline 스타일)
border-radius: 0
글리프: 오른쪽 꺽쇠 (›) — 왼쪽 버튼은 CSS scaleX(-1)로 flip
disabled: opacity: 0  /* 공간 유지, 시각적으로만 숨김 */
```

### FieldTab — 카테고리 탭 스트립

```
height: 40px
background: #F5F7F9
border: 1px solid #D2DAE0
각 탭: flex: 1, padding: 0 16px
탭 사이: border-right: 1px solid #D2DAE0

/* 비활성 */
font: 14px/500, color: #5F6E76

/* 활성 */
background: #7890E7;
font: 14px/700, color: #FFFFFF;

/* 활성 탭 프로그레스 오버레이 */
position: absolute;
left: 0; top: 0; bottom: 0;
background: #4362D0;
width: 0% → 100%;          /* 6s linear animation */
z-index: 0;                /* 레이블은 z-index: 1 위에 */

/* 탭 카운터 */
font-family: 'IBM Plex Mono';
font-size: 12px; font-weight: 500;
/* N: opacity 1, "/81": opacity 0.7 */
```

### PressOpen — 리스트 뷰 본문

```
width: 930px, height: 388px
background: #FFFFFF
border: 1px solid #D2DAE0
border-top: none          /* FieldTab이 상단 담당 */
padding: 24px 32px

/* 헤드 행 */
display: flex; gap: 16px; align-items: center;
  PressWordmark: transform: scale(1.05)
  편집 시각: 12px/500, color: --sub, font-variant-numeric: tabular-nums
  SubscribePill

/* 본문 */
display: flex; gap: 24px; margin-top: 4px;

  /* 왼쪽 (340px) */
  이미지 박스:
    width: ~340px, height: ~188px
    background: linear-gradient(135deg, #EFF1F6, #DDE3EC)
    border: 1px solid #D2DAE0
    display: flex; align/justify: center
  헤드라인: 16px/700, color: --ink, line-height: 1.45

  /* 오른쪽 (flex: 1) */
  기사 목록:
    font: 14px/500, color: --ink, line-height: 1.5
    불릿: 3×3px square, background: #14212B, transform: translateY(-4px)
  각주 (margin-top: auto):
    font: 12px/500, color: --mute
    내용: "{언론사명} 언론사에서 직접 편집한 뉴스입니다."
```

### 이미지 플레이스홀더

```css
background: linear-gradient(135deg, #EFF1F6, #DDE3EC);
border: 1px solid #D2DAE0;
```

import type { CategoryKey } from '../../../data/presses'

export const CATEGORIES: CategoryKey[] = [
  '종합/경제',
  '방송/통신',
  'IT',
  '스포츠/연예',
  '매거진/전문지',
  '지역',
]

interface FieldTabProps {
  activeCategory: CategoryKey
  progress: number
  currentInTab: number   // 0-indexed press position within active category
  tabOutletCount: number // total presses in active category
  onCategoryChange: (cat: CategoryKey) => void
}

export default function FieldTab({
  activeCategory,
  progress,
  currentInTab,
  tabOutletCount,
  onCategoryChange,
}: FieldTabProps) {
  return (
    <div
      role="tablist"
      style={{
        display: 'flex',
        height: 40,
        background: '#F5F7F9',
        border: '1px solid #D2DAE0',
      }}
    >
      {CATEGORIES.map((cat, i) => {
        const isActive = cat === activeCategory
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            onClick={() => onCategoryChange(cat)}
            style={{
              flex: 1,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 12px',
              border: 'none',
              borderRight: i < CATEGORIES.length - 1 ? '1px solid #D2DAE0' : 'none',
              background: isActive ? '#7890E7' : 'transparent',
              cursor: 'pointer',
              overflow: 'hidden',
            }}
          >
            {/* Progress overlay */}
            {isActive && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#4362D0',
                  width: `${progress * 100}%`,
                  zIndex: 0,
                }}
              />
            )}

            {/* Label */}
            <span
              style={{
                position: 'relative',
                zIndex: 1,
                fontSize: 14,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#FFFFFF' : '#5F6E76',
                letterSpacing: '-0.01em',
                fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
                whiteSpace: 'nowrap',
              }}
            >
              {cat}
            </span>

            {/* Counter: "N / M" — current press / total presses in this category */}
            {isActive && (
              <span
                style={{
                  position: 'relative',
                  zIndex: 1,
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 12,
                  fontWeight: 500,
                  color: '#FFFFFF',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                <span style={{ opacity: 1 }}>{tabOutletCount === 0 ? 0 : currentInTab + 1}</span>
                <span style={{ opacity: 0.7 }}> / {tabOutletCount}</span>
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

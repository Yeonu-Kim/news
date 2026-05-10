import type { CategoryKey } from '../../../data/presses'
import { CATEGORIES } from '../../../data/presses'

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
    <div role="tablist" className="flex h-10 bg-soft border border-line">
      {CATEGORIES.map((cat, i) => {
        const isActive = cat === activeCategory
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            onClick={() => onCategoryChange(cat)}
            className={[
              'flex-1 relative flex items-center justify-between px-3 cursor-pointer overflow-hidden',
              i < CATEGORIES.length - 1 ? 'border-r border-line' : '',
              isActive ? 'bg-accent' : 'bg-transparent',
            ].join(' ').trim()}
          >
            {/* Progress overlay */}
            {isActive && (
              <div
                className="absolute inset-0 bg-accent-deep z-0"
                style={{ width: `${progress * 100}%` }}
              />
            )}

            {/* Label */}
            <span
              className={`relative z-[1] text-[14px] tracking-[-0.01em] whitespace-nowrap ${isActive ? 'font-bold text-white' : 'font-medium text-sub'}`}
            >
              {cat}
            </span>

            {/* Counter: "N / M" — current press / total presses in this category */}
            {isActive && (
              <span
                className="relative z-[1] text-xs font-medium text-white whitespace-nowrap shrink-0"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                <span>{tabOutletCount === 0 ? 0 : currentInTab + 1}</span>
                <span className="opacity-70"> / {tabOutletCount}</span>
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

import { ASSET_URL } from "../../../data/asset"

const GridIcon = ({ active }: { active: boolean }) => {
  return (
  <svg width="24" height="24" style={{ color: active ? 'var(--ink)' : 'var(--mute)' }}>
    <use href={ASSET_URL.GRID_ICON} />
  </svg>
  )
}

const ListIcon = ({ active }: { active: boolean }) => {
  return (
    <svg width="24" height="24" style={{ color: active ? 'var(--ink)' : 'var(--mute)' }}>
      <use href={ASSET_URL.LIST_ICON} />
    </svg>
  )
}

const tabBtnBase = 'bg-transparent border-0 cursor-pointer p-0 tracking-[-0.01em] leading-none text-base'

export const TabBar = ({ activeTab, subCount, viewer, onTabChange, onViewerChange }: {
  activeTab: 'ALL' | 'SUB'
  subCount: number
  viewer: 'GRID' | 'LIST'
  onTabChange: (tab: 'ALL' | 'SUB') => void
  onViewerChange: (viewer: 'GRID' | 'LIST') => void
}) => {
  return (
    <div role="tablist" className="flex items-center justify-between h-6">
      {/* Left: tabs */}
      <div className="flex items-center gap-6">
        <button
          role="tab"
          aria-selected={activeTab === 'ALL'}
          onClick={() => onTabChange('ALL')}
          className={`${tabBtnBase} ${activeTab === 'ALL' ? 'font-bold text-[var(--ink)]' : 'font-medium text-[var(--mute)]'}`}
        >
          전체 언론사
        </button>

        <div className="flex items-center gap-1.5">
          <button
            role="tab"
            aria-selected={activeTab === 'SUB'}
            onClick={() => onTabChange('SUB')}
            className={`${tabBtnBase} ${activeTab === 'SUB' ? 'font-bold text-[var(--ink)]' : 'font-medium text-[var(--mute)]'}`}
          >
            내가 구독한 언론사
          </button>
          <div
            aria-label={`구독 중인 언론사 ${subCount}곳`}
            className="w-5 h-5 rounded-full bg-[var(--accent)] flex items-center justify-center text-xs font-medium text-[var(--badge-ink)] shrink-0"
          >
            {subCount}
          </div>
        </div>
      </div>

      {/* Right: view toggle */}
      <div className="flex items-center gap-2">
        <button
          aria-label="리스트 보기"
          aria-pressed={viewer === 'LIST'}
          onClick={() => onViewerChange('LIST')}
          className="bg-transparent border-0 cursor-pointer p-0 flex"
        >
          <ListIcon active={viewer === 'LIST'} />
        </button>
        <button
          aria-label="그리드 보기"
          aria-pressed={viewer === 'GRID'}
          onClick={() => onViewerChange('GRID')}
          className="bg-transparent border-0 cursor-pointer p-0 flex"
        >
          <GridIcon active={viewer === 'GRID'} />
        </button>
      </div>
    </div>
  )
}

import { ASSET_URL } from "../../../data/asset"

const tabBtnBase = 'bg-transparent border-0 cursor-pointer p-0 tracking-[-0.01em] leading-none'

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

export const TabBar = ({ activeTab, subCount, viewer, onTabChange, onViewerChange }: {
  activeTab: 'all' | 'sub'
  subCount: number
  viewer: 'grid' | 'list'
  onTabChange: (tab: 'all' | 'sub') => void
  onViewerChange: (viewer: 'grid' | 'list') => void
}) => {
  return (
    <div role="tablist" className="flex items-center justify-between h-6">
      {/* Left: tabs */}
      <div className="flex items-center gap-6">
        <button
          role="tab"
          aria-selected={activeTab === 'all'}
          onClick={() => onTabChange('all')}
          className={`${tabBtnBase} text-base ${activeTab === 'all' ? 'font-bold text-[var(--ink)]' : 'font-medium text-[var(--mute)]'}`}
        >
          전체 언론사
        </button>

        <div className="flex items-center gap-1.5">
          <button
            role="tab"
            aria-selected={activeTab === 'sub'}
            onClick={() => onTabChange('sub')}
            className={`${tabBtnBase} text-base ${activeTab === 'sub' ? 'font-bold text-[var(--ink)]' : 'font-medium text-[var(--mute)]'}`}
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
          aria-pressed={viewer === 'list'}
          onClick={() => onViewerChange('list')}
          className="bg-transparent border-0 cursor-pointer p-0 flex"
        >
          <ListIcon active={viewer === 'list'} />
        </button>
        <button
          aria-label="그리드 보기"
          aria-pressed={viewer === 'grid'}
          onClick={() => onViewerChange('grid')}
          className="bg-transparent border-0 cursor-pointer p-0 flex"
        >
          <GridIcon active={viewer === 'grid'} />
        </button>
      </div>
    </div>
  )
}

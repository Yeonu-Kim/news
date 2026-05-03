interface TabBarProps {
  activeTab: 'all' | 'sub'
  subCount: number
  viewer: 'grid' | 'list'
  onTabChange: (tab: 'all' | 'sub') => void
  onViewerChange: (viewer: 'grid' | 'list') => void
}

function GridIcon({ active }: { active: boolean }) {
  const color = active ? '#14212B' : '#879298'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="8" stroke={color} strokeWidth="1.3" />
      <rect x="13" y="3" width="8" height="8" stroke={color} strokeWidth="1.3" />
      <rect x="3" y="13" width="8" height="8" stroke={color} strokeWidth="1.3" />
      <rect x="13" y="13" width="8" height="8" stroke={color} strokeWidth="1.3" />
    </svg>
  )
}

function ListIcon({ active }: { active: boolean }) {
  const color = active ? '#14212B' : '#879298'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <line x1="3" y1="7" x2="21" y2="7" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="3" y1="17" x2="21" y2="17" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

const tabBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  letterSpacing: '-0.01em',
  lineHeight: 1,
  fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
}

export default function TabBar({ activeTab, subCount, viewer, onTabChange, onViewerChange }: TabBarProps) {
  return (
    <div role="tablist" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 24 }}>
      {/* Left: tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <button
          role="tab"
          aria-selected={activeTab === 'all'}
          onClick={() => onTabChange('all')}
          style={{
            ...tabBtnStyle,
            fontSize: 16,
            fontWeight: activeTab === 'all' ? 700 : 500,
            color: activeTab === 'all' ? 'var(--ink)' : 'var(--mute)',
          }}
        >
          전체 언론사
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            role="tab"
            aria-selected={activeTab === 'sub'}
            onClick={() => onTabChange('sub')}
            style={{
              ...tabBtnStyle,
              fontSize: 16,
              fontWeight: activeTab === 'sub' ? 700 : 500,
              color: activeTab === 'sub' ? 'var(--ink)' : 'var(--mute)',
            }}
          >
            내가 구독한 언론사
          </button>
          <div
            aria-label={`구독 중인 언론사 ${subCount}곳`}
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              background: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 500,
              color: 'var(--badge-ink)',
              flexShrink: 0,
              fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
            }}
          >
            {subCount}
          </div>
        </div>
      </div>

      {/* Right: view toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          aria-label="리스트 보기"
          aria-pressed={viewer === 'list'}
          onClick={() => onViewerChange('list')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
        >
          <ListIcon active={viewer === 'list'} />
        </button>
        <button
          aria-label="그리드 보기"
          aria-pressed={viewer === 'grid'}
          onClick={() => onViewerChange('grid')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
        >
          <GridIcon active={viewer === 'grid'} />
        </button>
      </div>
    </div>
  )
}

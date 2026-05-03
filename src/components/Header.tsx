interface HeaderProps {
  date: string
}

export default function Header({ date }: HeaderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 29 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14212B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="18" rx="0" />
          <line x1="2" y1="8" x2="22" y2="8" />
          <line x1="2" y1="13" x2="22" y2="13" />
          <line x1="7" y1="8" x2="7" y2="21" />
        </svg>
        <span style={{ fontSize: 24, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
          뉴스스탠드
        </span>
      </div>
      <span style={{ fontSize: 16, fontWeight: 500, color: 'var(--sub)', letterSpacing: '-0.01em' }}>
        {date}
      </span>
    </div>
  )
}

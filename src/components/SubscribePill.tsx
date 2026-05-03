interface SubscribePillProps {
  mode: 'subscribe' | 'unsubscribe'
  onClick: (e: React.MouseEvent) => void
}

function PlusIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#5F6E76" strokeWidth="1.3" strokeLinecap="round">
      <line x1="5" y1="1" x2="5" y2="9" />
      <line x1="1" y1="5" x2="9" y2="5" />
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#5F6E76" strokeWidth="1.3" strokeLinecap="round">
      <line x1="1" y1="5" x2="9" y2="5" />
    </svg>
  )
}

export default function SubscribePill({ mode, onClick }: SubscribePillProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        height: 28,
        padding: '0 12px',
        borderRadius: 14,
        background: '#FFFFFF',
        border: '1px solid #D2DAE0',
        fontSize: 12,
        fontWeight: 500,
        color: '#5F6E76',
        letterSpacing: '-0.01em',
        fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
        boxShadow: '0 1px 2px rgba(20,33,43,0.04)',
        cursor: 'pointer',
        flexShrink: 0,
        whiteSpace: 'nowrap',
      }}
    >
      {mode === 'subscribe' ? <PlusIcon /> : <MinusIcon />}
      {mode === 'subscribe' ? '구독하기' : '해지하기'}
    </button>
  )
}

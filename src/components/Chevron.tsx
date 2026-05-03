interface ChevronProps {
  dir: 'left' | 'right'
  disabled: boolean
  onClick: () => void
}

export default function Chevron({ dir, disabled, onClick }: ChevronProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'left' ? '이전 페이지' : '다음 페이지'}
      style={{
        width: 24,
        height: 40,
        border: '1.4px solid #879298',
        borderRadius: 0,
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0 : 1,
        padding: 0,
        flexShrink: 0,
        transition: 'opacity 150ms',
      }}
    >
      <svg
        width="8"
        height="13"
        viewBox="0 0 8 13"
        fill="none"
        style={{ transform: dir === 'left' ? 'scaleX(-1)' : 'none' }}
      >
        <path d="M1 1L7 6.5L1 12" stroke="#879298" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

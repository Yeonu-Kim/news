import type { PressWordmarkConfig } from '../data/presses'

function Flag() {
  return (
    <svg width="8" height="10" viewBox="0 0 8 10" style={{ marginRight: 3, flexShrink: 0 }}>
      <rect x="0" y="0" width="1.5" height="10" fill="#14212B" />
      <polygon points="1.5,0 8,3.2 1.5,6.4" fill="#E8252A" />
    </svg>
  )
}

export default function PressWordmark({
  name, color, bg, weight, family, italic, tracking,
  accent, accentChar, accentUnder, accentBg, flag, latin, small,
}: PressWordmarkConfig) {
  const fontSize = small ? 14 : 16
  const letterSpacing = tracking ?? (latin ? '0' : '-0.01em')
  const fontFamily = family === 'serif'
    ? "'Noto Serif KR', serif"
    : "'Pretendard Variable', 'Pretendard', 'Noto Sans KR', sans-serif"

  const baseStyle: React.CSSProperties = {
    fontSize,
    fontWeight: weight,
    fontStyle: italic ? 'italic' : 'normal',
    fontFamily,
    color,
    letterSpacing,
    lineHeight: 1.15,
  }

  const wrapperStyle: React.CSSProperties = {
    display: 'inline-flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '88%',
    textAlign: 'center',
    wordBreak: 'keep-all',
    ...baseStyle,
  }

  if (bg) {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', maxWidth: '88%' }}>
        {flag && <Flag />}
        <span style={{ ...baseStyle, background: bg, padding: '3px 8px', borderRadius: 2 }}>{name}</span>
      </div>
    )
  }

  const chars = [...name]
  const needsSplit = accentChar !== undefined || (accentUnder?.length ?? 0) > 0

  return (
    <div style={wrapperStyle}>
      {flag && <Flag />}
      {needsSplit
        ? chars.map((ch, i) => {
            const isAccent = i === accentChar
            const hasUnder = accentUnder?.includes(i)
            return (
              <span
                key={i}
                style={{
                  color: isAccent && !accentBg ? (accent ?? color) : color,
                  textDecoration: hasUnder ? 'underline' : undefined,
                  textDecorationColor: hasUnder && accent ? accent : undefined,
                  ...(isAccent && accentBg && accent
                    ? { background: accent, padding: '0 2px', borderRadius: 2 }
                    : {}),
                }}
              >
                {ch}
              </span>
            )
          })
        : name}
    </div>
  )
}

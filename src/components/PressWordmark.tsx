import type { PressWordmarkConfig } from '../data/presses'
import { ASSET_URL } from '../data/asset'

function Flag() {
  return (
    <svg width="8" height="10" className="mr-[3px] shrink-0 text-ink">
      <use href={ASSET_URL.FLAG_ICON} />
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

  if (bg) {
    return (
      <div className="inline-flex items-center justify-center max-w-[88%]">
        {flag && <Flag />}
        <span style={{ ...baseStyle, background: bg }} className="py-[3px] px-2 rounded-[2px]">{name}</span>
      </div>
    )
  }

  const chars = [...name]
  const needsSplit = accentChar !== undefined || (accentUnder?.length ?? 0) > 0

  return (
    <div
      className="inline-flex flex-wrap items-center justify-center max-w-[88%] text-center [word-break:keep-all]"
      style={baseStyle}
    >
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

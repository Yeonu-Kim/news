import { ASSET_URL } from "../../../data/asset"
import { titlePresenterImpl } from "../presenter/title-presenter-impl"

const { formatDate } = titlePresenterImpl();

export const Header = () => {
  const today = formatDate(new Date());
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 29 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="24" height="24">
          <use href={ASSET_URL.NEWSSTAND_ICON} />
        </svg>
        <span style={{ fontSize: 24, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
          뉴스스탠드
        </span>
      </div>
      <span style={{ fontSize: 16, fontWeight: 500, color: 'var(--sub)', letterSpacing: '-0.01em' }}>
        {today}
      </span>
    </div>
  )
}

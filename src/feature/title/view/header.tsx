import { ASSET_URL } from "../../../data/asset"
import { titlePresenterImpl } from "../presenter/title-presenter-impl"

const { formatDate } = titlePresenterImpl();

export const Header = () => {
  const today = formatDate(new Date());
  return (
    <div className="flex items-center justify-between h-[29px]">
      <div className="flex items-center gap-2">
        <svg width="24" height="24">
          <use href={ASSET_URL.NEWSSTAND_ICON} />
        </svg>
        <span className="text-2xl font-bold leading-none tracking-[-0.02em] text-ink">
          뉴스스탠드
        </span>
      </div>
      <span className="text-base font-medium text-sub tracking-[-0.01em]">
        {today}
      </span>
    </div>
  )
}

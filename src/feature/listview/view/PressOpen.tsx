import type { Press, CategoryKey } from '../../../data/presses'
import { getContent } from '../../../data/articles'
import PressWordmark from '../../../components/PressWordmark'
import SubscribePill from '../../../components/SubscribePill'

interface PressOpenProps {
  press: Press
  activeCategory: CategoryKey
  isSubscribed: boolean
  onSubscribe: (id: number) => void
  onUnsubscribe: (id: number) => void
}

function BulletSquare() {
  return (
    <span className="inline-block w-[3px] h-[3px] bg-ink shrink-0 mr-2 -translate-y-px self-center" />
  )
}

export default function PressOpen({
  press,
  activeCategory,
  isSubscribed,
  onSubscribe,
  onUnsubscribe,
}: PressOpenProps) {
  const { editedAt, featuredTitle, articles } = getContent(press.id, activeCategory)

  return (
    <div className="w-[930px] flex-1 bg-card border border-line border-t-0 pt-5 px-8 pb-6 flex flex-col overflow-hidden box-border">
      {/* Head row */}
      <div className="flex items-center gap-4">
        <div className="scale-[1.05] origin-left">
          <PressWordmark {...press.wordmark} />
        </div>
        <span className="text-xs font-medium text-sub tracking-[-0.01em] [font-variant-numeric:tabular-nums] shrink-0">
          {editedAt}
        </span>
        <SubscribePill
          mode={isSubscribed ? 'unsubscribe' : 'subscribe'}
          onClick={() => isSubscribed ? onUnsubscribe(press.id) : onSubscribe(press.id)}
        />
      </div>

      {/* Body */}
      <div className="flex gap-6 mt-4 flex-1 overflow-hidden">
        {/* Left column */}
        <div className="flex flex-col gap-3 shrink-0 w-[340px]">
          {/* Image placeholder */}
          <div className="w-[340px] h-[188px] bg-[linear-gradient(135deg,#EFF1F6,#DDE3EC)] border border-line shrink-0 box-border" />
          {/* Featured headline */}
          <p className="m-0 text-base font-bold text-ink leading-[1.45] tracking-[-0.01em] line-clamp-3">
            {featuredTitle}
          </p>
        </div>

        {/* Right column */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Article list */}
          <ul className="m-0 p-0 list-none flex flex-col gap-[14px] flex-1">
            {articles.map((title, i) => (
              <li key={i} className="flex items-start cursor-pointer">
                <BulletSquare />
                <span className="text-sm font-medium text-ink leading-[1.5] tracking-[-0.01em] line-clamp-2">
                  {title}
                </span>
              </li>
            ))}
          </ul>

          {/* Footnote */}
          <p className="m-0 mt-auto pt-3 text-xs font-medium text-mute tracking-[-0.01em]">
            {press.name} 언론사에서 직접 편집한 뉴스입니다.
          </p>
        </div>
      </div>
    </div>
  )
}

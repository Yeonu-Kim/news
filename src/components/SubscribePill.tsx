import { ASSET_URL } from '../data/asset'

interface SubscribePillProps {
  mode: 'subscribe' | 'unsubscribe'
  onClick: (e: React.MouseEvent) => void
}

export default function SubscribePill({ mode, onClick }: SubscribePillProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 h-7 px-3 rounded-[14px] bg-card border border-line text-xs font-medium text-sub tracking-[-0.01em] shadow-[0_1px_2px_rgba(20,33,43,0.04)] cursor-pointer shrink-0 whitespace-nowrap"
    >
      <svg width="10" height="10" className="text-sub">
        <use href={mode === 'subscribe' ? ASSET_URL.PLUS_ICON : ASSET_URL.MINUS_ICON} />
      </svg>
      {mode === 'subscribe' ? '구독하기' : '해지하기'}
    </button>
  )
}

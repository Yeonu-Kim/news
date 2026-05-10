import { useState } from 'react'
import { PressWordmark } from '../../../components/PressWordmark'
import { SubscribePill } from '../../../components/SubscribePill'
import type { Press } from '../../../data/presses'

export const GridCell = ({ press, isSubscribed, onSubscribe, onUnsubscribe, onOpen }: {
  press: Press
  isSubscribed: boolean
  onSubscribe: (id: number) => void
  onUnsubscribe: (id: number) => void
  onOpen: (id: number) => void
}) => {
  const [active, setActive] = useState(false)

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={press.name}
      className={`relative flex items-center justify-center cursor-pointer outline-none transition-[background] duration-[120ms] ${active ? 'bg-soft' : 'bg-card'}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onClick={() => onOpen(press.id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(press.id) }}
    >
      <div className={`transition-opacity duration-100 ${active ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
        <PressWordmark {...press.wordmark} />
      </div>

      {active && (
        <div className="absolute inset-0 flex items-center justify-center [animation:cell-pill-in_120ms_ease-out_forwards]">
          <SubscribePill
            mode={isSubscribed ? 'unsubscribe' : 'subscribe'}
            onClick={(e) => {
              e.stopPropagation()
              if (isSubscribed) onUnsubscribe(press.id)
              else onSubscribe(press.id)
            }}
          />
        </div>
      )}
    </div>
  )
}

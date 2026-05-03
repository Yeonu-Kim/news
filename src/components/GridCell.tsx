import { useState } from 'react'
import PressWordmark from './PressWordmark'
import SubscribePill from './SubscribePill'
import type { Press } from '../data/presses'

interface GridCellProps {
  press: Press
  isSubscribed: boolean
  onSubscribe: (id: number) => void
  onUnsubscribe: (id: number) => void
  onOpen: (id: number) => void
}

export default function GridCell({ press, isSubscribed, onSubscribe, onUnsubscribe, onOpen }: GridCellProps) {
  const [active, setActive] = useState(false)

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={press.name}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: active ? 'var(--soft)' : 'var(--card)',
        cursor: 'pointer',
        outline: 'none',
        transition: 'background 120ms',
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onClick={() => onOpen(press.id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(press.id) }}
    >
      <div style={{ opacity: active ? 0 : 1, transition: 'opacity 100ms', pointerEvents: active ? 'none' : 'auto' }}>
        <PressWordmark {...press.wordmark} />
      </div>

      {active && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'cell-pill-in 120ms ease-out forwards',
          }}
        >
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

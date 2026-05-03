import GridCell from './GridCell'
import type { Press } from '../data/presses'

interface PressGridProps {
  items: (Press | null)[]
  subscribedIds: Set<number>
  onSubscribe: (id: number) => void
  onUnsubscribe: (id: number) => void
  onOpen: (id: number) => void
}

export default function PressGrid({ items, subscribedIds, onSubscribe, onUnsubscribe, onOpen }: PressGridProps) {
  const cells: (Press | null)[] = [...items]
  while (cells.length < 24) cells.push(null)

  return (
    <div
      style={{
        width: 930,
        height: 388,
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gridTemplateRows: 'repeat(4, 1fr)',
        gap: 1,
        background: '#D2DAE0',
        border: '1px solid #D2DAE0',
      }}
    >
      {cells.map((press, i) =>
        press ? (
          <GridCell
            key={press.id}
            press={press}
            isSubscribed={subscribedIds.has(press.id)}
            onSubscribe={onSubscribe}
            onUnsubscribe={onUnsubscribe}
            onOpen={onOpen}
          />
        ) : (
          <div key={`empty-${i}`} style={{ background: '#FFFFFF' }} />
        )
      )}
    </div>
  )
}

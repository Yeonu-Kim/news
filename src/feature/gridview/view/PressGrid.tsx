import GridCell from './GridCell'
import type { Press } from '../../../data/presses'

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
    <div className="w-[930px] h-[388px] grid grid-cols-6 grid-rows-4 gap-px bg-line border border-line">
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
          <div key={`empty-${i}`} className="bg-card" />
        )
      )}
    </div>
  )
}

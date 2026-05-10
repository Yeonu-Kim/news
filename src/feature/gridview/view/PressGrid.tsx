import { GridCell } from './GridCell'
import type { Press } from '../../../data/presses'
import { PRESSES_PER_PAGE } from '../../../data/presses'

export const PressGrid = ({ items, subscribedIds, onSubscribe, onUnsubscribe, onOpen }: {
  items: (Press | null)[]
  subscribedIds: Set<number>
  onSubscribe: (id: number) => void
  onUnsubscribe: (id: number) => void
  onOpen: (id: number) => void
}) => {
  const cells: (Press | null)[] = [...items]
  while (cells.length < PRESSES_PER_PAGE) cells.push(null)

  return (
    <div className="w-[931px] h-[388px] grid grid-cols-6 grid-rows-4 gap-px bg-line border border-line">
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

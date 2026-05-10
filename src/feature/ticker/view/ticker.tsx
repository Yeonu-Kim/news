import { useEffect } from 'react'
import tickerItems from '../../../data/ticker.json'
import type { TickerItem } from '../../../domain/ticker-items'
import { TickerLane } from './tiker-lane'
import { useRollingTicker } from './use-rolling-ticker'
import { checkPreferReducedMotion } from '../../../utils/check-prefer-reduced-motion'

const ROLLING_INTERVAL = 3200

export const Ticker = () => {
  const items: TickerItem[] = tickerItems
  const { lane1Index, lane2Index, paused, handlePause, handleResume, changeTickContent } = useRollingTicker(items);

  const prefersReducedMotion = checkPreferReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const tickInterval = setInterval(changeTickContent, ROLLING_INTERVAL)

    return () => {
      clearInterval(tickInterval)
    }
  }, [changeTickContent, prefersReducedMotion])

  return (
    <>
      <style>{`
        @keyframes ticker-slide-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        className="flex gap-[8px] bg-[var(--soft)]"
        style={{ height: 49 }}
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
        onFocus={handlePause}
        onBlur={handleResume}
        aria-label="뉴스 헤드라인"
        role="region"
      >
        <TickerLane
          items={items.filter((_, i) => i % 2 === 0)}
          currentIndex={lane1Index}
          paused={paused}
        />
        <TickerLane
          items={items.filter((_, i) => i % 2 === 1)}
          currentIndex={lane2Index}
          paused={paused}
        />
      </div>
    </>
  )
}

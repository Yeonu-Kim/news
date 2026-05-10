import { useState, useEffect, useRef } from 'react'
import type { TickerItem } from "../../../domain/ticker-items"
import { checkPreferReducedMotion } from '../../../utils/check-prefer-reduced-motion'

export const TickerLane = ({ items, currentIndex, paused }: {items: TickerItem[],currentIndex: number, paused: boolean}) => {
  const item = items[currentIndex % items.length]
  const [animating, setAnimating] = useState(false)
  const [displayItem, setDisplayItem] = useState(item)
  const [nextItem, setNextItem] = useState<TickerItem | null>(null)
  const prefersReducedMotion = useRef(checkPreferReducedMotion())

  useEffect(() => {
    if (prefersReducedMotion.current) {
      setDisplayItem(item)
      return
    }
    setNextItem(item)
    setAnimating(true)
    const t = setTimeout(() => {
      setDisplayItem(item)
      setNextItem(null)
      setAnimating(false)
    }, 350)
    return () => clearTimeout(t)
  }, [currentIndex])

  void paused

  return (
    <div
      className="flex-1 flex items-center overflow-hidden border border-[var(--line)] bg-[var(--card)] relative"
      style={{ height: '100%' }}
    >
      <div className='relative w-full h-full text-[14px] font-bold text-[var(--ink)] pl-[16px] pr-[8px]'
        style={{
            width: 56 + 16,
            letterSpacing: '-0.01em',
        }}
      >
        {/* 현재 언론사명 */}
        <span
          className="absolute translate-y-[-50%] top-1/2"
          style={{
            opacity: animating && !prefersReducedMotion.current ? 0 : 1,
          }}
        >
          {displayItem.press}
        </span>
        {nextItem && !prefersReducedMotion.current && (
          <span
            className="absolute translate-y-[-50%] top-1/2 transition-opacity duration-200"
            style={{
              animation: 'ticker-slide-in 350ms ease-in-out forwards',
            }}
          >
            {nextItem.press}
          </span>
        )}
      </div>

      {/* 헤드라인 영역 */}
      <div className="flex-1 overflow-hidden relative mr-[16px]" style={{ height: '100%' }}>
        {/* 현재 아이템 */}
        <span
          className="absolute inset-0 flex items-center text-[14px] font-medium text-[var(--ink)] whitespace-nowrap overflow-hidden text-ellipsis"
          style={{
            letterSpacing: '-0.01em',
            opacity: animating && !prefersReducedMotion.current ? 0 : 1,
            transform: animating && !prefersReducedMotion.current ? 'translateY(-8px)' : 'translateY(0)',
          }}
        >
          {displayItem.headline}
        </span>

        {/* 다음 아이템 (fade-in) */}
        {nextItem && !prefersReducedMotion.current && (
          <span
            className="absolute inset-0 flex items-center text-[14px] font-medium text-[var(--ink)] whitespace-nowrap overflow-hidden text-ellipsis"
            style={{
              letterSpacing: '-0.01em',
              animation: 'ticker-slide-in 350ms ease-in-out forwards',
            }}
          >
            {nextItem.headline}
          </span>
        )}
      </div>
    </div>
  )
}
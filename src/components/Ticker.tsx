import { useState, useEffect, useRef, useCallback } from 'react'

interface TickerItem {
  id: number
  press: string
  headline: string
}

interface TickerLaneProps {
  items: TickerItem[]
  currentIndex: number
  paused: boolean
}

const INTERVAL = 3200

function TickerLane({ items, currentIndex, paused }: TickerLaneProps) {
  const item = items[currentIndex % items.length]
  const [animating, setAnimating] = useState(false)
  const [displayItem, setDisplayItem] = useState(item)
  const [nextItem, setNextItem] = useState<TickerItem | null>(null)
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )

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

interface TickerProps {
  items: TickerItem[]
}

export default function Ticker({ items }: TickerProps) {
  const [lane1Index, setLane1Index] = useState(0)
  const [lane2Index, setLane2Index] = useState(1)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const changeTickContent = useCallback(() => {
    if (!pausedRef.current) {
      setLane1Index((i) => (i + 2) % items.length)
      setLane2Index((i) => (i + 2) % items.length)
    }
  }, [items.length])

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const tickInterval = setInterval(changeTickContent, INTERVAL)

    return () => {
      clearInterval(tickInterval)
    }
  }, [changeTickContent,prefersReducedMotion])

  const handlePause = () => {
    pausedRef.current = true
    setPaused(true)
  }
  const handleResume = () => {
    pausedRef.current = false
    setPaused(false)
  }

  return (
    <>
      <style>{`
        @keyframes ticker-slide-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        className="flex gap-[8px] px-[24px] bg-[var(--soft)]"
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

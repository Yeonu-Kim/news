import { useState, useRef, useCallback } from 'react'
import type { TickerItem } from '../../../domain/ticker-items'

export const useRollingTicker = (items: TickerItem[]) => {
  const [lane1Index, setLane1Index] = useState(0)
  const [lane2Index, setLane2Index] = useState(1)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)


  const changeTickContent = useCallback(() => {
    if (!pausedRef.current) {
      setLane1Index((i) => (i + 2) % items.length)
      setLane2Index((i) => (i + 2) % items.length)
    }
  }, [items.length])

  const handlePause = () => {
    pausedRef.current = true
    setPaused(true)
  }

  const handleResume = () => {
    pausedRef.current = false
    setPaused(false)
  }

  return {
    lane1Index,
    lane2Index,
    paused,
    handlePause,
    handleResume,
    changeTickContent
  }
}
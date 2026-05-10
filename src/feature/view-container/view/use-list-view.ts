import { useState, useRef, useEffect } from 'react'
import { CATEGORIES } from '../../../data/presses'
import { ListViewPresenterImpl } from '../../listview/presenter/listview-presenter-impl'
import type { Press, CategoryKey } from '../../../data/presses'

const TICK_MS = 100
const STEPS = 6000 / TICK_MS

export const useListView = (listSource: Press[], viewer: 'GRID' | 'LIST') => {
  const { buildCatMap } = ListViewPresenterImpl()
  const [tabKey, setTabKey] = useState<CategoryKey>('종합/경제')
  // 현재 카테고리 안에서 보고 있는 언론사의 인덱스
  const [currentInTab, setCurrentInTab] = useState(0)
  // 자동 넘김을 위한 progress 상태 (0~1)
  const [progress, setProgress] = useState(0)

  const progressRef = useRef(0)
  const tabKeyRef = useRef<CategoryKey>('종합/경제')
  tabKeyRef.current = tabKey

  const activeCatMap = buildCatMap(listSource)
  const activeCatMapRef = useRef(activeCatMap)
  activeCatMapRef.current = activeCatMap

  const pressesInTab = activeCatMap[tabKey]
  const safeIdx =
    pressesInTab.length > 0 ? Math.max(0, Math.min(currentInTab, pressesInTab.length - 1)) : 0
  const activePress = pressesInTab[safeIdx] ?? null

  const resetProgress = () => {
    progressRef.current = 0
    setProgress(0)
  }

  const resetPosition = () => {
    setCurrentInTab(0)
    resetProgress()
  }

  const handleCategoryChange = (cat: CategoryKey) => {
    setTabKey(cat)
    tabKeyRef.current = cat
    setCurrentInTab(0)
    resetProgress()
  }

  const jumpToPress = (cat: CategoryKey, idx: number) => {
    setTabKey(cat)
    tabKeyRef.current = cat
    setCurrentInTab(Math.max(0, idx))
    resetProgress()
  }

  const goToPrev = () => {
    setCurrentInTab((i) => Math.max(0, i - 1))
    resetProgress()
  }

  const goToNext = () => {
    setCurrentInTab((i) => Math.min(pressesInTab.length - 1, i + 1))
    resetProgress()
  }

  useEffect(() => {
    progressRef.current = 0
    setProgress(0)

    if (viewer !== 'LIST') return

    const id = setInterval(() => {
      progressRef.current += 1 / STEPS
      if (progressRef.current >= 1) {
        progressRef.current = 0
        const currCat = tabKeyRef.current
        setCurrentInTab((prev) => {
          const count = activeCatMapRef.current[currCat].length
          if (count === 0 || prev + 1 >= count) {
            const next = CATEGORIES[(CATEGORIES.indexOf(currCat) + 1) % CATEGORIES.length]
            tabKeyRef.current = next
            setTabKey(next)
            return 0
          }
          return prev + 1
        })
      }
      setProgress(progressRef.current)
    }, TICK_MS)

    return () => clearInterval(id)
  }, [viewer])

  return {
    tabCategoryKey: tabKey,
    currentInTab,
    progress,
    pressesInTab,
    safeIdx,
    activePress,
    activeCatMap,
    resetPosition,
    handleCategoryChange,
    jumpToPress,
    goToPrev,
    goToNext,
  }
}

import { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import Ticker from './components/Ticker'
import TabBar from './components/TabBar'
import PressGrid from './components/PressGrid'
import PressOpen from './components/PressOpen'
import FieldTab, { CATEGORIES } from './components/FieldTab'
import Chevron from './components/Chevron'
import tickerItems from './data/ticker.json'
import { presses, PRESSES_PER_PAGE } from './data/presses'
import type { CategoryKey } from './data/presses'
import { titlePresenterImpl } from './feature/title/title-presenter-impl'
import { PageViewPresenterImpl } from './feature/pageview/pageview-presenter-impl'

const TICK_MS = 100
const STEPS = 6000 / TICK_MS // 60 ticks = 6s

export default function Newsstand() {
  const { formatDate } = titlePresenterImpl();
  const { buildCatMap } = PageViewPresenterImpl();
  // ── Grid view state ──────────────────────────────────────────
  const [tab, setTab] = useState<'all' | 'sub'>('all')
  const [page, setPage] = useState(0)

  // ── List view state ──────────────────────────────────────────
  const [viewer, setViewer] = useState<'grid' | 'list'>('grid')
  const [tabKey, setTabKey] = useState<CategoryKey>('종합/경제')
  const [currentInTab, setCurrentInTab] = useState(0) // 0-indexed press within category
  const [progress, setProgress] = useState(0)

  // ── Shared state ─────────────────────────────────────────────
  const [subscribed, setSubscribed] = useState<Set<number>>(new Set())

  // Refs for interval (avoid stale closures)
  const progressRef = useRef(0)
  const tabKeyRef = useRef<CategoryKey>('종합/경제')
  tabKeyRef.current = tabKey

  // ── Dynamic category map (respects tab + subscribed) ─────────
  // In 'sub' tab, list view only shows subscribed presses per category
  const listSource = tab === 'sub' ? presses.filter((p) => subscribed.has(p.id)) : presses
  const activeCatMap = buildCatMap(listSource)
  const activeCatMapRef = useRef(activeCatMap)
  activeCatMapRef.current = activeCatMap // sync every render for interval

  // ── Auto-advance timer (list view only) ──────────────────────
  useEffect(() => {
    progressRef.current = 0
    setProgress(0)

    if (viewer !== 'list') return

    const id = setInterval(() => {
      progressRef.current += 1 / STEPS
      if (progressRef.current >= 1) {
        progressRef.current = 0
        const currCat = tabKeyRef.current

        setCurrentInTab((prev) => {
          const count = activeCatMapRef.current[currCat].length
          // Skip empty categories
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

  // ── Derived values ────────────────────────────────────────────
  const pressesInTab = activeCatMap[tabKey]
  const safeIdx = pressesInTab.length > 0 ? Math.max(0, Math.min(currentInTab, pressesInTab.length - 1)) : 0
  const activePress = pressesInTab[safeIdx] ?? null

  // Grid items
  const allItems = tab === 'all' ? presses : presses.filter((p) => subscribed.has(p.id))
  const totalPages = Math.max(1, Math.ceil(allItems.length / PRESSES_PER_PAGE))
  const safePage = Math.min(page, totalPages - 1)
  const pageItems = allItems.slice(safePage * PRESSES_PER_PAGE, (safePage + 1) * PRESSES_PER_PAGE)
  const gridItems =
    tab === 'sub'
      ? [...pageItems, ...Array<null>(Math.max(0, PRESSES_PER_PAGE - pageItems.length)).fill(null)]
      : pageItems

  // ── Handlers ──────────────────────────────────────────────────
  const handleTabChange = (newTab: 'all' | 'sub') => {
    setTab(newTab)
    setPage(0)
    // When switching tabs while in list view, reset to first press of current category
    if (viewer === 'list') {
      setCurrentInTab(0)
      progressRef.current = 0
      setProgress(0)
    }
  }

  const handleSubscribe = (id: number) => setSubscribed((prev) => new Set([...prev, id]))
  const handleUnsubscribe = (id: number) =>
    setSubscribed((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })

  // Grid cell click → jump to that press's position in list view
  const handleOpen = (pressId: number) => {
    const press = presses.find((p) => p.id === pressId)
    if (!press) return
    const cat = press.mainCategory
    // Use activeCatMap so index is correct for the current tab context
    const idx = activeCatMap[cat].findIndex((p) => p.id === pressId)
    setViewer('list')
    setTabKey(cat)
    tabKeyRef.current = cat
    setCurrentInTab(Math.max(0, idx)) // idx is -1 if press not in sub list → go to 0
    progressRef.current = 0
    setProgress(0)
  }

  const handleViewerChange = (newViewer: 'grid' | 'list') => {
    setViewer(newViewer)
  }

  const handleCategoryChange = (cat: CategoryKey) => {
    setTabKey(cat)
    tabKeyRef.current = cat
    setCurrentInTab(0)
    progressRef.current = 0
    setProgress(0)
  }

  // ── Chevron logic (context-aware) ─────────────────────────────
  const leftDisabled = viewer === 'grid' ? safePage === 0 : safeIdx === 0
  const rightDisabled =
    viewer === 'grid'
      ? safePage >= totalPages - 1
      : pressesInTab.length === 0 || safeIdx >= pressesInTab.length - 1

  const handlePrev = () => {
    if (viewer === 'grid') {
      setPage((p) => Math.max(0, p - 1))
    } else {
      setCurrentInTab((i) => Math.max(0, i - 1))
      progressRef.current = 0
      setProgress(0)
    }
  }

  const handleNext = () => {
    if (viewer === 'grid') {
      setPage((p) => Math.min(totalPages - 1, p + 1))
    } else {
      setCurrentInTab((i) => Math.min(pressesInTab.length - 1, i + 1))
      progressRef.current = 0
      setProgress(0)
    }
  }

  // ── Render ────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'var(--page)' }}>
      <div style={{ width: 930, margin: '0 auto', paddingTop: 58 }}>
        <Header date={formatDate(new Date())} />

        <div style={{ marginTop: 40 }}>
          <Ticker items={tickerItems} />
        </div>

        <div style={{ marginTop: 32 }}>
          <TabBar
            activeTab={tab}
            subCount={subscribed.size}
            viewer={viewer}
            onTabChange={handleTabChange}
            onViewerChange={handleViewerChange}
          />
        </div>

        <div style={{ marginTop: 24, position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: -72, transform: 'translateY(-50%)' }}>
            <Chevron dir="left" disabled={leftDisabled} onClick={handlePrev} />
          </div>
          <div style={{ position: 'absolute', top: '50%', right: -72, transform: 'translateY(-50%)' }}>
            <Chevron dir="right" disabled={rightDisabled} onClick={handleNext} />
          </div>

          {viewer === 'list' ? (
            <div style={{ display: 'flex', flexDirection: 'column', height: 388 }}>
              <FieldTab
                activeCategory={tabKey}
                progress={progress}
                currentInTab={safeIdx}
                tabOutletCount={pressesInTab.length}
                onCategoryChange={handleCategoryChange}
              />
              {activePress ? (
                <PressOpen
                  press={activePress}
                  activeCategory={tabKey}
                  isSubscribed={subscribed.has(activePress.id)}
                  onSubscribe={handleSubscribe}
                  onUnsubscribe={handleUnsubscribe}
                />
              ) : (
                <div
                  style={{
                    flex: 1,
                    background: '#FFFFFF',
                    border: '1px solid #D2DAE0',
                    borderTop: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    color: 'var(--mute)',
                    letterSpacing: '-0.01em',
                    fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
                  }}
                >
                  이 카테고리에 구독한 언론사가 없습니다.
                </div>
              )}
            </div>
          ) : (
            <PressGrid
              items={gridItems}
              subscribedIds={subscribed}
              onSubscribe={handleSubscribe}
              onUnsubscribe={handleUnsubscribe}
              onOpen={handleOpen}
            />
          )}
        </div>
      </div>
    </div>
  )
}

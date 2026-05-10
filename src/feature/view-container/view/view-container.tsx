import { Chevron } from "./chevron"
import {TabBar} from "./tab-bar"
import PressGrid from "../../../components/PressGrid"
import PressOpen from "../../../components/PressOpen"

import FieldTab, { CATEGORIES } from '../../../components/FieldTab'
import { presses, PRESSES_PER_PAGE } from '../../../data/presses'
import type { CategoryKey } from '../../../data/presses'
import { useEffect, useRef, useState } from 'react'
import { ListViewPresenterImpl } from "../../listview/presenter/listview-presenter-impl"

const TICK_MS = 100
const STEPS = 6000 / TICK_MS

export const ViewContainer = () => {
      const { buildCatMap } = ListViewPresenterImpl();
      const [tab, setTab] = useState<'ALL' | 'SUB'>('ALL')
  const [page, setPage] = useState(0)

  // ── List view state ──────────────────────────────────────────
  const [viewer, setViewer] = useState<'GRID' | 'LIST'>('GRID')
  const [tabKey, setTabKey] = useState<CategoryKey>('종합/경제')
  const [currentInTab, setCurrentInTab] = useState(0) // 0-indexed press within category


  // ── Shared state ─────────────────────────────────────────────
  const [subscribed, setSubscribed] = useState<Set<number>>(new Set())

  // Refs for interval (avoid stale closures)
  const progressRef = useRef(0)
  const tabKeyRef = useRef<CategoryKey>('종합/경제')
  tabKeyRef.current = tabKey

  // ── Dynamic category map (respects tab + subscribed) ─────────
  // In 'SUB' tab, list view only shows subscribed presses per category
  const listSource = tab === 'SUB' ? presses.filter((p) => subscribed.has(p.id)) : presses
  const activeCatMap = buildCatMap(listSource)
  const activeCatMapRef = useRef(activeCatMap)
  activeCatMapRef.current = activeCatMap // sync every render for interval

  // ── Auto-advance timer (list view only) ──────────────────────


  // ── Derived values ────────────────────────────────────────────
  const pressesInTab = activeCatMap[tabKey]
  const safeIdx = pressesInTab.length > 0 ? Math.max(0, Math.min(currentInTab, pressesInTab.length - 1)) : 0


  // Grid items
  const allItems = tab === 'ALL' ? presses : presses.filter((p) => subscribed.has(p.id))
  const totalPages = Math.max(1, Math.ceil(allItems.length / PRESSES_PER_PAGE))
  const safePage = Math.min(page, totalPages - 1)
  const pageItems = allItems.slice(safePage * PRESSES_PER_PAGE, (safePage + 1) * PRESSES_PER_PAGE)
      const [progress, setProgress] = useState(0)

        const activePress = pressesInTab[safeIdx] ?? null

          const gridItems =
    tab === 'SUB'
      ? [...pageItems, ...Array<null>(Math.max(0, PRESSES_PER_PAGE - pageItems.length)).fill(null)]
      : pageItems


        // ── Handlers ──────────────────────────────────────────────────
        const handleTabChange = (newTab: 'ALL' | 'SUB') => {
          setTab(newTab)
          setPage(0)
          // When switching tabs while in list view, reset to first press of current category
          if (viewer === 'LIST') {
            setCurrentInTab(0)
            progressRef.current = 0
            setProgress(0)
          }
        }
      
      
      
        const handleViewerChange = (newViewer: 'GRID' | 'LIST') => {
          setViewer(newViewer)
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
      setViewer('LIST')
      setTabKey(cat)
      tabKeyRef.current = cat
      setCurrentInTab(Math.max(0, idx)) // idx is -1 if press not in sub list → go to 0
      progressRef.current = 0
      setProgress(0)
    }

      const handleCategoryChange = (cat: CategoryKey) => {
    setTabKey(cat)
    tabKeyRef.current = cat
    setCurrentInTab(0)
    progressRef.current = 0
    setProgress(0)
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

          // ── Chevron logic (context-aware) ─────────────────────────────
          const leftDisabled = viewer === 'GRID' ? safePage === 0 : safeIdx === 0
          const rightDisabled =
            viewer === 'GRID'
              ? safePage >= totalPages - 1
              : pressesInTab.length === 0 || safeIdx >= pressesInTab.length - 1
        
          const handlePrev = () => {
            if (viewer === 'GRID') {
              setPage((p) => Math.max(0, p - 1))
            } else {
              setCurrentInTab((i) => Math.max(0, i - 1))
              progressRef.current = 0
              setProgress(0)
            }
          }
        
          const handleNext = () => {
            if (viewer === 'GRID') {
              setPage((p) => Math.min(totalPages - 1, p + 1))
            } else {
              setCurrentInTab((i) => Math.min(pressesInTab.length - 1, i + 1))
              progressRef.current = 0
              setProgress(0)
            }
          }

    return (
        <>
            <div className="mt-8">
          <TabBar
            activeTab={tab}
            subCount={subscribed.size}
            viewer={viewer}
            onTabChange={handleTabChange}
            onViewerChange={handleViewerChange}
          />
        </div>
    <div className="mt-6 relative">
          <div className="absolute top-1/2 left-[-72px] -translate-y-1/2">
            <Chevron dir="LEFT" disabled={leftDisabled} onClick={handlePrev} />
          </div>
          <div className="absolute top-1/2 right-[-72px] -translate-y-1/2">
            <Chevron dir="RIGHT" disabled={rightDisabled} onClick={handleNext} />
          </div>

          {viewer === 'LIST' ? (
            <div className="flex flex-col h-[388px]">
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
                <div className="flex-1 bg-card border border-line border-t-0 flex items-center justify-center text-sm text-mute tracking-[-0.01em]">
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
        </div></>)
}
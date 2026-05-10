import { useState } from 'react'
import { Chevron } from './chevron'
import { TabBar } from './tab-bar'
import PressGrid from '../../gridview/view/PressGrid'
import { ListViewContainer } from '../../listview/view/list-view'
import { presses } from '../../../data/presses'
import { useTabState } from './use-tab-state'
import { useGridView } from './use-grid-view'
import { useListView } from './use-list-view'

export const ViewContainer = () => {
  const [viewer, setViewer] = useState<'GRID' | 'LIST'>('GRID')

  const { tab, page, setPage, subscribed, changeTab, handleSubscribe, handleUnsubscribe } =
    useTabState()

  const { totalPages, safePage, gridItems } = useGridView(tab, page, subscribed)

  const listSource = tab === 'SUB' ? presses.filter((p) => subscribed.has(p.id)) : presses
  const {
    tabCategoryKey,
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
  } = useListView(listSource, viewer)

  // 핸들러
  const handleTabChange = (newTab: 'ALL' | 'SUB') => {
    changeTab(newTab)
    if (viewer === 'LIST') resetPosition()
  }

  const handleViewerChange = (newViewer: 'GRID' | 'LIST') => setViewer(newViewer)

  const handleOpen = (pressId: number) => {
    const press = presses.find((p) => p.id === pressId)
    if (!press) return
    const cat = press.mainCategory
    const idx = activeCatMap[cat].findIndex((p) => p.id === pressId)
    setViewer('LIST')
    jumpToPress(cat, idx)
  }

  // Chevron disabled 상태 계산
  const leftDisabled = viewer === 'GRID' ? safePage === 0 : safeIdx === 0
  const rightDisabled =
    viewer === 'GRID'
      ? safePage >= totalPages - 1
      : pressesInTab.length === 0 || safeIdx >= pressesInTab.length - 1

  const handlePrev = () => {
    if (viewer === 'GRID') {
      setPage((p) => Math.max(0, p - 1))
    }
    else {
      goToPrev()
    }
  }

  const handleNext = () => {
    if (viewer === 'GRID') {
      setPage((p) => Math.min(totalPages - 1, p + 1))
    }
    else {
      goToNext()
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
          <ListViewContainer
            activePress={activePress}
            tabKey={tabCategoryKey}
            progress={progress}
            safeIdx={safeIdx}
            pressesInTab={pressesInTab}
            handleCategoryChange={handleCategoryChange}
            subscribed={subscribed}
            handleSubscribe={handleSubscribe}
            handleUnsubscribe={handleUnsubscribe}
          />
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
    </>
  )
}

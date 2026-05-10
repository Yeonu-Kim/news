import { FieldTab } from "./FieldTab"
import { PressOpen } from "./PressOpen"
import type { CategoryKey, Press } from "../../../data/presses"

export const ListViewContainer = ({ activePress, tabKey, progress, safeIdx, pressesInTab, handleCategoryChange, subscribed, handleSubscribe, handleUnsubscribe }: {
  activePress: Press | null
  tabKey: CategoryKey
  progress: number
  safeIdx: number
  pressesInTab: Press[]
  handleCategoryChange: (cat: CategoryKey) => void
    subscribed: Set<number>
    handleSubscribe: (pressId: number) => void
    handleUnsubscribe: (pressId: number) => void
}) => {

    return (
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
          )
}
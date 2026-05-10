import { presses } from '../../../data/presses'

const PRESSES_PER_PAGE = 24

export const useGridView = (tab: 'ALL' | 'SUB', page: number, subscribed: Set<number>) => {
  const allItems = tab === 'ALL' ? presses : presses.filter((p) => subscribed.has(p.id))
  const totalPages = Math.max(1, Math.ceil(allItems.length / PRESSES_PER_PAGE))
  // 구독 탭에서 페이지 수가 줄어들 때 현재 페이지가 totalPages보다 커지는 경우 방지
  const safePage = Math.min(page, totalPages - 1)
  const pageItems = allItems.slice(safePage * PRESSES_PER_PAGE, (safePage + 1) * PRESSES_PER_PAGE)
  const gridItems =
    tab === 'SUB'
      ? [...pageItems, ...Array<null>(Math.max(0, PRESSES_PER_PAGE - pageItems.length)).fill(null)]
      : pageItems

  return { totalPages, safePage, gridItems }
}

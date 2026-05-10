import type { Press } from "../data/presses"
import type { CategoryKey } from "../data/presses"

export type PageViewPresenter = {
  buildCatMap: (source: Press[]) => Record<CategoryKey, Press[]>
}
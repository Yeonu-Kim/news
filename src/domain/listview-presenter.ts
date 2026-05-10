import type { Press } from "../data/presses"
import type { CategoryKey } from "../data/presses"

export type ListViewPresenter = {
  buildCatMap: (source: Press[]) => Record<CategoryKey, Press[]>
}
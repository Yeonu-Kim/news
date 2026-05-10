import type { Press } from "../../../data/presses"
import type { CategoryKey } from "../../../data/presses"
import type { PageViewPresenter } from "../../../domain/pageview-presenter"

export const PageViewPresenterImpl = (): PageViewPresenter => ({
    buildCatMap: (source: Press[]) => {
        const map: Record<CategoryKey, Press[]> = {
            '종합/경제': [], '방송/통신': [], IT: [], '스포츠/연예': [], '매거진/전문지': [], 지역: [],
        }
        for (const p of source) map[p.mainCategory].push(p)
        return map
    }
})
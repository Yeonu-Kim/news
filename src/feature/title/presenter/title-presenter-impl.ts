import type { TitlePresenter } from "../../../domain/title-presenter";

export const titlePresenterImpl = (): TitlePresenter => ({
    formatDate: (date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토']
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}. ${m}. ${d}. ${days[date.getDay()]}요일`
    },
})
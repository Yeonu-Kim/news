import { useState } from 'react'

export const useTabState = () => {
  const [tab, setTab] = useState<'ALL' | 'SUB'>('ALL')
  const [page, setPage] = useState(0)
  const [subscribed, setSubscribed] = useState<Set<number>>(new Set())

  const changeTab = (newTab: 'ALL' | 'SUB') => {
    setTab(newTab)
    setPage(0)
  }

  const handleSubscribe = (id: number) =>
    setSubscribed((prev) => new Set([...prev, id]))

  const handleUnsubscribe = (id: number) =>
    setSubscribed((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })

  return { tab, page, setPage, subscribed, changeTab, handleSubscribe, handleUnsubscribe }
}

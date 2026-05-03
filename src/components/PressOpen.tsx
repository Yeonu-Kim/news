import type { Press, CategoryKey } from '../data/presses'
import { getContent } from '../data/articles'
import PressWordmark from './PressWordmark'
import SubscribePill from './SubscribePill'

interface PressOpenProps {
  press: Press
  activeCategory: CategoryKey
  isSubscribed: boolean
  onSubscribe: (id: number) => void
  onUnsubscribe: (id: number) => void
}

function BulletSquare() {
  return (
    <span
      style={{
        display: 'inline-block',
        width: 3,
        height: 3,
        background: '#14212B',
        flexShrink: 0,
        marginRight: 8,
        transform: 'translateY(-1px)',
        alignSelf: 'center',
      }}
    />
  )
}

export default function PressOpen({
  press,
  activeCategory,
  isSubscribed,
  onSubscribe,
  onUnsubscribe,
}: PressOpenProps) {
  const { editedAt, featuredTitle, articles } = getContent(press.id, activeCategory)

  return (
    <div
      style={{
        width: 930,
        flex: 1,
        background: '#FFFFFF',
        border: '1px solid #D2DAE0',
        borderTop: 'none',
        padding: '20px 32px 24px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Head row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ transform: 'scale(1.05)', transformOrigin: 'left center' }}>
          <PressWordmark {...press.wordmark} />
        </div>
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: 'var(--sub)',
            letterSpacing: '-0.01em',
            fontVariantNumeric: 'tabular-nums',
            fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
            flexShrink: 0,
          }}
        >
          {editedAt}
        </span>
        <SubscribePill
          mode={isSubscribed ? 'unsubscribe' : 'subscribe'}
          onClick={() => isSubscribed ? onUnsubscribe(press.id) : onSubscribe(press.id)}
        />
      </div>

      {/* Body */}
      <div style={{ display: 'flex', gap: 24, marginTop: 16, flex: 1, overflow: 'hidden' }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0, width: 340 }}>
          {/* Image placeholder */}
          <div
            style={{
              width: 340,
              height: 188,
              background: 'linear-gradient(135deg, #EFF1F6, #DDE3EC)',
              border: '1px solid #D2DAE0',
              flexShrink: 0,
              boxSizing: 'border-box',
            }}
          />
          {/* Featured headline */}
          <p
            style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 700,
              color: 'var(--ink)',
              lineHeight: 1.45,
              letterSpacing: '-0.01em',
              fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {featuredTitle}
          </p>
        </div>

        {/* Right column */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Article list */}
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              flex: 1,
            }}
          >
            {articles.map((title, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 0,
                  cursor: 'pointer',
                }}
              >
                <BulletSquare />
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'var(--ink)',
                    lineHeight: 1.5,
                    letterSpacing: '-0.01em',
                    fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {title}
                </span>
              </li>
            ))}
          </ul>

          {/* Footnote */}
          <p
            style={{
              margin: 0,
              marginTop: 'auto',
              paddingTop: 12,
              fontSize: 12,
              fontWeight: 500,
              color: 'var(--mute)',
              letterSpacing: '-0.01em',
              fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
            }}
          >
            {press.name} 언론사에서 직접 편집한 뉴스입니다.
          </p>
        </div>
      </div>
    </div>
  )
}

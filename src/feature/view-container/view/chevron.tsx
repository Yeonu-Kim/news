import { ASSET_URL } from "../../../data/asset"

export const Chevron = ({ dir, disabled, onClick }: {
  dir: 'LEFT' | 'RIGHT'
  disabled: boolean
  onClick: () => void
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'LEFT' ? '이전 페이지' : '다음 페이지'}
      className="flex w-6 h-10 items-center justify-center border-[1.4px] border-[#879298] rounded-none bg-transparent p-0 shrink-0 cursor-pointer disabled:cursor-default opacity-100 disabled:opacity-0 transition-opacity duration-150"
    >
      <svg
        width="8"
        height="13"
        className={`text-mute ${dir === 'LEFT' ? 'scale-x-[-1]' : undefined}`}
      >
        <use href={ASSET_URL.CHEVRON_RIGHT_ICON} />
      </svg>
    </button>
  )
}

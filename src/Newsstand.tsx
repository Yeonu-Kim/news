import { Header } from './feature/title/view/header'
import { Ticker } from './feature/ticker/view/ticker'
import { ViewContainer } from './feature/view-container/view/view-container'

export const Newsstand = () => {
  return (
    <div className="min-h-screen bg-page">
      <div className="w-[931px] mx-auto pt-[58px]">
        <Header />

        <div className="mt-10">
          <Ticker />
        </div>



        <ViewContainer />
      </div>
    </div>
  )
}

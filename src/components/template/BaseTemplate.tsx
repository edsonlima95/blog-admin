import Header from "../Header"
import MainCotent from "../MainContent"
import MenuLeft from "../MenuLeft"

type BaseTemplateProps = {
  children: React.ReactNode
}

function BaseTemplate({ children }: BaseTemplateProps) {
  return (
    <div
      className={`grid grid-rows-[minmax(70px,auto)_minmax(100vh,auto)] grid-cols-[250px_1fr]`}>
      <Header />
      <MenuLeft />
      <MainCotent>{children}</MainCotent>
    </div>
  )
}

export default BaseTemplate
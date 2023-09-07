type MainContentProps = {
  children: React.ReactNode
}

function MainCotent({ children }: MainContentProps) {
  return <main className="bg-gray-200 p-5">{children}</main>
}

export default MainCotent

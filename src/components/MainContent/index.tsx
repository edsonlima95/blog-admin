type MainContentProps = {
  children: React.ReactNode
}

function MainCotent({ children }: MainContentProps) {
  return <main className="rounded-md m-5">{children}</main>
}

export default MainCotent

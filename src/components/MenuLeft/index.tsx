import { ListDashes, Newspaper, SignOut, SquaresFour } from "phosphor-react"
import Link from "next/link"

function MenuLeft() {
  return (
    <nav className="bg-white h-screen row-span-full sticky top-0 p-5">
      <h1 className="uppercase text-center text-black font-medium mb-5">
        Dashboard
      </h1>
      <ul>
        <li className="hover:bg-violet-700  hover:rounded-sm">
          <Link
            href="/"
            className="text-zinc-600 px-1 py-1 hover:py-1 hover:text-white flex items-center gap-1 mb-3">
            <SquaresFour size={22} /> Dashboard
          </Link>
        </li>
        <li className="hover:bg-violet-700 hover:rounded-sm">
          <a
            href="/posts"
            className="text-zinc-600  px-1 py-1 hover:py-1 hover:text-white flex items-center gap-1 mb-3">
            <Newspaper size={22} /> Posts
          </a>
        </li>
        <li className="hover:bg-violet-700 hover:rounded-sm">
          <a
            href="/category"
            className="text-zinc-600 px-1 py-1 hover:py-1 hover:text-white flex items-center gap-1 mb-3">
            <ListDashes size={22} /> Categorias
          </a>
        </li>
        <li className="hover:bg-violet-700 hover:rounded-sm">
          <a
            href="#"
            className="text-zinc-600 px-1 py-1 hover:py-1 hover:text-white flex items-center gap-1 mb-3">
            <SignOut size={22} /> Sair
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default MenuLeft

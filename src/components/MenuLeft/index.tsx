//import { ListDashes, Newspaper, SignOut, SquaresFour } from "phosphor-react"
import { Layout, List, LogOut, Newspaper } from "lucide-react"

import Link from "next/link"

function MenuLeft() {
  return (
    <nav className="bg-neutral-800 h-screen row-span-full sticky top-0 p-5 shadow-lg">
      <h1 className="border border-violet-600 p-1 uppercase text-center text-violet-600 font-medium mb-5">
        Dashboard
      </h1>
      <ul>
        <li className="hover:bg-violet-700  hover:rounded-sm">
          <Link
            href="/"
            className="text-zinc-400 px-1 py-1 hover:py-1 hover:text-white flex items-center gap-1 mb-3">
            <Layout size={22} /> Dashboard
          </Link>
        </li>
        <li className="hover:bg-violet-700 hover:rounded-sm">
          <Link
            href="/posts"
            className="text-zinc-400  px-1 py-1 hover:py-1 hover:text-white flex items-center gap-1 mb-3">
            <Newspaper size={22} /> Posts
          </Link>
        </li>
        <li className="hover:bg-violet-700 hover:rounded-sm">
          <Link
            href="/category"
            className="text-zinc-400 px-1 py-1 hover:py-1 hover:text-white flex items-center gap-1 mb-3">
            <List size={22} /> Categorias
          </Link>
        </li>
        <li className="hover:bg-violet-700 hover:rounded-sm">
          <Link
            href="#"
            className="text-zinc-400 px-1 py-1 hover:py-1 hover:text-white flex items-center gap-1 mb-3">
            <LogOut size={22} /> Sair
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default MenuLeft

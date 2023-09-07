"use client"
import Link from "next/link"
import { HouseSimple, List, PlusCircle } from "phosphor-react"

function Breadcrumb({
  pageTitle,
  title,
  currentTitle
}: {
  title: string
  pageTitle: string
  currentTitle: string
}) {
  return (
    <div className="text-sm breadcrumbs mb-8">
      <h2 className="uppercase text-xl font-semibold mb-4 text-zinc-600">
        {pageTitle}
      </h2>
      <ul>
        <li>
          <Link href="/" className="text-zinc-500">
            <HouseSimple size={20} className="mr-2 text-violet-600" />
            Home
          </Link>
        </li>
        <li>
          <Link href="/" className="text-zinc-500">
            <PlusCircle size={20} className="mr-2 text-green-600" />
            {title}
          </Link>
        </li>
        <li>
          <List size={20} className="mr-2 stroke-current" />
          {currentTitle}
        </li>
      </ul>
    </div>
  )
}

export default Breadcrumb

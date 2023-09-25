import { Home, List, PlusCircle, TableProperties } from "lucide-react"
import Link from "next/link"

type BreadcrumbProps = {
  title: "cadastrar" | "listar"
  pageTitle: string
  link: string
  currentTitle: string
}

function Breadcrumb({
  pageTitle,
  title = "cadastrar",
  link,
  currentTitle
}: BreadcrumbProps) {
  return (
    <div className="text-sm breadcrumbs mb-8">
      <h2 className="uppercase text-xl font-semibold mb-4 text-zinc-400">
        {pageTitle}
      </h2>
      <ul>
        <li>
          <Link href={link} className="text-zinc-500">
            <Home size={20} className="mr-2 text-violet-600" />
            Home
          </Link>
        </li>
        <li>
          <Link href={link} className="text-zinc-500">
            {title == "cadastrar" ? (
              <PlusCircle size={20} className="mr-2 text-green-600" />
            ) : (
              <List size={20} className="mr-2 text-green-600" />
            )}
            {title}
          </Link>
        </li>
        <li>
          <TableProperties size={20} className="mr-2 stroke-current" />
          {currentTitle}
        </li>
      </ul>
    </div>
  )
}

export default Breadcrumb

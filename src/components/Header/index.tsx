import { Settings } from "lucide-react"

function Header() {
  return (
    <header className="z-10 bg-white flex justify-end sticky top-0 px-5 pt-5">
      <div className="dropdown dropdown-end">
        <Settings tabIndex={0} className="text-zinc-600" size={26} />
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow text-white bg-violet-700 rounded-lg w-52">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header

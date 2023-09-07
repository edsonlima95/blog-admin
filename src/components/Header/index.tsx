import { Gear } from "phosphor-react"

function Header() {
  return (
    <header className="bg-white flex justify-end sticky top-0 col-start-2 px-5 pt-5">
      <div className="dropdown dropdown-end">
        <Gear tabIndex={0} className="text-zinc-600" size={32} />
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

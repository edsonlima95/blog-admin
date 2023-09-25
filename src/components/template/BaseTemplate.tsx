"use client"
import { ToastContainer } from "react-toastify"
import Header from "../Header"
import MainCotent from "../MainContent"
import MenuLeft from "../MenuLeft"
import "react-toastify/dist/ReactToastify.css"

type BaseTemplateProps = {
  children: React.ReactNode
}

function BaseTemplate({ children }: BaseTemplateProps) {
  return (
    <div
      className={`grid grid-rows-[minmax(70px,auto)_minmax(calc(100vh-70px),auto)] grid-cols-[250px_1fr] text-zinc-500  bg-neutral-900`}>
      <Header />
      <MenuLeft />
      <MainCotent>{children}</MainCotent>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}

export default BaseTemplate

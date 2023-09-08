import "./globals.css"
import { Roboto } from "next/font/google"

const roboto = Roboto({
  weight: ["300", "500", "700", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap"
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={roboto.className} data-theme="light">
      <body className="bg-gray-200">{children}</body>
    </html>
  )
}

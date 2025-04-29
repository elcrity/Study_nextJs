import "../styles/global.css"
import { Metadata } from "next"
import Navigation from "../Component/navigation"

export const metadata :Metadata = {
  title: {
      template : "%s | Next Movies",
      default : "Next Movies"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation/>
        {children}
      </body>
    </html>
  )
}

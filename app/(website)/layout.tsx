import React from "react"
import Navbar from "../components/website/Navbar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div>
        <Navbar></Navbar>
        {children}
    </div>
}

export default Layout

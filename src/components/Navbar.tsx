import React from "react"
import { LogoutButton } from "./LogoutButton"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">Revenue Boost</h1>
          </div>
          <LogoutButton />
        </div>
      </div>
    </nav>
  )
} 
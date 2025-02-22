import React from "react"
import { Button } from "./ui/button"
import { signOut } from "../utils/auth"

export function LogoutButton() {
  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <Button 
      variant="outline" 
      onClick={handleLogout}
    >
      Log Out
    </Button>
  )
} 
import { supabase } from "../integrations/supabase/client"

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error.message)
      throw error
    }
    // You might want to redirect to login page or home page after logout
    window.location.href = '/'
  } catch (error) {
    console.error('Error during sign out:', error)
    throw error
  }
} 
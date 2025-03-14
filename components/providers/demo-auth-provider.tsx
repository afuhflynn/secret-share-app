"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type User = {
  name: string | null
  email: string | null
  image: string | null
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signOut: () => void
  isDevelopment: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signOut: () => {},
  isDevelopment: false,
})

// Function to check if we're in development mode
const isDevelopment = () => {
  if (typeof window !== "undefined") {
    return process.env.NODE_ENV === "development"
  }
  return false
}

export function DemoAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [devMode, setDevMode] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Set development mode
    setDevMode(isDevelopment())

    // Check if user exists in localStorage
    const storedUser = localStorage.getItem("demoUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else if (isDevelopment()) {
      // In development, create a demo user if none exists
      const demoUser = {
        name: "Dev User",
        email: "dev@example.com",
        image: null,
      }
      localStorage.setItem("demoUser", JSON.stringify(demoUser))
      setUser(demoUser)
    }

    setIsLoading(false)
  }, [])

  const signOut = () => {
    localStorage.removeItem("demoUser")
    setUser(null)

    // In development mode, don't redirect
    if (!isDevelopment()) {
      router.push("/login")
    } else {
      // In development, create a new demo user
      const demoUser = {
        name: "Dev User",
        email: "dev@example.com",
        image: null,
      }
      localStorage.setItem("demoUser", JSON.stringify(demoUser))
      setUser(demoUser)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signOut, isDevelopment: devMode }}>{children}</AuthContext.Provider>
  )
}

export const useDemoAuth = () => useContext(AuthContext)


'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  username: string
  email: string
  role: 'super-admin' | 'business-admin' | 'staff-user'
  name: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user database - in production, this would come from your API
const mockUsers = [
  {
    id: '1',
    username: 'superadmin',
    email: 'superadmin@globaldev.com',
    password: 'admin123',
    role: 'super-admin' as const,
    name: 'Super Administrator'
  },
  {
    id: '2',
    username: 'businessowner',
    email: 'owner@company.com',
    password: 'business123',
    role: 'business-admin' as const,
    name: 'Business Owner'
  },
  {
    id: '3',
    username: 'staffuser',
    email: 'staff@company.com',
    password: 'staff123',
    role: 'staff-user' as const,
    name: 'Staff Member'
  }
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem('auth_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    // Find user by username or email
    const foundUser = mockUsers.find(
      u => u.username.toLowerCase() === username.toLowerCase() || 
           u.email.toLowerCase() === username.toLowerCase()
    )

    if (foundUser && foundUser.password === password) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword))
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: 'super-admin' | 'business-admin' | 'staff-user'
}

export default function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !user) {
        // Not logged in, redirect to login
        router.push('/login')
        return
      }

      if (requiredRole && user.role !== requiredRole) {
        // Logged in but wrong role, redirect to correct dashboard
        router.push(`/dashboard/${user.role}`)
        return
      }
    }
  }, [isAuthenticated, user, isLoading, router, requiredRole])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Not authenticated or wrong role (will redirect in useEffect)
  if (!isAuthenticated || !user || (requiredRole && user.role !== requiredRole)) {
    return null
  }

  return <>{children}</>
}

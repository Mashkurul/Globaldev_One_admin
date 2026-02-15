'use client'

import { useState, useEffect } from 'react'
import { Shield, Building, Users, ArrowRight, Check, Menu, X, Globe, BarChart3, Settings, FileText, Car, DollarSign, Calendar, MessageSquare, Eye, LogOut, Bell, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface RoleCard {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  features: string[]
  color: string
  bgColor: string
  borderColor: string
}

export default function HomePage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const { isAuthenticated, user, isLoading } = useAuth()

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      router.push(`/dashboard/${user.role}`)
    }
  }, [isAuthenticated, user, isLoading, router])

  const roles: RoleCard[] = [
    {
      id: 'super-admin',
      title: 'Super Admin',
      subtitle: 'Platform Owner',
      icon: <Shield className="w-8 h-8" />,
      features: [
        'Manage companies, subscriptions, plans, and limits',
        'Monitor system health, usage, and audit logs',
        'Control global settings, feature flags, and compliance rules'
      ],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'business-admin',
      title: 'Business Owner',
      subtitle: 'Company Admin',
      icon: <Building className="w-8 h-8" />,
      features: [
        'Create and manage the company profile and branches',
        'Upload and manage vehicle listings on the marketplace',
        'Set pricing, availability, and rental rules',
        'View bookings, payments, and revenue reports',
        'Approve rentals, deposits, and contracts',
        'Manage incidents, disputes, and legal records'
      ],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'staff-user',
      title: 'Staff User',
      subtitle: 'Operations Team',
      icon: <Users className="w-8 h-8" />,
      features: [
        'Manage assigned vehicles and reservations',
        'Perform check-in / check-out and upload evidence',
        'Communicate with customers',
        'View operational dashboards (limited access)'
      ],
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ]

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId)
  }

  const handleContinue = () => {
    if (selectedRole) {
      router.push('/login')
    }
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <Car className="w-8 h-8 text-blue-600 mr-2" />
                  <span className="text-xl font-bold text-gray-900 dark:text-white">GlobalDev Admin</span>
                </div>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="/features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Features</a>
              <a href="/pricing" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="/support" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Support</a>
              <a href="/documentation" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Documentation</a>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/features" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Features</a>
              <a href="/pricing" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="/support" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Support</a>
              <a href="/documentation" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Documentation</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to Your Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Choose your role to access the right tools and features for your needs. 
            Manage your vehicle rental business with powerful admin capabilities.
          </p>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Select Your Role</h2>
            <p className="text-lg text-gray-600">Choose the role that best describes your position</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`relative bg-white rounded-xl border-2 p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedRole === role.id
                    ? `${role.borderColor} ${role.bgColor} ring-2 ring-offset-2 ring-blue-500`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleRoleSelect(role.id)}
              >
                {selectedRole === role.id && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-blue-600 text-white rounded-full p-1">
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                )}

                <div className={`mb-4 ${role.color}`}>
                  {role.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{role.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{role.subtitle}</p>

                <div className="space-y-3">
                  {role.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full ${role.bgColor} flex items-center justify-center mt-0.5 mr-3`}>
                        <div className={`w-2 h-2 rounded-full ${role.color.replace('text', 'bg')}`}></div>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Continue Button */}
          <div className="mt-12 text-center">
            <button
              onClick={handleContinue}
              disabled={!selectedRole}
              className={`inline-flex items-center px-8 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                selectedRole
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue to Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-lg text-gray-600">Everything you need to manage your vehicle rental business</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-lg p-4 mb-4 inline-block">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Multi-Company Support</h3>
              <p className="text-sm text-gray-600">Manage multiple companies from a single platform</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-lg p-4 mb-4 inline-block">
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Analytics & Reports</h3>
              <p className="text-sm text-gray-600">Comprehensive insights into your business performance</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-lg p-4 mb-4 inline-block">
                <Settings className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Flexible Settings</h3>
              <p className="text-sm text-gray-600">Customize the platform to fit your business needs</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 rounded-lg p-4 mb-4 inline-block">
                <FileText className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Document Management</h3>
              <p className="text-sm text-gray-600">Handle contracts, agreements, and legal documents</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Car className="w-6 h-6 text-blue-400 mr-2" />
                <span className="text-lg font-bold">GlobalDev Admin</span>
              </div>
              <p className="text-gray-400 text-sm">
                Comprehensive admin platform for vehicle rental businesses
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/documentation" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="/support" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="/support" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 GlobalDev Admin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
'use client'

import React, { useState } from 'react'
import { Shield, Building, Users, ArrowRight, Check, Menu, X, Globe, BarChart3, Settings, FileText, Car, DollarSign, Calendar, MessageSquare, Eye, LogOut, Bell, Search, Home, Users2, FileCheck, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface DashboardLayoutProps {
  children: React.ReactNode
  role: string
  title: string
}

export default function DashboardLayout({ children, role, title }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'info',
      title: 'New user registration',
      message: 'John Doe registered 2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Payment received',
      message: 'AutoRent Inc. paid $499 1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'System update',
      message: 'System maintenance scheduled for tonight',
      read: true
    }
  ])
  const router = useRouter()
  const { logout } = useAuth()

  // Close notifications when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const notificationDropdown = document.getElementById('notification-dropdown')
      if (showNotifications && notificationDropdown && !notificationDropdown.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showNotifications])

  const getRoleSpecificMenu = () => {
    switch (role) {
      case 'super-admin':
        return [
          { icon: <Home className="w-5 h-5" />, label: 'Dashboard', href: `/dashboard/${role}` },
          { icon: <Building className="w-5 h-5" />, label: 'Companies', href: `/dashboard/${role}/companies` },
          { icon: <Users className="w-5 h-5" />, label: 'Users', href: `/dashboard/${role}/users` },
          { icon: <DollarSign className="w-5 h-5" />, label: 'Subscriptions', href: `/dashboard/${role}/subscriptions` },
          { icon: <BarChart3 className="w-5 h-5" />, label: 'System Health', href: `/dashboard/${role}/health` },
          { icon: <FileText className="w-5 h-5" />, label: 'Audit Logs', href: `/dashboard/${role}/audit` },
          { icon: <Settings className="w-5 h-5" />, label: 'Global Settings', href: `/dashboard/${role}/settings` },
        ]
      case 'business-admin':
        return [
          { icon: <Home className="w-5 h-5" />, label: 'Dashboard', href: `/dashboard/${role}` },
          { icon: <Building className="w-5 h-5" />, label: 'Company Profile', href: `/dashboard/${role}/profile` },
          { icon: <Car className="w-5 h-5" />, label: 'Vehicle Listings', href: `/dashboard/${role}/vehicles` },
          { icon: <Calendar className="w-5 h-5" />, label: 'Bookings', href: `/dashboard/${role}/bookings` },
          { icon: <DollarSign className="w-5 h-5" />, label: 'Revenue Reports', href: `/dashboard/${role}/revenue` },
          { icon: <FileCheck className="w-5 h-5" />, label: 'Contracts', href: `/dashboard/${role}/contracts` },
          { icon: <FileText className="w-5 h-5" />, label: 'Legal Records', href: `/dashboard/${role}/legal` },
        ]
      case 'staff-user':
        return [
          { icon: <Home className="w-5 h-5" />, label: 'Dashboard', href: `/dashboard/${role}` },
          { icon: <Car className="w-5 h-5" />, label: 'My Vehicles', href: `/dashboard/${role}/vehicles` },
          { icon: <Calendar className="w-5 h-5" />, label: 'Reservations', href: `/dashboard/${role}/reservations` },
          { icon: <MessageSquare className="w-5 h-5" />, label: 'Messages', href: `/dashboard/${role}/messages` },
          { icon: <Eye className="w-5 h-5" />, label: 'Reports', href: `/dashboard/${role}/reports` },
        ]
      default:
        return []
    }
  }

  const menuItems = getRoleSpecificMenu()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
      // In a real app, this would navigate to search results
      // router.push(`/dashboard/${role}/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications)
    console.log('Notifications toggled')
    // In a real app, this would show a notifications dropdown
  }

  const handleDeleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
    console.log('Deleted notification:', id)
  }

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
    console.log('Marked notification as read:', id)
  }

  const handleViewAllNotifications = () => {
    const notificationPath = role === 'super-admin' 
      ? '/dashboard/super-admin/notifications'
      : '/dashboard/business-admin/notifications'
    router.push(notificationPath)
    setShowNotifications(false)
    console.log('Navigating to all notifications')
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center min-w-0">
            <Car className="w-8 h-8 text-blue-600 mr-3 flex-shrink-0" />
            <span className="text-lg font-bold text-gray-900 dark:text-white truncate">GlobalDev Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 bg-white dark:bg-gray-800 overflow-y-auto">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="group flex items-center px-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-100 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 ease-in-out"
            >
              <div className="flex-shrink-0">
                {item.icon}
              </div>
              <span className="ml-3 truncate">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center px-3 py-2">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mr-3">
              <Users className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{role.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
              <p className="text-xs text-gray-500 dark:text-gray-300 truncate">Online</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-0">
        {/* Top Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center flex-1 min-w-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mr-4"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center min-w-0">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white truncate">{title}</h1>
              </div>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
              {/* Search Bar */}
              <div className="hidden sm:block relative">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 lg:w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-500 dark:placeholder-gray-300"
                  />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 dark:text-gray-300" />
                </form>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={handleNotificationClick}
                  className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div id="notification-dropdown" className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-[9999]">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div 
                            key={notification.id}
                            className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 transition-colors ${
                              !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                            }`}
                            onClick={(e) => {
                              e.stopPropagation()
                              if (!notification.read) {
                                handleMarkAsRead(notification.id)
                              }
                            }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3 flex-1">
                                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                                  notification.type === 'info' ? 'bg-blue-500' :
                                  notification.type === 'success' ? 'bg-green-500' :
                                  notification.type === 'warning' ? 'bg-yellow-500' : 'bg-gray-500'
                                }`}></div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{notification.title}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 break-words">{notification.message}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 ml-2 flex-shrink-0">
                                {!notification.read && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleMarkAsRead(notification.id)
                                    }}
                                    className="text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                  >
                                    Mark as read
                                  </button>
                                )}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeleteNotification(notification.id)
                                  }}
                                  className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                          <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                          <p className="text-sm">No notifications</p>
                        </div>
                      )}
                    </div>
                    <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                      <button 
                        onClick={handleViewAllNotifications}
                        className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-100 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

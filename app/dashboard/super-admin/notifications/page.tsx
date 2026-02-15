'use client'

import AuthGuard from '@/components/AuthGuard'
import DashboardLayout from '@/components/DashboardLayout'
import { Bell, CheckCircle, Info, AlertTriangle, X, Search, Filter, Trash2, Eye } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NotificationsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')
  
  // Mock notifications data - in real app, this would come from API
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'info',
      title: 'New user registration',
      message: 'John Doe has registered for a new account on the platform',
      timestamp: '2024-03-15 10:30:00',
      read: false,
      user: 'System'
    },
    {
      id: 2,
      type: 'success',
      title: 'Payment received',
      message: 'AutoRent Inc. has successfully paid their monthly subscription of $499',
      timestamp: '2024-03-15 09:15:00',
      read: false,
      user: 'Payment System'
    },
    {
      id: 3,
      type: 'warning',
      title: 'System maintenance scheduled',
      message: 'System maintenance is scheduled for tonight at 11:00 PM EST. Expected downtime: 30 minutes',
      timestamp: '2024-03-15 08:00:00',
      read: true,
      user: 'System Admin'
    },
    {
      id: 4,
      type: 'error',
      title: 'Failed login attempt',
      message: 'Multiple failed login attempts detected for user: admin@company.com',
      timestamp: '2024-03-15 07:45:00',
      read: true,
      user: 'Security System'
    },
    {
      id: 5,
      type: 'info',
      title: 'Subscription upgraded',
      message: 'CityCar Rentals has upgraded their subscription from Basic to Premium plan',
      timestamp: '2024-03-14 16:30:00',
      read: true,
      user: 'Billing System'
    },
    {
      id: 6,
      type: 'success',
      title: 'New company registered',
      message: 'Global Fleet Management has completed their registration and is now active',
      timestamp: '2024-03-14 14:20:00',
      read: true,
      user: 'Registration System'
    },
    {
      id: 7,
      type: 'info',
      title: 'Report generated',
      message: 'Monthly revenue report for February 2024 has been generated and is ready for download',
      timestamp: '2024-03-14 12:00:00',
      read: true,
      user: 'Report System'
    },
    {
      id: 8,
      type: 'warning',
      title: 'Storage limit approaching',
      message: 'AutoRent Inc. has used 85% of their allocated storage space (8.5GB of 10GB)',
      timestamp: '2024-03-14 10:15:00',
      read: true,
      user: 'Storage Monitor'
    }
  ])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'error':
        return <X className="w-5 h-5 text-red-500" />
      default:
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const getNotificationBadge = (type: string) => {
    const styles = {
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800'
    }
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${styles[type as keyof typeof styles]}`}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    )
  }

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const handleDeleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const handleClearAll = () => {
    setNotifications([])
  }

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notification.read
    if (filter === 'read') return notification.read
    return true
  }).filter(notification => 
    notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <AuthGuard requiredRole="super-admin">
      <DashboardLayout role="super-admin" title="Notifications">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                  Notifications
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1 flex items-center">
                  <span className="relative">
                    {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60"></span>
                  </span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
              
              {/* Filter */}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">All Notifications</option>
                <option value="unread">Unread Only</option>
                <option value="read">Read Only</option>
              </select>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {notifications.length} total notifications
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleMarkAllAsRead}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark All as Read
                </button>
                <button
                  onClick={handleClearAll}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            {filteredNotifications.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredNotifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                              {notification.title}
                            </h4>
                            {getNotificationBadge(notification.type)}
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                            <span>By {notification.user}</span>
                            <span>•</span>
                            <span>{notification.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                        {!notification.read && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                          >
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteNotification(notification.id)}
                          className="text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No notifications found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchQuery ? 'No notifications match your search criteria.' : 'You have no notifications.'}
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredNotifications.length > 0 && (
            <div className="flex items-center justify-center space-x-2 mt-6">
              <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                Previous
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page 1 of 1
              </span>
              <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                Next
              </button>
            </div>
          )}
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}

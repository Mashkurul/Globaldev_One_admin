'use client'

import AuthGuard from '@/components/AuthGuard'
import DashboardLayout from '@/components/DashboardLayout'
import ConfirmDialog from '@/components/ConfirmDialog'
import Pagination from '@/components/Pagination'
import { Bell, CheckCircle, XCircle, AlertTriangle, Info, Calendar, Filter, Search, Trash2, Eye } from 'lucide-react'
import { useState } from 'react'

export default function BusinessAdminNotifications() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'info',
      title: 'New Booking Request',
      message: 'John Smith requested to book Tesla Model 3 for Mar 15-18',
      time: '2 minutes ago',
      read: false,
      date: '2024-03-14'
    },
    {
      id: 2,
      type: 'success',
      title: 'Payment Received',
      message: 'Payment of $450 received for booking #1234',
      time: '1 hour ago',
      read: false,
      date: '2024-03-14'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Vehicle Maintenance Due',
      message: 'BMW X5 (ABC-123) is scheduled for maintenance tomorrow',
      time: '3 hours ago',
      read: true,
      date: '2024-03-14'
    },
    {
      id: 4,
      type: 'info',
      title: 'New Customer Registration',
      message: 'Sarah Johnson registered as a new customer',
      time: '5 hours ago',
      read: true,
      date: '2024-03-13'
    },
    {
      id: 5,
      type: 'alert',
      title: 'Booking Cancellation',
      message: 'Mike Davis cancelled booking #1235',
      time: '1 day ago',
      read: true,
      date: '2024-03-13'
    }
  ])

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    title: string
    message: string
    onConfirm: () => void
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  })

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const handleDeleteNotification = (id: number) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Notification',
      message: 'Are you sure you want to delete this notification?',
      onConfirm: () => {
        setNotifications(prev => prev.filter(n => n.id !== id))
        console.log('Deleted notification:', id)
        setConfirmDialog({ ...confirmDialog, isOpen: false })
      }
    })
  }

  const handleClearAllNotifications = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Clear All Notifications',
      message: 'Are you sure you want to clear all notifications? This action cannot be undone.',
      onConfirm: () => {
        setNotifications([])
        console.log('All notifications cleared')
        setConfirmDialog({ ...confirmDialog, isOpen: false })
      }
    })
  }

  const closeConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, isOpen: false })
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredNotifications.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const getNotificationIcon = (type: string) => {
    const icons = {
      info: <Info className="w-5 h-5 text-blue-500" />,
      success: <CheckCircle className="w-5 h-5 text-green-500" />,
      warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      alert: <XCircle className="w-5 h-5 text-red-500" />
    }
    return icons[type as keyof typeof icons] || icons.info
  }

  const getNotificationBadge = (type: string) => {
    const badges = {
      info: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      alert: 'bg-red-100 text-red-800'
    }
    return badges[type as keyof typeof badges] || badges.info
  }

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || notification.type === filterType
    const matchesStatus = filterStatus === 'all' || 
                          (filterStatus === 'read' && notification.read) ||
                          (filterStatus === 'unread' && !notification.read)
    
    return matchesSearch && matchesType && matchesStatus
  })

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <AuthGuard requiredRole="business-admin">
      <DashboardLayout role="business-admin" title="Notifications">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600 mt-1">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All notifications read'}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => {
                  setNotifications(prev => prev.map(n => ({ ...n, read: true })))
                  console.log('All notifications marked as read')
                }}
                className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Mark all as read
              </button>
              <button 
                onClick={handleClearAllNotifications}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear all
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="info">Info</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="alert">Alert</option>
                </select>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`p-6 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-1">
                              <h3 className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </h3>
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getNotificationBadge(notification.type)}`}>
                                {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                              </span>
                              {!notification.read && (
                                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                  New
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar className="w-3 h-3 mr-1" />
                              {notification.time}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <button 
                              onClick={() => {
                                setNotifications(prev => 
                                  prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
                                )
                                console.log('Marked notification as read:', notification.id)
                              }}
                              className="text-gray-400 hover:text-gray-600"
                              title="Mark as read"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteNotification(notification.id)}
                              className="text-gray-400 hover:text-red-600"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
                  <p className="text-gray-500">
                    {searchQuery || filterType !== 'all' || filterStatus !== 'all' 
                      ? 'Try adjusting your search or filters' 
                      : 'You\'re all caught up! No new notifications.'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredNotifications.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </DashboardLayout>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={closeConfirmDialog}
      />
    </AuthGuard>
  )
}

'use client'

import AuthGuard from '@/components/AuthGuard'
import DashboardLayout from '@/components/DashboardLayout'
import { ArrowLeft, Edit, Mail, Phone, Building, Calendar, Shield, Users, Download, Eye, EyeOff, Lock, CheckCircle, AlertTriangle, Activity, FileText } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UserDetailsPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  
  // Mock user data - in real app, this would come from API
  const user = {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@autorent.com',
    username: 'johnsmith',
    phone: '+1 (555) 123-4567',
    role: 'business-admin',
    companyId: '1',
    companyName: 'AutoRent Inc.',
    department: 'Operations',
    position: 'General Manager',
    status: 'active',
    avatar: 'JS',
    createdAt: '2024-01-15',
    lastLogin: '2024-03-15 14:30:00',
    permissions: {
      dashboard: true,
      users: false,
      companies: false,
      subscriptions: false,
      bookings: true,
      vehicles: true,
      reports: true,
      settings: false
    },
    activity: [
      {
        id: 1,
        action: 'Login',
        description: 'User logged in from IP 192.168.1.100',
        timestamp: '2024-03-15 14:30:00',
        ip: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      {
        id: 2,
        action: 'Password Changed',
        description: 'User changed their password',
        timestamp: '2024-03-10 09:15:00',
        ip: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      {
        id: 3,
        action: 'Profile Updated',
        description: 'User updated their profile information',
        timestamp: '2024-03-05 16:45:00',
        ip: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    ],
    sessions: [
      {
        id: 1,
        startTime: '2024-03-15 14:30:00',
        endTime: '2024-03-15 16:45:00',
        duration: '2h 15m',
        ip: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        status: 'completed'
      },
      {
        id: 2,
        startTime: '2024-03-14 09:00:00',
        endTime: '2024-03-14 17:30:00',
        duration: '8h 30m',
        ip: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        status: 'completed'
      }
    ]
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-red-100 text-red-800'
    }
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getRoleBadge = (role: string) => {
    const styles = {
      'super-admin': 'bg-purple-100 text-purple-800',
      'business-admin': 'bg-blue-100 text-blue-800',
      'staff-user': 'bg-green-100 text-green-800'
    }
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${styles[role as keyof typeof styles]}`}>
        {role.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </span>
    )
  }

  const handleExport = (format: string) => {
    console.log(`Exporting user data in ${format} format`)
  }

  const handleResetPassword = () => {
    console.log('Resetting user password')
  }

  const handleDeactivate = () => {
    console.log('Deactivating user')
  }

  return (
    <AuthGuard requiredRole="super-admin">
      <DashboardLayout role="super-admin" title="User Details">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Users
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Details</h1>
                <p className="text-gray-600 dark:text-gray-400">View and manage user information</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleExport('pdf')}
                className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button
                onClick={() => router.push(`/dashboard/super-admin/users/${user.id}/edit`)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit User
              </button>
            </div>
          </div>

          {/* User Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start space-x-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">{user.avatar}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user.firstName} {user.lastName}
                  </h2>
                  {getStatusBadge(user.status)}
                  {getRoleBadge(user.role)}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Email:</span>
                    <div className="flex items-center text-gray-900 dark:text-white">
                      <Mail className="w-4 h-4 mr-2" />
                      {user.email}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                    <div className="flex items-center text-gray-900 dark:text-white">
                      <Phone className="w-4 h-4 mr-2" />
                      {user.phone}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Company:</span>
                    <div className="flex items-center text-gray-900 dark:text-white">
                      <Building className="w-4 h-4 mr-2" />
                      {user.companyName}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Position:</span>
                    <span className="text-gray-900 dark:text-white">{user.position}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6">
                {['overview', 'activity', 'sessions', 'permissions'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Account Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Information</h3>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</dt>
                        <dd className="text-sm text-gray-900 dark:text-white">{user.username}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Department</dt>
                        <dd className="text-sm text-gray-900 dark:text-white">{user.department}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created Date</dt>
                        <dd className="text-sm text-gray-900 dark:text-white">{user.createdAt}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Login</dt>
                        <dd className="text-sm text-gray-900 dark:text-white">{user.lastLogin}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={handleResetPassword}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center"
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Reset Password
                      </button>
                      <button
                        onClick={handleDeactivate}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                      >
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Deactivate Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {user.activity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex-shrink-0">
                          <Activity className="w-5 h-5 text-blue-600 mt-1" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {activity.action}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {activity.description}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {activity.timestamp} • IP: {activity.ip}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'sessions' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Login Sessions</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Start Time
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            End Time
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Duration
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            IP Address
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {user.sessions.map((session) => (
                          <tr key={session.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {session.startTime}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {session.endTime}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {session.duration}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {session.ip}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                {session.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'permissions' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Permissions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(user.permissions).map(([permission, enabled]) => (
                      <div key={permission} className="flex items-center space-x-2">
                        {enabled ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full" />
                        )}
                        <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                          {permission.replace('_', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}

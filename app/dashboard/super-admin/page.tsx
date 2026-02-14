'use client'

import AuthGuard from '@/components/AuthGuard'
import DashboardLayout from '@/components/DashboardLayout'
import { Shield, Building, Users, BarChart3, TrendingUp, AlertCircle, CheckCircle, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SuperAdminDashboard() {
  const router = useRouter()
  const stats = [
    { title: 'Total Companies', value: '127', change: '+12%', icon: <Building className="w-6 h-6" />, color: 'bg-blue-500' },
    { title: 'Active Users', value: '3,842', change: '+23%', icon: <Users className="w-6 h-6" />, color: 'bg-green-500' },
    { title: 'System Health', value: '98.5%', change: '+0.3%', icon: <BarChart3 className="w-6 h-6" />, color: 'bg-purple-500' },
    { title: 'Revenue', value: '$124.5K', change: '+18%', icon: <TrendingUp className="w-6 h-6" />, color: 'bg-orange-500' },
  ]

  const recentActivities = [
    { company: 'AutoRent Inc.', action: 'Subscription upgraded', time: '2 hours ago', status: 'success' },
    { company: 'CityCar Rentals', action: 'New company registered', time: '4 hours ago', status: 'info' },
    { company: 'Global Fleet', action: 'Payment processed', time: '6 hours ago', status: 'success' },
    { company: 'QuickRent', action: 'System alert triggered', time: '8 hours ago', status: 'warning' },
  ]

  return (
    <AuthGuard requiredRole="super-admin">
      <DashboardLayout role="super-admin" title="Super Admin Dashboard">
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} text-white p-3 rounded-xl shadow-sm`}>
                    {stat.icon}
                  </div>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
              </div>
            ))}
          </div>

          {/* Charts and Activity */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'success' ? 'bg-green-500' :
                        activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.company}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

            {/* System Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">System Overview</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-900">API Services</span>
                  </div>
                  <span className="text-sm text-green-600">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-900">Database</span>
                  </div>
                  <span className="text-sm text-green-600">Healthy</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-900">Storage</span>
                  </div>
                  <span className="text-sm text-yellow-600">78% Used</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-900">Backup Services</span>
                  </div>
                  <span className="text-sm text-green-600">Running</span>
                </div>
              </div>
            </div>
          </div>
        </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button 
                onClick={() => router.push('/dashboard/super-admin/companies/add')}
                className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Building className="w-5 h-5 mr-2" />
                Add New Company
              </button>
              <button 
                onClick={() => router.push('/dashboard/super-admin/users')}
                className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Users className="w-5 h-5 mr-2" />
                Manage Users
              </button>
              <button 
                onClick={() => router.push('/dashboard/super-admin/settings')}
                className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Settings className="w-5 h-5 mr-2" />
                System Settings
              </button>
            </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}

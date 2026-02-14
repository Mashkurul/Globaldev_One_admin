'use client'

import AuthGuard from '@/components/AuthGuard'
import DashboardLayout from '@/components/DashboardLayout'
import { FileText, Search, Filter, Download, Eye, User, Server, Shield, AlertTriangle, CheckCircle, XCircle, Clock, Calendar } from 'lucide-react'

export default function AuditLogsPage() {
  const auditLogs = [
    {
      id: 1,
      timestamp: '2024-03-15 14:32:15',
      user: 'John Smith',
      action: 'User Login',
      resource: 'Authentication System',
      details: 'Successful login from IP 192.168.1.100',
      severity: 'info',
      status: 'success',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: 2,
      timestamp: '2024-03-15 14:28:42',
      user: 'Sarah Johnson',
      action: 'Data Export',
      resource: 'Revenue Reports',
      details: 'Exported 3 months of revenue data (245 records)',
      severity: 'warning',
      status: 'success',
      ipAddress: '192.168.1.105',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    },
    {
      id: 3,
      timestamp: '2024-03-15 14:15:30',
      user: 'Mike Davis',
      action: 'Permission Change',
      resource: 'User Management',
      details: 'Modified user permissions for Emma Wilson (Staff User)',
      severity: 'warning',
      status: 'success',
      ipAddress: '192.168.1.110',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: 4,
      timestamp: '2024-03-15 14:05:18',
      user: 'System',
      action: 'Failed Login Attempt',
      resource: 'Authentication System',
      details: 'Failed login attempt for unknown user from IP 203.0.113.1',
      severity: 'error',
      status: 'failed',
      ipAddress: '203.0.113.1',
      userAgent: 'curl/7.68.0'
    },
    {
      id: 5,
      timestamp: '2024-03-15 13:52:45',
      user: 'Emma Wilson',
      action: 'Vehicle Update',
      resource: 'Fleet Management',
      details: 'Updated vehicle status for Tesla Model 3 (ABC-123)',
      severity: 'info',
      status: 'success',
      ipAddress: '192.168.1.115',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15'
    },
    {
      id: 6,
      timestamp: '2024-03-15 13:45:22',
      user: 'Robert Chen',
      action: 'Booking Created',
      resource: 'Reservation System',
      details: 'New booking created for BMW X5 (XYZ-789)',
      severity: 'info',
      status: 'success',
      ipAddress: '192.168.1.120',
      userAgent: 'Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/88.0'
    }
  ]

  const getSeverityBadge = (severity: string) => {
    const styles = {
      info: 'bg-blue-100 text-blue-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      critical: 'bg-red-100 text-red-800'
    }
    const icons = {
      info: <CheckCircle className="w-3 h-3 mr-1" />,
      warning: <AlertTriangle className="w-3 h-3 mr-1" />,
      error: <XCircle className="w-3 h-3 mr-1" />,
      critical: <XCircle className="w-3 h-3 mr-1" />
    }
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${styles[severity as keyof typeof styles]}`}>
        {icons[severity as keyof typeof icons]}
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </span>
    )
  }

  const getStatusIcon = (status: string) => {
    const icons = {
      success: <CheckCircle className="w-4 h-4 text-green-600" />,
      failed: <XCircle className="w-4 h-4 text-red-600" />,
      pending: <Clock className="w-4 h-4 text-yellow-600" />
    }
    return icons[status as keyof typeof icons]
  }

  const getActionIcon = (action: string) => {
    const icons = {
      'User Login': <User className="w-4 h-4 text-blue-600" />,
      'Data Export': <Download className="w-4 h-4 text-orange-600" />,
      'Permission Change': <Shield className="w-4 h-4 text-purple-600" />,
      'Failed Login Attempt': <XCircle className="w-4 h-4 text-red-600" />,
      'Vehicle Update': <Server className="w-4 h-4 text-green-600" />,
      'Booking Created': <FileText className="w-4 h-4 text-blue-600" />
    }
    return icons[action as keyof typeof icons] || <FileText className="w-4 h-4 text-gray-600" />
  }

  return (
    <AuthGuard requiredRole="super-admin">
      <DashboardLayout role="super-admin" title="Audit Logs">
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
              <p className="text-gray-600 mt-1">Monitor system activities and security events</p>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export Logs
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <FileText className="w-8 h-8 text-blue-600" />
                <span className="text-sm font-medium text-green-600">+18%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">15,234</h3>
              <p className="text-sm text-gray-600">Total Logs Today</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <span className="text-sm font-medium text-green-600">+12%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">14,892</h3>
              <p className="text-sm text-gray-600">Successful Actions</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
                <span className="text-sm font-medium text-red-600">+25%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">342</h3>
              <p className="text-sm text-gray-600">Warnings</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <XCircle className="w-8 h-8 text-red-600" />
                <span className="text-sm font-medium text-green-600">-8%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">28</h3>
              <p className="text-sm text-gray-600">Failed Attempts</p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search audit logs..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <input
                  type="date"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Actions</option>
                  <option value="login">User Login</option>
                  <option value="export">Data Export</option>
                  <option value="permission">Permission Change</option>
                  <option value="update">Data Update</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Severities</option>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                  <option value="critical">Critical</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Status</option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                  <option value="pending">Pending</option>
                </select>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </button>
              </div>
            </div>
          </div>

          {/* Audit Logs Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {log.timestamp}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                            <User className="w-4 h-4 text-gray-600" />
                          </div>
                          <div className="text-sm font-medium text-gray-900">{log.user}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getActionIcon(log.action)}
                          <span className="ml-2 text-sm text-gray-900">{log.action}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {log.resource}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title={log.details}>
                        {log.details}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getSeverityBadge(log.severity)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.ipAddress}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          {getStatusIcon(log.status)}
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of{' '}
                <span className="font-medium">15,234</span> results
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-md">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">3</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}

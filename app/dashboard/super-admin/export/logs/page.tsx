'use client'

import AuthGuard from '@/components/AuthGuard'
import DashboardLayout from '@/components/DashboardLayout'
import { Download, Search, Filter, Calendar, FileText, RefreshCw, Eye, AlertTriangle, CheckCircle, XCircle, Activity, Users, Building, CreditCard, Shield, TrendingUp, TrendingDown, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ExportLogsPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [dateRange, setDateRange] = useState('30')
  const [format, setFormat] = useState('csv')
  const [isExporting, setIsExporting] = useState(false)
  
  const categories = [
    { value: 'all', label: 'All Logs', icon: 'FileText' },
    { value: 'users', label: 'User Activity', icon: 'Users' },
    { value: 'companies', label: 'Company Activity', icon: 'Building' },
    { value: 'subscriptions', label: 'Subscription Activity', icon: 'CreditCard' },
    { value: 'system', label: 'System Events', icon: 'Shield' }
  ]

  const dateRanges = [
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 90 days' },
    { value: '365', label: 'Last year' },
    { value: 'all', label: 'All time' }
  ]

  const formats = [
    { value: 'csv', label: 'CSV', description: 'Comma-separated values' },
    { value: 'json', label: 'JSON', description: 'JSON format' },
    { value: 'pdf', label: 'PDF report', description: 'PDF report' },
    { value: 'xlsx', label: 'Excel spreadsheet' }
  ]

  const mockLogs = [
    {
      id: 1,
      category: 'users',
      action: 'User Login',
      description: 'User john.smith@autorent.com logged in successfully',
      user: 'John Smith',
      userId: 1,
      timestamp: '2024-03-15 14:30:00',
      ip: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      severity: 'info'
    },
    {
      id: 2,
      category: 'companies',
      action: 'Company Created',
      description: 'New company QuickRent registered on platform',
      user: 'System',
      userId: 0,
      companyId: 4,
      timestamp: '2024-03-15 10:15:00',
      ip: '192.168.1.1',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      severity: 'info'
    },
    {
      id: 3,
      category: 'subscriptions',
      action: 'Payment Processed',
      description: 'Monthly payment of $499.00 processed for AutoRent Inc.',
      user: 'System',
      userId: 0,
      subscriptionId: 1,
      timestamp: '2024-03-15 00:00:00',
      ip: '192.168.1.1',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      severity: 'info'
    },
    {
      id: 4,
      category: 'system',
      action: 'Database Backup',
      description: 'Automated database backup completed successfully',
      user: 'System',
      userId: 0,
      timestamp: '2024-03-15 02:00:00',
      ip: '192.168.1.1',
      userAgent: 'System',
      status: 'success',
      severity: 'info'
    },
    {
      id: 5,
      category: 'users',
      action: 'Password Reset',
      description: 'Password reset request for user john.smith@autorent.com',
      user: 'John Smith',
      userId: 1,
      timestamp: '2024-03-14 16:45:00',
      ip: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      severity: 'warning'
    },
    {
      id: 6,
      category: 'companies',
      action: 'Subscription Suspended',
      description: 'Subscription for Global Fleet suspended due to non-payment',
      user: 'System',
      userId: 0,
      companyId: 3,
      timestamp: '2024-03-13 09:30:00',
      ip: '192.168.1.1',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      severity: 'warning'
    }
  ]

  const getSeverityBadge = (severity: string) => {
    const styles = {
      info: 'bg-blue-100 text-blue-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      critical: 'bg-red-100 text-red-800'
    }
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${styles[severity as keyof typeof styles]}`}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </span>
    )
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      success: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800'
    }
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getCategoryIcon = (category: string) => {
    const iconMap = {
      all: <FileText className="w-4 h-4" />,
      users: <Users className="w-4 h-4" />,
      companies: <Building className="w-4 h-4" />,
      subscriptions: <CreditCard className="w-4 h-4" />,
      system: <Shield className="w-4 h-4" />
    }
    return iconMap[category] || <FileText className="w-4 h-4" />
  }

  const handleExport = async () => {
    setIsExporting(true)
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In real app, this would call an API endpoint
      console.log(`Exporting logs in ${format} format for category ${selectedCategory} and date range ${dateRange}`)
      
      // Show success message
      alert(`Export completed! ${mockLogs.length} records exported in ${format.toUpperCase()} format.`)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const filteredLogs = mockLogs.filter(log => {
    if (selectedCategory !== 'all' && log.category !== selectedCategory) return false
    if (dateRange !== 'all') {
      const days = parseInt(dateRange)
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - days)
      return new Date(log.timestamp) >= cutoffDate
    }
    return true
  })

  return (
    <AuthGuard requiredRole="super-admin">
      <DashboardLayout role="super-admin" title="Export Logs">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Export Logs</h1>
                <p className="text-gray-600 dark:text-gray-400">Export system logs and activity data</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Export Logs'}
              </button>
            </div>
          </div>

          {/* Export Configuration */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Export Configuration
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      <div className="flex items-center">
                        {category.icon}
                        <span className="ml-2">{category.label}</span>
                      </div>
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date Range
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {dateRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Export Format
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {formats.map(format => (
                    <option key={format.value} value={format}>
                      {format.label} - {format.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Export Summary */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Ready to Export
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-300">
                    {filteredLogs.length} records will be exported in {format.toUpperCase()} format
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Logs Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Log Preview ({filteredLogs.length} records)
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>Category: {selectedCategory === 'all' ? 'All Categories' : selectedCategory}</span>
                  <span>•</span>
                  <span>Period: {dateRange === 'all' ? 'All Time' : dateRange}</span>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto max-h-96">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Severity
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredLogs.slice(0, 10).map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {log.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getCategoryIcon(log.category)}
                          <span className="ml-2 capitalize">{log.category}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {log.action}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {log.user || 'System'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(log.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getSeverityBadge(log.severity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredLogs.length > 10 && (
              <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Showing 10 of {filteredLogs.length} records
                </p>
              </div>
            )}
          </div>

          {/* Export Statistics */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Export Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {filteredLogs.length}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Records</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockLogs.length}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Available</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Date().toISOString().split('T')[0]}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last Export</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {format.toUpperCase()}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Format</p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
'use client'

import AuthGuard from '@/components/AuthGuard'
import DashboardLayout from '@/components/DashboardLayout'
import { Activity, Server, Database, Wifi, HardDrive, Cpu, AlertTriangle, CheckCircle, XCircle, Clock, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react'

export default function SystemHealthPage() {
  const systemMetrics = [
    {
      name: 'API Response Time',
      value: '124ms',
      status: 'healthy',
      trend: 'down',
      change: '-12%',
      icon: <Activity className="w-5 h-5" />,
      description: 'Average response time over last hour'
    },
    {
      name: 'Server CPU Usage',
      value: '45%',
      status: 'healthy',
      trend: 'up',
      change: '+5%',
      icon: <Cpu className="w-5 h-5" />,
      description: 'Current CPU utilization'
    },
    {
      name: 'Memory Usage',
      value: '8.2GB / 16GB',
      status: 'warning',
      trend: 'up',
      change: '+15%',
      icon: <HardDrive className="w-5 h-5" />,
      description: 'RAM usage across all servers'
    },
    {
      name: 'Database Connections',
      value: '142 / 200',
      status: 'healthy',
      trend: 'stable',
      change: '0%',
      icon: <Database className="w-5 h-5" />,
      description: 'Active database connections'
    },
    {
      name: 'Network Bandwidth',
      value: '245 Mbps',
      status: 'healthy',
      trend: 'up',
      change: '+8%',
      icon: <Wifi className="w-5 h-5" />,
      description: 'Current network throughput'
    },
    {
      name: 'Storage Usage',
      value: '2.1TB / 5TB',
      status: 'warning',
      trend: 'up',
      change: '+3%',
      icon: <HardDrive className="w-5 h-5" />,
      description: 'Disk space utilization'
    }
  ]

  const services = [
    {
      name: 'Authentication Service',
      status: 'healthy',
      uptime: '99.9%',
      lastCheck: '2 mins ago',
      responseTime: '45ms',
      errors: 0
    },
    {
      name: 'Payment Gateway',
      status: 'healthy',
      uptime: '99.8%',
      lastCheck: '1 min ago',
      responseTime: '234ms',
      errors: 2
    },
    {
      name: 'Email Service',
      status: 'healthy',
      uptime: '99.7%',
      lastCheck: '3 mins ago',
      responseTime: '123ms',
      errors: 5
    },
    {
      name: 'File Storage',
      status: 'warning',
      uptime: '98.5%',
      lastCheck: '5 mins ago',
      responseTime: '567ms',
      errors: 12
    },
    {
      name: 'Analytics Engine',
      status: 'healthy',
      uptime: '99.9%',
      lastCheck: '1 min ago',
      responseTime: '89ms',
      errors: 1
    },
    {
      name: 'Notification Service',
      status: 'error',
      uptime: '95.2%',
      lastCheck: '10 mins ago',
      responseTime: '1200ms',
      errors: 45
    }
  ]

  const recentAlerts = [
    {
      type: 'error',
      message: 'Notification Service experiencing high latency',
      time: '10 mins ago',
      service: 'Notification Service'
    },
    {
      type: 'warning',
      message: 'Memory usage approaching threshold',
      time: '25 mins ago',
      service: 'System Monitor'
    },
    {
      type: 'info',
      message: 'Scheduled maintenance completed successfully',
      time: '1 hour ago',
      service: 'Maintenance System'
    },
    {
      type: 'warning',
      message: 'Storage usage exceeded 80%',
      time: '2 hours ago',
      service: 'Storage Monitor'
    }
  ]

  const getStatusColor = (status: string) => {
    const colors = {
      healthy: 'text-green-600 bg-green-100',
      warning: 'text-yellow-600 bg-yellow-100',
      error: 'text-red-600 bg-red-100'
    }
    return colors[status as keyof typeof colors]
  }

  const getStatusIcon = (status: string) => {
    const icons = {
      healthy: <CheckCircle className="w-4 h-4" />,
      warning: <AlertTriangle className="w-4 h-4" />,
      error: <XCircle className="w-4 h-4" />
    }
    return icons[status as keyof typeof icons]
  }

  const getTrendIcon = (trend: string) => {
    const icons = {
      up: <TrendingUp className="w-3 h-3 text-green-600" />,
      down: <TrendingDown className="w-3 h-3 text-red-600" />,
      stable: <div className="w-3 h-3 bg-gray-400 rounded-full" />
    }
    return icons[trend as keyof typeof icons]
  }

  return (
    <AuthGuard requiredRole="super-admin">
      <DashboardLayout role="super-admin" title="System Health">
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">System Health</h1>
              <p className="text-gray-600 mt-1">Monitor system performance and service status</p>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Activity className="w-4 h-4 mr-2" />
                View Logs
              </button>
            </div>
          </div>

          {/* System Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">System Overview</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Healthy: 4</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Warning: 2</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Error: 0</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {systemMetrics.map((metric, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg ${getStatusColor(metric.status)}`}>
                        {metric.icon}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">{metric.name}</h3>
                        <p className="text-xs text-gray-500">{metric.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {getTrendIcon(metric.trend)}
                      <span className="text-xs text-gray-500 ml-1">{metric.change}</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Services Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Services Status</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uptime</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Errors</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Check</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {services.map((service, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{service.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(service.status)}`}>
                          {getStatusIcon(service.status)}
                          <span className="ml-1">{service.status.charAt(0).toUpperCase() + service.status.slice(1)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {service.uptime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {service.responseTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={service.errors > 10 ? 'text-red-600 font-medium' : 'text-gray-900'}>
                          {service.errors}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {service.lastCheck}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg">
                    <div className={`p-1 rounded-full ${
                      alert.type === 'error' ? 'bg-red-100' :
                      alert.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      {
                        alert.type === 'error' ? <XCircle className="w-4 h-4 text-red-600" /> :
                        alert.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-yellow-600" /> :
                        <Clock className="w-4 h-4 text-blue-600" />
                      }
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{alert.message}</p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <span>{alert.service}</span>
                        <span className="mx-2">•</span>
                        <span>{alert.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}

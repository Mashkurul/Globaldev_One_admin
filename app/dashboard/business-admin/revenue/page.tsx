'use client'

import AuthGuard from '@/components/AuthGuard'
import DashboardLayout from '@/components/DashboardLayout'
import { DollarSign, TrendingUp, TrendingDown, Calendar, Download, Filter, Car, Users, CreditCard, BarChart3, PieChart, Activity } from 'lucide-react'
import { exportRevenueReport } from '@/utils/exportUtils'

  const handleExportPDF = () => {
    const revenueData = [
      { Period: 'Today', Revenue: '$1,245', Change: '+12%' },
      { Period: 'This Week', Revenue: '$8,420', Change: '+8%' },
      { Period: 'This Month', Revenue: '$28,400', Change: '+22%' }
    ]
    exportRevenueReport(revenueData, 'pdf')
  }

  const handleExportCSV = () => {
    const revenueData = [
      { Period: 'Today', Revenue: '$1,245', Change: '+12%' },
      { Period: 'This Week', Revenue: '$8,420', Change: '+8%' },
      { Period: 'This Month', Revenue: '$28,400', Change: '+22%' }
    ]
    exportRevenueReport(revenueData, 'csv')
  }

export default function RevenueReportsPage() {
  const revenueStats = [
    {
      title: 'Today\'s Revenue',
      value: '$1,245',
      change: '+12%',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'bg-green-500',
      trend: 'up'
    },
    {
      title: 'This Week',
      value: '$8,420',
      change: '+8%',
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'bg-blue-500',
      trend: 'up'
    },
    {
      title: 'This Month',
      value: '$28,400',
      change: '+22%',
      icon: <Calendar className="w-5 h-5" />,
      color: 'bg-purple-500',
      trend: 'up'
    },
    {
      title: 'This Year',
      value: '$342,600',
      change: '+18%',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'bg-orange-500',
      trend: 'up'
    }
  ]

  const revenueByVehicle = [
    {
      vehicle: 'Tesla Model 3',
      revenue: '$12,340',
      bookings: 45,
      utilization: '78%',
      avgDailyRate: '$89',
      trend: '+15%'
    },
    {
      vehicle: 'BMW X5',
      revenue: '$15,670',
      bookings: 38,
      utilization: '82%',
      avgDailyRate: '$125',
      trend: '+8%'
    },
    {
      vehicle: 'Mercedes C-Class',
      revenue: '$9,890',
      bookings: 32,
      utilization: '71%',
      avgDailyRate: '$95',
      trend: '-3%'
    },
    {
      vehicle: 'Audi A4',
      revenue: '$8,450',
      bookings: 28,
      utilization: '68%',
      avgDailyRate: '$85',
      trend: '+5%'
    }
  ]

  const monthlyRevenue = [
    { month: 'Jan', revenue: '$22,400', bookings: 156 },
    { month: 'Feb', revenue: '$24,800', bookings: 178 },
    { month: 'Mar', revenue: '$28,400', bookings: 195 },
    { month: 'Apr', revenue: '$26,900', bookings: 182 },
    { month: 'May', revenue: '$31,200', bookings: 210 },
    { month: 'Jun', revenue: '$29,800', bookings: 198 }
  ]

  const paymentMethods = [
    { method: 'Credit Card', amount: '$18,450', percentage: 65, color: 'bg-blue-500' },
    { method: 'Debit Card', amount: '$7,120', percentage: 25, color: 'bg-green-500' },
    { method: 'Cash', amount: '$2,830', percentage: 10, color: 'bg-yellow-500' }
  ]

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3 text-green-600" />
    if (trend === 'down') return <TrendingDown className="w-3 h-3 text-red-600" />
    return <div className="w-3 h-3 bg-gray-400 rounded-full" />
  }

  return (
    <AuthGuard requiredRole="business-admin">
      <DashboardLayout role="business-admin" title="Revenue Reports">
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Revenue Reports</h1>
              <p className="text-gray-600 mt-1">Track your business revenue and financial performance</p>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
              </button>
              <div className="relative">
                <button 
                  onClick={handleExportPDF}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </button>
                <button 
                  onClick={handleExportCSV}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ml-2"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Revenue Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {revenueStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className={`${stat.color} text-white p-3 rounded-xl shadow-sm`}>
                    {stat.icon}
                  </div>
                  <div className="flex items-center">
                    {getTrendIcon(stat.trend)}
                    <span className={`text-xs font-medium ml-1 ${
                      stat.trend === 'up' ? 'text-green-600' : 
                      stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            ))}
          </div>

          {/* Revenue Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Revenue Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Monthly Revenue Trend</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {monthlyRevenue.map((month, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-900 w-12">{month.month}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                          <div 
                            className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-2"
                            style={{ width: `${(parseFloat(month.revenue.replace('$', '').replace(',', '')) / 31200) * 100}%` }}
                          >
                            <span className="text-xs text-white font-medium">{month.revenue}</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 w-16 text-right">{month.bookings} bookings</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {paymentMethods.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded ${payment.color}`}></div>
                        <span className="text-sm font-medium text-gray-900">{payment.method}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className={`${payment.color} h-2 rounded-full`}
                              style={{ width: `${payment.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-500">{payment.percentage}%</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-20 text-right">{payment.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Revenue by Vehicle */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Revenue by Vehicle</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Daily Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {revenueByVehicle.map((vehicle, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Car className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{vehicle.vehicle}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {vehicle.revenue}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vehicle.bookings}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: vehicle.utilization }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">{vehicle.utilization}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vehicle.avgDailyRate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getTrendIcon(vehicle.trend.includes('+') ? 'up' : 'down')}
                          <span className={`text-sm font-medium ml-1 ${
                            vehicle.trend.includes('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {vehicle.trend}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Revenue</h3>
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">$28,400</p>
              <p className="text-sm text-green-600 mt-2">+22% from last month</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Bookings</h3>
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">195</p>
              <p className="text-sm text-green-600 mt-2">+18% from last month</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Avg. Revenue/Booking</h3>
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">$146</p>
              <p className="text-sm text-green-600 mt-2">+4% from last month</p>
            </div>
          </div>

          {/* Export Options */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={handleExportPDF}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Revenue Summary (PDF)
              </button>
              <button 
                onClick={handleExportCSV}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Detailed Report (CSV)
              </button>
              <button 
                onClick={handleExportPDF}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Tax Report (PDF)
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}

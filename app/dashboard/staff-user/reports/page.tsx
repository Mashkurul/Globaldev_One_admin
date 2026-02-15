'use client'

import AuthGuard from '@/components/AuthGuard'
import DashboardLayout from '@/components/DashboardLayout'
import { FileText, Download, Calendar, TrendingUp, TrendingDown, Car, Users, DollarSign, Clock, CheckCircle, AlertTriangle, Search, Filter } from 'lucide-react'
import { useState } from 'react'

export default function StaffReportsPage() {
  const [dateRange, setDateRange] = useState('today')
  const [activityFilter, setActivityFilter] = useState('all')

  const handleExportPDF = () => {
    console.log('Exporting report as PDF...')
    try {
      // Create report data
      const reportData = {
        title: 'Staff Reports',
        date: new Date().toLocaleDateString(),
        stats: stats,
        performanceMetrics: performanceMetrics,
        activities: activities,
        weeklySummary: {
          totalCheckIns: 42,
          totalCheckOuts: 38,
          avgTime: '6.5 min',
          customerSatisfaction: '4.7 / 5.0'
        },
        vehicleStatus: {
          available: 8,
          rented: 3,
          maintenance: 1
        }
      }

      // Create a simple text-based PDF content (client-side)
      const pdfLines = [
        'STAFF REPORTS',
        '='.repeat(50),
        `Generated: ${reportData.date}`,
        '='.repeat(50),
        '',
        'PERFORMANCE METRICS',
        '='.repeat(50),
        ...stats.map(stat => `${stat.title}: ${stat.value} (${stat.change})`),
        '',
        'PERFORMANCE INDICATORS',
        '='.repeat(50),
        ...performanceMetrics.map(metric => `${metric.metric}: ${metric.value} ${metric.change}`),
        '',
        'RECENT ACTIVITIES',
        '='.repeat(50),
        ...activities.map(activity => `${activity.time} - ${activity.customer} - ${activity.vehicle} - ${activity.duration} - ${activity.status}`),
        '',
        'WEEKLY SUMMARY',
        '='.repeat(50),
        `Total Check-ins: 42`,
        `Total Check-outs: 38`,
        `Average Time: 6.5 min`,
        `Customer Satisfaction: 4.7 / 5.0`,
        '',
        'VEHICLE STATUS',
        '='.repeat(50),
        `Available: 8`,
        `Rented: 3`,
        `Maintenance: 1`
      ]

      const pdfContent = pdfLines.join('\n')

      // Create and download PDF file
      const blob = new Blob([pdfContent], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `staff-reports-${new Date().toISOString().split('T')[0]}.txt`
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      alert('Report file downloaded successfully! You can open this file and save as PDF using your browser.')
    } catch (error) {
      console.error('Error generating report:', error)
      alert('Error generating report. Please try again.')
    }
  }

  const handleExportExcel = () => {
    console.log('Exporting report as Excel...')
    try {
      // Create CSV content for Excel
      const csvContent = [
        'Metric,Value,Change',
        ...stats.map(stat => `${stat.title},${stat.value},${stat.change}`),
        '',
        'Performance Metric,Value,Change',
        ...performanceMetrics.map(metric => `${metric.metric},${metric.value},${metric.change}`),
        '',
        'Time,Customer,Vehicle,Duration,Status',
        ...activities.map(activity => `${activity.time},${activity.customer},${activity.vehicle},${activity.duration},${activity.status}`)
      ].join('\n')

      // Create and download CSV file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `staff-reports-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      alert('Excel report downloaded successfully!')
    } catch (error) {
      console.error('Error generating Excel:', error)
      alert('Error generating Excel report. Please try again.')
    }
  }

  const handlePrintReport = () => {
    console.log('Printing report...')
    // Add print-specific styles
    const style = document.createElement('style')
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        body .print-content,
        body .print-content * {
          visibility: visible;
        }
        body .print-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          padding: 20px;
        }
        .no-print {
          display: none !important;
        }
      }
    `
    document.head.appendChild(style)
    
    // Create print content
    const printContent = document.createElement('div')
    printContent.className = 'print-content'
    printContent.innerHTML = `
      <div style="font-family: Arial, sans-serif;">
        <h1 style="font-size: 24px; margin-bottom: 20px; color: #1f2937;">Staff Reports</h1>
        <h2 style="font-size: 18px; margin-bottom: 15px; color: #374151;">Performance Metrics</h2>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px;">
          ${performanceMetrics.map(metric => `
            <div style="text-align: center; padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <h3 style="font-size: 14px; margin-bottom: 5px; color: #6b7280;">${metric.metric}</h3>
              <div style="font-size: 20px; font-weight: bold; color: #1f2937;">${metric.value}</div>
              ${metric.max ? `<div style="font-size: 12px; color: #6b7280;">/ ${metric.max}</div>` : ''}
              <div style="font-size: 14px; color: ${metric.color};">${metric.change}</div>
            </div>
          `).join('')}
        </div>
        
        <h2 style="font-size: 18px; margin: 30px 0 15px 0; color: #374151;">Recent Activities</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background: #f8f9fa;">
              <th style="padding: 10px; text-align: left; border: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">Time</th>
              <th style="padding: 10px; text-align: left; border: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">Type</th>
              <th style="padding: 10px; text-align: left; border: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">Customer</th>
              <th style="padding: 10px; text-align: left; border: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">Vehicle</th>
              <th style="padding: 10px; text-align: left; border: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">Duration</th>
              <th style="padding: 10px; text-align: left; border: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${activities.map(activity => `
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-size: 12px;">${activity.time}</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-size: 12px;">${activity.type.replace('-', ' ')}</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-size: 12px;">${activity.customer}</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-size: 12px;">${activity.vehicle}</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-size: 12px;">${activity.duration}</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-size: 12px;">
                  <span style="padding: 2px 6px; border-radius: 4px; font-size: 10px; background: ${activity.status === 'completed' ? '#d1fae5' : '#fef3c7'}; color: ${activity.status === 'completed' ? '#155724' : '#856404'};">
                    ${activity.status}
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <h2 style="font-size: 18px; margin: 30px 0 15px 0; color: #374151;">Weekly Summary</h2>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px;">
          <div style="padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="font-size: 16px; margin-bottom: 10px; color: #374151;">Weekly Summary</h3>
            <div style="space-y: 8px;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #6b7280;">Total Check-ins</span>
                <span style="font-weight: bold;">42</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #6b7280;">Total Check-outs</span>
                <span style="font-weight: bold;">38</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #6b7280;">Average Time per Transaction</span>
                <span style="font-weight: bold;">6.5 min</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #6b7280;">Customer Satisfaction</span>
                <span style="font-weight: bold;">4.7 / 5.0</span>
              </div>
            </div>
          </div>
          
          <div style="padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="font-size: 16px; margin-bottom: 10px; color: #374151;">Vehicle Status</h3>
            <div style="space-y: 8px;">
              <div style="display: flex; justify-content: space-between;">
                <div style="display: flex; align-items: center;">
                  <div style="width: 12px; height: 12px; border-radius: 50%; background: #10b981; margin-right: 8px;"></div>
                  <span style="color: #6b7280;">Available</span>
                </div>
                <span style="font-weight: bold;">8</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <div style="display: flex; align-items: center;">
                  <div style="width: 12px; height: 12px; border-radius: 50%; background: #3b82f6; margin-right: 8px;"></div>
                  <span style="color: #6b7280;">Rented</span>
                </div>
                <span style="font-weight: bold;">3</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <div style="display: flex; align-items: center;">
                  <div style="width: 12px; height: 12px; border-radius: 50%; background: #f59e0b; margin-right: 8px;"></div>
                  <span style="color: #6b7280;">Maintenance</span>
                </div>
                <span style="font-weight: bold;">1</span>
              </div>
            </div>
          </div>
      </div>
    `
    
    document.body.appendChild(printContent)
    
    // Trigger print
    window.print()
    
    // Clean up after printing
    setTimeout(() => {
      document.head.removeChild(style)
      document.body.removeChild(printContent)
    }, 100)
  }
  const stats = [
    {
      title: 'Check-ins Today',
      value: '8',
      change: '+2',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'bg-green-500',
      trend: 'up'
    },
    {
      title: 'Check-outs Today',
      value: '5',
      change: '+1',
      icon: <Users className="w-5 h-5" />,
      color: 'bg-blue-500',
      trend: 'up'
    },
    {
      title: 'Vehicles Managed',
      value: '12',
      change: '0',
      icon: <Car className="w-5 h-5" />,
      color: 'bg-purple-500',
      trend: 'stable'
    },
    {
      title: 'Avg. Response Time',
      value: '3.2 min',
      change: '-0.5',
      icon: <Clock className="w-5 h-5" />,
      color: 'bg-orange-500',
      trend: 'down'
    }
  ]

  const activities = [
    {
      id: 1,
      type: 'check-in',
      customer: 'John Smith',
      vehicle: 'Tesla Model 3',
      time: '09:15 AM',
      duration: '5 min',
      status: 'completed'
    },
    {
      id: 2,
      type: 'check-out',
      customer: 'Robert Chen',
      vehicle: 'BMW X5',
      time: '11:30 AM',
      duration: '8 min',
      status: 'completed'
    },
    {
      id: 3,
      type: 'check-in',
      customer: 'Sarah Johnson',
      vehicle: 'Mercedes C-Class',
      time: '02:45 PM',
      duration: '12 min',
      status: 'completed'
    },
    {
      id: 4,
      type: 'maintenance',
      vehicle: 'Audi A4',
      time: '03:30 PM',
      duration: '45 min',
      status: 'in-progress'
    }
  ]

  const performanceMetrics = [
    {
      metric: 'Customer Satisfaction',
      value: '4.8',
      max: 5,
      change: '+0.2',
      color: 'text-green-600'
    },
    {
      metric: 'Process Efficiency',
      value: '92%',
      change: '+5%',
      color: 'text-green-600'
    },
    {
      metric: 'Vehicle Turnaround',
      value: '25 min',
      change: '-3 min',
      color: 'text-green-600'
    },
    {
      metric: 'Error Rate',
      value: '2%',
      change: '-1%',
      color: 'text-green-600'
    }
  ]

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3 text-green-600" />
    if (trend === 'down') return <TrendingDown className="w-3 h-3 text-red-600" />
    return <div className="w-3 h-3 bg-gray-400 rounded-full" />
  }

  const getActivityIcon = (type: string) => {
    const icons = {
      'check-in': <CheckCircle className="w-4 h-4 text-green-600" />,
      'check-out': <Users className="w-4 h-4 text-blue-600" />,
      'maintenance': <AlertTriangle className="w-4 h-4 text-orange-600" />
    }
    return icons[type as keyof typeof icons] || <FileText className="w-4 h-4 text-gray-600" />
  }

  return (
    <AuthGuard requiredRole="staff-user">
      <DashboardLayout role="staff-user" title="Reports">
        <div className="space-y-6 no-print">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 no-print">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
              <p className="text-gray-600 mt-1">View your performance and activity reports</p>
            </div>
            <div className="flex gap-2 no-print">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors no-print">
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
              </button>
              <button 
                onClick={handleExportPDF}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors no-print"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
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

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Performance Metrics</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">{metric.metric}</h3>
                    <div className="flex items-center justify-center">
                      <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
                      {metric.max && (
                        <span className="text-sm text-gray-500 ml-1">/ {metric.max}</span>
                      )}
                    </div>
                    <div className={`text-sm font-medium mt-2 ${metric.color}`}>
                      {metric.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Today
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Week
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Month
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activities.map((activity) => (
                    <tr key={activity.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {activity.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getActivityIcon(activity.type)}
                          <span className="ml-2 text-sm text-gray-900 capitalize">{activity.type.replace('-', ' ')}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {activity.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {activity.vehicle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {activity.duration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          activity.status === 'completed' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {activity.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Weekly Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Weekly Summary</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Check-ins</span>
                    <span className="text-sm font-medium text-gray-900">42</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Check-outs</span>
                    <span className="text-sm font-medium text-gray-900">38</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average Time per Transaction</span>
                    <span className="text-sm font-medium text-gray-900">6.5 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Customer Satisfaction</span>
                    <span className="text-sm font-medium text-gray-900">4.7 / 5.0</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Vehicle Status</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">Available</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">Rented</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">Maintenance</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">1</span>
                  </div>
                </div>
              </div>
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
                Export as PDF
              </button>
              <button 
                onClick={handleExportExcel}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export as Excel
              </button>
              <button 
                onClick={handlePrintReport}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Print Report
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}

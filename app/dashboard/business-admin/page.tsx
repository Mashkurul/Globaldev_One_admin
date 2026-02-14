'use client'

import AuthGuard from '@/components/AuthGuard'
import DashboardLayout from '@/components/DashboardLayout'
import { Building, Car, Calendar, DollarSign, FileCheck, TrendingUp, Users, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function BusinessAdminDashboard() {
  const router = useRouter()
  const stats = [
    { title: 'Active Vehicles', value: '48', change: '+8%', icon: <Car className="w-6 h-6" />, color: 'bg-blue-500' },
    { title: 'Total Bookings', value: '324', change: '+15%', icon: <Calendar className="w-6 h-6" />, color: 'bg-green-500' },
    { title: 'Monthly Revenue', value: '$28.4K', change: '+22%', icon: <DollarSign className="w-6 h-6" />, color: 'bg-purple-500' },
    { title: 'Customer Rating', value: '4.8', change: '+0.2', icon: <Star className="w-6 h-6" />, color: 'bg-orange-500' },
  ]

  const recentBookings = [
    { vehicle: 'Tesla Model 3', customer: 'John Smith', dates: 'Mar 15-18', status: 'confirmed', amount: '$450' },
    { vehicle: 'BMW X5', customer: 'Sarah Johnson', dates: 'Mar 20-25', status: 'pending', amount: '$780' },
    { vehicle: 'Mercedes C-Class', customer: 'Mike Davis', dates: 'Mar 22-24', status: 'confirmed', amount: '$320' },
    { vehicle: 'Audi A4', customer: 'Emma Wilson', dates: 'Mar 25-28', status: 'pending', amount: '$420' },
  ]

  const topVehicles = [
    { name: 'Tesla Model 3', bookings: 45, revenue: '$12,340', rating: 4.9 },
    { name: 'BMW X5', bookings: 38, revenue: '$15,670', rating: 4.8 },
    { name: 'Mercedes C-Class', bookings: 32, revenue: '$9,890', rating: 4.7 },
    { name: 'Audi A4', bookings: 28, revenue: '$8,450', rating: 4.6 },
  ]

  return (
    <AuthGuard requiredRole="business-admin">
      <DashboardLayout role="business-admin" title="Business Admin Dashboard">
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

          {/* Recent Bookings and Top Vehicles */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                {recentBookings.map((booking, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Car className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{booking.vehicle}</p>
                        <p className="text-sm text-gray-600">{booking.customer} • {booking.dates}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{booking.amount}</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

            {/* Top Performing Vehicles */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Top Performing Vehicles</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                {topVehicles.map((vehicle, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{vehicle.name}</p>
                        <p className="text-sm text-gray-600">{vehicle.bookings} bookings</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{vehicle.revenue}</p>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">{vehicle.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button 
                onClick={() => router.push('/dashboard/business-admin/vehicles/add')}
                className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Car className="w-5 h-5 mr-2" />
                Add Vehicle
              </button>
              <button 
                onClick={() => router.push('/dashboard/business-admin/bookings')}
                className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Calendar className="w-5 h-5 mr-2" />
                View Bookings
              </button>
              <button 
                onClick={() => router.push('/dashboard/business-admin/contracts')}
                className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <FileCheck className="w-5 h-5 mr-2" />
                Manage Contracts
              </button>
              <button 
                onClick={() => router.push('/dashboard/business-admin/revenue')}
                className="flex items-center justify-center px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                View Reports
              </button>
            </div>
          </div>
        </div>

          {/* Revenue Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Today's Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$1,245</p>
                <p className="text-sm text-green-600 mt-1">+12% from yesterday</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">This Week</p>
                <p className="text-2xl font-bold text-gray-900">$8,420</p>
                <p className="text-sm text-green-600 mt-1">+8% from last week</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">This Month</p>
                <p className="text-2xl font-bold text-gray-900">$28,400</p>
                <p className="text-sm text-green-600 mt-1">+22% from last month</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}

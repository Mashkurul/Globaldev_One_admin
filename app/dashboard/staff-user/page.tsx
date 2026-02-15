'use client'

import AuthGuard from '@/components/AuthGuard'
import DashboardLayout from '@/components/DashboardLayout'
import { Car, Calendar, MessageSquare, CheckCircle, Clock, AlertCircle, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function StaffUserDashboard() {
  const router = useRouter()
  const [showNotifications, setShowNotifications] = useState(false)
  
  const handleProcessCheckIn = () => {
    console.log('Process Check-in clicked')
    // Navigate to check-in page or show modal
    router.push('/dashboard/staff-user/reservations')
  }
  
  const handleProcessCheckOut = () => {
    console.log('Process Check-out clicked')
    // Navigate to check-out page or show modal
    router.push('/dashboard/staff-user/reservations')
  }
  
  const handleViewMessages = () => {
    console.log('View Messages clicked')
    // Navigate to messages page
    router.push('/dashboard/staff-user/messages')
  }
  
  const handleVehicleStatus = () => {
    console.log('Vehicle Status clicked')
    // Navigate to vehicles page
    router.push('/dashboard/staff-user/vehicles')
  }
  const stats = [
    { title: 'My Vehicles', value: '12', change: '+2', icon: <Car className="w-6 h-6" />, color: 'bg-blue-500' },
    { title: 'Today\'s Check-ins', value: '8', change: 'Completed', icon: <CheckCircle className="w-6 h-6" />, color: 'bg-green-500' },
    { title: 'Pending Tasks', value: '5', change: 'Urgent: 2', icon: <Clock className="w-6 h-6" />, color: 'bg-orange-500' },
    { title: 'Messages', value: '23', change: '3 unread', icon: <MessageSquare className="w-6 h-6" />, color: 'bg-purple-500' },
  ]

  const todaySchedule = [
    { time: '09:00 AM', vehicle: 'Tesla Model 3', customer: 'John Smith', type: 'Check-in', status: 'completed' },
    { time: '10:30 AM', vehicle: 'BMW X5', customer: 'Sarah Johnson', type: 'Check-out', status: 'pending' },
    { time: '02:00 PM', vehicle: 'Mercedes C-Class', customer: 'Mike Davis', type: 'Check-in', status: 'pending' },
    { time: '04:30 PM', vehicle: 'Audi A4', customer: 'Emma Wilson', type: 'Check-out', status: 'pending' },
  ]

  const myVehicles = [
    { name: 'Tesla Model 3', plate: 'ABC-123', status: 'available', location: 'Downtown Branch', nextBooking: '2:00 PM' },
    { name: 'BMW X5', plate: 'XYZ-789', status: 'rented', location: 'With Customer', nextBooking: 'Tomorrow' },
    { name: 'Mercedes C-Class', plate: 'DEF-456', status: 'maintenance', location: 'Service Center', nextBooking: 'Mar 20' },
    { name: 'Audi A4', plate: 'GHI-012', status: 'available', location: 'Airport Branch', nextBooking: '4:30 PM' },
  ]

  const recentMessages = [
    { sender: 'John Smith', message: 'Running 15 minutes late for check-in', time: '10 min ago', priority: 'high' },
    { sender: 'Sarah Johnson', message: 'Where do I return the keys?', time: '1 hour ago', priority: 'normal' },
    { sender: 'Support Team', message: 'New vehicle assigned to your fleet', time: '2 hours ago', priority: 'low' },
  ]

  return (
    <AuthGuard requiredRole="staff-user">
      <DashboardLayout role="staff-user" title="Staff Dashboard">
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} text-white p-3 rounded-xl shadow-sm`}>
                    {stat.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-full">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
              </div>
            ))}
          </div>

          {/* Today's Schedule and My Vehicles */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Today's Schedule */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Today&apos;s Schedule</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                {todaySchedule.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                        {item.type === 'Check-in' ? 
                          <CheckCircle className="w-5 h-5 text-green-600" /> :
                          <AlertCircle className="w-5 h-5 text-orange-600" />
                        }
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.vehicle}</p>
                        <p className="text-sm text-gray-600">{item.customer} • {item.time}</p>
                      </div>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      item.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

            {/* My Vehicles */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">My Vehicles</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                {myVehicles.map((vehicle, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Car className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{vehicle.name}</p>
                        <p className="text-sm text-gray-600">{vehicle.plate} • {vehicle.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mb-1 ${
                        vehicle.status === 'available' 
                          ? 'bg-green-100 text-green-800'
                          : vehicle.status === 'rented'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {vehicle.status}
                      </span>
                      <p className="text-xs text-gray-500">Next: {vehicle.nextBooking}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Recent Messages</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
              {recentMessages.map((message, index) => (
                <div key={index} className="flex items-start justify-between border-b border-gray-100 pb-3 last:border-0">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-900">{message.sender}</p>
                        {message.priority === 'high' && (
                          <span className="inline-flex px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                            Urgent
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{message.message}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
              ))}
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
                onClick={handleProcessCheckIn}
                className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Process Check-in
              </button>
              <button 
                onClick={handleProcessCheckOut}
                className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <AlertCircle className="w-5 h-5 mr-2" />
                Process Check-out
              </button>
              <button 
                onClick={handleViewMessages}
                className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                View Messages
              </button>
              <button 
                onClick={handleVehicleStatus}
                className="flex items-center justify-center px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Car className="w-5 h-5 mr-2" />
                Vehicle Status
              </button>
            </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}

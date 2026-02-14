'use client'

import AuthGuard from '@/components/AuthGuard'
import DashboardLayout from '@/components/DashboardLayout'
import { Calendar, Search, Filter, Users, Car, CheckCircle, XCircle, Clock, MapPin, Phone, Mail, AlertTriangle, Check, X, Plus } from 'lucide-react'

export default function StaffReservationsPage() {
  const reservations = [
    {
      id: 1,
      customer: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      vehicle: 'Tesla Model 3',
      plate: 'ABC-123',
      type: 'Check-in',
      time: '09:00 AM',
      date: '2024-03-15',
      duration: '3 days',
      status: 'completed',
      pickupLocation: 'Downtown Branch',
      dropoffLocation: 'Downtown Branch',
      totalAmount: '$267',
      deposit: '$50',
      notes: 'Customer requested child seat',
      checkedInAt: '09:15 AM',
      checkedOutAt: '-'
    },
    {
      id: 2,
      customer: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      vehicle: 'BMW X5',
      plate: 'XYZ-789',
      type: 'Check-out',
      time: '10:30 AM',
      date: '2024-03-15',
      duration: '5 days',
      status: 'pending',
      pickupLocation: 'Airport Branch',
      dropoffLocation: 'Airport Branch',
      totalAmount: '$625',
      deposit: '$100',
      notes: 'Premium customer, provide extra service',
      checkedInAt: 'Mar 10, 2:00 PM',
      checkedOutAt: '-'
    },
    {
      id: 3,
      customer: 'Mike Davis',
      email: 'mike.davis@email.com',
      phone: '+1 (555) 456-7890',
      vehicle: 'Mercedes C-Class',
      plate: 'DEF-456',
      type: 'Check-in',
      time: '02:00 PM',
      date: '2024-03-15',
      duration: '2 days',
      status: 'pending',
      pickupLocation: 'Suburban Branch',
      dropoffLocation: 'Downtown Branch',
      totalAmount: '$190',
      deposit: '$40',
      notes: 'First-time customer, explain features',
      checkedInAt: '-',
      checkedOutAt: '-'
    },
    {
      id: 4,
      customer: 'Emma Wilson',
      email: 'emma.w@email.com',
      phone: '+1 (555) 321-6549',
      vehicle: 'Audi A4',
      plate: 'GHI-012',
      type: 'Check-out',
      time: '04:30 PM',
      date: '2024-03-15',
      duration: '3 days',
      status: 'pending',
      pickupLocation: 'Downtown Branch',
      dropoffLocation: 'Airport Branch',
      totalAmount: '$255',
      deposit: '$50',
      notes: 'Customer requested GPS',
      checkedInAt: 'Mar 12, 10:00 AM',
      checkedOutAt: '-'
    },
    {
      id: 5,
      customer: 'Robert Chen',
      email: 'robert.chen@email.com',
      phone: '+1 (555) 654-9876',
      vehicle: 'Tesla Model 3',
      plate: 'ABC-123',
      type: 'Check-out',
      time: '11:00 AM',
      date: '2024-03-14',
      duration: '2 days',
      status: 'completed',
      pickupLocation: 'Airport Branch',
      dropoffLocation: 'Airport Branch',
      totalAmount: '$178',
      deposit: '$0',
      notes: 'No special requests',
      checkedInAt: 'Mar 13, 11:00 AM',
      checkedOutAt: '11:30 AM'
    }
  ]

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      'in-progress': 'bg-blue-100 text-blue-800'
    }
    const icons = {
      completed: <CheckCircle className="w-3 h-3 mr-1" />,
      pending: <Clock className="w-3 h-3 mr-1" />,
      cancelled: <XCircle className="w-3 h-3 mr-1" />,
      'in-progress': <Users className="w-3 h-3 mr-1" />
    }
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getTypeBadge = (type: string) => {
    const styles = {
      'Check-in': 'bg-blue-100 text-blue-800',
      'Check-out': 'bg-green-100 text-green-800'
    }
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${styles[type as keyof typeof styles]}`}>
        {type}
      </span>
    )
  }

  const handleCheckIn = (reservationId: number) => {
    console.log(`Checking in reservation ${reservationId}`)
  }

  const handleCheckOut = (reservationId: number) => {
    console.log(`Checking out reservation ${reservationId}`)
  }

  return (
    <AuthGuard requiredRole="staff-user">
      <DashboardLayout role="staff-user" title="Reservations">
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reservations</h1>
              <p className="text-gray-600 mt-1">Manage check-ins and check-outs</p>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Calendar className="w-4 h-4 mr-2" />
                Calendar View
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                New Reservation
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-8 h-8 text-blue-600" />
                <span className="text-sm font-medium text-green-600">Today</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">8</h3>
              <p className="text-sm text-gray-600">Total Reservations</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <span className="text-sm font-medium text-green-600">Done</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">2</h3>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-yellow-600" />
                <span className="text-sm font-medium text-orange-600">Pending</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">6</h3>
              <p className="text-sm text-gray-600">To Process</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-purple-600" />
                <span className="text-sm font-medium text-blue-600">Active</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">14</h3>
              <p className="text-sm text-gray-600">Active Rentals</p>
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
                    placeholder="Search reservations..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <input
                  type="date"
                  defaultValue="2024-03-15"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Types</option>
                  <option value="check-in">Check-in</option>
                  <option value="check-out">Check-out</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </button>
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {reservations.map((reservation) => (
                <div key={reservation.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            reservation.type === 'Check-in' 
                              ? 'bg-blue-100' 
                              : 'bg-green-100'
                          }`}>
                            {reservation.type === 'Check-in' ? 
                              <CheckCircle className="w-5 h-5 text-blue-600" /> :
                              <Users className="w-5 h-5 text-green-600" />
                            }
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {reservation.customer}
                            </h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span>{reservation.time}</span>
                              <span>•</span>
                              <span>{reservation.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getTypeBadge(reservation.type)}
                          {getStatusBadge(reservation.status)}
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-3">
                          <Car className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{reservation.vehicle}</p>
                            <p className="text-xs text-gray-500">{reservation.plate}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{reservation.pickupLocation}</p>
                            {reservation.pickupLocation !== reservation.dropoffLocation && (
                              <p className="text-xs text-gray-500">Dropoff: {reservation.dropoffLocation}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-900">{reservation.phone}</p>
                            <p className="text-xs text-gray-500">{reservation.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Duration</p>
                          <p className="text-sm font-medium text-gray-900">{reservation.duration}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                          <p className="text-sm font-medium text-gray-900">{reservation.totalAmount}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Deposit</p>
                          <p className="text-sm font-medium text-gray-900">{reservation.deposit}</p>
                        </div>
                      </div>

                      {/* Notes */}
                      {reservation.notes && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                          <p className="text-sm text-blue-800">
                            <span className="font-medium">Notes:</span> {reservation.notes}
                          </p>
                        </div>
                      )}

                      {/* Timestamps */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div>
                          {reservation.checkedInAt && (
                            <span>Checked in: {reservation.checkedInAt}</span>
                          )}
                          {reservation.checkedOutAt && (
                            <span className="ml-4">Checked out: {reservation.checkedOutAt}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="ml-4 flex flex-col space-y-2">
                      {reservation.status === 'pending' && reservation.type === 'Check-in' && (
                        <button
                          onClick={() => handleCheckIn(reservation.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          Check In
                        </button>
                      )}
                      {reservation.status === 'pending' && reservation.type === 'Check-out' && (
                        <button
                          onClick={() => handleCheckOut(reservation.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          Check Out
                        </button>
                      )}
                      {reservation.status === 'completed' && (
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                            <Check className="w-3 h-3" />
                          </button>
                          <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Urgent Alert */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-800">
                <p className="font-medium mb-1">Urgent: Sarah Johnson Check-out</p>
                <p>Customer is running 15 minutes late for check-out. Please follow up with the customer.</p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}

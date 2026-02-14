'use client'

import AuthGuard from '@/components/AuthGuard'
import DashboardLayout from '@/components/DashboardLayout'
import Pagination from '@/components/Pagination'
import { Calendar, Plus, Search, Filter, Eye, Edit, CheckCircle, XCircle, Clock, Users, Car, DollarSign, MapPin, AlertTriangle, Download } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { exportBookings } from '@/utils/exportUtils'

export default function BookingsPage() {
  const router = useRouter()
  
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const bookings = [
    {
      id: 1,
      customer: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      vehicle: 'Tesla Model 3',
      plate: 'ABC-123',
      dates: '2024-03-15 to 2024-03-18',
      duration: '3 days',
      status: 'confirmed',
      totalAmount: '$267',
      deposit: '$50',
      pickupLocation: 'Downtown Branch',
      dropoffLocation: 'Downtown Branch',
      bookingDate: '2024-03-10',
      specialRequests: 'Child seat required'
    },
    {
      id: 2,
      customer: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      vehicle: 'BMW X5',
      plate: 'XYZ-789',
      dates: '2024-03-20 to 2024-03-25',
      duration: '5 days',
      status: 'pending',
      totalAmount: '$625',
      deposit: '$100',
      pickupLocation: 'Airport Branch',
      dropoffLocation: 'Airport Branch',
      bookingDate: '2024-03-12',
      specialRequests: 'GPS navigation'
    },
    {
      id: 3,
      customer: 'Mike Davis',
      email: 'mike.davis@email.com',
      phone: '+1 (555) 456-7890',
      vehicle: 'Mercedes C-Class',
      plate: 'DEF-456',
      dates: '2024-03-22 to 2024-03-24',
      duration: '2 days',
      status: 'confirmed',
      totalAmount: '$190',
      deposit: '$40',
      pickupLocation: 'Suburban Branch',
      dropoffLocation: 'Downtown Branch',
      bookingDate: '2024-03-11',
      specialRequests: 'None'
    },
    {
      id: 4,
      customer: 'Emma Wilson',
      email: 'emma.w@email.com',
      phone: '+1 (555) 321-6549',
      vehicle: 'Audi A4',
      plate: 'GHI-012',
      dates: '2024-03-25 to 2024-03-28',
      duration: '3 days',
      status: 'pending',
      totalAmount: '$255',
      deposit: '$50',
      pickupLocation: 'Downtown Branch',
      dropoffLocation: 'Airport Branch',
      bookingDate: '2024-03-13',
      specialRequests: 'Premium insurance'
    },
    {
      id: 5,
      customer: 'Robert Chen',
      email: 'robert.chen@email.com',
      phone: '+1 (555) 654-9876',
      vehicle: 'Tesla Model 3',
      plate: 'ABC-123',
      dates: '2024-03-18 to 2024-03-20',
      duration: '2 days',
      status: 'cancelled',
      totalAmount: '$178',
      deposit: '$0',
      pickupLocation: 'Airport Branch',
      dropoffLocation: 'Airport Branch',
      bookingDate: '2024-03-08',
      specialRequests: 'None'
    }
  ]

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = bookings.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(bookings.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleExportPDF = () => {
    exportBookings(bookings, 'pdf')
  }

  const handleExportCSV = () => {
    exportBookings(bookings, 'csv')
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800'
    }
    const icons = {
      confirmed: <CheckCircle className="w-3 h-3 mr-1" />,
      pending: <Clock className="w-3 h-3 mr-1" />,
      cancelled: <XCircle className="w-3 h-3 mr-1" />,
      completed: <CheckCircle className="w-3 h-3 mr-1" />
    }
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  return (
    <AuthGuard requiredRole="business-admin">
      <DashboardLayout role="business-admin" title="Bookings">
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
              <p className="text-gray-600 mt-1">Manage customer bookings and reservations</p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <button 
                  onClick={handleExportPDF}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
              <button 
                onClick={() => router.push('/dashboard/business-admin/bookings/add')}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Booking
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-8 h-8 text-blue-600" />
                <span className="text-sm font-medium text-green-600">+15%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">324</h3>
              <p className="text-sm text-gray-600">Total Bookings</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <span className="text-sm font-medium text-green-600">+12%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">267</h3>
              <p className="text-sm text-gray-600">Confirmed</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-yellow-600" />
                <span className="text-sm font-medium text-red-600">+8%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">45</h3>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-8 h-8 text-orange-600" />
                <span className="text-sm font-medium text-green-600">+22%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">$28.4K</h3>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
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
                    placeholder="Search bookings..."
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
                  <option value="">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Vehicles</option>
                  <option value="tesla-model-3">Tesla Model 3</option>
                  <option value="bmw-x5">BMW X5</option>
                  <option value="mercedes-c-class">Mercedes C-Class</option>
                </select>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </button>
              </div>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Locations</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{booking.customer}</div>
                          <div className="text-sm text-gray-500">{booking.email}</div>
                          <div className="text-sm text-gray-500">{booking.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Car className="w-4 h-4 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{booking.vehicle}</div>
                            <div className="text-sm text-gray-500">{booking.plate}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.dates}</div>
                        <div className="text-sm text-gray-500">{booking.duration}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(booking.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.totalAmount}</div>
                        <div className="text-sm text-gray-500">Deposit: {booking.deposit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                            {booking.pickupLocation}
                          </div>
                          {booking.pickupLocation !== booking.dropoffLocation && (
                            <div className="flex items-center text-xs text-gray-500">
                              <MapPin className="w-3 h-3 mr-1" />
                              {booking.dropoffLocation}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={bookings.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>

          {/* Special Requests Alert */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Pending Special Requests</p>
                <div className="space-y-1">
                  <p>• John Smith - Child seat required</p>
                  <p>• Sarah Johnson - GPS navigation</p>
                  <p>• Emma Wilson - Premium insurance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}

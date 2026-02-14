'use client'

import AuthGuard from '@/components/AuthGuard'
import DashboardLayout from '@/components/DashboardLayout'
import ConfirmDialog from '@/components/ConfirmDialog'
import Pagination from '@/components/Pagination'
import { Car, Plus, Search, Filter, Edit, Trash2, Eye, Calendar, DollarSign, Users, CheckCircle, XCircle, Clock, Star, MapPin, Fuel, Settings, Download } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { exportVehicles } from '@/utils/exportUtils'

export default function VehicleListingsPage() {
  const router = useRouter()
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    title: string
    message: string
    onConfirm: () => void
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  })
  
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const vehicles = [
    {
      id: 1,
      make: 'Tesla',
      model: 'Model 3',
      year: 2023,
      plate: 'ABC-123',
      vin: '5YJ3E1EA5MF123456',
      type: 'Sedan',
      status: 'available',
      location: 'Downtown Branch',
      price: '$89/day',
      rating: 4.9,
      totalBookings: 45,
      revenue: '$12,340',
      features: ['Electric', 'Autopilot', 'Premium Sound'],
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      make: 'BMW',
      model: 'X5',
      year: 2023,
      plate: 'XYZ-789',
      vin: '5UXCR6C55M9B12345',
      type: 'SUV',
      status: 'rented',
      location: 'Airport Branch',
      price: '$125/day',
      rating: 4.8,
      totalBookings: 38,
      revenue: '$15,670',
      features: ['Luxury', 'AWD', 'Leather Seats'],
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      make: 'Mercedes',
      model: 'C-Class',
      year: 2022,
      plate: 'DEF-456',
      vin: 'WDDGF4CB5NR123456',
      type: 'Sedan',
      status: 'maintenance',
      location: 'Service Center',
      price: '$95/day',
      rating: 4.7,
      totalBookings: 32,
      revenue: '$9,890',
      features: ['Premium', 'Navigation', 'Sunroof'],
      image: '/api/placeholder/300/200'
    },
    {
      id: 4,
      make: 'Audi',
      model: 'A4',
      year: 2023,
      plate: 'GHI-012',
      vin: 'WAUACAF48PA123456',
      type: 'Sedan',
      status: 'available',
      location: 'Suburban Branch',
      price: '$85/day',
      rating: 4.6,
      totalBookings: 28,
      revenue: '$8,450',
      features: ['Quattro AWD', 'Virtual Cockpit', 'Bang & Olufsen'],
      image: '/api/placeholder/300/200'
    }
  ]

  const handleDeleteVehicle = (vehicle: typeof vehicles[0]) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Vehicle',
      message: `Are you sure you want to delete ${vehicle.make} ${vehicle.model}? This action cannot be undone.`,
      onConfirm: () => {
        console.log('Deleting vehicle:', vehicle.id)
        // Handle delete logic here
        setConfirmDialog({ ...confirmDialog, isOpen: false })
      }
    })
  }

  const closeConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, isOpen: false })
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = vehicles.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(vehicles.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleExportPDF = () => {
    exportVehicles(vehicles, 'pdf')
  }

  const handleExportCSV = () => {
    exportVehicles(vehicles, 'csv')
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      available: 'bg-green-100 text-green-800',
      rented: 'bg-blue-100 text-blue-800',
      maintenance: 'bg-orange-100 text-orange-800',
      retired: 'bg-gray-100 text-gray-800'
    }
    const icons = {
      available: <CheckCircle className="w-3 h-3 mr-1" />,
      rented: <Users className="w-3 h-3 mr-1" />,
      maintenance: <Settings className="w-3 h-3 mr-1" />,
      retired: <XCircle className="w-3 h-3 mr-1" />
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
      <DashboardLayout role="business-admin" title="Vehicle Listings">
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Vehicle Listings</h1>
              <p className="text-gray-600 mt-1">Manage your vehicle fleet and availability</p>
            </div>
            <button 
              onClick={() => router.push('/dashboard/business-admin/vehicles/add')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Vehicle
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <Car className="w-8 h-8 text-blue-600" />
                <span className="text-sm font-medium text-green-600">+8%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">48</h3>
              <p className="text-sm text-gray-600">Total Vehicles</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <span className="text-sm font-medium text-green-600">+12%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">32</h3>
              <p className="text-sm text-gray-600">Available</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-purple-600" />
                <span className="text-sm font-medium text-green-600">+15%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">14</h3>
              <p className="text-sm text-gray-600">Currently Rented</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-8 h-8 text-orange-600" />
                <span className="text-sm font-medium text-green-600">+22%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">$46.3K</h3>
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
                    placeholder="Search vehicles..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Types</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="truck">Truck</option>
                  <option value="van">Van</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Status</option>
                  <option value="available">Available</option>
                  <option value="rented">Rented</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="retired">Retired</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Locations</option>
                  <option value="downtown">Downtown Branch</option>
                  <option value="airport">Airport Branch</option>
                  <option value="suburban">Suburban Branch</option>
                </select>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </button>
                <button 
                  onClick={handleExportPDF}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                  title="Export as PDF"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </button>
                <button 
                  onClick={handleExportCSV}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                  title="Export as CSV"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Vehicles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentItems.map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Vehicle Image */}
                <div className="relative h-48 bg-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Car className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="absolute top-2 right-2">
                    {getStatusBadge(vehicle.status)}
                  </div>
                  <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded-lg shadow-sm">
                    <span className="text-sm font-medium text-gray-900">{vehicle.price}</span>
                  </div>
                </div>

                {/* Vehicle Details */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h3>
                      <p className="text-sm text-gray-500">{vehicle.type}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-900">{vehicle.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {vehicle.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {vehicle.totalBookings} bookings
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      {vehicle.revenue} revenue
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {vehicle.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        {feature}
                      </span>
                    ))}
                    {vehicle.features.length > 2 && (
                      <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        +{vehicle.features.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      Plate: {vehicle.plate}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => router.push(`/dashboard/business-admin/vehicles/${vehicle.id}`)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => router.push(`/dashboard/business-admin/vehicles/${vehicle.id}/edit`)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteVehicle(vehicle)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={vehicles.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </DashboardLayout>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={closeConfirmDialog}
      />
    </AuthGuard>
  )
}

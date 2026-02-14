'use client'

import AuthGuard from '@/components/AuthGuard'
import DashboardLayout from '@/components/DashboardLayout'
import { Car, Search, Filter, MapPin, Calendar, Users, CheckCircle, AlertTriangle, Clock, Settings, Eye, Edit, Fuel, Star } from 'lucide-react'

export default function StaffVehiclesPage() {
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
      fuelLevel: '85%',
      mileage: '12,450',
      lastService: '2024-02-15',
      nextService: '2024-05-15',
      condition: 'Excellent',
      features: ['Electric', 'Autopilot', 'Premium Sound'],
      assignedDate: '2024-01-15'
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
      location: 'With Customer',
      fuelLevel: '45%',
      mileage: '18,230',
      lastService: '2024-02-20',
      nextService: '2024-05-20',
      condition: 'Good',
      features: ['Luxury', 'AWD', 'Leather Seats'],
      assignedDate: '2024-01-20'
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
      fuelLevel: '60%',
      mileage: '22,100',
      lastService: '2024-03-10',
      nextService: '2024-03-10',
      condition: 'Under Service',
      features: ['Premium', 'Navigation', 'Sunroof'],
      assignedDate: '2024-02-01'
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
      location: 'Airport Branch',
      fuelLevel: '92%',
      mileage: '8,760',
      lastService: '2024-02-25',
      nextService: '2024-05-25',
      condition: 'Excellent',
      features: ['Quattro AWD', 'Virtual Cockpit', 'Bang & Olufsen'],
      assignedDate: '2024-02-15'
    }
  ]

  const getStatusBadge = (status: string) => {
    const styles = {
      available: 'bg-green-100 text-green-800',
      rented: 'bg-blue-100 text-blue-800',
      maintenance: 'bg-orange-100 text-orange-800',
      cleaning: 'bg-purple-100 text-purple-800'
    }
    const icons = {
      available: <CheckCircle className="w-3 h-3 mr-1" />,
      rented: <Users className="w-3 h-3 mr-1" />,
      maintenance: <Settings className="w-3 h-3 mr-1" />,
      cleaning: <Clock className="w-3 h-3 mr-1" />
    }
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getConditionBadge = (condition: string) => {
    const styles = {
      'Excellent': 'bg-green-100 text-green-800',
      'Good': 'bg-blue-100 text-blue-800',
      'Fair': 'bg-yellow-100 text-yellow-800',
      'Under Service': 'bg-orange-100 text-orange-800'
    }
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${styles[condition as keyof typeof styles]}`}>
        {condition}
      </span>
    )
  }

  return (
    <AuthGuard requiredRole="staff-user">
      <DashboardLayout role="staff-user" title="My Vehicles">
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Vehicles</h1>
              <p className="text-gray-600 mt-1">Manage vehicles assigned to you</p>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Car className="w-4 h-4 mr-2" />
                Request Vehicle
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <Car className="w-8 h-8 text-blue-600" />
                <span className="text-sm font-medium text-gray-500">Total</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">12</h3>
              <p className="text-sm text-gray-600">Assigned Vehicles</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <span className="text-sm font-medium text-green-600">+2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">8</h3>
              <p className="text-sm text-gray-600">Available</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-purple-600" />
                <span className="text-sm font-medium text-blue-600">-1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">3</h3>
              <p className="text-sm text-gray-600">Currently Rented</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <Settings className="w-8 h-8 text-orange-600" />
                <span className="text-sm font-medium text-orange-600">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">1</h3>
              <p className="text-sm text-gray-600">In Maintenance</p>
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
                  <option value="">All Status</option>
                  <option value="available">Available</option>
                  <option value="rented">Rented</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="cleaning">Cleaning</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Locations</option>
                  <option value="downtown">Downtown Branch</option>
                  <option value="airport">Airport Branch</option>
                  <option value="suburban">Suburban Branch</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Types</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="truck">Truck</option>
                </select>
              </div>
            </div>
          </div>

          {/* Vehicles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Vehicle Header */}
                <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-600">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Car className="w-16 h-16 text-white opacity-50" />
                  </div>
                  <div className="absolute top-3 right-3">
                    {getStatusBadge(vehicle.status)}
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <h3 className="text-lg font-bold text-white">
                      {vehicle.year} {vehicle.make}
                    </h3>
                    <p className="text-blue-100">{vehicle.model}</p>
                  </div>
                </div>

                {/* Vehicle Details */}
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Plate</p>
                      <p className="text-sm font-medium text-gray-900">{vehicle.plate}</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Type</p>
                      <p className="text-sm font-medium text-gray-900">{vehicle.type}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Location:</span>
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                        <span className="text-gray-900">{vehicle.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Fuel Level:</span>
                      <div className="flex items-center">
                        <Fuel className="w-3 h-3 mr-1 text-gray-400" />
                        <span className="text-gray-900">{vehicle.fuelLevel}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Mileage:</span>
                      <span className="text-gray-900">{vehicle.mileage} mi</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Condition:</span>
                      {getConditionBadge(vehicle.condition)}
                    </div>
                  </div>

                  {/* Service Info */}
                  <div className="border-t border-gray-100 pt-3 mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Last Service: {vehicle.lastService}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Next Service:</span>
                      <span className={`font-medium ${
                        new Date(vehicle.nextService) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
                          ? 'text-orange-600' 
                          : 'text-gray-900'
                      }`}>
                        {vehicle.nextService}
                      </span>
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
                      Assigned: {vehicle.assignedDate}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Service Alerts */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-orange-800">
                <p className="font-medium mb-1">Service Due</p>
                <p>Mercedes C-Class (DEF-456) is scheduled for service today. Please coordinate with the service center.</p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}

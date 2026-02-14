'use client'

import AuthGuard from '@/components/AuthGuard'
import DashboardLayout from '@/components/DashboardLayout'
import { Calendar, Plus, ArrowLeft, Save, Search, Users, Car, MapPin, DollarSign, Clock, CheckCircle, AlertTriangle, FileText } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddBookingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    customerId: '',
    vehicleId: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    pickupLocation: 'downtown',
    returnLocation: 'downtown',
    bookingType: 'rental',
    status: 'pending',
    totalAmount: '',
    depositAmount: '',
    paymentMethod: 'credit-card',
    paymentStatus: 'pending',
    driverInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      licenseNumber: '',
      licenseExpiry: '',
      dateOfBirth: '',
      address: ''
    },
    additionalServices: {
      insurance: false,
      gps: false,
      childSeat: false,
      additionalDriver: false,
      roadsideAssistance: false
    },
    specialRequests: '',
    notes: ''
  })

  const [searchCustomer, setSearchCustomer] = useState('')
  const [searchVehicle, setSearchVehicle] = useState('')
  const [showCustomerResults, setShowCustomerResults] = useState(false)
  const [showVehicleResults, setShowVehicleResults] = useState(false)

  const mockCustomers = [
    { id: '1', name: 'John Smith', email: 'john.smith@email.com', phone: '+1 (555) 123-4567', license: 'DL123456' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1 (555) 987-6543', license: 'DL789012' },
    { id: '3', name: 'Mike Davis', email: 'mike.davis@email.com', phone: '+1 (555) 456-7890', license: 'DL345678' },
    { id: '4', name: 'Emma Wilson', email: 'emma.w@email.com', phone: '+1 (555) 321-6549', license: 'DL901234' }
  ]

  const mockVehicles = [
    { id: '1', make: 'Tesla', model: 'Model 3', year: 2023, plate: 'ABC-123', type: 'Sedan', dailyRate: 89, status: 'available', location: 'Downtown Branch' },
    { id: '2', make: 'BMW', model: 'X5', year: 2023, plate: 'XYZ-789', type: 'SUV', dailyRate: 125, status: 'available', location: 'Airport Branch' },
    { id: '3', make: 'Mercedes', model: 'C-Class', year: 2022, plate: 'DEF-456', type: 'Sedan', dailyRate: 95, status: 'maintenance', location: 'Service Center' },
    { id: '4', make: 'Audi', model: 'A4', year: 2023, plate: 'GHI-012', type: 'Sedan', dailyRate: 85, status: 'available', location: 'Suburban Branch' }
  ]

  const locations = [
    { value: 'downtown', label: 'Downtown Branch' },
    { value: 'airport', label: 'Airport Branch' },
    { value: 'suburban', label: 'Suburban Branch' }
  ]

  const bookingTypes = [
    { value: 'rental', label: 'Rental' },
    { value: 'lease', label: 'Long-term Lease' },
    { value: 'corporate', label: 'Corporate Rental' }
  ]

  const paymentMethods = [
    { value: 'credit-card', label: 'Credit Card' },
    { value: 'debit-card', label: 'Debit Card' },
    { value: 'cash', label: 'Cash' },
    { value: 'bank-transfer', label: 'Bank Transfer' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement
      if (name.startsWith('additionalServices.')) {
        const service = name.split('.')[1]
        setFormData(prev => ({
          ...prev,
          additionalServices: {
            ...prev.additionalServices,
            [service]: checkbox.checked
          }
        }))
      } else if (name.startsWith('driverInfo.')) {
        const field = name.split('.')[1]
        setFormData(prev => ({
          ...prev,
          driverInfo: {
            ...prev.driverInfo,
            [field]: value
          }
        }))
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checkbox.checked
        }))
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const calculateTotal = () => {
    if (formData.pickupDate && formData.returnDate && formData.vehicleId) {
      const pickup = new Date(formData.pickupDate)
      const returnDate = new Date(formData.returnDate)
      const days = Math.ceil((returnDate.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24))
      
      const vehicle = mockVehicles.find(v => v.id === formData.vehicleId)
      if (vehicle && days > 0) {
        let total = vehicle.dailyRate * days
        
        // Add additional services
        if (formData.additionalServices.insurance) total += 25 * days
        if (formData.additionalServices.gps) total += 10 * days
        if (formData.additionalServices.childSeat) total += 15 * days
        if (formData.additionalServices.additionalDriver) total += 20 * days
        if (formData.additionalServices.roadsideAssistance) total += 8 * days
        
        return total
      }
    }
    return 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const total = calculateTotal()
    const bookingData = {
      ...formData,
      totalAmount: total.toString(),
      depositAmount: (total * 0.2).toString()
    }
    console.log('Booking data:', bookingData)
    // Handle form submission
    router.push('/dashboard/business-admin/bookings')
  }

  const selectCustomer = (customer: typeof mockCustomers[0]) => {
    setFormData(prev => ({
      ...prev,
      customerId: customer.id,
      driverInfo: {
        ...prev.driverInfo,
        firstName: customer.name.split(' ')[0],
        lastName: customer.name.split(' ')[1],
        email: customer.email,
        phone: customer.phone,
        licenseNumber: customer.license
      }
    }))
    setSearchCustomer(customer.name)
    setShowCustomerResults(false)
  }

  const selectVehicle = (vehicle: typeof mockVehicles[0]) => {
    setFormData(prev => ({
      ...prev,
      vehicleId: vehicle.id
    }))
    setSearchVehicle(`${vehicle.year} ${vehicle.make} ${vehicle.model}`)
    setShowVehicleResults(false)
  }

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchCustomer.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchCustomer.toLowerCase())
  )

  const filteredVehicles = mockVehicles.filter(vehicle =>
    vehicle.make.toLowerCase().includes(searchVehicle.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchVehicle.toLowerCase()) ||
    vehicle.plate.toLowerCase().includes(searchVehicle.toLowerCase())
  )

  return (
    <AuthGuard requiredRole="business-admin">
      <DashboardLayout role="business-admin" title="Add Booking">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Bookings
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">New Booking</h1>
                <p className="text-gray-600 dark:text-gray-400">Create a new vehicle rental booking</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Customer Information
              </h2>
              
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Search Customer *
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchCustomer}
                      onChange={(e) => {
                        setSearchCustomer(e.target.value)
                        setShowCustomerResults(true)
                      }}
                      onFocus={() => setShowCustomerResults(true)}
                      placeholder="Search by name or email..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  {showCustomerResults && searchCustomer && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {filteredCustomers.map(customer => (
                        <div
                          key={customer.id}
                          onClick={() => selectCustomer(customer)}
                          className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-0"
                        >
                          <div className="font-medium text-gray-900 dark:text-white">{customer.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{customer.email}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{customer.phone}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {formData.customerId && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="driverInfo.firstName"
                        value={formData.driverInfo.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="driverInfo.lastName"
                        value={formData.driverInfo.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="driverInfo.email"
                        value={formData.driverInfo.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="driverInfo.phone"
                        value={formData.driverInfo.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        License Number *
                      </label>
                      <input
                        type="text"
                        name="driverInfo.licenseNumber"
                        value={formData.driverInfo.licenseNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        License Expiry *
                      </label>
                      <input
                        type="date"
                        name="driverInfo.licenseExpiry"
                        value={formData.driverInfo.licenseExpiry}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Vehicle Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Car className="w-5 h-5 mr-2" />
                Vehicle Selection
              </h2>
              
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Search Vehicle *
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchVehicle}
                      onChange={(e) => {
                        setSearchVehicle(e.target.value)
                        setShowVehicleResults(true)
                      }}
                      onFocus={() => setShowVehicleResults(true)}
                      placeholder="Search by make, model, or plate..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  {showVehicleResults && searchVehicle && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {filteredVehicles.map(vehicle => (
                        <div
                          key={vehicle.id}
                          onClick={() => vehicle.status === 'available' && selectVehicle(vehicle)}
                          className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-0 ${
                            vehicle.status !== 'available' ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {vehicle.year} {vehicle.make} {vehicle.model}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {vehicle.type} • {vehicle.plate} • ${vehicle.dailyRate}/day
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{vehicle.location}</div>
                            </div>
                            <div className={`px-2 py-1 text-xs rounded-full ${
                              vehicle.status === 'available' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {vehicle.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Booking Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pickup Date *
                  </label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pickup Time *
                  </label>
                  <input
                    type="time"
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Return Date *
                  </label>
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    required
                    min={formData.pickupDate || new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Return Time *
                  </label>
                  <input
                    type="time"
                    name="returnTime"
                    value={formData.returnTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pickup Location *
                  </label>
                  <select
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {locations.map(location => (
                      <option key={location.value} value={location.value}>
                        {location.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Return Location *
                  </label>
                  <select
                    name="returnLocation"
                    value={formData.returnLocation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {locations.map(location => (
                      <option key={location.value} value={location.value}>
                        {location.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Booking Type *
                  </label>
                  <select
                    name="bookingType"
                    value={formData.bookingType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {bookingTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Payment Method *
                  </label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {paymentMethods.map(method => (
                      <option key={method.value} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Services */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Additional Services
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(formData.additionalServices).map(([service, enabled]) => (
                  <div key={service} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={`additionalServices.${service}`}
                      checked={enabled}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                    />
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {service.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Pricing Summary
              </h2>
              
              <div className="space-y-4">
                {formData.pickupDate && formData.returnDate && formData.vehicleId && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      <p className="font-medium">Estimated Total: ${calculateTotal()}</p>
                      <p className="text-xs mt-1">Required Deposit: ${(calculateTotal() * 0.2).toFixed(2)}</p>
                    </div>
                  </div>
                )}
                
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p>• Final price will be calculated based on rental duration and selected services</p>
                  <p>• Deposit (20% of total) is required at booking confirmation</p>
                  <p>• Additional charges may apply for late returns or damages</p>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Special Requests & Notes
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any special requests or requirements..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Internal Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Internal notes for staff (not visible to customer)"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Create Booking
              </button>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}

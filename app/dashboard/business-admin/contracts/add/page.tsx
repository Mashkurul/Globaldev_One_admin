'use client'

import AuthGuard from '@/components/AuthGuard'
import DashboardLayout from '@/components/DashboardLayout'
import { FileText, Plus, ArrowLeft, Save, Search, Users, Car, Calendar, DollarSign, CheckCircle, AlertTriangle, Download, MapPin } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddContractPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    contractNumber: '',
    customerId: '',
    vehicleId: '',
    contractType: 'rental',
    status: 'draft',
    startDate: '',
    endDate: '',
    duration: '',
    totalAmount: '',
    depositAmount: '',
    securityDeposit: '',
    monthlyPayment: '',
    paymentFrequency: 'monthly',
    nextPaymentDate: '',
    signedDate: '',
    autoRenew: false,
    renewalTerms: '',
    pickupLocation: 'downtown',
    returnLocation: 'downtown',
    terms: {
      mileageLimit: 1000,
      mileageFee: 0.25,
      lateFee: 50,
      cancellationFee: 100,
      insuranceDeductible: 500,
      maintenanceResponsibility: 'lessee'
    },
    documents: {
      rentalAgreement: '',
      insuranceForm: '',
      driverLicense: '',
      creditReport: '',
      backgroundCheck: ''
    },
    notes: ''
  })

  const [searchCustomer, setSearchCustomer] = useState('')
  const [searchVehicle, setSearchVehicle] = useState('')
  const [showCustomerResults, setShowCustomerResults] = useState(false)
  const [showVehicleResults, setShowVehicleResults] = useState(false)

  const mockCustomers = [
    { id: '1', name: 'John Smith', email: 'john.smith@email.com', phone: '+1 (555) 123-4567', license: 'DL123456', creditScore: 750 },
    { id: '2', name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1 (555) 987-6543', license: 'DL789012', creditScore: 680 },
    { id: '3', name: 'Mike Davis', email: 'mike.davis@email.com', phone: '+1 (555) 456-7890', license: 'DL345678', creditScore: 720 },
    { id: '4', name: 'Emma Wilson', email: 'emma.w@email.com', phone: '+1 (555) 321-6549', license: 'DL901234', creditScore: 810 }
  ]

  const mockVehicles = [
    { id: '1', make: 'Tesla', model: 'Model 3', year: 2023, plate: 'ABC-123', type: 'Sedan', monthlyRate: 1899, status: 'available', location: 'Downtown Branch' },
    { id: '2', make: 'BMW', model: 'X5', year: 2023, plate: 'XYZ-789', type: 'SUV', monthlyRate: 2499, status: 'available', location: 'Airport Branch' },
    { id: '3', make: 'Mercedes', model: 'C-Class', year: 2022, plate: 'DEF-456', type: 'Sedan', monthlyRate: 1699, status: 'available', location: 'Suburban Branch' },
    { id: '4', make: 'Audi', model: 'A4', year: 2023, plate: 'GHI-012', type: 'Sedan', monthlyRate: 1599, status: 'available', location: 'Downtown Branch' }
  ]

  const contractTypes = [
    { value: 'rental', label: 'Rental Agreement', duration: 'Daily/Weekly' },
    { value: 'lease', label: 'Long-term Lease', duration: 'Monthly/Yearly' },
    { value: 'corporate', label: 'Corporate Contract', duration: 'Custom' },
    { value: 'service', label: 'Service Contract', duration: 'Fixed Term' }
  ]

  const contractStatuses = [
    { value: 'draft', label: 'Draft', color: 'gray' },
    { value: 'pending', label: 'Pending Signature', color: 'yellow' },
    { value: 'active', label: 'Active', color: 'green' },
    { value: 'expired', label: 'Expired', color: 'red' },
    { value: 'terminated', label: 'Terminated', color: 'red' }
  ]

  const locations = [
    { value: 'downtown', label: 'Downtown Branch' },
    { value: 'airport', label: 'Airport Branch' },
    { value: 'suburban', label: 'Suburban Branch' }
  ]

  const paymentFrequencies = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement
      if (name.startsWith('terms.')) {
        const term = name.split('.')[1]
        setFormData(prev => ({
          ...prev,
          terms: {
            ...prev.terms,
            [term]: checkbox.checked
          }
        }))
      } else if (name.startsWith('documents.')) {
        const doc = name.split('.')[1]
        setFormData(prev => ({
          ...prev,
          documents: {
            ...prev.documents,
            [doc]: value
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
      
      // Auto-calculate duration and amounts
      if (name === 'startDate' || name === 'endDate') {
        calculateDuration()
      }
      if (name === 'contractType' || name === 'duration') {
        calculateAmounts()
      }
    }
  }

  const calculateDuration = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      
      let duration = ''
      if (days < 7) {
        duration = `${days} days`
      } else if (days < 30) {
        const weeks = Math.floor(days / 7)
        const remainingDays = days % 7
        duration = remainingDays > 0 ? `${weeks} weeks, ${remainingDays} days` : `${weeks} weeks`
      } else {
        const months = Math.floor(days / 30)
        const remainingDays = days % 30
        duration = remainingDays > 0 ? `${months} months, ${remainingDays} days` : `${months} months`
      }
      
      setFormData(prev => ({ ...prev, duration }))
    }
  }

  const calculateAmounts = () => {
    if (formData.vehicleId && formData.duration) {
      const vehicle = mockVehicles.find(v => v.id === formData.vehicleId)
      if (vehicle) {
        let totalAmount = 0
        let monthlyPayment = 0
        
        if (formData.contractType === 'rental') {
          // For rental, use daily rate
          const dailyRate = vehicle.monthlyRate / 30
          const days = parseInt(formData.duration) || 1
          totalAmount = dailyRate * days
        } else if (formData.contractType === 'lease') {
          // For lease, use monthly rate
          const months = parseInt(formData.duration) || 1
          totalAmount = vehicle.monthlyRate * months
          monthlyPayment = vehicle.monthlyRate
        }
        
        setFormData(prev => ({
          ...prev,
          totalAmount: totalAmount.toString(),
          monthlyPayment: monthlyPayment.toString(),
          depositAmount: (totalAmount * 0.2).toString(),
          securityDeposit: (vehicle.monthlyRate * 0.5).toString()
        }))
      }
    }
  }

  const generateContractNumber = () => {
    const year = new Date().getFullYear()
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `CT-${year}-${random}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const contractData = {
      ...formData,
      contractNumber: formData.contractNumber || generateContractNumber()
    }
    console.log('Contract data:', contractData)
    // Handle form submission
    router.push('/dashboard/business-admin/contracts')
  }

  const selectCustomer = (customer: typeof mockCustomers[0]) => {
    setFormData(prev => ({
      ...prev,
      customerId: customer.id
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
    calculateAmounts()
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
      <DashboardLayout role="business-admin" title="Add Contract">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Contracts
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">New Contract</h1>
                <p className="text-gray-600 dark:text-gray-400">Create a new rental agreement or contract</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contract Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Contract Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contract Number
                  </label>
                  <input
                    type="text"
                    name="contractNumber"
                    value={formData.contractNumber}
                    onChange={handleInputChange}
                    placeholder={generateContractNumber()}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contract Type *
                  </label>
                  <select
                    name="contractType"
                    value={formData.contractType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {contractTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label} ({type.duration})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {contractStatuses.map(status => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Payment Frequency *
                  </label>
                  <select
                    name="paymentFrequency"
                    value={formData.paymentFrequency}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {paymentFrequencies.map(freq => (
                      <option key={freq.value} value={freq.value}>
                        {freq.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Parties */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Contract Parties
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Customer *
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
                          <div className="text-sm text-gray-500 dark:text-gray-400">Credit Score: {customer.creditScore}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Vehicle *
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
                          onClick={() => selectVehicle(vehicle)}
                          className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-0"
                        >
                          <div className="font-medium text-gray-900 dark:text-white">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {vehicle.type} • {vehicle.plate} • ${vehicle.monthlyRate}/month
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contract Period */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Contract Period
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                    min={formData.startDate || new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
                    placeholder="Auto-calculated"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Signed Date
                  </label>
                  <input
                    type="date"
                    name="signedDate"
                    value={formData.signedDate}
                    onChange={handleInputChange}
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
                    Next Payment Date
                  </label>
                  <input
                    type="date"
                    name="nextPaymentDate"
                    value={formData.nextPaymentDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="autoRenew"
                    checked={formData.autoRenew}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Auto-renew contract
                  </label>
                </div>
              </div>
            </div>

            {/* Financial Terms */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Financial Terms
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Total Amount *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      name="totalAmount"
                      value={formData.totalAmount}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deposit Amount *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      name="depositAmount"
                      value={formData.depositAmount}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Security Deposit
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      name="securityDeposit"
                      value={formData.securityDeposit}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Monthly Payment
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      name="monthlyPayment"
                      value={formData.monthlyPayment}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                {formData.autoRenew && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Renewal Terms
                    </label>
                    <textarea
                      name="renewalTerms"
                      value={formData.renewalTerms}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Specify renewal conditions and terms..."
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Terms & Conditions
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mileage Limit (per month)
                  </label>
                  <input
                    type="number"
                    name="terms.mileageLimit"
                    value={formData.terms.mileageLimit}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Excess Mileage Fee ($/mile)
                  </label>
                  <input
                    type="number"
                    name="terms.mileageFee"
                    value={formData.terms.mileageFee}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Late Fee ($)
                  </label>
                  <input
                    type="number"
                    name="terms.lateFee"
                    value={formData.terms.lateFee}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cancellation Fee ($)
                  </label>
                  <input
                    type="number"
                    name="terms.cancellationFee"
                    value={formData.terms.cancellationFee}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Insurance Deductible ($)
                  </label>
                  <input
                    type="number"
                    name="terms.insuranceDeductible"
                    value={formData.terms.insuranceDeductible}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Maintenance Responsibility
                  </label>
                  <select
                    name="terms.maintenanceResponsibility"
                    value={formData.terms.maintenanceResponsibility}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="lessee">Lessee</option>
                    <option value="lessor">Lessor</option>
                    <option value="shared">Shared</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Required Documents
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(formData.documents).map(([doc, value]) => (
                  <div key={doc} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={`documents.${doc}`}
                      checked={!!value}
                      onChange={(e) => handleInputChange(e)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                    />
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {doc.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Additional Notes
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contract Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any additional terms, conditions, or notes for this contract..."
                />
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
                Create Contract
              </button>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}

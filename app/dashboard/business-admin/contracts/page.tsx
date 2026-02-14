'use client'

import AuthGuard from '@/components/AuthGuard'
import DashboardLayout from '@/components/DashboardLayout'
import Pagination from '@/components/Pagination'
import { FileText, Plus, Search, Filter, Download, Eye, Edit, Trash2, Calendar, Users, Car, DollarSign, CheckCircle, AlertTriangle, Clock, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { exportContracts } from '@/utils/exportUtils'

export default function ContractsPage() {
  const router = useRouter()
  
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const contracts = [
    {
      id: 1,
      contractNumber: 'CT-2024-001',
      customer: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      vehicle: 'Tesla Model 3',
      plate: 'ABC-123',
      type: 'Rental Agreement',
      status: 'active',
      startDate: '2024-03-15',
      endDate: '2024-03-18',
      duration: '3 days',
      totalAmount: '$267',
      deposit: '$50',
      signedDate: '2024-03-10',
      nextPayment: '2024-03-15',
      autoRenew: false,
      documents: ['Rental Agreement', 'Insurance Form', 'Driver License']
    },
    {
      id: 2,
      contractNumber: 'CT-2024-002',
      customer: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      vehicle: 'BMW X5',
      plate: 'XYZ-789',
      type: 'Long-term Lease',
      status: 'active',
      startDate: '2024-03-01',
      endDate: '2024-06-01',
      duration: '3 months',
      totalAmount: '$11,250',
      deposit: '$500',
      signedDate: '2024-02-25',
      nextPayment: '2024-04-01',
      autoRenew: true,
      documents: ['Lease Agreement', 'Insurance Policy', 'Credit Report']
    },
    {
      id: 3,
      contractNumber: 'CT-2024-003',
      customer: 'Mike Davis',
      email: 'mike.davis@email.com',
      phone: '+1 (555) 456-7890',
      vehicle: 'Mercedes C-Class',
      plate: 'DEF-456',
      type: 'Rental Agreement',
      status: 'expired',
      startDate: '2024-02-20',
      endDate: '2024-02-22',
      duration: '2 days',
      totalAmount: '$190',
      deposit: '$40',
      signedDate: '2024-02-15',
      nextPayment: '-',
      autoRenew: false,
      documents: ['Rental Agreement', 'Insurance Form']
    },
    {
      id: 4,
      contractNumber: 'CT-2024-004',
      customer: 'Emma Wilson',
      email: 'emma.w@email.com',
      phone: '+1 (555) 321-6549',
      vehicle: 'Audi A4',
      plate: 'GHI-012',
      type: 'Rental Agreement',
      status: 'pending',
      startDate: '2024-03-25',
      endDate: '2024-03-28',
      duration: '3 days',
      totalAmount: '$255',
      deposit: '$50',
      signedDate: '-',
      nextPayment: '2024-03-25',
      autoRenew: false,
      documents: ['Draft Agreement']
    }
  ]

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = contracts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(contracts.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleExportPDF = () => {
    exportContracts(contracts, 'pdf')
  }

  const handleExportCSV = () => {
    exportContracts(contracts, 'csv')
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      expired: 'bg-red-100 text-red-800',
      terminated: 'bg-gray-100 text-gray-800'
    }
    const icons = {
      active: <CheckCircle className="w-3 h-3 mr-1" />,
      pending: <Clock className="w-3 h-3 mr-1" />,
      expired: <AlertTriangle className="w-3 h-3 mr-1" />,
      terminated: <FileText className="w-3 h-3 mr-1" />
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
      'Rental Agreement': 'bg-blue-100 text-blue-800',
      'Long-term Lease': 'bg-purple-100 text-purple-800',
      'Service Contract': 'bg-orange-100 text-orange-800'
    }
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${styles[type as keyof typeof styles]}`}>
        {type}
      </span>
    )
  }

  return (
    <AuthGuard requiredRole="business-admin">
      <DashboardLayout role="business-admin" title="Contracts">
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Contracts</h1>
              <p className="text-gray-600 mt-1">Manage rental agreements and contracts</p>
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
                onClick={() => router.push('/dashboard/business-admin/contracts/add')}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Contract
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <FileText className="w-8 h-8 text-blue-600" />
                <span className="text-sm font-medium text-green-600">+12%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">248</h3>
              <p className="text-sm text-gray-600">Total Contracts</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <span className="text-sm font-medium text-green-600">+8%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">186</h3>
              <p className="text-sm text-gray-600">Active Contracts</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-yellow-600" />
                <span className="text-sm font-medium text-orange-600">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">12</h3>
              <p className="text-sm text-gray-600">Pending Signature</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-8 h-8 text-orange-600" />
                <span className="text-sm font-medium text-green-600">+18%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">$45.2K</h3>
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
                    placeholder="Search contracts..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Types</option>
                  <option value="rental">Rental Agreement</option>
                  <option value="lease">Long-term Lease</option>
                  <option value="service">Service Contract</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="expired">Expired</option>
                  <option value="terminated">Terminated</option>
                </select>
                <input
                  type="date"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </button>
              </div>
            </div>
          </div>

          {/* Contracts Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((contract) => (
                    <tr key={contract.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{contract.contractNumber}</div>
                          <div className="text-sm text-gray-500">{getTypeBadge(contract.type)}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{contract.customer}</div>
                          <div className="text-sm text-gray-500">{contract.email}</div>
                          <div className="text-sm text-gray-500">{contract.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Car className="w-4 h-4 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{contract.vehicle}</div>
                            <div className="text-sm text-gray-500">{contract.plate}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{contract.duration}</div>
                        <div className="text-xs text-gray-500">
                          {contract.startDate} to {contract.endDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{contract.totalAmount}</div>
                        <div className="text-sm text-gray-500">Deposit: {contract.deposit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(contract.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {contract.documents.slice(0, 2).map((doc, index) => (
                            <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                              {doc}
                            </span>
                          ))}
                          {contract.documents.length > 2 && (
                            <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                              +{contract.documents.length - 2}
                            </span>
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
                          <button className="text-gray-600 hover:text-gray-900">
                            <Download className="w-4 h-4" />
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
                totalItems={contracts.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>

          {/* Upcoming Renewals */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Upcoming Contract Renewals</p>
                <div className="space-y-1">
                  <p>• Sarah Johnson - Long-term Lease expires on June 1, 2024</p>
                  <p>• Emma Wilson - Rental Agreement pending signature</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}

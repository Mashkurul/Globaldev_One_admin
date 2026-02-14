'use client'

import AuthGuard from '@/components/AuthGuard'
import DashboardLayout from '@/components/DashboardLayout'
import { Shield, Plus, Search, Filter, Download, Eye, Edit, Trash2, FileText, AlertTriangle, CheckCircle, Clock, Calendar, User, Car, DollarSign, Scale } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { exportLegalRecords } from '@/utils/exportUtils'

export default function LegalRecordsPage() {
  const router = useRouter()
  const handleExportPDF = () => {
    exportLegalRecords(legalRecords, 'pdf')
  }

  const handleExportCSV = () => {
    exportLegalRecords(legalRecords, 'csv')
  }

  const legalRecords = [
    {
      id: 1,
      recordType: 'Insurance Policy',
      title: 'Commercial Auto Insurance - Fleet Coverage',
      reference: 'INS-2024-001',
      status: 'active',
      provider: 'SafeGuard Insurance Co.',
      policyNumber: 'POL-123456789',
      coverageAmount: '$2,000,000',
      premium: '$4,500/month',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      renewalDate: '2024-12-01',
      lastReviewed: '2024-02-15',
      nextReview: '2024-05-15',
      documents: ['Policy Document', 'Coverage Schedule', 'Claims History'],
      vehicles: ['All Fleet Vehicles'],
      notes: 'Comprehensive coverage for all vehicles including collision and liability'
    },
    {
      id: 2,
      recordType: 'Business License',
      title: 'Vehicle Rental Business License',
      reference: 'LIC-2024-002',
      status: 'active',
      provider: 'Department of Transportation',
      licenseNumber: 'BL-789012345',
      coverageAmount: 'N/A',
      premium: '$250/year',
      startDate: '2024-01-15',
      endDate: '2025-01-14',
      renewalDate: '2024-12-15',
      lastReviewed: '2024-01-10',
      nextReview: '2024-10-15',
      documents: ['License Certificate', 'Compliance Report'],
      vehicles: ['N/A'],
      notes: 'Required for operating vehicle rental business in the state'
    },
    {
      id: 3,
      recordType: 'Vehicle Registration',
      title: 'Fleet Vehicle Registration',
      reference: 'REG-2024-003',
      status: 'active',
      provider: 'DMV',
      licenseNumber: 'FL-2024-ABC',
      coverageAmount: 'N/A',
      premium: '$1,200/year',
      startDate: '2024-02-01',
      endDate: '2025-02-01',
      renewalDate: '2025-01-15',
      lastReviewed: '2024-02-01',
      nextReview: '2025-01-01',
      documents: ['Registration Papers', 'Emissions Test Results'],
      vehicles: ['Tesla Model 3', 'BMW X5', 'Mercedes C-Class', 'Audi A4'],
      notes: 'All vehicles registered for commercial use'
    },
    {
      id: 4,
      recordType: 'Safety Compliance',
      title: 'Fleet Safety Inspection Certificate',
      reference: 'SAF-2024-004',
      status: 'pending',
      provider: 'Safety Inspection Services',
      licenseNumber: 'SFT-2024-001',
      coverageAmount: 'N/A',
      premium: '$500/inspection',
      startDate: '2024-03-20',
      endDate: '2024-09-20',
      renewalDate: '2024-09-01',
      lastReviewed: '2024-03-15',
      nextReview: '2024-06-15',
      documents: ['Inspection Report', 'Safety Checklist'],
      vehicles: ['All Fleet Vehicles'],
      notes: 'Bi-annual safety inspection required for commercial fleet'
    },
    {
      id: 5,
      recordType: 'Legal Agreement',
      title: 'Customer Terms of Service',
      reference: 'LEG-2024-005',
      status: 'active',
      provider: 'Legal Firm LLP',
      licenseNumber: 'TOS-2024-V1',
      coverageAmount: 'N/A',
      premium: 'Legal Fees',
      startDate: '2024-01-01',
      endDate: '2025-01-01',
      renewalDate: '2024-12-01',
      lastReviewed: '2024-01-01',
      nextReview: '2024-07-01',
      documents: ['Terms of Service', 'Privacy Policy', 'Liability Waiver'],
      vehicles: ['N/A'],
      notes: 'Standard terms for all customer agreements'
    }
  ]

  const upcomingExpirations = [
    {
      record: 'Safety Compliance Certificate',
      expiresIn: '5 days',
      priority: 'high'
    },
    {
      record: 'Business License Renewal',
      expiresIn: '30 days',
      priority: 'medium'
    },
    {
      record: 'Insurance Policy Review',
      expiresIn: '60 days',
      priority: 'low'
    }
  ]

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      expired: 'bg-red-100 text-red-800',
      suspended: 'bg-gray-100 text-gray-800'
    }
    const icons = {
      active: <CheckCircle className="w-3 h-3 mr-1" />,
      pending: <Clock className="w-3 h-3 mr-1" />,
      expired: <AlertTriangle className="w-3 h-3 mr-1" />,
      suspended: <FileText className="w-3 h-3 mr-1" />
    }
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getPriorityBadge = (priority: string) => {
    const styles = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    }
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${styles[priority as keyof typeof styles]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    )
  }

  return (
    <AuthGuard requiredRole="business-admin">
      <DashboardLayout role="business-admin" title="Legal Records">
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Legal Records</h1>
              <p className="text-gray-600 mt-1">Manage insurance, licenses, and compliance documents</p>
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
                onClick={() => router.push('/dashboard/business-admin/legal/add')}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Record
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <Shield className="w-8 h-8 text-blue-600" />
                <span className="text-sm font-medium text-green-600">All Good</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">24</h3>
              <p className="text-sm text-gray-600">Total Records</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <span className="text-sm font-medium text-green-600">Active</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">18</h3>
              <p className="text-sm text-gray-600">Active Records</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-yellow-600" />
                <span className="text-sm font-medium text-orange-600">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">3</h3>
              <p className="text-sm text-gray-600">Pending Renewal</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <span className="text-sm font-medium text-red-600">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">1</h3>
              <p className="text-sm text-gray-600">Requires Action</p>
            </div>
          </div>

          {/* Upcoming Expirations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Expirations</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingExpirations.map((expiration, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{expiration.record}</p>
                        <p className="text-xs text-gray-500">Expires in {expiration.expiresIn}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getPriorityBadge(expiration.priority)}
                      <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        Renew
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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
                    placeholder="Search legal records..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Types</option>
                  <option value="insurance">Insurance Policy</option>
                  <option value="license">Business License</option>
                  <option value="registration">Vehicle Registration</option>
                  <option value="safety">Safety Compliance</option>
                  <option value="legal">Legal Agreement</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="expired">Expired</option>
                  <option value="suspended">Suspended</option>
                </select>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </button>
              </div>
            </div>
          </div>

          {/* Legal Records Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Record</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coverage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premium</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Review</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {legalRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{record.title}</div>
                          <div className="text-sm text-gray-500">{record.reference}</div>
                          <div className="text-xs text-gray-400 mt-1">{record.recordType}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{record.provider}</div>
                        <div className="text-sm text-gray-500">{record.policyNumber || record.licenseNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{record.coverageAmount}</div>
                        <div className="text-xs text-gray-500">
                          {record.vehicles.length === 1 ? record.vehicles[0] : 
                           record.vehicles[0] === 'N/A' ? 'N/A' : 
                           `${record.vehicles.length} vehicles`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{record.startDate}</div>
                        <div className="text-sm text-gray-500">to {record.endDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.premium}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{record.nextReview}</div>
                        <div className="text-xs text-gray-500">Last: {record.lastReviewed}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(record.status)}
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
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                <span className="font-medium">24</span> results
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-md">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">3</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Compliance Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Insurance Coverage</span>
                  <span className="text-sm font-medium text-green-600">Compliant</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Business Licenses</span>
                  <span className="text-sm font-medium text-green-600">Compliant</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Vehicle Registrations</span>
                  <span className="text-sm font-medium text-green-600">Compliant</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Safety Inspections</span>
                  <span className="text-sm font-medium text-yellow-600">Pending</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Management</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Documents</span>
                  <span className="text-sm font-medium text-gray-900">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Digitized</span>
                  <span className="text-sm font-medium text-green-600">100%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Backup</span>
                  <span className="text-sm font-medium text-gray-900">Today, 2:00 AM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Storage Used</span>
                  <span className="text-sm font-medium text-gray-900">2.3 GB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}

'use client'

import AuthGuard from '@/components/AuthGuard'
import DashboardLayout from '@/components/DashboardLayout'
import { Building, Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, Users, DollarSign, Calendar, CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CompaniesPage() {
  const router = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [companyToDelete, setCompanyToDelete] = useState<any>(null)
  const companies = [
    {
      id: 1,
      name: 'AutoRent Inc.',
      email: 'contact@autorent.com',
      phone: '+1 (555) 123-4567',
      status: 'active',
      subscription: 'Premium',
      vehicles: 45,
      users: 12,
      revenue: '$124,500',
      joinedDate: '2024-01-15',
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'CityCar Rentals',
      email: 'info@citycar.com',
      phone: '+1 (555) 987-6543',
      status: 'active',
      subscription: 'Standard',
      vehicles: 28,
      users: 8,
      revenue: '$67,200',
      joinedDate: '2024-02-20',
      lastActive: '1 day ago'
    },
    {
      id: 3,
      name: 'Global Fleet',
      email: 'support@globalfleet.com',
      phone: '+1 (555) 456-7890',
      status: 'suspended',
      subscription: 'Basic',
      vehicles: 15,
      users: 5,
      revenue: '$23,400',
      joinedDate: '2023-12-10',
      lastActive: '3 days ago'
    },
    {
      id: 4,
      name: 'QuickRent',
      email: 'hello@quickrent.com',
      phone: '+1 (555) 321-6549',
      status: 'pending',
      subscription: 'Trial',
      vehicles: 8,
      users: 3,
      revenue: '$0',
      joinedDate: '2024-03-01',
      lastActive: '5 hours ago'
    }
  ]

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      suspended: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    }
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getSubscriptionBadge = (subscription: string) => {
    const styles = {
      Premium: 'bg-purple-100 text-purple-800',
      Standard: 'bg-blue-100 text-blue-800',
      Basic: 'bg-gray-100 text-gray-800',
      Trial: 'bg-orange-100 text-orange-800'
    }
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${styles[subscription as keyof typeof styles]}`}>
        {subscription}
      </span>
    )
  }

  return (
    <AuthGuard requiredRole="super-admin">
      <DashboardLayout role="super-admin" title="Companies">
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
              <p className="text-gray-600 mt-1">Manage all registered companies on the platform</p>
            </div>
            <button 
              onClick={() => router.push('/dashboard/super-admin/companies/add')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Company
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <Building className="w-8 h-8 text-blue-600" />
                <span className="text-sm font-medium text-green-600">+12%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">127</h3>
              <p className="text-sm text-gray-600">Total Companies</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <span className="text-sm font-medium text-green-600">+8%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">98</h3>
              <p className="text-sm text-gray-600">Active Companies</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-purple-600" />
                <span className="text-sm font-medium text-green-600">+15%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">3,842</h3>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-8 h-8 text-orange-600" />
                <span className="text-sm font-medium text-green-600">+23%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">$2.4M</h3>
              <p className="text-sm text-gray-600">Total Revenue</p>
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
                    placeholder="Search companies..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="pending">Pending</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Subscriptions</option>
                  <option value="premium">Premium</option>
                  <option value="standard">Standard</option>
                  <option value="basic">Basic</option>
                  <option value="trial">Trial</option>
                </select>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </button>
              </div>
            </div>
          </div>

          {/* Companies Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicles</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {companies.map((company) => (
                    <tr key={company.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{company.name}</div>
                          <div className="text-sm text-gray-500">{company.email}</div>
                          <div className="text-sm text-gray-500">{company.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(company.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getSubscriptionBadge(company.subscription)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {company.vehicles}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {company.users}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {company.revenue}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {company.lastActive}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            onClick={() => router.push(`/dashboard/super-admin/companies/${company.id}`)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => router.push(`/dashboard/super-admin/companies/${company.id}`)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              setCompanyToDelete(company)
                              setShowDeleteModal(true)
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
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
                Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of{' '}
                <span className="font-medium">127</span> results
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
        </div>
      </DashboardLayout>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && companyToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delete Company</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Are you sure you want to delete {companyToDelete.name}?
                </p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Company Details:</strong><br />
                Email: {companyToDelete.email}<br />
                Phone: {companyToDelete.phone}<br />
                Subscription: {companyToDelete.subscription}<br />
                Users: {companyToDelete.users} | Vehicles: {companyToDelete.vehicles}
              </p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              This action cannot be undone. All company data, users, vehicles, and associated records will be permanently removed.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setCompanyToDelete(null)
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Deleting company:', companyToDelete.id)
                  // In real app, this would call an API endpoint
                  // For now, just log the action and close modal
                  setShowDeleteModal(false)
                  setCompanyToDelete(null)
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Company
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthGuard>
  )
}

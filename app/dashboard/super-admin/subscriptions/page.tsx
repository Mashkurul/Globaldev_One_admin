'use client'

import AuthGuard from '@/components/AuthGuard'
import DashboardLayout from '@/components/DashboardLayout'
import { CreditCard, TrendingUp, Users, DollarSign, Search, Filter, Plus, MoreVertical, Edit, RefreshCw, AlertCircle, CheckCircle, Clock, ArrowUpRight, ArrowDownRight, Eye, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SubscriptionsPage() {
  const router = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [subscriptionToDelete, setSubscriptionToDelete] = useState<any>(null)
  const subscriptions = [
    {
      id: 1,
      company: 'AutoRent Inc.',
      plan: 'Premium',
      status: 'active',
      price: '$499/month',
      billingCycle: 'Monthly',
      nextBilling: '2024-04-15',
      usage: {
        vehicles: 45,
        users: 12,
        limit: { vehicles: 100, users: 50 }
      },
      revenue: '$5,988',
      startDate: '2024-01-15'
    },
    {
      id: 2,
      company: 'CityCar Rentals',
      plan: 'Standard',
      status: 'active',
      price: '$299/month',
      billingCycle: 'Monthly',
      nextBilling: '2024-04-20',
      usage: {
        vehicles: 28,
        users: 8,
        limit: { vehicles: 50, users: 25 }
      },
      revenue: '$3,588',
      startDate: '2024-02-20'
    },
    {
      id: 3,
      company: 'Global Fleet',
      plan: 'Basic',
      status: 'cancelled',
      price: '$149/month',
      billingCycle: 'Monthly',
      nextBilling: '-',
      usage: {
        vehicles: 15,
        users: 5,
        limit: { vehicles: 25, users: 10 }
      },
      revenue: '$447',
      startDate: '2023-12-10'
    },
    {
      id: 4,
      company: 'QuickRent',
      plan: 'Trial',
      status: 'trial',
      price: '$0/month',
      billingCycle: 'Trial',
      nextBilling: '2024-04-05',
      usage: {
        vehicles: 8,
        users: 3,
        limit: { vehicles: 10, users: 5 }
      },
      revenue: '$0',
      startDate: '2024-03-01'
    }
  ]

  const plans = [
    {
      name: 'Trial',
      price: '$0',
      duration: '14 days',
      features: ['10 Vehicles', '5 Users', 'Basic Support', 'Limited Features'],
      color: 'bg-orange-500',
      companies: 15
    },
    {
      name: 'Basic',
      price: '$149',
      duration: '/month',
      features: ['25 Vehicles', '10 Users', 'Email Support', 'Advanced Analytics'],
      color: 'bg-gray-500',
      companies: 42
    },
    {
      name: 'Standard',
      price: '$299',
      duration: '/month',
      features: ['50 Vehicles', '25 Users', 'Priority Support', 'API Access'],
      color: 'bg-blue-500',
      companies: 58
    },
    {
      name: 'Premium',
      price: '$499',
      duration: '/month',
      features: ['100 Vehicles', '50 Users', '24/7 Support', 'Custom Features'],
      color: 'bg-purple-500',
      companies: 12
    }
  ]

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      trial: 'bg-yellow-100 text-yellow-800',
      overdue: 'bg-red-100 text-red-800'
    }
    const icons = {
      active: <CheckCircle className="w-3 h-3 mr-1" />,
      cancelled: <AlertCircle className="w-3 h-3 mr-1" />,
      trial: <Clock className="w-3 h-3 mr-1" />,
      overdue: <AlertCircle className="w-3 h-3 mr-1" />
    }
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getPlanBadge = (plan: string) => {
    const styles = {
      Premium: 'bg-purple-100 text-purple-800',
      Standard: 'bg-blue-100 text-blue-800',
      Basic: 'bg-gray-100 text-gray-800',
      Trial: 'bg-orange-100 text-orange-800'
    }
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${styles[plan as keyof typeof styles]}`}>
        {plan}
      </span>
    )
  }

  return (
    <AuthGuard requiredRole="super-admin">
      <DashboardLayout role="super-admin" title="Subscriptions">
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Subscriptions</h1>
              <p className="text-gray-600 mt-1">Manage subscription plans and billing</p>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync Payments
              </button>
              <button 
                onClick={() => router.push('/dashboard/super-admin/subscriptions/add')}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Subscription
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <CreditCard className="w-8 h-8 text-blue-600" />
                <span className="text-sm font-medium text-green-600 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +18%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">$124.5K</h3>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-green-600" />
                <span className="text-sm font-medium text-green-600 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +12%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">127</h3>
              <p className="text-sm text-gray-600">Active Subscriptions</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-purple-600" />
                <span className="text-sm font-medium text-red-600 flex items-center">
                  <ArrowDownRight className="w-3 h-3 mr-1" />
                  -3%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">94%</h3>
              <p className="text-sm text-gray-600">Retention Rate</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-8 h-8 text-orange-600" />
                <span className="text-sm font-medium text-green-600 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +23%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">$981</h3>
              <p className="text-sm text-gray-600">Avg. Revenue/User</p>
            </div>
          </div>

          {/* Subscription Plans */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Subscription Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {plans.map((plan, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                    <div className={`w-3 h-3 rounded-full ${plan.color}`}></div>
                  </div>
                  <div className="mb-3">
                    <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.duration}</span>
                  </div>
                  <div className="space-y-2 mb-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    {plan.companies} companies
                  </div>
                </div>
              ))}
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
                    placeholder="Search subscriptions..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Plans</option>
                  <option value="trial">Trial</option>
                  <option value="basic">Basic</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="trial">Trial</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="overdue">Overdue</option>
                </select>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </button>
              </div>
            </div>
          </div>

          {/* Subscriptions Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Billing</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subscriptions.map((subscription) => (
                    <tr key={subscription.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{subscription.company}</div>
                        <div className="text-sm text-gray-500">Started {subscription.startDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getPlanBadge(subscription.plan)}
                        <div className="text-xs text-gray-500 mt-1">{subscription.billingCycle}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(subscription.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{subscription.price}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {subscription.usage.vehicles}/{subscription.usage.limit.vehicles} vehicles
                        </div>
                        <div className="text-sm text-gray-500">
                          {subscription.usage.users}/{subscription.usage.limit.users} users
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {subscription.nextBilling}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {subscription.revenue}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            onClick={() => router.push(`/dashboard/super-admin/subscriptions/${subscription.id}`)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => router.push(`/dashboard/super-admin/subscriptions/${subscription.id}`)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              setSubscriptionToDelete(subscription)
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
      {showDeleteModal && subscriptionToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delete Subscription</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Are you sure you want to delete this subscription for {subscriptionToDelete.company}?
                </p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Subscription Details:</strong><br />
                Company: {subscriptionToDelete.company}<br />
                Plan: {subscriptionToDelete.plan}<br />
                Price: {subscriptionToDelete.price}<br />
                Status: {subscriptionToDelete.status}<br />
                Next Billing: {subscriptionToDelete.nextBilling}
              </p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              This action cannot be undone. All billing records and subscription data will be permanently removed. The company will lose access to all features.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setSubscriptionToDelete(null)
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Deleting subscription:', subscriptionToDelete.id)
                  // In real app, this would call an API endpoint
                  // For now, just log the action and close modal
                  setShowDeleteModal(false)
                  setSubscriptionToDelete(null)
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthGuard>
  )
}

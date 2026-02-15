'use client'

import AuthGuard from '@/components/AuthGuard'
import DashboardLayout from '@/components/DashboardLayout'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Edit, Download, CreditCard, Calendar, DollarSign, Building, Users, CheckCircle, AlertTriangle, Activity, FileText, TrendingUp, TrendingDown, RefreshCw, Eye, Trash2, Save, X, Lock, Unlock } from 'lucide-react'

export default function SubscriptionDetailsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showSuspendModal, setShowSuspendModal] = useState(false)
  
  // Mock subscription data - in real app, this would come from API
  const [subscription, setSubscription] = useState({
    id: 1,
    companyId: '1',
    companyName: 'AutoRent Inc.',
    planType: 'premium',
    planName: 'Premium Plan',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    autoRenew: true,
    billingCycle: 'monthly',
    price: 499,
    currency: 'USD',
    maxVehicles: 100,
    maxUsers: 50,
    features: {
      onlineBooking: true,
      mobileApp: true,
      advancedAnalytics: true,
      apiAccess: true,
      prioritySupport: true,
      customBranding: true,
      multiLocation: true,
      advancedReports: true,
      integrations: true,
      dedicatedSupport: true
    },
    paymentMethod: 'credit-card',
    cardInfo: {
      last4: '1234',
      brand: 'Visa',
      expiryDate: '12/25'
    },
    billingAddress: {
      street: '123 Business Ave, Suite 100',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'US'
    },
    usage: {
      currentVehicles: 48,
      currentUsers: 12,
      totalBookings: 324,
      totalRevenue: 28400,
      utilizationRate: 78
    },
    billingHistory: [
      {
        id: 1,
        date: '2024-03-15',
        amount: 499,
        status: 'paid',
        method: 'credit-card',
        invoice: 'INV-2024-001',
        description: 'Premium Plan - Monthly'
      },
      {
        id: 2,
        date: '2024-02-15',
        amount: 499,
        status: 'paid',
        method: 'credit-card',
        invoice: 'INV-2024-002',
        description: 'Premium Plan - Monthly'
      },
      {
        id: 3,
        date: '2024-01-15',
        amount: 499,
        status: 'paid',
        method: 'credit-card',
        invoice: 'INV-2024-003',
        description: 'Premium Plan - Monthly'
      }
    ],
    activity: [
      {
        id: 1,
        action: 'Subscription Created',
        description: 'Premium Plan subscription created for AutoRent Inc.',
        timestamp: '2024-01-15 10:30:00',
        user: 'System'
      },
      {
        id: 2,
        action: 'Payment Processed',
        description: 'Monthly payment of $499.00 processed successfully',
        timestamp: '2024-03-15 00:00:00',
        user: 'System'
      },
      {
        id: 3,
        action: 'Auto-renewal Enabled',
        description: 'Auto-renewal enabled for subscription',
        timestamp: '2024-01-15 10:30:00',
        user: 'John Smith'
      }
    ]
  })

  const [formData, setFormData] = useState({ ...subscription })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement
      if (name.startsWith('features.')) {
        const feature = name.split('.')[1]
        setFormData(prev => ({
          ...prev,
          features: {
            ...prev.features,
            [feature]: checkbox.checked
          }
        }))
      } else if (name.startsWith('billingAddress.')) {
        const field = name.split('.')[1]
        setFormData(prev => ({
          ...prev,
          billingAddress: {
            ...prev.billingAddress,
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

  const handleSave = () => {
    console.log('Saving subscription data:', formData)
    setSubscription(formData)
    setIsEditing(false)
  }

  const handleDelete = () => {
    console.log('Deleting subscription:', subscription.id)
    router.push('/dashboard/super-admin/subscriptions')
  }

  const handleCancel = () => {
    setFormData(prev => ({ ...prev, status: 'cancelled' }))
    setSubscription(prev => ({ ...prev, status: 'cancelled' }))
    setShowCancelModal(false)
  }

  const handleSuspend = () => {
    setFormData(prev => ({ ...prev, status: 'suspended' }))
    setSubscription(prev => ({ ...prev, status: 'suspended' }))
    setShowSuspendModal(false)
  }

  const handleRenew = () => {
    // Extend subscription by one billing cycle
    const newEndDate = new Date(formData.endDate)
    if (formData.billingCycle === 'monthly') {
      newEndDate.setMonth(newEndDate.getMonth() + 1)
    } else if (formData.billingCycle === 'yearly') {
      newEndDate.setFullYear(newEndDate.getFullYear() + 1)
    }
    
    setFormData(prev => ({
      ...prev,
      endDate: newEndDate.toISOString().split('T')[0],
      status: 'active'
    }))
    setSubscription(prev => ({
      ...prev,
      endDate: newEndDate.toISOString().split('T')[0],
      status: 'active'
    }))
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-red-100 text-red-800',
      cancelled: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800',
      overdue: 'bg-red-100 text-red-800'
    }
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getPlanBadge = (plan: string) => {
    const styles = {
      trial: 'bg-orange-100 text-orange-800',
      basic: 'bg-gray-100 text-gray-800',
      standard: 'bg-blue-100 text-blue-800',
      premium: 'bg-purple-100 text-purple-800'
    }
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${styles[plan as keyof typeof styles]}`}>
        {plan.charAt(0).toUpperCase() + plan.slice(1)}
      </span>
    )
  }

  const handleExport = (format: string) => {
    console.log(`Exporting subscription data in ${format} format`)
  }

  return (
    <AuthGuard requiredRole="super-admin">
      <DashboardLayout role="super-admin" title="Subscription Details">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                  {subscription.planName}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">Subscription Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {!isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Subscription
                  </button>
                  <button
                    onClick={() => handleExport('pdf')}
                    className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                  {subscription.status === 'active' ? (
                    <button
                      onClick={() => setShowSuspendModal(true)}
                      className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Suspend
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setFormData(prev => ({ ...prev, status: 'active' }))
                        setSubscription(prev => ({ ...prev, status: 'active' }))
                      }}
                      className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Unlock className="w-4 h-4 mr-2" />
                      Activate
                    </button>
                  )}
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setFormData(subscription)
                      setIsEditing(false)
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Subscription Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center space-x-4 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{subscription.planName}</h2>
                  {getPlanBadge(subscription.planType)}
                  {getStatusBadge(subscription.status)}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  <p>Company: {subscription.companyName}</p>
                  <p>Subscription ID: SUB-{String(subscription.id).padStart(6, '0')}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${subscription.price}/{subscription.billingCycle}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {subscription.currency} • {subscription.billingCycle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Subscription Period</span>
                <div className="text-gray-900 dark:text-white">
                  {subscription.startDate} to {subscription.endDate}
                </div>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Auto-renewal</span>
                <div className="text-gray-900 dark:text-white">
                  {subscription.autoRenew ? 'Enabled' : 'Disabled'}
                </div>
              </div>
              <div>
                <span className="text-gray-500 dark:text-400">Limits</span>
                <div className="text-gray-900 dark:text-white">
                  {subscription.maxVehicles} vehicles, {subscription.maxUsers} users
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6">
                {['overview', 'usage', 'billing', 'features', 'activity'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Payment Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Information</h3>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Method</span>
                          {isEditing ? (
                            <select
                              name="paymentMethod"
                              value={formData.paymentMethod}
                              onChange={handleInputChange}
                              className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="credit-card">Credit Card</option>
                              <option value="bank-transfer">Bank Transfer</option>
                              <option value="paypal">PayPal</option>
                            </select>
                          ) : (
                            <div className="text-gray-900 dark:text-white capitalize">{subscription.paymentMethod}</div>
                          )}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Card Information</span>
                          {isEditing ? (
                            <input
                              type="text"
                              name="cardInfo.last4"
                              value={formData.cardInfo.last4}
                              onChange={handleInputChange}
                              placeholder="Last 4 digits"
                              className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <div className="text-gray-900 dark:text-white">
                              {subscription.cardInfo.brand} ending in {subscription.cardInfo.expiryDate}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Billing Address</h3>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      {isEditing ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            name="billingAddress.street"
                            value={formData.billingAddress.street}
                            onChange={handleInputChange}
                            placeholder="Street Address"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                              type="text"
                              name="billingAddress.city"
                              value={formData.billingAddress.city}
                              onChange={handleInputChange}
                              placeholder="City"
                              className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                              type="text"
                              name="billingAddress.state"
                              value={formData.billingAddress.state}
                              onChange={handleInputChange}
                              placeholder="State"
                              className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                              type="text"
                              name="billingAddress.zipCode"
                              value={formData.billingAddress.zipCode}
                              onChange={handleInputChange}
                              placeholder="ZIP Code"
                              className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <input
                            type="text"
                            name="billingAddress.country"
                            value={formData.billingAddress.country}
                            onChange={handleInputChange}
                            placeholder="Country"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      ) : (
                        <div className="text-gray-900 dark:text-white">
                          {subscription.billingAddress.street}<br />
                          {subscription.billingAddress.city}, {subscription.billingAddress.state} {subscription.billingAddress.zipCode}<br />
                          {subscription.billingAddress.country}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'usage' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Usage Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Car className="w-8 h-8 text-blue-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {subscription.utilizationRate}% utilized
                        </span>
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{subscription.usage.currentVehicles}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        of {subscription.maxVehicles} vehicles
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Users className="w-8 h-8 text-green-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {subscription.usage.currentUsers} active
                        </span>
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{subscription.usage.currentUsers}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        of {subscription.maxUsers} users
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Calendar className="w-8 h-8 text-purple-600" />
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{subscription.usage.totalBookings}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total bookings</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <DollarSign className="w-8 h-8 text-orange-600" />
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${subscription.usage.totalRevenue.toLocaleString()}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total revenue</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Billing History</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Method
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Invoice
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {subscription.billingHistory.map((bill) => (
                          <tr key={bill.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {bill.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              ${bill.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                {bill.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white capitalize">
                              {bill.method}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {bill.invoice}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'features' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Included Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(subscription.features).map(([feature, enabled]) => (
                      <div key={feature} className="flex items-center space-x-2">
                        {enabled ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full" />
                        )}
                        <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                          {feature.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Subscription Activity</h3>
                  <div className="space-y-4">
                    {subscription.activity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex-shrink-0">
                          <Activity className="w-5 h-5 text-blue-600 mt-1" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {activity.action}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {activity.description}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {activity.timestamp} • By {activity.user}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4">
            <button
              onClick={handleRenew}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Renew
            </button>
            <button
              onClick={() => setShowSuspendModal(true)}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Suspend
            </button>
            <button
              onClick={() => setShowCancelModal(true)}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </div>

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delete Subscription</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Are you sure you want to delete this subscription?
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  This action cannot be undone. All billing records and subscription data will be permanently removed.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete Subscription
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Cancel Confirmation Modal */}
          {showCancelModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <X className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cancel Subscription</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Are you sure you want to cancel this subscription?
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  The subscription will be cancelled immediately. The company will lose access to all features at the end of the current billing period.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Keep Subscription
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                  >
                    Cancel Subscription
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Suspend Confirmation Modal */}
          {showSuspendModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Lock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Suspend Subscription</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Are you sure you want to suspend this subscription?
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  The subscription will be temporarily suspended. The company will lose access to features but billing will be paused.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowSuspendModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Keep Active
                  </button>
                  <button
                    onClick={handleSuspend}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                  >
                    Suspend Subscription
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}

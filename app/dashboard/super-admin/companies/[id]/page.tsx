'use client'

import AuthGuard from '@/components/AuthGuard'
import DashboardLayout from '@/components/DashboardLayout'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Edit, Download, Building, MapPin, Phone, Mail, Globe, Calendar, Users, Car, DollarSign, CheckCircle, AlertTriangle, Activity, FileText, Shield, TrendingUp, TrendingDown, Trash2, Save, X, Lock, Unlock, RefreshCw } from 'lucide-react'

export default function CompanyDetailsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showSuspendModal, setShowSuspendModal] = useState(false)
  
  // Mock company data - in real app, this would come from API
  const [company, setCompany] = useState({
    id: 1,
    name: 'AutoRent Inc.',
    legalName: 'AutoRent Inc. LLC',
    registrationNumber: 'BRN-2024-001234',
    taxId: 'TX-987654321',
    industry: 'rental',
    website: 'https://www.autorent.com',
    description: 'Leading vehicle rental company providing premium cars and exceptional service to customers across the region.',
    status: 'active',
    logo: '/api/placeholder/logo.png',
    contact: {
      email: 'contact@autorent.com',
      phone: '+1 (555) 123-4567',
      supportEmail: 'support@autorent.com',
      supportPhone: '+1 (555) 987-6543'
    },
    address: {
      street: '123 Business Ave, Suite 100',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'US'
    },
    subscription: {
      plan: 'premium',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-12-31',
      price: 499,
      billingCycle: 'monthly',
      autoRenew: true,
      maxVehicles: 100,
      maxUsers: 50
    },
    metrics: {
      totalVehicles: 48,
      activeVehicles: 32,
      totalUsers: 12,
      activeUsers: 10,
      totalBookings: 324,
      completedBookings: 267,
      pendingBookings: 45,
      revenue: 28400,
      averageRating: 4.8,
      utilizationRate: 78
    },
    branches: [
      {
        id: 1,
        name: 'Downtown Office',
        address: '123 Business Ave, Suite 100',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        phone: '+1 (555) 123-4567',
        manager: 'John Smith'
      },
      {
        id: 2,
        name: 'Airport Location',
        address: '789 Airport Rd',
        city: 'New York',
        state: 'NY',
        zipCode: '10003',
        phone: '+1 (555) 987-6543',
        manager: 'Sarah Johnson'
      },
      {
        id: 3,
        name: 'Suburban Branch',
        address: '321 Suburban Dr',
        city: 'New York',
        state: 'NY',
        zipCode: '10004',
        phone: '+1 (555) 456-7890',
        manager: 'Mike Davis'
      }
    ],
    activity: [
      {
        id: 1,
        action: 'Subscription Upgraded',
        description: 'Company upgraded from Standard to Premium plan',
        timestamp: '2024-03-10 10:30:00',
        user: 'System'
      },
      {
        id: 2,
        action: 'New Vehicle Added',
        description: 'Tesla Model 3 (ABC-123) added to fleet',
        timestamp: '2024-03-08 14:15:00',
        user: 'John Smith'
      },
      {
        id: 3,
        action: 'Profile Updated',
        description: 'Company profile information updated',
        timestamp: '2024-03-05 16:45:00',
        user: 'Sarah Johnson'
      }
    ]
  })

  const [formData, setFormData] = useState({ ...company })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement
      if (name.startsWith('contact.')) {
        const field = name.split('.')[1]
        setFormData(prev => ({
          ...prev,
          contact: {
            ...prev.contact,
            [field]: value
          }
        }))
      } else if (name.startsWith('address.')) {
        const field = name.split('.')[1]
        setFormData(prev => ({
          ...prev,
          address: {
            ...prev.address,
            [field]: value
          }
        }))
      } else if (name.startsWith('subscription.')) {
        const field = name.split('.')[1]
        setFormData(prev => ({
          ...prev,
          subscription: {
            ...prev.subscription,
            [field]: checkbox.checked
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
    console.log('Saving company data:', formData)
    setCompany(formData)
    setIsEditing(false)
  }

  const handleDelete = () => {
    console.log('Deleting company:', company.id)
    router.push('/dashboard/super-admin/companies')
  }

  const handleSuspend = () => {
    setFormData(prev => ({ ...prev, status: 'suspended' }))
    setCompany(prev => ({ ...prev, status: 'suspended' }))
    setShowSuspendModal(false)
  }

  const handleActivate = () => {
    setFormData(prev => ({ ...prev, status: 'active' }))
    setCompany(prev => ({ ...prev, status: 'active' }))
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    }
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getSubscriptionBadge = (plan: string) => {
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
    console.log(`Exporting company data in ${format} format`)
  }

  return (
    <AuthGuard requiredRole="super-admin">
      <DashboardLayout role="super-admin" title="Company Details">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                  {company.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">Company Management</p>
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
                    Edit Company
                  </button>
                  {company.status === 'active' ? (
                    <button
                      onClick={() => setShowSuspendModal(true)}
                      className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Suspend
                    </button>
                  ) : (
                    <button
                      onClick={handleActivate}
                      className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Unlock className="w-4 h-4 mr-2" />
                      Activate
                    </button>
                  )}
                  <button
                    onClick={() => handleExport('pdf')}
                    className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
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
                      setFormData(company)
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

          {/* Company Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start space-x-6">
              <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building className="w-10 h-10 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="text-2xl font-bold text-gray-900 dark:text-white bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none"
                    />
                  ) : (
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{company.name}</h2>
                  )}
                  {getStatusBadge(company.status)}
                  {getSubscriptionBadge(company.subscription.plan)}
                </div>
                {isEditing ? (
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="text-gray-600 dark:text-gray-400 mb-4 w-full bg-transparent border border-gray-300 rounded p-2 focus:border-blue-500 outline-none resize-none"
                    rows={2}
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{company.description}</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Email:</span>
                    <div className="flex items-center text-gray-900 dark:text-white">
                      <Mail className="w-4 h-4 mr-2" />
                      {isEditing ? (
                        <input
                          type="email"
                          name="contact.email"
                          value={formData.contact.email}
                          onChange={handleInputChange}
                          className="bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none"
                        />
                      ) : (
                        company.contact.email
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                    <div className="flex items-center text-gray-900 dark:text-white">
                      <Phone className="w-4 h-4 mr-2" />
                      {isEditing ? (
                        <input
                          type="tel"
                          name="contact.phone"
                          value={formData.contact.phone}
                          onChange={handleInputChange}
                          className="bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none"
                        />
                      ) : (
                        company.contact.phone
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Website:</span>
                    <div className="flex items-center text-gray-900 dark:text-white">
                      <Globe className="w-4 h-4 mr-2" />
                      {isEditing ? (
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          className="bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none"
                        />
                      ) : (
                        company.website
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Registration:</span>
                    <span className="text-gray-900 dark:text-white">{company.registrationNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6">
                {['overview', 'metrics', 'branches', 'subscription', 'activity'].map((tab) => (
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
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Primary Email</dt>
                        <dd className="text-sm text-gray-900 dark:text-white">{company.contact.email}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Primary Phone</dt>
                        <dd className="text-sm text-gray-900 dark:text-white">{company.contact.phone}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Support Email</dt>
                        <dd className="text-sm text-gray-900 dark:text-white">{company.contact.supportEmail}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Support Phone</dt>
                        <dd className="text-sm text-gray-900 dark:text-white">{company.contact.supportPhone}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Address */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Address</h3>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <p className="text-gray-900 dark:text-white">{company.address.street}</p>
                          <p className="text-gray-900 dark:text-white">
                            {company.address.city}, {company.address.state} {company.address.zipCode}
                          </p>
                          <p className="text-gray-900 dark:text-white">{company.address.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Legal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Legal Information</h3>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Legal Name</dt>
                        <dd className="text-sm text-gray-900 dark:text-white">{company.legalName}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Registration Number</dt>
                        <dd className="text-sm text-gray-900 dark:text-white">{company.registrationNumber}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Tax ID</dt>
                        <dd className="text-sm text-gray-900 dark:text-white">{company.taxId}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Industry</dt>
                        <dd className="text-sm text-gray-900 dark:text-white capitalize">{company.industry}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}

              {activeTab === 'metrics' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Car className="w-8 h-8 text-blue-600" />
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{company.metrics.totalVehicles}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Vehicles</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Users className="w-8 h-8 text-green-600" />
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{company.metrics.totalUsers}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Calendar className="w-8 h-8 text-purple-600" />
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{company.metrics.totalBookings}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <DollarSign className="w-8 h-8 text-orange-600" />
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 dark:text-white">${company.metrics.revenue.toLocaleString()}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'branches' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Branch Locations</h3>
                  <div className="space-y-4">
                    {company.branches.map((branch) => (
                      <div key={branch.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">{branch.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{branch.address}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {branch.city}, {branch.state} {branch.zipCode}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{branch.manager}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{branch.phone}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'subscription' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Subscription Details</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Current Plan</h4>
                        <div className="flex items-center space-x-2">
                          {getSubscriptionBadge(company.subscription.plan)}
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            ${company.subscription.price}/{company.subscription.billingCycle}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Status</h4>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(company.subscription.status)}
                          <span className="text-sm text-gray-900 dark:text-white">
                            {company.subscription.startDate} to {company.subscription.endDate}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Limits</h4>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-900 dark:text-white">
                            Max Vehicles: {company.subscription.maxVehicles}
                          </p>
                          <p className="text-sm text-gray-900 dark:text-white">
                            Max Users: {company.subscription.maxUsers}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Auto-renew</h4>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          company.subscription.autoRenew
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {company.subscription.autoRenew ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {company.activity.map((activity) => (
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
              onClick={() => setShowSuspendModal(true)}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Suspend
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Shield className="w-4 h-4 mr-2" />
              Delete Company
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delete Company</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Are you sure you want to delete {company.name}?
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  This action cannot be undone. All company data, users, and associated records will be permanently removed.
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
                    Delete Company
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
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Lock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Suspend Company</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Are you sure you want to suspend {company.name}?
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  The company will lose access to all services. Users will be unable to log in and operations will be paused.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowSuspendModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSuspend}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                  >
                    Suspend Company
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

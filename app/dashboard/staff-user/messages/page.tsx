'use client'

import AuthGuard from '@/components/AuthGuard'
import DashboardLayout from '@/components/DashboardLayout'
import { MessageSquare, Search, Send, Phone, Mail, Clock, CheckCircle, AlertTriangle, User, Car, Calendar, Filter, Reply, Star, Paperclip } from 'lucide-react'

export default function StaffMessagesPage() {
  const conversations = [
    {
      id: 1,
      customer: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      lastMessage: 'Running 15 minutes late for check-in',
      time: '10 min ago',
      unread: 2,
      status: 'active',
      priority: 'high',
      vehicle: 'Tesla Model 3',
      bookingId: 'BK-001234',
      avatar: 'JS'
    },
    {
      id: 2,
      customer: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      lastMessage: 'Where do I return the keys?',
      time: '1 hour ago',
      unread: 1,
      status: 'active',
      priority: 'normal',
      vehicle: 'BMW X5',
      bookingId: 'BK-001235',
      avatar: 'SJ'
    },
    {
      id: 3,
      customer: 'Mike Davis',
      email: 'mike.davis@email.com',
      phone: '+1 (555) 456-7890',
      lastMessage: 'Thank you for the excellent service!',
      time: '2 hours ago',
      unread: 0,
      status: 'active',
      priority: 'normal',
      vehicle: 'Mercedes C-Class',
      bookingId: 'BK-001236',
      avatar: 'MD'
    },
    {
      id: 4,
      customer: 'Emma Wilson',
      email: 'emma.w@email.com',
      phone: '+1 (555) 321-6549',
      lastMessage: 'Is GPS included in the rental?',
      time: '3 hours ago',
      unread: 0,
      status: 'active',
      priority: 'normal',
      vehicle: 'Audi A4',
      bookingId: 'BK-001237',
      avatar: 'EW'
    },
    {
      id: 5,
      customer: 'Robert Chen',
      email: 'robert.chen@email.com',
      phone: '+1 (555) 654-9876',
      lastMessage: 'The car was perfect, will book again!',
      time: '1 day ago',
      unread: 0,
      status: 'closed',
      priority: 'low',
      vehicle: 'Tesla Model 3',
      bookingId: 'BK-001238',
      avatar: 'RC'
    }
  ]

  const messages = [
    {
      id: 1,
      sender: 'customer',
      content: 'Hi, I\'m running about 15 minutes late for my check-in. Is that okay?',
      time: '10:15 AM',
      type: 'received'
    },
    {
      id: 2,
      sender: 'staff',
      content: 'Hello John! That\'s absolutely fine. We\'ll have your Tesla Model 3 ready for you when you arrive. No need to worry.',
      time: '10:16 AM',
      type: 'sent'
    },
    {
      id: 3,
      sender: 'customer',
      content: 'Great! Thank you so much for your understanding. I should be there around 10:30 AM.',
      time: '10:17 AM',
      type: 'received'
    },
    {
      id: 4,
      sender: 'staff',
      content: 'Perfect! We\'ll see you then. Your vehicle is already prepared and waiting.',
      time: '10:18 AM',
      type: 'sent'
    }
  ]

  const getPriorityBadge = (priority: string) => {
    const styles = {
      high: 'bg-red-100 text-red-800',
      normal: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    }
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${styles[priority as keyof typeof styles]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    )
  }

  return (
    <AuthGuard requiredRole="staff-user">
      <DashboardLayout role="staff-user" title="Messages">
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
              <p className="text-gray-600 mt-1">Communicate with customers</p>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <MessageSquare className="w-4 h-4 mr-2" />
                New Message
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <MessageSquare className="w-8 h-8 text-blue-600" />
                <span className="text-sm font-medium text-red-600">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">23</h3>
              <p className="text-sm text-gray-600">Unread Messages</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <User className="w-8 h-8 text-green-600" />
                <span className="text-sm font-medium text-green-600">+12%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">156</h3>
              <p className="text-sm text-gray-600">Total Conversations</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                <span className="text-sm font-medium text-orange-600">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">5</h3>
              <p className="text-sm text-gray-600">Urgent Messages</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 text-purple-600" />
                <span className="text-sm font-medium text-green-600">+8%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">94%</h3>
              <p className="text-sm text-gray-600">Response Rate</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-100">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
                <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">{conversation.avatar}</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {conversation.customer}
                            </p>
                            {conversation.unread > 0 && (
                              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-500 rounded-full">
                                {conversation.unread}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate mb-1">
                            {conversation.lastMessage}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{conversation.time}</span>
                            {getPriorityBadge(conversation.priority)}
                          </div>
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            <Car className="w-3 h-3 mr-1" />
                            {conversation.vehicle} • {conversation.bookingId}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Message Thread */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                {/* Thread Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">JS</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">John Smith</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="w-3 h-3 mr-1" />
                          john.smith@email.com
                          <span className="mx-2">•</span>
                          <Phone className="w-3 h-3 mr-1" />
                          +1 (555) 123-4567
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getPriorityBadge('high')}
                      <button className="text-gray-600 hover:text-gray-900">
                        <Star className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Car className="w-3 h-3 mr-1" />
                      Tesla Model 3
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      Booking: BK-001234
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md ${
                        message.type === 'sent'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      } rounded-lg px-4 py-2`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'sent' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-100">
                  <div className="flex items-end space-x-2">
                    <div className="flex-1">
                      <textarea
                        rows={2}
                        placeholder="Type your message..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Paperclip className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <Phone className="w-3 h-3 mr-2" />
                    Call Customer
                  </button>
                  <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <Mail className="w-3 h-3 mr-2" />
                    Send Email
                  </button>
                  <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <Car className="w-3 h-3 mr-2" />
                    View Booking
                  </button>
                  <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <Calendar className="w-3 h-3 mr-2" />
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Urgent Messages Alert */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-800">
                <p className="font-medium mb-1">Urgent Messages</p>
                <div className="space-y-1">
                  <p>• John Smith - Running 15 minutes late for check-in</p>
                  <p>• Sarah Johnson - Asking about key return location</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}

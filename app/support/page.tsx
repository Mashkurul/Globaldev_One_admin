'use client'

import { useState } from 'react'
import { Shield, Building, Users, ArrowRight, Check, Menu, X, Globe, BarChart3, Settings, FileText, Car, DollarSign, Calendar, MessageSquare, Eye, LogOut, Bell, Search, Mail, Phone, Clock, Send, HelpCircle, Book, Video } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SupportCategory {
  icon: React.ReactNode
  title: string
  description: string
  articles: string[]
  color: string
  bgColor: string
}

interface ContactMethod {
  icon: React.ReactNode
  title: string
  description: string
  action: string
  available: string
  color: string
}

export default function SupportPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  })
  const router = useRouter()

  const categories: SupportCategory[] = [
    {
      icon: <Car className="w-8 h-8" />,
      title: "Getting Started",
      description: "Learn the basics and set up your account",
      articles: [
        "Creating your account",
        "Setting up your company profile",
        "Adding your first vehicle",
        "Understanding the dashboard",
        "User roles and permissions"
      ],
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Account Management",
      description: "Manage your account settings and preferences",
      articles: [
        "Updating company information",
        "Managing users and roles",
        "Billing and subscription",
        "Security settings",
        "Data export and backup"
      ],
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Bookings & Reservations",
      description: "Everything about managing bookings",
      articles: [
        "Creating new bookings",
        "Managing availability",
        "Handling cancellations",
        "Payment processing",
        "Booking notifications"
      ],
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Vehicles & Fleet",
      description: "Manage your vehicle fleet efficiently",
      articles: [
        "Adding new vehicles",
        "Vehicle categories",
        "Maintenance scheduling",
        "Document management",
        "Vehicle analytics"
      ],
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Reports & Analytics",
      description: "Understanding your business metrics",
      articles: [
        "Revenue reports",
        "Vehicle utilization",
        "Customer analytics",
        "Custom reports",
        "Data visualization"
      ],
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Technical Support",
      description: "Technical issues and troubleshooting",
      articles: [
        "Common error messages",
        "API integration",
        "Mobile app issues",
        "Performance optimization",
        "Security concerns"
      ],
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ]

  const contactMethods: ContactMethod[] = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      description: "Get help via email for non-urgent issues",
      action: "support@globaldevadmin.com",
      available: "24-48 hours response",
      color: "text-blue-600"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      action: "Start chat",
      available: "Mon-Fri, 9AM-6PM EST",
      color: "text-green-600"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      description: "Speak directly with our support team",
      action: "+1 (555) 123-4567",
      available: "Enterprise customers only",
      color: "text-purple-600"
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Video Call",
      description: "Schedule a video call for complex issues",
      action: "Schedule call",
      available: "By appointment",
      color: "text-orange-600"
    }
  ]

  const handleSubmitSupport = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Support ticket submitted:', formData)
    // Handle form submission
    alert('Support ticket submitted successfully! We\'ll get back to you soon.')
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'medium'
    })
  }

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.articles.some(article => article.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <Car className="w-8 h-8 text-blue-600 mr-2" />
                  <span className="text-xl font-bold text-gray-900 dark:text-white">GlobalDev Admin</span>
                </div>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="/features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Features</a>
              <a href="/pricing" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="/support" className="text-blue-600 font-medium">Support</a>
              <a href="/documentation" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Documentation</a>
              <button 
                onClick={() => router.push('/')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/features" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Features</a>
              <a href="/pricing" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="/support" className="block px-3 py-2 text-blue-600 font-medium">Support</a>
              <a href="/documentation" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Documentation</a>
              <button 
                onClick={() => router.push('/')}
                className="w-full text-left px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            How Can We Help You?
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Find answers to common questions, get technical support, or reach out to our team for personalized assistance.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <div className={`${method.color} mb-4`}>
                  {method.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                <p className="text-sm font-medium text-gray-900 mb-2">{method.action}</p>
                <p className="text-xs text-gray-500">{method.available}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse Help Categories</h2>
            <p className="text-lg text-gray-600">Find answers organized by topic</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
              >
                <div className={`${category.color} mb-4`}>
                  {category.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>

                <div className="space-y-2">
                  {category.articles.slice(0, 3).map((article, articleIndex) => (
                    <div key={articleIndex} className="flex items-center text-sm text-gray-700 hover:text-blue-600 cursor-pointer">
                      <ArrowRight className="w-3 h-3 mr-2" />
                      {article}
                    </div>
                  ))}
                  {category.articles.length > 3 && (
                    <div className="text-sm text-blue-600 font-medium cursor-pointer">
                      View all {category.articles.length} articles →
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
            <p className="text-lg text-gray-600">Send us a message and we'll get back to you as soon as possible</p>
          </div>

          <form onSubmit={handleSubmitSupport} className="bg-gray-50 rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
              <textarea
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your issue or question in detail..."
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Resources</h2>
            <p className="text-lg text-gray-600">Explore more ways to get help and learn</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-lg p-4 mb-4 inline-block">
                <Book className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
              <p className="text-sm text-gray-600 mb-4">Comprehensive guides and API documentation</p>
              <a href="/documentation" className="text-blue-600 font-medium hover:text-blue-700">
                View Documentation →
              </a>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-lg p-4 mb-4 inline-block">
                <Video className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Video Tutorials</h3>
              <p className="text-sm text-gray-600 mb-4">Step-by-step video guides for common tasks</p>
              <a href="#" className="text-blue-600 font-medium hover:text-blue-700">
                Watch Videos →
              </a>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-lg p-4 mb-4 inline-block">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Community Forum</h3>
              <p className="text-sm text-gray-600 mb-4">Connect with other users and share tips</p>
              <a href="#" className="text-blue-600 font-medium hover:text-blue-700">
                Join Community →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Car className="w-6 h-6 text-blue-400 mr-2" />
                <span className="text-lg font-bold">GlobalDev Admin</span>
              </div>
              <p className="text-gray-400 text-sm">
                Comprehensive admin platform for vehicle rental businesses
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/documentation" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="/support" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="/support" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 GlobalDev Admin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

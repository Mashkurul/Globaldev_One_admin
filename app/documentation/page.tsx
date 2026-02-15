'use client'

import { useState } from 'react'
import { Shield, Building, Users, ArrowRight, Check, Menu, X, Globe, BarChart3, Settings, FileText, Car, DollarSign, Calendar, MessageSquare, Eye, LogOut, Bell, Search, Book, Code, Terminal, Zap, Database, Lock, Smartphone, Clock, ChevronRight, Copy, ExternalLink, File, Package, GitBranch } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DocSection {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  bgColor: string
  articles: {
    title: string
    description: string
    type: 'guide' | 'api' | 'tutorial' | 'reference'
    readTime: string
  }[]
}

interface CodeExample {
  title: string
  description: string
  language: string
  code: string
}

export default function DocumentationPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSection, setSelectedSection] = useState<string>('getting-started')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const router = useRouter()

  const sections: DocSection[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Learn the basics and get up and running quickly',
      icon: <Zap className="w-8 h-8" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      articles: [
        {
          title: 'Quick Start Guide',
          description: 'Get your account set up and running in minutes',
          type: 'guide',
          readTime: '5 min'
        },
        {
          title: 'Dashboard Overview',
          description: 'Understanding the main dashboard and navigation',
          type: 'tutorial',
          readTime: '8 min'
        },
        {
          title: 'User Roles & Permissions',
          description: 'Learn about different user roles and their capabilities',
          type: 'guide',
          readTime: '6 min'
        },
        {
          title: 'Company Setup',
          description: 'Configure your company profile and settings',
          type: 'tutorial',
          readTime: '10 min'
        }
      ]
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      description: 'Complete API documentation and examples',
      icon: <Code className="w-8 h-8" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      articles: [
        {
          title: 'Authentication',
          description: 'Learn how to authenticate with our API',
          type: 'api',
          readTime: '5 min'
        },
        {
          title: 'Endpoints Overview',
          description: 'Complete list of available API endpoints',
          type: 'reference',
          readTime: '15 min'
        },
        {
          title: 'Rate Limiting',
          description: 'Understanding API rate limits and best practices',
          type: 'guide',
          readTime: '3 min'
        },
        {
          title: 'Error Handling',
          description: 'How to handle API errors and responses',
          type: 'reference',
          readTime: '7 min'
        }
      ]
    },
    {
      id: 'vehicles',
      title: 'Vehicle Management',
      description: 'Managing your vehicle fleet',
      icon: <Car className="w-8 h-8" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      articles: [
        {
          title: 'Adding Vehicles',
          description: 'How to add and configure new vehicles',
          type: 'tutorial',
          readTime: '6 min'
        },
        {
          title: 'Vehicle Categories',
          description: 'Organizing vehicles by categories and types',
          type: 'guide',
          readTime: '4 min'
        },
        {
          title: 'Maintenance Scheduling',
          description: 'Setting up and managing maintenance schedules',
          type: 'tutorial',
          readTime: '8 min'
        },
        {
          title: 'Vehicle Documents',
          description: 'Managing vehicle-related documents and files',
          type: 'guide',
          readTime: '5 min'
        }
      ]
    },
    {
      id: 'bookings',
      title: 'Bookings & Reservations',
      description: 'Managing bookings and customer reservations',
      icon: <Calendar className="w-8 h-8" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      articles: [
        {
          title: 'Creating Bookings',
          description: 'Step-by-step guide to creating new bookings',
          type: 'tutorial',
          readTime: '7 min'
        },
        {
          title: 'Availability Management',
          description: 'Managing vehicle availability and scheduling',
          type: 'guide',
          readTime: '6 min'
        },
        {
          title: 'Payment Processing',
          description: 'Handling payments and refunds',
          type: 'tutorial',
          readTime: '9 min'
        },
        {
          title: 'Booking Notifications',
          description: 'Setting up automated notifications',
          type: 'guide',
          readTime: '5 min'
        }
      ]
    },
    {
      id: 'integrations',
      title: 'Integrations',
      description: 'Connect with third-party services',
      icon: <Database className="w-8 h-8" />,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      articles: [
        {
          title: 'Payment Gateways',
          description: 'Integrating with Stripe, PayPal, and more',
          type: 'tutorial',
          readTime: '10 min'
        },
        {
          title: 'Email Services',
          description: 'Setting up email notifications with SendGrid',
          type: 'guide',
          readTime: '6 min'
        },
        {
          title: 'Webhooks',
          description: 'Using webhooks for real-time updates',
          type: 'api',
          readTime: '8 min'
        },
        {
          title: 'Custom Integrations',
          description: 'Building custom integrations with our API',
          type: 'tutorial',
          readTime: '12 min'
        }
      ]
    },
    {
      id: 'security',
      title: 'Security',
      description: 'Security best practices and guidelines',
      icon: <Lock className="w-8 h-8" />,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      articles: [
        {
          title: 'Security Overview',
          description: 'Understanding our security architecture',
          type: 'guide',
          readTime: '7 min'
        },
        {
          title: 'Data Encryption',
          description: 'How we protect your data with encryption',
          type: 'reference',
          readTime: '5 min'
        },
        {
          title: 'Compliance',
          description: 'GDPR and other compliance standards',
          type: 'reference',
          readTime: '6 min'
        },
        {
          title: 'Best Practices',
          description: 'Security best practices for your account',
          type: 'guide',
          readTime: '8 min'
        }
      ]
    }
  ]

  const codeExamples: CodeExample[] = [
    {
      title: 'API Authentication',
      description: 'Example of how to authenticate with our API',
      language: 'javascript',
      code: `const apiKey = 'your_api_key_here';
const baseUrl = 'https://api.globaldevadmin.com/v1';

const headers = {
  'Authorization': \`Bearer \${apiKey}\`,
  'Content-Type': 'application/json'
};

// Example request
const response = await fetch(\`\${baseUrl}/vehicles\`, {
  method: 'GET',
  headers: headers
});

const data = await response.json();
console.log(data);`
    },
    {
      title: 'Create a Booking',
      description: 'Example of creating a new booking via API',
      language: 'javascript',
      code: `const bookingData = {
  vehicleId: 'veh_123456',
  customerId: 'cust_789012',
  startDate: '2026-02-20T10:00:00Z',
  endDate: '2026-02-25T10:00:00Z',
  totalPrice: 500.00,
  currency: 'USD'
};

const response = await fetch(\`\${baseUrl}/bookings\`, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(bookingData)
});

const booking = await response.json();
console.log('Booking created:', booking.id);`
    }
  ]

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.articles.some(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const currentSection = sections.find(s => s.id === selectedSection)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
              <a href="/support" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Support</a>
              <a href="/documentation" className="text-blue-600 font-medium">Documentation</a>
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
              <a href="/support" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Support</a>
              <a href="/documentation" className="block px-3 py-2 text-blue-600 font-medium">Documentation</a>
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
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Developer Documentation
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Everything you need to integrate, build, and scale with GlobalDev Admin
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Documentation Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredSections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
            >
              <div className={`${section.color} ${section.bgColor} rounded-lg p-3 mb-4 inline-block`}>
                {section.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {section.title}
              </h3>
              <p className="text-gray-600 mb-4">{section.description}</p>
              
              <div className="space-y-3">
                {section.articles.slice(0, 3).map((article, index) => (
                  <div key={index} className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className="text-sm font-medium text-gray-900">{article.title}</span>
                        <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${
                          article.type === 'guide' ? 'bg-blue-100 text-blue-800' :
                          article.type === 'api' ? 'bg-green-100 text-green-800' :
                          article.type === 'tutorial' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {article.type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{article.readTime} read</p>
                    </div>
                  </div>
                ))}
                {section.articles.length > 3 && (
                  <div className="text-sm text-blue-600 font-medium hover:text-blue-700">
                    View all {section.articles.length} articles →
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Start Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Start</h2>
            <p className="text-lg text-gray-600">Get up and running in minutes</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Create Account',
                description: 'Sign up for a GlobalDev Admin account',
                icon: <Users className="w-6 h-6" />
              },
              {
                step: '2',
                title: 'Setup Company',
                description: 'Configure your company profile and settings',
                icon: <Building className="w-6 h-6" />
              },
              {
                step: '3',
                title: 'Add Vehicles',
                description: 'Upload your vehicle fleet information',
                icon: <Car className="w-6 h-6" />
              },
              {
                step: '4',
                title: 'Start Booking',
                description: 'Begin accepting reservations and managing rentals',
                icon: <Calendar className="w-6 h-6" />
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <div className="bg-gray-100 rounded-lg p-3 mb-3 inline-block">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Code Examples */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Code Examples</h2>
            <p className="text-lg text-gray-600">Practical examples to help you integrate</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {codeExamples.map((example, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{example.title}</h3>
                      <p className="text-sm text-gray-600">{example.description}</p>
                    </div>
                    <button
                      onClick={() => handleCopyCode(example.code)}
                      className="flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      {copiedCode === example.code ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
                <div className="bg-gray-900 p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-300">
                    <code>{example.code}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* API Reference Cards */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">API Reference</h2>
            <p className="text-lg text-gray-600">Complete API documentation and endpoints</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'REST API',
                description: 'Complete RESTful API with all CRUD operations',
                icon: <Globe className="w-8 h-8" />,
                color: 'text-blue-600',
                bgColor: 'bg-blue-50',
                endpoints: '50+ endpoints'
              },
              {
                title: 'Webhooks',
                description: 'Real-time webhooks for event notifications',
                icon: <Terminal className="w-8 h-8" />,
                color: 'text-green-600',
                bgColor: 'bg-green-50',
                endpoints: '15+ events'
              },
              {
                title: 'SDKs',
                description: 'Official SDKs for popular languages',
                icon: <Package className="w-8 h-8" />,
                color: 'text-purple-600',
                bgColor: 'bg-purple-50',
                endpoints: '6 languages'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
                <div className={`${item.color} ${item.bgColor} rounded-lg p-3 mb-4 inline-block`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{item.endpoints}</span>
                  <a href="#" className="text-blue-600 font-medium hover:text-blue-700 flex items-center">
                    Learn more
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Resources</h2>
            <p className="text-lg text-gray-600">Tools and resources to help you succeed</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'API Reference',
                description: 'Complete API documentation',
                icon: <File className="w-6 h-6" />,
                color: 'text-blue-600',
                bgColor: 'bg-blue-50'
              },
              {
                title: 'SDK Downloads',
                description: 'Official SDKs and libraries',
                icon: <Package className="w-6 h-6" />,
                color: 'text-green-600',
                bgColor: 'bg-green-50'
              },
              {
                title: 'Postman Collection',
                description: 'Ready-to-use API requests',
                icon: <Terminal className="w-6 h-6" />,
                color: 'text-purple-600',
                bgColor: 'bg-purple-50'
              },
              {
                title: 'GitHub Examples',
                description: 'Code examples and projects',
                icon: <GitBranch className="w-6 h-6" />,
                color: 'text-orange-600',
                bgColor: 'bg-orange-50'
              }
            ].map((resource, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 text-center">
                <div className={`${resource.color} ${resource.bgColor} rounded-lg p-3 mb-4 inline-block`}>
                  {resource.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                <a href="#" className="text-blue-600 font-medium hover:text-blue-700">
                  Access →
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>

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

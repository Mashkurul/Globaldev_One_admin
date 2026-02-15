'use client'

import { useState } from 'react'
import { Shield, Building, Users, ArrowRight, Check, Menu, X, Globe, BarChart3, Settings, FileText, Car, DollarSign, Calendar, MessageSquare, Eye, LogOut, Bell, Search, Lock, Zap, Database, Smartphone, Clock, Award, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface FeatureCard {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  color: string
  bgColor: string
}

export default function FeaturesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  const features: FeatureCard[] = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Role-Based Access Control",
      description: "Comprehensive permission system with three distinct roles for optimal security and workflow management.",
      features: [
        "Super Admin: Complete platform control",
        "Business Admin: Company-level management", 
        "Staff User: Operational access only"
      ],
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Multi-Company Management",
      description: "Manage multiple rental companies from a single unified platform with complete isolation.",
      features: [
        "Separate company profiles and branding",
        "Independent vehicle fleets",
        "Dedicated financial reporting"
      ],
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Vehicle Fleet Management",
      description: "Complete vehicle lifecycle management from listing to maintenance tracking.",
      features: [
        "Real-time availability tracking",
        "Automated pricing rules",
        "Maintenance scheduling",
        "Document management"
      ],
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Booking & Reservation System",
      description: "Advanced booking engine with flexible scheduling and automated workflows.",
      features: [
        "Real-time availability checking",
        "Automated confirmations",
        "Waitlist management",
        "Mobile-optimized booking"
      ],
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Financial Management",
      description: "Comprehensive financial tools for revenue tracking, payments, and reporting.",
      features: [
        "Multi-currency support",
        "Automated invoicing",
        "Revenue analytics",
        "Tax management"
      ],
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Legal & Compliance",
      description: "Complete document management system for contracts, agreements, and compliance tracking.",
      features: [
        "Digital contract generation",
        "E-signature integration",
        "Compliance monitoring",
        "Audit trail"
      ],
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics & Reporting",
      description: "Powerful analytics dashboard with real-time insights and customizable reports.",
      features: [
        "Real-time dashboards",
        "Custom report builder",
        "Data export capabilities",
        "Performance metrics"
      ],
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Communication Hub",
      description: "Integrated messaging system for seamless customer and team communication.",
      features: [
        "In-app messaging",
        "Email notifications",
        "SMS integration",
        "Template management"
      ],
      color: "text-pink-600",
      bgColor: "bg-pink-50"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Security & Privacy",
      description: "Enterprise-grade security with advanced encryption and compliance standards.",
      features: [
        "End-to-end encryption",
        "GDPR compliance",
        "Two-factor authentication",
        "Regular security audits"
      ],
      color: "text-gray-600",
      bgColor: "bg-gray-50"
    }
  ]

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
              <a href="/features" className="text-blue-600 font-medium">Features</a>
              <a href="/pricing" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="/support" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Support</a>
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
              <a href="/features" className="block px-3 py-2 text-blue-600 font-medium">Features</a>
              <a href="/pricing" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="/support" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Support</a>
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
            Powerful Features for Your Rental Business
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Everything you need to manage, grow, and scale your vehicle rental operation. 
            Built for businesses of all sizes with enterprise-grade capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/')}
              className="inline-flex items-center px-8 py-3 text-base font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button 
              onClick={() => router.push('/pricing')}
              className="inline-flex items-center px-8 py-3 text-base font-medium border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              View Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
              >
                <div className={`mb-4 ${feature.color}`}>
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>

                <div className="space-y-2">
                  {feature.features.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Rental Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of rental companies that trust GlobalDev Admin to manage their operations.
          </p>
          <button 
            onClick={() => router.push('/')}
            className="inline-flex items-center px-8 py-3 text-base font-medium bg-white text-blue-600 rounded-lg hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
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

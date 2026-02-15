'use client'

import { useState } from 'react'
import { Shield, Building, Users, ArrowRight, Check, Menu, X, Globe, BarChart3, Settings, FileText, Car, DollarSign, Calendar, MessageSquare, Eye, LogOut, Bell, Search, Zap, Crown, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface PricingPlan {
  name: string
  subtitle: string
  price: string
  period: string
  features: string[]
  highlighted?: boolean
  icon: React.ReactNode
  color: string
  bgColor: string
  borderColor: string
}

export default function PricingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')
  const router = useRouter()

  const plans: PricingPlan[] = [
    {
      name: 'Starter',
      subtitle: 'Perfect for small rental businesses',
      price: billingCycle === 'monthly' ? '$99' : '$990',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      icon: <Car className="w-8 h-8" />,
      features: [
        'Up to 25 vehicles',
        '5 staff users',
        'Basic analytics',
        'Mobile app access',
        'Email support',
        '1GB document storage',
        'Standard reporting',
        'API access (1000 calls/month)'
      ],
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    },
    {
      name: 'Professional',
      subtitle: 'Ideal for growing businesses',
      price: billingCycle === 'monthly' ? '$299' : '$2,990',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      icon: <Building className="w-8 h-8" />,
      features: [
        'Up to 100 vehicles',
        '20 staff users',
        'Advanced analytics',
        'Priority support',
        '10GB document storage',
        'Custom branding',
        'Advanced reporting',
        'API access (10,000 calls/month)',
        'Integration with 3rd party apps',
        'Automated workflows'
      ],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      name: 'Enterprise',
      subtitle: 'For large-scale operations',
      price: billingCycle === 'monthly' ? '$799' : '$7,990',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      icon: <Crown className="w-8 h-8" />,
      highlighted: true,
      features: [
        'Unlimited vehicles',
        'Unlimited staff users',
        'Real-time analytics dashboard',
        '24/7 phone support',
        '100GB document storage',
        'White-label solution',
        'Custom integrations',
        'Unlimited API calls',
        'Dedicated account manager',
        'Custom training sessions',
        'SLA guarantee',
        'Advanced security features'
      ],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ]

  const handleGetStarted = (planName: string) => {
    router.push('/')
  }

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
              <a href="/pricing" className="text-blue-600 font-medium">Pricing</a>
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
              <a href="/features" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Features</a>
              <a href="/pricing" className="block px-3 py-2 text-blue-600 font-medium">Pricing</a>
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
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Choose the perfect plan for your rental business. 
            No hidden fees, no surprises. Start with a 14-day free trial.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <span className={`mr-3 ${billingCycle === 'monthly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`ml-3 ${billingCycle === 'annual' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Annual
            </span>
            {billingCycle === 'annual' && (
              <span className="ml-3 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                Save 17%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-xl border-2 p-8 hover:shadow-lg transition-all duration-200 ${
                  plan.highlighted
                    ? `${plan.borderColor} ${plan.bgColor} ring-2 ring-offset-2 ring-blue-500 transform scale-105`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`mb-6 ${plan.color}`}>
                  {plan.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.subtitle}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleGetStarted(plan.name)}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                    plan.highlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Everything you need to know about our pricing</p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Can I change my plan later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes! All plans come with a 14-day free trial. No credit card required to start."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans."
              },
              {
                question: "Do you offer custom plans?",
                answer: "Yes, we can create custom plans for large organizations. Contact our sales team for more information."
              },
              {
                question: "Is my data secure?",
                answer: "Absolutely. We use industry-standard encryption and are GDPR compliant. Your data is always safe with us."
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of rental companies that trust GlobalDev Admin to manage their operations.
          </p>
          <button 
            onClick={() => router.push('/')}
            className="inline-flex items-center px-8 py-3 text-base font-medium bg-white text-blue-600 rounded-lg hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Start Your Free Trial
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

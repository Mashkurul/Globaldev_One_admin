'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SexyBackButtonProps {
  backTo: string
  label: string
}

export default function SexyBackButton({ backTo, label }: SexyBackButtonProps) {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="group relative inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 dark:from-gray-700 dark:to-gray-800 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ease-out hover:from-gray-700 hover:to-gray-800 dark:hover:from-gray-800 dark:hover:to-gray-900"
    >
      <ArrowLeft className="w-5 h-5 mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform duration-200" />
      <span className="relative">
        {label}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></span>
      </span>
    </button>
  )
}

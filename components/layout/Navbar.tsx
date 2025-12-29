'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getCartItemCount, getTotalProtein } from '@/lib/cartUtils'
import CartDropdown from './CartDropdown'

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const [totalProtein, setTotalProtein] = useState(0)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const updateCart = () => {
      setCartCount(getCartItemCount())
      setTotalProtein(getTotalProtein())
    }

    updateCart()

    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCart)

    return () => {
      window.removeEventListener('cartUpdated', updateCart)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search functionality here
    console.log('Searching for:', searchQuery)
  }

  const isActive = (path: string) => pathname === path

  return (
    <nav className="fixed top-0 w-full bg-gray-900 text-white z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-12 md:h-14 gap-2 md:gap-4">
          {/* Logo */}
          <div className="flex-shrink-0 min-w-0">
            <Link href="/" className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#9fcc2e] hover:text-[#5a6650] transition whitespace-nowrap">
              FitZone
            </Link>
          </div>
          
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-6">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search eggs , paneer, banana..."
                  className="w-full px-3 py-1.5 pl-8 pr-3 text-sm bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-[#9fcc2e] focus:ring-1 focus:ring-[#9fcc2e]"
                />
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </form>
          </div>

          {/* Navigation Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <Link href="/tools" className="bg-[#9fcc2e] hover:bg-[#295135] text-white font-semibold py-1.5 px-4 text-sm rounded-lg transition duration-300 transform hover:scale-105 whitespace-nowrap">
              Calculate
            </Link>
            <Link href="/nutrition" className="bg-transparent border-2 border-[#9fcc2e] hover:bg-[#9fcc2e] text-[#9fcc2e] hover:text-white font-semibold py-1.5 px-4 text-sm rounded-lg transition duration-300 whitespace-nowrap">
              Nutrition
            </Link>
            
            {/* Cart Button */}
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative bg-transparent border-2 border-[#9fcc2e] hover:bg-[#9fcc2e] text-[#9fcc2e] hover:text-white font-semibold py-1.5 px-4 text-sm rounded-lg transition duration-300 flex items-center gap-2"
                title={cartCount > 0 ? `Cart: ${cartCount} items, Total Protein: ${totalProtein}g` : 'Cart'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <>
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                    {totalProtein > 0 && (
                      <span className="text-xs font-bold bg-[#9fcc2e]/20 px-2 py-0.5 rounded">
                        {totalProtein}g
                      </span>
                    )}
                  </>
                )}
              </button>
              <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            </div>
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="md:hidden flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            <Link href="/tools" className="bg-[#9fcc2e] hover:bg-[#295135] text-white font-semibold py-1.5 px-2 text-[10px] sm:text-xs rounded-md transition duration-300 whitespace-nowrap">
              Calculate
            </Link>
            <Link href="/nutrition" className="bg-transparent border border-[#9fcc2e] hover:bg-[#9fcc2e] text-[#9fcc2e] hover:text-white font-semibold py-1.5 px-2 text-[10px] sm:text-xs rounded-md transition duration-300 whitespace-nowrap">
              Nutrition
            </Link>
            
            {/* Cart Button - Mobile */}
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative bg-transparent border border-[#9fcc2e] hover:bg-[#9fcc2e] text-[#9fcc2e] hover:text-white font-semibold py-1.5 px-2 text-[10px] sm:text-xs rounded-md transition duration-300 flex items-center"
                title={cartCount > 0 ? `Cart: ${cartCount} items, Total Protein: ${totalProtein}g` : 'Cart'}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}


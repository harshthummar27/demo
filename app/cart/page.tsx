'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getCartItems, removeFromCart, getTotalProtein, getTotalCalories, getTotalCarbs, clearCart, type CartItem } from '@/lib/cartUtils'

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [totalProtein, setTotalProtein] = useState(0)
  const [totalCalories, setTotalCalories] = useState(0)
  const [totalCarbs, setTotalCarbs] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const updateCart = () => {
      const items = getCartItems()
      setCartItems(items)
      setTotalProtein(getTotalProtein())
      setTotalCalories(getTotalCalories())
      setTotalCarbs(getTotalCarbs())
      setIsLoading(false)
    }

    updateCart()

    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCart)

    return () => {
      window.removeEventListener('cartUpdated', updateCart)
    }
  }, [])

  const handleRemove = (itemId: string) => {
    removeFromCart(itemId)
  }

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear all items from your cart?')) {
      clearCart()
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 pb-12 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-[#9fcc2e] mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-600">Loading cart...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-gradient-to-br from-[#9fcc2e] via-[#8bb825] to-[#7fb518] pt-20 md:pt-24 pb-8 md:pb-12 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-white/25 backdrop-blur-md text-white text-xs sm:text-sm font-semibold rounded-full border-2 border-white/40">
                YOUR SHOPPING BAG
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 drop-shadow-lg">
              My Cart
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-3xl mx-auto font-medium">
              Review your selected products and track your total nutritional intake
            </p>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {cartItems.length === 0 ? (
            // Empty Cart State
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
              <div className="max-w-md mx-auto">
                <svg className="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
                <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
                <Link
                  href="/categories"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#9fcc2e] hover:bg-[#8bb825] text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Browse Products
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
              {/* Cart Items List */}
              <div className="lg:col-span-2 space-y-4">
                {/* Header with Clear Button */}
                <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-4 md:p-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                      Cart Items
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your bag
                    </p>
                  </div>
                  <button
                    onClick={handleClearCart}
                    className="text-sm text-red-600 hover:text-red-700 font-semibold transition-colors flex items-center gap-2 px-3 py-2 hover:bg-red-50 rounded-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Clear All
                  </button>
                </div>

                {/* Cart Items Grid */}
                <div className="grid sm:grid-cols-1 gap-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 group"
                    >
                      <div className="p-4 md:p-6">
                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                          {/* Product Image */}
                          {item.image && (
                            <Link
                              href={`/category/${item.categorySlug}/${item.foodSlug}`}
                              className="relative w-full sm:w-40 h-40 sm:h-40 flex-shrink-0 rounded-xl overflow-hidden bg-gray-200 group-hover:scale-105 transition-transform duration-300"
                            >
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="160px"
                              />
                            </Link>
                          )}

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <Link
                                  href={`/category/${item.categorySlug}/${item.foodSlug}`}
                                  className="block mb-3"
                                >
                                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 hover:text-[#9fcc2e] transition-colors line-clamp-2">
                                    {item.name}
                                  </h3>
                                  <p className="text-xs text-gray-500 capitalize">
                                    {item.categorySlug.replace(/-/g, ' ')}
                                  </p>
                                </Link>
                                
                                {/* Nutritional Info Cards */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                                  {/* Protein Card */}
                                  <div className="bg-[#9fcc2e]/10 rounded-lg p-3 border border-[#9fcc2e]/20">
                                    <div className="flex items-center gap-2 mb-1">
                                      <svg className="w-4 h-4 text-[#9fcc2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                      </svg>
                                      <p className="text-xs font-medium text-gray-600">Protein</p>
                                    </div>
                                    <p className="text-lg font-bold text-[#9fcc2e]">{item.protein}</p>
                                  </div>
                                  
                                  {/* Calories Card */}
                                  {item.calories && (
                                    <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                                      <div className="flex items-center gap-2 mb-1">
                                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <p className="text-xs font-medium text-gray-600">Calories</p>
                                      </div>
                                      <p className="text-lg font-bold text-orange-600">{item.calories}</p>
                                    </div>
                                  )}

                                  {/* Price Card */}
                                  {item.price && (
                                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                      <div className="flex items-center gap-2 mb-1">
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-xs font-medium text-gray-600">Price</p>
                                      </div>
                                      <p className="text-lg font-bold text-green-600">{item.price}</p>
                                    </div>
                                  )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-3">
                                  <Link
                                    href={`/category/${item.categorySlug}/${item.foodSlug}`}
                                    className="text-sm text-[#9fcc2e] hover:text-[#8bb825] font-semibold transition-colors flex items-center gap-1"
                                  >
                                    View Details
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </Link>
                                  <span className="text-gray-300">|</span>
                                  <button
                                    onClick={() => handleRemove(item.id)}
                                    className="text-sm text-red-600 hover:text-red-700 font-semibold transition-colors flex items-center gap-1"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Remove
                                  </button>
                                </div>
                              </div>

                              {/* Remove Button - Mobile */}
                              <button
                                onClick={() => handleRemove(item.id)}
                                className="sm:hidden flex-shrink-0 w-10 h-10 rounded-full bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-colors flex items-center justify-center"
                                title="Remove from cart"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <svg className="w-6 h-6 text-[#9fcc2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Order Summary
                  </h2>
                  
                  {/* Nutritional Totals - Highlighted */}
                  <div className="space-y-4 mb-6">
                    {/* Total Protein */}
                    <div className="bg-gradient-to-br from-[#9fcc2e] via-[#8bb825] to-[#7fb518] rounded-xl p-6 text-white relative overflow-hidden">
                      {/* Decorative circles */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium opacity-90 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Total Protein
                          </span>
                        </div>
                        <div className="text-5xl font-black mb-2">{totalProtein}g</div>
                      </div>
                    </div>

                    {/* Total Calories */}
                    {totalCalories > 0 && (
                      <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-xl p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                        
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium opacity-90 flex items-center gap-2">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              Total Calories
                            </span>
                          </div>
                          <div className="text-5xl font-black mb-2">{totalCalories} kcal</div>
                        </div>
                      </div>
                    )}

                    {/* Total Carbs */}
                    {totalCarbs > 0 && (
                      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-xl p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                        
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium opacity-90 flex items-center gap-2">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              Total Carbs
                            </span>
                          </div>
                          <div className="text-5xl font-black mb-2">{totalCarbs}g</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-600 font-medium flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Total Items
                      </span>
                      <span className="text-gray-900 font-bold text-lg">{cartItems.length}</span>
                    </div>
                    
                    <p className="text-xs text-gray-500 text-center pt-2">
                      Combined from {cartItems.length} {cartItems.length === 1 ? 'product' : 'products'}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Link
                      href="/categories"
                      className="block w-full bg-[#9fcc2e] hover:bg-[#8bb825] text-white font-bold py-3.5 px-6 rounded-xl text-center transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Continue Shopping
                    </Link>
                    
                    <button
                      onClick={handleClearCart}
                      className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl text-center transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Clear Cart
                    </button>
                  </div>

                  {/* Info Box */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-xs text-blue-800 font-medium leading-relaxed">
                          Track your daily nutritional intake by adding products to your cart. The totals shown are the sum of all selected products including Protein, Calories, and Carbs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}


'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search functionality here
    console.log('Searching for:', searchQuery)
  }

  // Hero slides with fitness and nutrition content
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80',
      title: 'Transform Your Body',
      subtitle: 'Fitness & Nutrition Excellence',
      description: 'Discover the perfect balance of fitness and nutrition to achieve your health goals. Expert guidance, quality food, and proven results.'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1920&q=80',
      title: 'Healthy Nutrition',
      subtitle: 'Fresh & Nutritious Foods',
      description: 'Explore a wide variety of fresh fruits, vegetables, and healthy foods. Track your nutrition and make informed dietary choices.'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1920&q=80',
      title: 'Fitness Tools',
      subtitle: 'Calculate Your Goals',
      description: 'Use our free fitness calculators to track BMI, calories, protein needs, and ideal weight. Start your fitness journey today.'
    }
  ]

  // Auto-slide functionality
  useEffect(() => {
    if (slides.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section id="home" className="relative h-[100vh] flex items-center justify-center overflow-hidden pt-12 md:pt-14">
      {/* Background Image Slider */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/70 to-gray-900/80"></div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-0">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Side - Main Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-block mb-4 lg:mb-6">
              <span className="px-4 py-2 bg-[#9fcc2e] text-white text-xs sm:text-sm font-semibold rounded-full">
                FITNESS & NUTRITION
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 lg:mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>

            {/* Subtitle */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#9fcc2e] mb-4 lg:mb-6">
              {slides[currentSlide].subtitle}
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 lg:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {slides[currentSlide].description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6 lg:mb-8">
              <Link
                href="/tools"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#9fcc2e] text-white font-semibold rounded-lg hover:bg-[#295135] transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get Started
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/nutrition"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-[#9fcc2e]">1000+</div>
                <div className="text-sm text-gray-300">Food Items</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-[#9fcc2e]">50K+</div>
                <div className="text-sm text-gray-300">Active Users</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-[#9fcc2e]">4.8/5</div>
                <div className="text-sm text-gray-300">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Side - Search Bar (Desktop) */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Search Food Items</h3>
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative mb-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search eggs, paneer, banana..."
                    className="w-full px-4 py-3 pl-11 pr-4 text-sm bg-white rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:border-[#9fcc2e] focus:ring-2 focus:ring-[#9fcc2e] shadow-sm"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-[#9fcc2e] text-white font-semibold rounded-lg hover:bg-[#295135] transition-all duration-300"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden mt-8">
          <form onSubmit={handleSearch} className="w-full max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search eggs, paneer, banana..."
                className="w-full px-4 py-3 pl-11 pr-4 text-sm bg-white/95 backdrop-blur-sm rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:border-[#9fcc2e] focus:ring-2 focus:ring-[#9fcc2e] shadow-lg"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </form>
        </div>

        {/* Slider Indicators */}
        {slides.length > 1 && (
          <div className="mt-8 lg:mt-12 flex items-center justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 bg-[#9fcc2e]'
                    : 'w-2 bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

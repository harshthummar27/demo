'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function NutritionHero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1920&q=80',
      title: 'Healthy Nutrition',
      subtitle: 'Fuel Your Body with the Right Nutrition'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1920&q=80',
      title: 'High Protein Foods',
      subtitle: 'Discover Protein-Rich Foods for Muscle Building'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80',
      title: 'Balanced Diet Plans',
      subtitle: 'Expert Nutrition Guidance for Your Goals'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <section id="nutrition" className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Image Slider */}
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
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 text-center w-full py-6 md:py-8">
        <div className="mb-4 md:mb-5">
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-[#9fcc2e] text-white text-xs sm:text-sm font-semibold rounded-full mb-3 md:mb-4">
            NUTRITION & DIET
          </span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-3 animate-fade-in">
          {slides[currentSlide].title}
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#9fcc2e] mb-4 md:mb-6">
          {slides[currentSlide].subtitle}
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-4 md:mb-6 max-w-3xl mx-auto px-2">
          Fuel your body with the right nutrition. Discover high protein foods, meal plans, and expert nutrition guidance to achieve your fitness goals.
        </p>

        {/* Step Indicator */}
        <div className="mt-6 md:mt-8 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentSlide
                  ? 'w-8 bg-[#9fcc2e]'
                  : 'w-2 bg-white/50 hover:bg-white/70'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition duration-300"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition duration-300"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  )
}


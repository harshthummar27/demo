import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getCategoryBySlug, getFoodBySlug } from '@/lib/categoryData'
import CompareClient from '@/components/compare/CompareClient'

export const metadata: Metadata = {
  title: 'Compare Foods - Side by Side Comparison | FitZone Gym',
  description: 'Compare two foods side by side. Compare nutritional information, calories, protein, and carbs to make informed dietary choices.',
  keywords: 'food comparison, nutrition comparison, compare foods, nutritional information, diet planning',
  openGraph: {
    title: 'Compare Foods - Side by Side Comparison',
    description: 'Compare two foods side by side to make informed dietary choices.',
    type: 'website',
  },
  alternates: {
    canonical: '/compare',
  },
}

interface ComparePageProps {
  searchParams: Promise<{
    foods?: string
  }> | {
    foods?: string
  }
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  // Handle both Promise and non-Promise searchParams (Next.js 13/14 vs 15)
  const resolvedSearchParams = searchParams instanceof Promise ? await searchParams : searchParams
  
  // Parse food slugs from URL params (format: categorySlug:foodSlug)
  // Limit to maximum 2 foods
  const foodsParam = resolvedSearchParams.foods || ''
  const foodParams = foodsParam 
    ? decodeURIComponent(foodsParam).split(',').filter(Boolean).slice(0, 2)
    : []
  
  // Get food data for each param
  const foodsToCompare = foodParams
    .map(param => {
      const [categorySlug, foodSlug] = param.split(':')
      if (!categorySlug || !foodSlug) return null
      
      const category = getCategoryBySlug(categorySlug)
      const food = getFoodBySlug(categorySlug, foodSlug)
      
      if (!category || !food) return null
      
      return {
        category: {
          name: category.name,
          image: category.image,
          slug: category.slug
        },
        food: {
          name: food.name,
          calories: food.calories,
          protein: food.protein,
          carbs: food.carbs,
          type: food.type,
          image: food.image
        },
        categorySlug,
        foodSlug
      }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)

  // If no foods to compare, show empty state
  if (foodsToCompare.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        
        <section className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-[#9fcc2e]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#9fcc2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Compare Foods
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Select up to 2 foods from any category page to compare their nutritional information side by side.
              </p>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#9fcc2e] to-[#8bb825] hover:from-[#8bb825] hover:to-[#7fb518] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Browse Categories
              </Link>
            </div>
          </div>
        </section>
        
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-[#9fcc2e] via-[#8bb825] to-[#7fb518] pt-16 md:pt-20 pb-8 md:pb-12 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-white/25 backdrop-blur-md text-white text-xs sm:text-sm font-semibold rounded-full border-2 border-white/40">
                PRODUCT COMPARISON
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 drop-shadow-lg">
              Compare Products
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-3xl mx-auto font-medium">
              Side-by-side comparison of nutritional information to help you make informed dietary choices
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <CompareClient foodsToCompare={foodsToCompare} />
        </div>
      </section>

      <Footer />
    </main>
  )
}

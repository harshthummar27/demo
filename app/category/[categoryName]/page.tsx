import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getCategoryBySlug, getFoodsByCategorySlug, categories, getFoodSlug } from '@/lib/categoryData'
import AddToCompareButton from '@/components/compare/AddToCompareButton'

interface CategoryPageProps {
  params: {
    categoryName: string
  }
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    categoryName: category.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.categoryName)
  
  if (!category) {
    return {
      title: 'Category Not Found | FitZone Gym',
      description: 'The requested category could not be found.',
    }
  }

  const categoryName = category.name.toLowerCase()
  const categoryDesc = category.description.toLowerCase()

  return {
    title: `${category.name} - Complete Food Category | Nutritional Information | FitZone Gym`,
    description: `Browse our complete ${categoryName} category with detailed nutritional information. Find ${categoryDesc} including calories, protein, carbs, and health benefits. Explore all ${categoryName} items with complete nutrition facts.`,
    keywords: `${categoryName}, ${categoryDesc}, ${categoryName} foods, ${categoryName} nutrition, ${categoryName} list, food category, nutritional foods, healthy ${categoryName}, ${categoryName} calories, ${categoryName} protein`,
    openGraph: {
      title: `${category.name} - Food Category | FitZone Gym`,
      description: `Browse our complete ${categoryName} category with detailed nutritional information. Find ${categoryDesc} and more.`,
      type: 'website',
      images: category.image ? [
        {
          url: category.image,
          width: 1200,
          height: 630,
          alt: `${category.name} Category`,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} - Food Category`,
      description: `Browse our complete ${categoryName} category with detailed nutritional information.`,
    },
    alternates: {
      canonical: `/category/${category.slug}`,
    },
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.categoryName)
  const foods = getFoodsByCategorySlug(params.categoryName)

  if (!category || !foods || foods.length === 0) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-br from-[#9fcc2e] via-[#8bb825] to-[#7fb518] pt-16 md:pt-20 pb-6 md:pb-12 lg:pb-16 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        </div>
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '25px 25px'
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Back Button - Hidden on Mobile */}
          <div className="hidden md:block mb-4 md:mb-6 lg:mb-8 relative z-10">
            <Link 
              href="/categories"
              className="inline-flex items-center justify-center gap-2 text-white font-semibold text-sm group bg-white/25 backdrop-blur-md px-4 py-2 rounded-full border-2 border-white/40 hover:bg-white/35 shadow-lg transition-all duration-200"
            >
              <svg className="w-4 h-4 flex-shrink-0 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Categories</span>
            </Link>
          </div>

          <div className="flex flex-row lg:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-6 lg:gap-12">
            {/* Left Side - Image */}
            <div className="flex-shrink-0">
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-white/40 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl transform scale-110"></div>
                {/* Image */}
                <div className="relative bg-white/30 backdrop-blur-md rounded-2xl sm:rounded-3xl p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 shadow-2xl border-2 sm:border-4 border-white/50 transform hover:scale-105 transition-transform duration-300">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-44 xl:h-44">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-contain drop-shadow-2xl"
                      sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 112px, (max-width: 1280px) 144px, 176px"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="flex-1 text-left">
              {/* Badge */}
              <div className="inline-block mb-1.5 sm:mb-2 md:mb-3 lg:mb-4">
                <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 bg-white/25 backdrop-blur-md text-white text-xs sm:text-sm font-extrabold rounded-full border-2 border-white/40 shadow-xl uppercase tracking-wider">
                  Food Category
                </span>
              </div>
              
              {/* Title */}
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black text-white mb-1 sm:mb-2 md:mb-3 lg:mb-4 leading-tight drop-shadow-2xl">
                {category.name}
              </h1>
              
              {/* Description */}
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/95 mb-2 sm:mb-3 md:mb-4 lg:mb-5 max-w-2xl font-semibold">
                {category.description}
              </p>

              {/* Stats Cards - Hidden on Mobile */}
              <div className="hidden md:flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 md:gap-4">
                <div className="bg-white/25 backdrop-blur-md rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-3.5 border-2 border-white/40 shadow-xl hover:scale-105 transition-transform duration-300">
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-0.5">{foods.length}</div>
                  <div className="text-xs text-white/95 font-bold uppercase tracking-wide">Food Items</div>
                </div>
                <div className="bg-white/25 backdrop-blur-md rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-3.5 border-2 border-white/40 shadow-xl hover:scale-105 transition-transform duration-300">
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-0.5">100%</div>
                  <div className="text-xs text-white/95 font-bold uppercase tracking-wide">Fresh & Healthy</div>
                </div>
                <div className="bg-white/25 backdrop-blur-md rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-3.5 border-2 border-white/40 shadow-xl hover:scale-105 transition-transform duration-300">
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-0.5">⭐</div>
                  <div className="text-xs text-white/95 font-bold uppercase tracking-wide">Premium Quality</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-8 md:h-12" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" fillOpacity="0.1"/>
          </svg>
        </div>
      </section>

      {/* Food Items Grid */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
              {category.name}
            </h2>
            <div className="w-16 md:w-24 h-0.5 md:h-1 bg-[#9fcc2e] mx-auto mb-3 md:mb-4"></div>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-2">
              Discover nutritional information for various {category.name.toLowerCase()} items
            </p>
          </div>

          {/* Mobile View: 2 columns */}
          <div className="md:hidden">
            <div className="grid grid-cols-2 gap-3">
              {foods.map((food, index) => (
                <Link
                  key={index}
                  href={`/category/${params.categoryName}/${getFoodSlug(food.name)}`}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-200 group"
                >
                  {/* Image */}
                  <div className="relative h-28 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image
                      src={food.image || category.image}
                      alt={food.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {/* Veg/Non-Veg Icon */}
                    {food.type && (
                      <div className="absolute top-2 left-2 z-10">
                        {food.type === 'Veg' ? (
                          <div className="w-5 h-5 border-2 border-green-600 bg-white rounded flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-600 rounded"></div>
                          </div>
                        ) : (
                          <div className="w-5 h-5 border-2 border-red-600 bg-white rounded flex items-center justify-center">
                            <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[7px] border-l-transparent border-r-transparent border-b-red-600"></div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-2.5">
                    <h3 className="text-xs font-bold text-gray-900 mb-1.5 line-clamp-2 group-hover:text-[#9fcc2e] transition-colors">
                      {food.name}
                    </h3>
                    
                    {food.calories && (
                      <div className="space-y-0.5 mb-2 pb-1.5 border-b border-gray-100">
                        <div className="flex justify-between items-center py-0.5 px-1.5 bg-gray-50 rounded-md">
                          <span className="text-xs text-gray-600 font-medium">Calories</span>
                          <span className="text-xs font-bold text-gray-900">{food.calories}</span>
                        </div>
                        {food.carbs && (
                          <div className="flex justify-between items-center py-0.5 px-1.5 bg-[#9fcc2e]/5 rounded-md">
                            <span className="text-xs text-gray-600 font-medium">Carbs</span>
                            <span className="text-xs font-bold text-[#9fcc2e]">{food.carbs}</span>
                          </div>
                        )}
                        {food.protein && (
                          <div className="flex justify-between items-center py-0.5 px-1.5 bg-gray-50 rounded-md">
                            <span className="text-xs text-gray-600 font-medium">Protein</span>
                            <span className="text-xs font-bold text-gray-900">{food.protein}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Button */}
                    <div className="w-full bg-gradient-to-r from-[#9fcc2e] to-[#8bb825] text-white font-bold py-1.5 px-2 text-xs rounded-lg text-center">
                      View Details
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop View: Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
            {foods.map((food, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200 group"
              >
                <Link href={`/category/${params.categoryName}/${getFoodSlug(food.name)}`}>
                {/* Image */}
                <div className="relative h-40 md:h-44 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <Image
                    src={food.image || category.image}
                    alt={food.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* Veg/Non-Veg Icon */}
                  {food.type && (
                    <div className="absolute top-2 left-2 z-10">
                      {food.type === 'Veg' ? (
                        <div className="w-6 h-6 border-2 border-green-600 bg-white rounded flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-600 rounded"></div>
                        </div>
                      ) : (
                        <div className="w-6 h-6 border-2 border-red-600 bg-white rounded flex items-center justify-center">
                          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-red-600"></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 group-hover:text-[#9fcc2e] transition-colors line-clamp-2">
                    {food.name}
                  </h3>
                  
                  {food.calories && (
                    <div className="space-y-1.5 mb-3 pb-3 border-b border-gray-100">
                      <div className="flex justify-between items-center py-1.5 px-2 bg-gray-50 rounded-lg">
                        <span className="text-xs md:text-sm text-gray-600 font-medium">Calories</span>
                        <span className="text-xs md:text-sm font-bold text-gray-900">{food.calories} kcal</span>
                      </div>
                      {food.carbs && (
                        <div className="flex justify-between items-center py-1.5 px-2 bg-[#9fcc2e]/5 rounded-lg">
                          <span className="text-xs md:text-sm text-gray-600 font-medium">Carbs</span>
                          <span className="text-xs md:text-sm font-bold text-[#9fcc2e]">{food.carbs}</span>
                        </div>
                      )}
                      {food.protein && (
                        <div className="flex justify-between items-center py-1.5 px-2 bg-gray-50 rounded-lg">
                          <span className="text-xs md:text-sm text-gray-600 font-medium">Protein</span>
                          <span className="text-xs md:text-sm font-bold text-gray-900">{food.protein}</span>
                        </div>
                      )}
                    </div>
                  )}
                  </div>
                </Link>

                  {/* Buttons Row */}
                <div className="px-3 pb-3 flex gap-2">
                  <Link
                    href={`/category/${params.categoryName}/${getFoodSlug(food.name)}`}
                    className="flex-1 bg-gradient-to-r from-[#9fcc2e] to-[#8bb825] hover:from-[#8bb825] hover:to-[#7fb518] text-white font-bold py-2 px-2 text-xs md:text-sm rounded-xl text-center shadow-md transition-all duration-300"
                  >
                      View Details
                  </Link>
                  <Suspense fallback={
                    <div className="flex-1 bg-white border-2 border-[#9fcc2e] text-[#9fcc2e] font-bold py-2 px-2 text-xs md:text-sm rounded-xl shadow-md text-center">
                      Compare
                  </div>
                  }>
                    <AddToCompareButton
                      categorySlug={params.categoryName}
                      foodSlug={getFoodSlug(food.name)}
                      className="flex-1 bg-white border-2 border-[#9fcc2e] hover:bg-[#9fcc2e] text-[#9fcc2e] hover:text-white font-bold py-2 px-2 text-xs md:text-sm rounded-xl shadow-md text-center transition-all duration-300"
                    >
                      Compare
                    </AddToCompareButton>
                  </Suspense>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}


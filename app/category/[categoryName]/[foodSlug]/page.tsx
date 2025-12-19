import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getCategoryBySlug, getFoodBySlug, getFoodsByCategorySlug, getFoodSlug } from '@/lib/categoryData'

interface FoodDetailPageProps {
  params: {
    categoryName: string
    foodSlug: string
  }
}

export async function generateStaticParams() {
  const categories = [
    'foods', 'fruits', 'vegetables', 'fast-food', 'wafers-and-snacks',
    'juices', 'dairy-products', 'bakery-items', 'beverage-items', 'dry-fruits-and-nuts'
  ]
  
  const params: { categoryName: string; foodSlug: string }[] = []
  
  categories.forEach(categorySlug => {
    const foods = getFoodsByCategorySlug(categorySlug)
    foods.forEach(food => {
      params.push({
        categoryName: categorySlug,
        foodSlug: getFoodSlug(food.name)
      })
    })
  })
  
  return params
}

export async function generateMetadata({ params }: FoodDetailPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.categoryName)
  const food = getFoodBySlug(params.categoryName, params.foodSlug)
  
  if (!category || !food) {
    return {
      title: 'Food Not Found',
    }
  }

  return {
    title: `${food.name} - ${category.name} | FitZone Gym`,
    description: `Learn about ${food.name.toLowerCase()}. Nutritional information: ${food.calories} calories, ${food.protein} protein, ${food.carbs} carbs per serving.`,
    keywords: `${food.name.toLowerCase()}, ${category.name.toLowerCase()}, nutrition, calories, protein, carbs, food information`,
    openGraph: {
      title: `${food.name} - ${category.name}`,
      description: `Nutritional information for ${food.name.toLowerCase()}.`,
      type: 'website',
    },
    alternates: {
      canonical: `/category/${params.categoryName}/${params.foodSlug}`,
    },
  }
}

export default function FoodDetailPage({ params }: FoodDetailPageProps) {
  const category = getCategoryBySlug(params.categoryName)
  const food = getFoodBySlug(params.categoryName, params.foodSlug)
  const relatedFoods = getFoodsByCategorySlug(params.categoryName).filter(
    f => getFoodSlug(f.name) !== params.foodSlug
  ).slice(0, 6)

  if (!category || !food) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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
              href={`/category/${params.categoryName}`}
              className="inline-flex items-center justify-center gap-2 text-white font-semibold text-sm group bg-white/25 backdrop-blur-md px-4 py-2 rounded-full border-2 border-white/40 hover:bg-white/35 shadow-lg transition-all duration-200"
            >
              <svg className="w-4 h-4 flex-shrink-0 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to {category.name}</span>
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
                      src={food.image || category.image}
                      alt={food.name}
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
                <Link href={`/category/${params.categoryName}`}>
                  <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 bg-white/25 backdrop-blur-md text-white text-xs sm:text-sm font-extrabold rounded-full border-2 border-white/40 shadow-xl uppercase tracking-wider hover:bg-white/35 transition-all">
                    {category.name}
                  </span>
                </Link>
              </div>
              
              {/* Title */}
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black text-white mb-1 sm:mb-2 md:mb-3 lg:mb-4 leading-tight drop-shadow-2xl">
                {food.name}
              </h1>
              
              {/* Type Badge */}
              {food.type && (
                <div className="inline-block mb-2 sm:mb-3 md:mb-4">
                  {food.type === 'Veg' ? (
                    <div className="flex items-center gap-2 bg-white/25 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full border-2 border-white/40 shadow-xl">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-green-600 bg-white rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-600 rounded-full"></div>
                      </div>
                      <span className="text-white font-bold text-xs sm:text-sm md:text-base">Vegetarian</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 bg-white/25 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full border-2 border-white/40 shadow-xl">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-red-600 bg-white rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[7px] sm:border-l-[5px] sm:border-r-[5px] sm:border-b-[8px] border-l-transparent border-r-transparent border-b-red-600"></div>
                      </div>
                      <span className="text-white font-bold text-xs sm:text-sm md:text-base">Non-Vegetarian</span>
                    </div>
                  )}
                </div>
              )}

              {/* Stats Cards - Hidden on Mobile */}
              <div className="hidden md:flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 md:gap-4">
                {food.calories && (
                  <div className="bg-white/25 backdrop-blur-md rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-3.5 border-2 border-white/40 shadow-xl hover:scale-105 transition-transform duration-300">
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-0.5">{food.calories}</div>
                    <div className="text-xs text-white/95 font-bold uppercase tracking-wide">Calories</div>
                  </div>
                )}
                {food.protein && (
                  <div className="bg-white/25 backdrop-blur-md rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-3.5 border-2 border-white/40 shadow-xl hover:scale-105 transition-transform duration-300">
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-0.5">{food.protein}</div>
                    <div className="text-xs text-white/95 font-bold uppercase tracking-wide">Protein</div>
                  </div>
                )}
                {food.carbs && (
                  <div className="bg-white/25 backdrop-blur-md rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-3.5 border-2 border-white/40 shadow-xl hover:scale-105 transition-transform duration-300">
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-0.5">{food.carbs}</div>
                    <div className="text-xs text-white/95 font-bold uppercase tracking-wide">Carbs</div>
                  </div>
                )}
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

      {/* Mobile Stats - Shown only on mobile */}
      <section className="md:hidden bg-white py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-3 gap-3">
            {food.calories && (
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 border border-gray-200 text-center">
                <div className="text-xl font-black text-gray-900 mb-1">{food.calories}</div>
                <div className="text-xs text-gray-600 font-semibold uppercase">Calories</div>
              </div>
            )}
            {food.protein && (
              <div className="bg-gradient-to-br from-[#9fcc2e]/5 to-[#9fcc2e]/10 rounded-xl p-3 border border-[#9fcc2e]/20 text-center">
                <div className="text-xl font-black text-[#9fcc2e] mb-1">{food.protein}</div>
                <div className="text-xs text-gray-600 font-semibold uppercase">Protein</div>
              </div>
            )}
            {food.carbs && (
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 border border-gray-200 text-center">
                <div className="text-xl font-black text-gray-900 mb-1">{food.carbs}</div>
                <div className="text-xs text-gray-600 font-semibold uppercase">Carbs</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Nutritional Information */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#9fcc2e]/10 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#9fcc2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Nutritional Information</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {food.calories && (
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 font-medium">Calories</span>
                      </div>
                      <div className="text-3xl md:text-4xl font-black text-gray-900">{food.calories}</div>
                      <div className="text-xs text-gray-500 mt-1">per serving</div>
                    </div>
                  )}
                  {food.protein && (
                    <div className="bg-gradient-to-br from-[#9fcc2e]/5 to-[#9fcc2e]/10 rounded-xl p-5 border border-[#9fcc2e]/20 hover:shadow-md transition-all">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-[#9fcc2e] rounded-full"></div>
                        <span className="text-sm text-gray-600 font-medium">Protein</span>
                      </div>
                      <div className="text-3xl md:text-4xl font-black text-[#9fcc2e]">{food.protein}</div>
                      <div className="text-xs text-gray-500 mt-1">per serving</div>
                    </div>
                  )}
                  {food.carbs && (
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 font-medium">Carbohydrates</span>
                      </div>
                      <div className="text-3xl md:text-4xl font-black text-gray-900">{food.carbs}</div>
                      <div className="text-xs text-gray-500 mt-1">per serving</div>
                    </div>
                  )}
                </div>
              </div>

              {/* About Section */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">About {food.name}</h2>
                </div>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  {food.name} is a nutritious food item from the <span className="font-semibold text-[#9fcc2e]">{category.name.toLowerCase()}</span> category. 
                  It provides essential nutrients including <span className="font-semibold">{food.protein || 'protein'}</span> and <span className="font-semibold">{food.carbs || 'carbohydrates'}</span>, 
                  making it a valuable addition to a balanced diet. With <span className="font-semibold">{food.calories || 'calories'}</span> calories per serving, 
                  it can be incorporated into various meal plans to support your health and fitness goals.
                </p>
              </div>

              {/* Health Benefits */}
              <div className="bg-gradient-to-br from-[#9fcc2e]/10 via-[#8bb825]/5 to-white rounded-2xl shadow-lg border border-[#9fcc2e]/20 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#9fcc2e]/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#9fcc2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Health Benefits</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Rich in essential nutrients and vitamins',
                    'Supports overall health and wellness',
                    'Can be part of a balanced diet plan',
                    'Helps meet daily nutritional requirements',
                    'Promotes healthy digestion',
                    'Boosts energy levels naturally'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white/50 rounded-xl">
                      <svg className="w-5 h-5 text-[#9fcc2e] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    href={`/category/${params.categoryName}`}
                    className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-[#9fcc2e]/10 rounded-xl transition-all group"
                  >
                    <svg className="w-5 h-5 text-gray-600 group-hover:text-[#9fcc2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="text-gray-700 font-medium group-hover:text-[#9fcc2e]">Back to {category.name}</span>
                  </Link>
                  <Link
                    href={`/compare?foods=${params.categoryName}:${params.foodSlug}`}
                    className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-[#9fcc2e]/10 rounded-xl transition-all group"
                  >
                    <svg className="w-5 h-5 text-gray-600 group-hover:text-[#9fcc2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <span className="text-gray-700 font-medium group-hover:text-[#9fcc2e]">Compare Foods</span>
                  </Link>
                  <Link
                    href="/categories"
                    className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-[#9fcc2e]/10 rounded-xl transition-all group"
                  >
                    <svg className="w-5 h-5 text-gray-600 group-hover:text-[#9fcc2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <span className="text-gray-700 font-medium group-hover:text-[#9fcc2e]">All Categories</span>
                  </Link>
                  <Link
                    href="/tools"
                    className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-[#9fcc2e]/10 rounded-xl transition-all group"
                  >
                    <svg className="w-5 h-5 text-gray-600 group-hover:text-[#9fcc2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700 font-medium group-hover:text-[#9fcc2e]">Fitness Calculators</span>
                  </Link>
                </div>
              </div>

              {/* Nutrition Tips */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h3 className="text-lg font-bold text-gray-900">Nutrition Tip</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  For optimal nutrition, combine {food.name.toLowerCase()} with other food groups to create a balanced meal. 
                  Remember to stay hydrated and maintain portion control for best results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Foods Section */}
      {relatedFoods.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                More from {category.name}
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Discover other nutritious options from this category
              </p>
            </div>

            {/* Mobile View: 2 columns */}
            <div className="md:hidden">
              <div className="grid grid-cols-2 gap-4">
                {relatedFoods.map((relatedFood, index) => (
                  <Link
                    key={index}
                    href={`/category/${params.categoryName}/${getFoodSlug(relatedFood.name)}`}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-200 group"
                  >
                    <div className="relative h-32 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <Image
                        src={relatedFood.image || category.image}
                        alt={relatedFood.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#9fcc2e] transition-colors">
                        {relatedFood.name}
                      </h3>
                      {relatedFood.calories && (
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span className="font-semibold">{relatedFood.calories}</span> kcal
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop View: Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedFoods.map((relatedFood, index) => (
                <Link
                  key={index}
                  href={`/category/${params.categoryName}/${getFoodSlug(relatedFood.name)}`}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200 group"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image
                      src={relatedFood.image || category.image}
                      alt={relatedFood.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                    {relatedFood.type && (
                      <div className="absolute top-3 right-3">
                        {relatedFood.type === 'Veg' ? (
                          <div className="w-6 h-6 border-2 border-green-600 bg-white rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                          </div>
                        ) : (
                          <div className="w-6 h-6 border-2 border-red-600 bg-white rounded-full flex items-center justify-center">
                            <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[8px] border-l-transparent border-r-transparent border-b-red-600"></div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#9fcc2e] transition-colors line-clamp-2">
                      {relatedFood.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      {relatedFood.calories && (
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span className="font-semibold">{relatedFood.calories}</span> kcal
                        </div>
                      )}
                      <span className="text-[#9fcc2e] font-semibold text-sm">View Details →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getCategoryBySlug, getFoodsByCategorySlug, categories } from '@/lib/categoryData'

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
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.name} - Food Category | FitZone Gym`,
    description: `Browse our ${category.name.toLowerCase()} category. Find ${category.description.toLowerCase()} and more.`,
    keywords: `${category.name.toLowerCase()}, ${category.description.toLowerCase()}, food items, nutrition`,
    openGraph: {
      title: `${category.name} - Food Category`,
      description: `Browse our ${category.name.toLowerCase()} category. Find ${category.description.toLowerCase()} and more.`,
      type: 'website',
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
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#9fcc2e] to-[#7fb518] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link 
              href="/categories"
              className="inline-block mb-4 text-white hover:text-gray-100 transition-colors text-sm font-medium"
            >
              ← Back to Categories
            </Link>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 96px, 128px"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
              {category.name}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              {category.description}
            </p>
          </div>
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
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 group"
                >
                  {/* Image */}
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={food.image || category.image}
                      alt={food.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {/* Veg/Non-Veg Icon */}
                    {food.type && (
                      <div className="absolute top-2 left-2">
                        {food.type === 'Veg' ? (
                          <div className="w-5 h-5 border-2 border-green-600 bg-white rounded flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
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
                  <div className="p-3">
                    <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">
                      {food.name}
                    </h3>
                    
                    {food.calories && (
                      <div className="space-y-1 mb-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">Calories:</span>
                          <span className="text-xs font-semibold text-gray-900">{food.calories} kcal</span>
                        </div>
                        {food.carbs && (
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">Carbs:</span>
                            <span className="text-xs font-semibold text-[#9fcc2e]">{food.carbs}</span>
                          </div>
                        )}
                        {food.protein && (
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">Protein:</span>
                            <span className="text-xs font-semibold text-gray-900">{food.protein}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Buttons Row */}
                    <div className="flex gap-1.5">
                      <button className="flex-1 bg-[#9fcc2e] hover:bg-[#295135] text-white font-semibold py-1.5 px-2 text-xs rounded-lg transition duration-300 transform hover:scale-105">
                        Details →
                      </button>
                      <button className="flex-1 bg-transparent border-2 border-[#9fcc2e] hover:bg-[#9fcc2e] text-[#9fcc2e] hover:text-white font-semibold py-1.5 px-2 text-xs rounded-lg transition duration-300">
                        Compare
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop View: Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {foods.map((food, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 group"
              >
                {/* Image */}
                <div className="relative h-48 md:h-56 w-full overflow-hidden">
                  <Image
                    src={food.image || category.image}
                    alt={food.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  {/* Veg/Non-Veg Icon */}
                  {food.type && (
                    <div className="absolute top-2 left-2">
                      {food.type === 'Veg' ? (
                        <div className="w-6 h-6 border-2 border-green-600 bg-white rounded flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
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
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {food.name}
                  </h3>
                  
                  {food.calories && (
                    <div className="space-y-1.5 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Calories:</span>
                        <span className="text-sm font-semibold text-gray-900">{food.calories} kcal</span>
                      </div>
                      {food.carbs && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Carbs:</span>
                          <span className="text-sm font-semibold text-[#9fcc2e]">{food.carbs}</span>
                        </div>
                      )}
                      {food.protein && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Protein:</span>
                          <span className="text-sm font-semibold text-gray-900">{food.protein}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Buttons Row */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#9fcc2e] hover:bg-[#295135] text-white font-semibold py-2 px-3 text-xs rounded-lg transition duration-300 transform hover:scale-105">
                      View More Details →
                    </button>
                    <button className="flex-1 bg-transparent border-2 border-[#9fcc2e] hover:bg-[#9fcc2e] text-[#9fcc2e] hover:text-white font-semibold py-2 px-3 text-xs rounded-lg transition duration-300">
                      Compare
                    </button>
                  </div>
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


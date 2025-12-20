import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getCategoryBySlug, getFoodBySlug, getFoodsByCategorySlug, getFoodSlug, categories } from '@/lib/categoryData'
import FoodImageGallery from '@/components/food/FoodImageGallery'
import { Suspense } from 'react'
import AddToCompareButton from '@/components/compare/AddToCompareButton'

interface FoodDetailPageProps {
  params: {
    categoryName: string
    foodSlug: string
  }
}

export async function generateStaticParams() {
  const params: { categoryName: string; foodSlug: string }[] = []
  
  categories.forEach(category => {
    const foods = getFoodsByCategorySlug(category.slug)
    foods.forEach(food => {
      params.push({
        categoryName: category.slug,
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

  const mainImage = food.image || category.image

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Breadcrumb Navigation */}
      <section className="bg-gray-50 border-b border-gray-200 pt-20 pb-3">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#9fcc2e] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-[#9fcc2e] transition-colors">Categories</Link>
            <span>/</span>
            <Link href={`/category/${params.categoryName}`} className="hover:text-[#9fcc2e] transition-colors capitalize">
              {category.name}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium line-clamp-1">{food.name}</span>
          </nav>
        </div>
      </section>

      {/* Main Product Section */}
      <section className="py-6 md:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* Left Column - Image Gallery */}
            <div className="w-full">
              <FoodImageGallery 
                mainImage={mainImage}
                foodName={food.name}
                categoryImage={category.image}
              />
            </div>

            {/* Right Column - Product Info */}
            <div className="w-full">
              {/* Brand & Category */}
              <div className="mb-3">
                <Link href={`/category/${params.categoryName}`}>
                  <span className="text-sm text-[#9fcc2e] font-semibold hover:underline">
                    {category.name}
                  </span>
                </Link>
              </div>

              {/* Product Name */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {food.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span className="text-gray-900 font-semibold">4.4</span>
                  <span className="text-gray-500 text-sm">/5</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600 text-sm">120+ Reviews</span>
              </div>

              {/* Pricing */}
              <div className="mb-6 p-4 bg-gradient-to-r from-[#9fcc2e]/10 to-[#8bb825]/5 rounded-xl border border-[#9fcc2e]/20">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl md:text-4xl font-black text-gray-900">{food.calories || 'N/A'}</span>
                  <span className="text-lg text-gray-600 font-medium">kcal</span>
                  <span className="text-sm text-gray-500 line-through ml-2">per serving</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {food.protein && (
                    <span className="px-3 py-1 bg-[#9fcc2e] text-white text-sm font-semibold rounded-full">
                      Protein: {food.protein}
                    </span>
                  )}
                  {food.carbs && (
                    <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm font-semibold rounded-full">
                      Carbs: {food.carbs}
                    </span>
                  )}
                </div>
              </div>

              {/* Type Badge */}
              {food.type && (
                <div className="mb-6">
                  {food.type === 'Veg' ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border-2 border-green-200 rounded-lg">
                      <div className="w-6 h-6 border-2 border-green-600 bg-white rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      </div>
                      <span className="text-green-800 font-bold text-sm">Vegetarian</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border-2 border-red-200 rounded-lg">
                      <div className="w-6 h-6 border-2 border-red-600 bg-white rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[8px] border-l-transparent border-r-transparent border-b-red-600"></div>
                      </div>
                      <span className="text-red-800 font-bold text-sm">Non-Vegetarian</span>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Suspense fallback={
                  <div className="flex-1 bg-gradient-to-r from-[#9fcc2e] to-[#8bb825] text-white font-bold py-3 px-6 rounded-xl text-center">
                    Compare
                  </div>
                }>
                  <AddToCompareButton
                    categorySlug={params.categoryName}
                    foodSlug={params.foodSlug}
                    className="flex-1 bg-gradient-to-r from-[#9fcc2e] to-[#8bb825] hover:from-[#8bb825] hover:to-[#7fb518] text-white font-bold py-3 px-6 rounded-xl text-center transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Add to Compare
                  </AddToCompareButton>
                </Suspense>
                <Link
                  href={`/category/${params.categoryName}`}
                  className="flex-1 bg-white border-2 border-[#9fcc2e] hover:bg-[#9fcc2e] text-[#9fcc2e] hover:text-white font-bold py-3 px-6 rounded-xl text-center transition-all duration-300 shadow-md"
                >
                  View More from {category.name}
                </Link>
              </div>

              {/* Service Icons */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-[#9fcc2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-[#9fcc2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>100% Fresh</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-[#9fcc2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights/Specifications Section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Highlights</h2>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Column */}
              <div className="divide-y divide-gray-200">
                <div className="p-4 md:p-6">
                  <div className="text-sm text-gray-500 font-medium mb-1">Brand</div>
                  <div className="text-base font-semibold text-gray-900">{category.name}</div>
                </div>
                <div className="p-4 md:p-6">
                  <div className="text-sm text-gray-500 font-medium mb-1">Product Type</div>
                  <div className="text-base font-semibold text-gray-900">{category.name}</div>
                </div>
                <div className="p-4 md:p-6">
                  <div className="text-sm text-gray-500 font-medium mb-1">Dietary Preference</div>
                  <div className="text-base font-semibold text-gray-900">
                    {food.type === 'Veg' ? 'Vegetarian' : food.type === 'Non-veg' ? 'Non-Vegetarian' : 'N/A'}
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <div className="text-sm text-gray-500 font-medium mb-1">Serving Size</div>
                  <div className="text-base font-semibold text-gray-900">100g</div>
                </div>
                <div className="p-4 md:p-6">
                  <div className="text-sm text-gray-500 font-medium mb-1">Is Perishable</div>
                  <div className="text-base font-semibold text-gray-900">Yes</div>
                </div>
              </div>

              {/* Right Column */}
              <div className="divide-y divide-gray-200 border-t md:border-t-0 md:border-l border-gray-200">
                <div className="p-4 md:p-6">
                  <div className="text-sm text-gray-500 font-medium mb-1">Calories</div>
                  <div className="text-base font-semibold text-gray-900">{food.calories || 'N/A'} kcal</div>
                </div>
                <div className="p-4 md:p-6">
                  <div className="text-sm text-gray-500 font-medium mb-1">Protein</div>
                  <div className="text-base font-semibold text-[#9fcc2e]">{food.protein || 'N/A'}</div>
                </div>
                <div className="p-4 md:p-6">
                  <div className="text-sm text-gray-500 font-medium mb-1">Carbohydrates</div>
                  <div className="text-base font-semibold text-gray-900">{food.carbs || 'N/A'}</div>
                </div>
                <div className="p-4 md:p-6">
                  <div className="text-sm text-gray-500 font-medium mb-1">Category</div>
                  <div className="text-base font-semibold text-gray-900">{category.name}</div>
                </div>
                <div className="p-4 md:p-6">
                  <div className="text-sm text-gray-500 font-medium mb-1">Key Features</div>
                  <div className="text-base font-semibold text-gray-900">Rich in nutrients, Fresh & Healthy</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">About {food.name}</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {food.name} is a nutritious food item from the <span className="font-semibold text-[#9fcc2e]">{category.name.toLowerCase()}</span> category. 
              It provides essential nutrients including <span className="font-semibold">{food.protein || 'protein'}</span> and <span className="font-semibold">{food.carbs || 'carbohydrates'}</span>, 
              making it a valuable addition to a balanced diet.
            </p>
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-2">Key Benefits:</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#9fcc2e] font-bold mt-1">•</span>
                  <span>Rich in essential nutrients and vitamins</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#9fcc2e] font-bold mt-1">•</span>
                  <span>Supports overall health and wellness</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#9fcc2e] font-bold mt-1">•</span>
                  <span>Can be part of a balanced diet plan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#9fcc2e] font-bold mt-1">•</span>
                  <span>Helps meet daily nutritional requirements</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Foods Section */}
      {relatedFoods.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
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

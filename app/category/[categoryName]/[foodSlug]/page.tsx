import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getCategoryBySlug, getFoodBySlug, getFoodsByCategorySlug, getFoodSlug, categories } from '@/lib/categoryData'
import FoodImageGallery from '@/components/food/FoodImageGallery'
import ProductInfoBox from '@/components/food/ProductInfoBox'
import OffersSection from '@/components/food/OffersSection'
import CategoryDetailInfo from '@/components/food/CategoryDetailInfo'
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

  // Calculate price from calories (simple formula: calories * 0.8 = base price)
  const calculatePrice = (calories?: string) => {
    if (!calories) return { price: '₹99', originalPrice: 'MRP ₹150', discount: '₹51 OFF' }
    const cal = parseInt(calories)
    const basePrice = Math.round(cal * 0.8)
    const originalPrice = Math.round(basePrice * 1.4)
    const discount = originalPrice - basePrice
    return {
      price: `₹${basePrice}`,
      originalPrice: `MRP ₹${originalPrice}`,
      discount: `₹${discount} OFF`
    }
  }

  const pricing = calculatePrice(food.calories)

  // Calculate additional nutritional values
  const getMineralValue = (calories?: string) => {
    if (!calories) return '20g'
    const cal = parseInt(calories)
    // Simple calculation: minerals roughly 15-25% of calories
    return `${Math.round(cal * 0.2)}g`
  }

  // Get nutrients based on food type and category
  const getNutrients = () => {
    const baseNutrients = [
      { name: 'Fat', value: '1g' },
      { name: 'Fiber', value: '0.3g' },
      { name: 'Potassium', value: '0.5g' },
      { name: 'Vitamin C', value: '5g' }
    ]
    
    // Customize based on category
    if (params.categoryName === 'fruits') {
      return [
        { name: 'Fat', value: '0.3g' },
        { name: 'Fiber', value: '2.6g' },
        { name: 'Potassium', value: '358mg' },
        { name: 'Vitamin C', value: '8.7mg' }
      ]
    }
    
    return baseNutrients
  }

  // Get health benefits based on food
  const getHealthBenefits = () => {
    const benefits = [
      { benefit: 'Energy Boost', description: 'High natural carbs' },
      { benefit: 'Muscle Support', description: 'Potassium helps muscle recovery' }
    ]
    
    if (food.protein && parseInt(food.protein) > 5) {
      benefits.push({ benefit: 'Protein Rich', description: 'Supports muscle growth and repair' })
    }
    
    if (params.categoryName === 'fruits') {
      benefits[0] = { benefit: 'Energy Boost', description: 'Natural sugars provide quick energy' }
      benefits.push({ benefit: 'Antioxidant Power', description: 'Rich in vitamins and antioxidants' })
    }
    
    return benefits.slice(0, 2) // Return first 2
  }

  // Get highlights based on food
  const getHighlights = () => {
    const highlights = []
    
    if (food.protein && parseInt(food.protein) > 5) {
      highlights.push('Best for Pre workout')
    } else {
      highlights.push('Best for Pre workout')
    }
    
    highlights.push('Rich in vitamins')
    
    if (params.categoryName === 'fruits') {
      highlights.push('Natural and Fresh')
    }
    
    return highlights.slice(0, 2) // Return first 2
  }

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
            <div className="w-full" data-food-gallery>
              <FoodImageGallery 
                mainImage={mainImage}
                foodName={food.name}
                categoryImage={category.image}
              />
            </div>

            {/* Right Column - Product Info */}
            <div className="w-full">
              <CategoryDetailInfo
                productName={food.name}
                brand={category.name}
                quantity="100g"
                protein={food.protein || '10g'}
                mineral={getMineralValue(food.calories)}
                calories={food.calories || '89'}
                carbs={food.carbs}
                highlights={getHighlights()}
                nutrients={getNutrients()}
                healthBenefits={getHealthBenefits()}
                rating={4.4}
                categorySlug={params.categoryName}
                foodSlug={params.foodSlug}
                foodType={food.type}
                price={pricing.price}
                originalPrice={pricing.originalPrice}
                discount={pricing.discount}
              />
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

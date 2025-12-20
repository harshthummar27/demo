'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface FoodToCompare {
  category: {
    name: string
    image: string
    slug: string
  }
  food: {
    name: string
    calories?: string
    protein?: string
    carbs?: string
    type?: 'Veg' | 'Non-veg'
    image?: string
  }
  categorySlug: string
  foodSlug: string
}

interface CompareClientProps {
  foodsToCompare: FoodToCompare[]
}

export default function CompareClient({ foodsToCompare }: CompareClientProps) {
  const router = useRouter()
  const [foods, setFoods] = useState<FoodToCompare[]>(foodsToCompare)

  // Update foods when URL changes and sync with localStorage
  useEffect(() => {
    setFoods(foodsToCompare)
    if (typeof window !== 'undefined' && foodsToCompare.length > 0) {
      const foodsParam = foodsToCompare
        .map(f => `${f.categorySlug}:${f.foodSlug}`)
        .join(',')
      localStorage.setItem('compareFoods', JSON.stringify(foodsParam.split(',')))
    } else if (typeof window !== 'undefined' && foodsToCompare.length === 0) {
      localStorage.removeItem('compareFoods')
    }
  }, [foodsToCompare])

  // Remove a food from comparison
  const removeFood = (index: number) => {
    const updatedFoods = foods.filter((_, i) => i !== index)
    setFoods(updatedFoods)
    
    if (typeof window !== 'undefined') {
      if (updatedFoods.length === 0) {
        localStorage.removeItem('compareFoods')
        router.push('/compare')
      } else {
        const newParams = updatedFoods
          .map(f => `${f.categorySlug}:${f.foodSlug}`)
          .join(',')
        localStorage.setItem('compareFoods', JSON.stringify(newParams.split(',')))
        router.push(`/compare?foods=${encodeURIComponent(newParams)}`)
      }
    }
  }

  // Clear all comparisons
  const clearAll = () => {
    setFoods([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem('compareFoods')
    }
    router.push('/compare')
  }

  // Helper function to parse numeric values
  const parseValue = (value: string | undefined): number => {
    if (!value) return 0
    const num = parseFloat(value.replace(/[^\d.]/g, ''))
    return isNaN(num) ? 0 : num
  }

  // Helper function to determine winner (higher is better for most metrics)
  const getWinner = (value1: number, value2: number, higherIsBetter: boolean = true): number => {
    if (value1 === 0 && value2 === 0) return 0
    if (value1 === 0) return 2
    if (value2 === 0) return 1
    if (higherIsBetter) {
      return value1 > value2 ? 1 : value2 > value1 ? 2 : 0
    } else {
      return value1 < value2 ? 1 : value2 < value1 ? 2 : 0
    }
  }

  // Prepare foods for display (always 2 slots)
  const displayFoods = Array(2).fill(null).map((_, index) => foods[index] || null)

  // Comparison specifications
  const comparisonSpecs = [
    {
      label: 'Product Image',
      key: 'image',
      type: 'image'
    },
    {
      label: 'Product Name',
      key: 'name',
      type: 'text'
    },
    {
      label: 'Category',
      key: 'category',
      type: 'text'
    },
    {
      label: 'Dietary Type',
      key: 'type',
      type: 'badge'
    },
    {
      label: 'Calories (per 100g)',
      key: 'calories',
      type: 'number',
      unit: 'kcal',
      higherIsBetter: false
    },
    {
      label: 'Protein',
      key: 'protein',
      type: 'number',
      unit: 'g',
      higherIsBetter: true
    },
    {
      label: 'Carbohydrates',
      key: 'carbs',
      type: 'number',
      unit: 'g',
      higherIsBetter: false
    },
    {
      label: 'Nutritional Score',
      key: 'score',
      type: 'score'
    },
    {
      label: 'Best For',
      key: 'bestFor',
      type: 'text'
    }
  ]

  // Calculate nutritional score
  const calculateScore = (food: FoodToCompare | null): number => {
    if (!food) return 0
    const protein = parseValue(food.food.protein)
    const calories = parseValue(food.food.calories)
    // Simple scoring: higher protein, lower calories = better score
    const score = (protein * 10) - (calories * 0.1)
    return Math.max(0, Math.min(100, Math.round(score)))
  }

  // Get best for text
  const getBestFor = (food: FoodToCompare | null): string => {
    if (!food) return '-'
    const protein = parseValue(food.food.protein)
    const calories = parseValue(food.food.calories)
    
    if (protein > 15) return 'Muscle Building'
    if (calories < 50) return 'Weight Loss'
    if (protein > 8 && calories < 150) return 'Balanced Diet'
    return 'General Nutrition'
  }

  return (
    <div className="space-y-6">
      {/* Header Actions Bar */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#9fcc2e]/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#9fcc2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900">Product Comparison</h2>
              <p className="text-sm text-gray-600">Comparing {foods.length} of 2 products</p>
            </div>
          </div>
          {foods.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Desktop Comparison Table */}
      <div className="hidden lg:block bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider w-[200px]">
                  Specifications
                </th>
                {displayFoods.map((food, index) => (
                  <th key={index} className="px-6 py-4 text-center min-w-[280px]">
                    {food ? (
                      <div className="flex flex-col items-center gap-3">
                        <button
                          onClick={() => removeFood(index)}
                          className="self-end text-gray-400 hover:text-red-600 transition-colors"
                          title="Remove from comparison"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200 shadow-lg">
                          <Image
                            src={food.food.image || food.category.image}
                            alt={food.food.name}
                            fill
                            className="object-cover"
                            sizes="128px"
                          />
                        </div>
                        <div className="text-center">
                          <Link
                            href={`/category/${food.categorySlug}/${food.foodSlug}`}
                            className="text-lg font-bold text-gray-900 hover:text-[#9fcc2e] transition-colors block mb-1"
                          >
                            {food.food.name}
                          </Link>
                          <Link
                            href={`/category/${food.categorySlug}`}
                            className="text-xs text-gray-500 hover:text-[#9fcc2e] transition-colors"
                          >
                            {food.category.name}
                          </Link>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Link
                            href={`/category/${food.categorySlug}/${food.foodSlug}`}
                            className="px-4 py-2 bg-gradient-to-r from-[#9fcc2e] to-[#8bb825] hover:from-[#8bb825] hover:to-[#7fb518] text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-md"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
                        <div className="w-24 h-24 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-500 font-medium">Add Product</p>
                        <Link
                          href="/categories"
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition-colors"
                        >
                          Browse Categories
                        </Link>
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {comparisonSpecs.map((spec, specIndex) => {
                const food1 = displayFoods[0]
                const food2 = displayFoods[1]
                
                return (
                  <tr key={specIndex} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-700 bg-gray-50">
                      {spec.label}
                    </td>
                    {displayFoods.map((food, foodIndex) => (
                      <td key={foodIndex} className="px-6 py-4 text-center">
                        {food ? (
                          <>
                            {spec.type === 'image' && (
                              <div className="flex justify-center">
                                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                  <Image
                                    src={food.food.image || food.category.image}
                                    alt={food.food.name}
                                    fill
                                    className="object-cover"
                                    sizes="80px"
                                  />
                                </div>
                              </div>
                            )}
                            {spec.type === 'text' && spec.key === 'name' && (
                              <Link
                                href={`/category/${food.categorySlug}/${food.foodSlug}`}
                                className="text-base font-bold text-gray-900 hover:text-[#9fcc2e] transition-colors"
                              >
                                {food.food.name}
                              </Link>
                            )}
                            {spec.type === 'text' && spec.key === 'category' && (
                              <Link
                                href={`/category/${food.categorySlug}`}
                                className="text-sm text-gray-600 hover:text-[#9fcc2e] transition-colors"
                              >
                                {food.category.name}
                              </Link>
                            )}
                            {spec.type === 'text' && spec.key === 'bestFor' && (
                              <span className="text-sm text-gray-700 font-medium">
                                {getBestFor(food)}
                              </span>
                            )}
                            {spec.type === 'badge' && food.food.type && (
                              <div className="flex justify-center">
                                {food.food.type === 'Veg' ? (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border-2 border-green-200 text-green-800 text-xs font-bold rounded-full">
                                    <div className="w-4 h-4 border-2 border-green-600 bg-white rounded-full flex items-center justify-center">
                                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                    </div>
                                    Vegetarian
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border-2 border-red-200 text-red-800 text-xs font-bold rounded-full">
                                    <div className="w-4 h-4 border-2 border-red-600 bg-white rounded-full flex items-center justify-center">
                                      <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[6px] border-l-transparent border-r-transparent border-b-red-600"></div>
                                    </div>
                                    Non-Vegetarian
                                  </span>
                                )}
                              </div>
                            )}
                            {spec.type === 'number' && (
                              <div className="space-y-2">
                                <div className="flex items-center justify-center gap-2">
                                  <span className={`text-lg font-bold ${
                                    spec.key === 'protein' ? 'text-[#9fcc2e]' : 'text-gray-900'
                                  }`}>
                                    {food.food[spec.key as keyof typeof food.food] || 'N/A'}
                                  </span>
                                  {food.food[spec.key as keyof typeof food.food] && spec.unit && (
                                    <span className="text-sm text-gray-500">{spec.unit}</span>
                                  )}
                                </div>
                                {food1 && food2 && spec.key !== 'calories' && (
                                  <div className="flex items-center justify-center gap-2">
                                    {(() => {
                                      const val1 = parseValue(food1.food[spec.key as keyof typeof food1.food] as string)
                                      const val2 = parseValue(food2.food[spec.key as keyof typeof food2.food] as string)
                                      const winner = getWinner(val1, val2, spec.higherIsBetter)
                                      const currentVal = foodIndex === 0 ? val1 : val2
                                      const otherVal = foodIndex === 0 ? val2 : val1
                                      
                                      if (winner === 0 || currentVal === 0) return null
                                      
                                      return (
                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                                          winner === foodIndex + 1
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-100 text-gray-600'
                                        }`}>
                                          {winner === foodIndex + 1 ? '✓ Better' : `${Math.round((currentVal / otherVal) * 100)}%`}
                                        </span>
                                      )
                                    })()}
                                  </div>
                                )}
                                {food1 && food2 && (
                                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                    <div
                                      className={`h-full transition-all duration-500 ${
                                        spec.key === 'protein' ? 'bg-[#9fcc2e]' : 'bg-gray-600'
                                      }`}
                                      style={{
                                        width: `${Math.min(100, (parseValue(food.food[spec.key as keyof typeof food.food] as string) / Math.max(
                                          parseValue(food1.food[spec.key as keyof typeof food1.food] as string) || 1,
                                          parseValue(food2.food[spec.key as keyof typeof food2.food] as string) || 1
                                        )) * 100)}%`
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                            )}
                            {spec.type === 'score' && (
                              <div className="space-y-2">
                                <div className="flex items-center justify-center gap-2">
                                  <span className="text-2xl font-bold text-[#9fcc2e]">
                                    {calculateScore(food)}
                                  </span>
                                  <span className="text-sm text-gray-500">/100</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-[#9fcc2e] to-[#8bb825] transition-all duration-500"
                                    style={{ width: `${calculateScore(food)}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile/Tablet View - Side by Side Comparison */}
      <div className="lg:hidden space-y-6">
        {/* Comparison Header */}
        {foods.length > 0 && (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#9fcc2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span className="text-sm font-semibold text-gray-700">Comparing {foods.length} Products</span>
              </div>
              <button
                onClick={clearAll}
                className="text-red-600 hover:text-red-700 text-xs font-medium flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Products Grid - Side by Side */}
        <div className="grid grid-cols-2 gap-3">
          {displayFoods.map((food, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {food ? (
                <>
                  {/* Product Header */}
                  <div className="p-3 bg-gradient-to-br from-[#9fcc2e]/5 to-[#8bb825]/5 border-b border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <button
                        onClick={() => removeFood(index)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        title="Remove"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-white border-2 border-gray-200 mb-2">
                      <Image
                        src={food.food.image || food.category.image}
                        alt={food.food.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <Link
                      href={`/category/${food.categorySlug}/${food.foodSlug}`}
                      className="text-sm font-bold text-gray-900 hover:text-[#9fcc2e] transition-colors block mb-1 line-clamp-2"
                    >
                      {food.food.name}
                    </Link>
                    <Link
                      href={`/category/${food.categorySlug}`}
                      className="text-xs text-gray-500 hover:text-[#9fcc2e] transition-colors block mb-2"
                    >
                      {food.category.name}
                    </Link>
                    {food.food.type && (
                      <div className="mb-2">
                        {food.food.type === 'Veg' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 border border-green-200 text-green-800 text-[10px] font-semibold rounded">
                            <div className="w-2.5 h-2.5 border border-green-600 bg-white rounded-full flex items-center justify-center">
                              <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                            </div>
                            Veg
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 border border-red-200 text-red-800 text-[10px] font-semibold rounded">
                            <div className="w-2.5 h-2.5 border border-red-600 bg-white rounded-full flex items-center justify-center">
                              <div className="w-0 h-0 border-l-[2px] border-r-[2px] border-b-[3px] border-l-transparent border-r-transparent border-b-red-600"></div>
                            </div>
                            Non-Veg
                          </span>
                        )}
                      </div>
                    )}
                    <Link
                      href={`/category/${food.categorySlug}/${food.foodSlug}`}
                      className="w-full px-3 py-1.5 bg-gradient-to-r from-[#9fcc2e] to-[#8bb825] text-white text-xs font-semibold rounded-lg text-center block shadow-sm"
                    >
                      View Details
                    </Link>
                  </div>

                  {/* Nutritional Info */}
                  <div className="p-3 space-y-3">
                    {/* Nutritional Score */}
                    <div className="bg-gradient-to-r from-[#9fcc2e]/10 to-[#8bb825]/5 rounded-lg p-2 border border-[#9fcc2e]/20">
                      <div className="text-[10px] text-gray-600 mb-1 font-medium">Nutritional Score</div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-lg font-bold text-[#9fcc2e]">{calculateScore(food)}</span>
                        <span className="text-xs text-gray-500">/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#9fcc2e] to-[#8bb825] transition-all duration-500"
                          style={{ width: `${calculateScore(food)}%` }}
                        />
                      </div>
                    </div>

                    {/* Calories */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-600 font-medium">Calories</span>
                        <span className="text-xs font-bold text-gray-900">{food.food.calories || 'N/A'} kcal</span>
                      </div>
                      {displayFoods[0] && displayFoods[1] && displayFoods[0] !== null && displayFoods[1] !== null && (
                        <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                          <div
                            className="h-full bg-gray-600 transition-all duration-500"
                            style={{
                              width: `${Math.min(100, (parseValue(food.food.calories) / Math.max(
                                parseValue(displayFoods[0]?.food.calories) || 1,
                                parseValue(displayFoods[1]?.food.calories) || 1
                              )) * 100)}%`
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Protein */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-600 font-medium">Protein</span>
                        <span className="text-xs font-bold text-[#9fcc2e]">{food.food.protein || 'N/A'} g</span>
                      </div>
                      {displayFoods[0] && displayFoods[1] && displayFoods[0] !== null && displayFoods[1] !== null && (
                        <>
                          <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                            <div
                              className="h-full bg-[#9fcc2e] transition-all duration-500"
                              style={{
                                width: `${Math.min(100, (parseValue(food.food.protein) / Math.max(
                                  parseValue(displayFoods[0]?.food.protein) || 1,
                                  parseValue(displayFoods[1]?.food.protein) || 1
                                )) * 100)}%`
                              }}
                            />
                          </div>
                          {(() => {
                            const val1 = parseValue(displayFoods[0]?.food.protein)
                            const val2 = parseValue(displayFoods[1]?.food.protein)
                            const winner = getWinner(val1, val2, true)
                            const currentVal = index === 0 ? val1 : val2
                            const otherVal = index === 0 ? val2 : val1
                            
                            if (winner === 0 || currentVal === 0) return null
                            
                            return (
                              <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${
                                winner === index + 1
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {winner === index + 1 ? '✓ Better' : `${Math.round((currentVal / otherVal) * 100)}%`}
                              </span>
                            )
                          })()}
                        </>
                      )}
                    </div>

                    {/* Carbs */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-600 font-medium">Carbohydrates</span>
                        <span className="text-xs font-bold text-gray-900">{food.food.carbs || 'N/A'} g</span>
                      </div>
                      {displayFoods[0] && displayFoods[1] && displayFoods[0] !== null && displayFoods[1] !== null && (
                        <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                          <div
                            className="h-full bg-gray-600 transition-all duration-500"
                            style={{
                              width: `${Math.min(100, (parseValue(food.food.carbs) / Math.max(
                                parseValue(displayFoods[0]?.food.carbs) || 1,
                                parseValue(displayFoods[1]?.food.carbs) || 1
                              )) * 100)}%`
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Best For */}
                    <div className="pt-2 border-t border-gray-200">
                      <div className="text-[10px] text-gray-500 mb-1">Best For</div>
                      <div className="text-xs font-semibold text-gray-700">{getBestFor(food)}</div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-6 flex flex-col items-center justify-center gap-3 min-h-[300px]">
                  <div className="w-16 h-16 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500 font-medium text-center">Add Product</p>
                  <Link
                    href="/categories"
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors"
                  >
                    Browse
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Comparison Summary - Mobile */}
        {foods.length === 2 && (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Quick Comparison</h3>
            <div className="space-y-2">
              {comparisonSpecs.filter(spec => spec.type === 'number' || spec.key === 'bestFor').map((spec, idx) => {
                const food1 = displayFoods[0]
                const food2 = displayFoods[1]
                if (!food1 || !food2) return null

                if (spec.key === 'bestFor') {
                  return (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="text-xs text-gray-600 font-medium">{spec.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-700">{getBestFor(food1)}</span>
                        <span className="text-gray-300">vs</span>
                        <span className="text-xs font-semibold text-gray-700">{getBestFor(food2)}</span>
                      </div>
                    </div>
                  )
                }

                const val1 = parseValue(food1.food[spec.key as keyof typeof food1.food] as string)
                const val2 = parseValue(food2.food[spec.key as keyof typeof food2.food] as string)
                const winner = getWinner(val1, val2, spec.higherIsBetter)

                return (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-xs text-gray-600 font-medium">{spec.label}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold ${winner === 1 ? 'text-[#9fcc2e]' : 'text-gray-700'}`}>
                        {food1.food[spec.key as keyof typeof food1.food] || 'N/A'}
                      </span>
                      <span className="text-gray-300">vs</span>
                      <span className={`text-xs font-semibold ${winner === 2 ? 'text-[#9fcc2e]' : 'text-gray-700'}`}>
                        {food2.food[spec.key as keyof typeof food2.food] || 'N/A'}
                      </span>
                      {winner > 0 && (
                        <span className="text-[10px] text-[#9fcc2e] font-bold">
                          {winner === 1 ? '←' : '→'}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Add More Products CTA */}
      {foods.length < 2 && (
        <div className="bg-gradient-to-r from-[#9fcc2e]/10 to-[#8bb825]/5 rounded-xl border border-[#9fcc2e]/20 p-6 text-center">
          <p className="text-gray-700 mb-4 font-medium">
            {foods.length === 0 
              ? 'Select up to 2 products to compare their nutritional information side by side.'
              : 'Add another product to complete your comparison.'}
          </p>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#9fcc2e] to-[#8bb825] hover:from-[#8bb825] hover:to-[#7fb518] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {foods.length === 0 ? 'Browse Categories' : 'Add Second Product'}
          </Link>
        </div>
      )}
    </div>
  )
}

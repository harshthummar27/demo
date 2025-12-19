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
    // Update localStorage with current comparison
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
    
    if (updatedFoods.length === 0) {
      router.push('/compare')
    } else {
      const newParams = updatedFoods
        .map(f => `${f.categorySlug}:${f.foodSlug}`)
        .join(',')
      router.push(`/compare?foods=${encodeURIComponent(newParams)}`)
    }
  }

  // Clear all comparisons
  const clearAll = () => {
    router.push('/compare')
  }

  // Get comparison rows data
  const comparisonRows = [
    { label: 'Food Name', key: 'name', type: 'text' },
    { label: 'Category', key: 'category', type: 'text' },
    { label: 'Type', key: 'type', type: 'badge' },
    { label: 'Calories', key: 'calories', type: 'number', unit: 'kcal' },
    { label: 'Protein', key: 'protein', type: 'number' },
    { label: 'Carbohydrates', key: 'carbs', type: 'number' },
  ]

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-xl shadow-md border border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-[#9fcc2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <span className="text-gray-700 font-semibold">
            Comparing {foods.length} of 2 foods
          </span>
        </div>
        <button
          onClick={clearAll}
          className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-2 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Clear All
        </button>
      </div>

      {/* Comparison Grid - Always show 2 columns */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-0">
            {/* First Column - Labels */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-r-2 border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Specifications</h3>
              </div>
              {comparisonRows.map((row, idx) => (
                <div key={idx} className="p-4 border-b border-gray-200">
                  <div className="text-sm font-semibold text-gray-700">{row.label}</div>
                </div>
              ))}
            </div>

            {/* Second Column - Food 1 */}
            <div className="border-r border-gray-200">
              {foods[0] ? (
                <>
                  <div className="p-6 border-b-2 border-[#9fcc2e] bg-gradient-to-br from-[#9fcc2e]/5 to-[#8bb825]/5">
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-white border-2 border-[#9fcc2e] shadow-lg">
                        <Image
                          src={foods[0].food.image || foods[0].category.image}
                          alt={foods[0].food.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                      <div className="text-center">
                        <Link
                          href={`/category/${foods[0].categorySlug}/${foods[0].foodSlug}`}
                          className="text-lg font-bold text-gray-900 hover:text-[#9fcc2e] transition-colors block"
                        >
                          {foods[0].food.name}
                        </Link>
                        <Link
                          href={`/category/${foods[0].categorySlug}`}
                          className="text-xs text-gray-500 hover:text-[#9fcc2e] transition-colors"
                        >
                          {foods[0].category.name}
                        </Link>
                      </div>
                      <button
                        onClick={() => removeFood(0)}
                        className="text-red-600 hover:text-red-700 text-xs font-medium flex items-center gap-1 transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                  {comparisonRows.map((row, idx) => (
                    <div key={idx} className="p-4 border-b border-gray-200 text-center">
                      {row.key === 'name' && (
                        <div className="font-semibold text-gray-900">{foods[0].food.name}</div>
                      )}
                      {row.key === 'category' && (
                        <div className="text-sm text-gray-700">{foods[0].category.name}</div>
                      )}
                      {row.key === 'type' && foods[0].food.type && (
                        <div className="flex justify-center">
                          {foods[0].food.type === 'Veg' ? (
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
                      {row.key === 'calories' && (
                        <div className="text-lg font-bold text-gray-900">
                          {foods[0].food.calories || 'N/A'} {row.unit && foods[0].food.calories && row.unit}
                        </div>
                      )}
                      {row.key === 'protein' && (
                        <div className="text-lg font-bold text-[#9fcc2e]">
                          {foods[0].food.protein || 'N/A'}
                        </div>
                      )}
                      {row.key === 'carbs' && (
                        <div className="text-lg font-bold text-gray-900">
                          {foods[0].food.carbs || 'N/A'}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="p-6 border-b-2 border-gray-200 bg-gray-50">
                    <div className="flex flex-col items-center justify-center gap-3 min-h-[200px]">
                      <div className="w-24 h-24 rounded-xl bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-500 font-medium">Add Food to Compare</p>
                      <Link
                        href="/categories"
                        className="text-xs text-[#9fcc2e] hover:text-[#8bb825] font-semibold"
                      >
                        Browse Categories →
                      </Link>
                    </div>
                  </div>
                  {comparisonRows.map((_, idx) => (
                    <div key={idx} className="p-4 border-b border-gray-200 text-center bg-gray-50">
                      <div className="text-gray-400">-</div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Third Column - Food 2 */}
            <div>
              {foods[1] ? (
                <>
                  <div className="p-6 border-b-2 border-[#9fcc2e] bg-gradient-to-br from-[#9fcc2e]/5 to-[#8bb825]/5">
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-white border-2 border-[#9fcc2e] shadow-lg">
                        <Image
                          src={foods[1].food.image || foods[1].category.image}
                          alt={foods[1].food.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                      <div className="text-center">
                        <Link
                          href={`/category/${foods[1].categorySlug}/${foods[1].foodSlug}`}
                          className="text-lg font-bold text-gray-900 hover:text-[#9fcc2e] transition-colors block"
                        >
                          {foods[1].food.name}
                        </Link>
                        <Link
                          href={`/category/${foods[1].categorySlug}`}
                          className="text-xs text-gray-500 hover:text-[#9fcc2e] transition-colors"
                        >
                          {foods[1].category.name}
                        </Link>
                      </div>
                      <button
                        onClick={() => removeFood(1)}
                        className="text-red-600 hover:text-red-700 text-xs font-medium flex items-center gap-1 transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                  {comparisonRows.map((row, idx) => (
                    <div key={idx} className="p-4 border-b border-gray-200 text-center">
                      {row.key === 'name' && (
                        <div className="font-semibold text-gray-900">{foods[1].food.name}</div>
                      )}
                      {row.key === 'category' && (
                        <div className="text-sm text-gray-700">{foods[1].category.name}</div>
                      )}
                      {row.key === 'type' && foods[1].food.type && (
                        <div className="flex justify-center">
                          {foods[1].food.type === 'Veg' ? (
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
                      {row.key === 'calories' && (
                        <div className="text-lg font-bold text-gray-900">
                          {foods[1].food.calories || 'N/A'} {row.unit && foods[1].food.calories && row.unit}
                        </div>
                      )}
                      {row.key === 'protein' && (
                        <div className="text-lg font-bold text-[#9fcc2e]">
                          {foods[1].food.protein || 'N/A'}
                        </div>
                      )}
                      {row.key === 'carbs' && (
                        <div className="text-lg font-bold text-gray-900">
                          {foods[1].food.carbs || 'N/A'}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="p-6 border-b-2 border-gray-200 bg-gray-50">
                    <div className="flex flex-col items-center justify-center gap-3 min-h-[200px]">
                      <div className="w-24 h-24 rounded-xl bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-500 font-medium">Add Food to Compare</p>
                      <Link
                        href="/categories"
                        className="text-xs text-[#9fcc2e] hover:text-[#8bb825] font-semibold"
                      >
                        Browse Categories →
                      </Link>
                    </div>
                  </div>
                  {comparisonRows.map((_, idx) => (
                    <div key={idx} className="p-4 border-b border-gray-200 text-center bg-gray-50">
                      <div className="text-gray-400">-</div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-gray-200">
          {foods.map((item, index) => (
            <div key={index} className="p-4">
              <div className="flex items-start gap-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200 flex-shrink-0">
                  <Image
                    src={item.food.image || item.category.image}
                    alt={item.food.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/category/${item.categorySlug}/${item.foodSlug}`}
                        className="font-bold text-gray-900 hover:text-[#9fcc2e] transition-colors block truncate"
                      >
                        {item.food.name}
                      </Link>
                      <Link
                        href={`/category/${item.categorySlug}`}
                        className="text-xs text-gray-500 hover:text-[#9fcc2e] transition-colors"
                      >
                        {item.category.name}
                      </Link>
                    </div>
                    {item.food.type && (
                      <div className="flex-shrink-0">
                        {item.food.type === 'Veg' ? (
                          <div className="w-5 h-5 border-2 border-green-600 bg-white rounded-full flex items-center justify-center">
                            <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>
                          </div>
                        ) : (
                          <div className="w-5 h-5 border-2 border-red-600 bg-white rounded-full flex items-center justify-center">
                            <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[7px] border-l-transparent border-r-transparent border-b-red-600"></div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <div className="text-xs text-gray-600 mb-1">Calories</div>
                      <div className="text-sm font-bold text-gray-900">{item.food.calories || 'N/A'}</div>
                    </div>
                    <div className="bg-[#9fcc2e]/5 rounded-lg p-2 text-center">
                      <div className="text-xs text-gray-600 mb-1">Protein</div>
                      <div className="text-sm font-bold text-[#9fcc2e]">{item.food.protein || 'N/A'}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <div className="text-xs text-gray-600 mb-1">Carbs</div>
                      <div className="text-sm font-bold text-gray-900">{item.food.carbs || 'N/A'}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFood(index)}
                    className="text-red-600 hover:text-red-700 text-xs font-medium flex items-center gap-1 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Remove from comparison
                  </button>
                </div>
              </div>
            </div>
          ))}
          {foods.length < 2 && (
            <div className="p-4">
              <Link
                href="/categories"
                className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <p className="text-sm text-gray-600 font-medium">Add Second Food to Compare</p>
                <span className="text-xs text-[#9fcc2e] font-semibold">Browse Categories →</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Add More Foods */}
      {foods.length < 2 && (
        <div className="bg-gradient-to-r from-[#9fcc2e]/10 to-[#8bb825]/5 rounded-xl border border-[#9fcc2e]/20 p-6 text-center">
          <p className="text-gray-700 mb-4">
            {foods.length === 0 
              ? 'Select up to 2 foods to compare their nutritional information side by side.'
              : 'Add another food to complete your comparison.'}
          </p>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#9fcc2e] to-[#8bb825] hover:from-[#8bb825] hover:to-[#7fb518] text-white font-bold py-2 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {foods.length === 0 ? 'Browse Categories' : 'Add Second Food'}
          </Link>
        </div>
      )}
    </div>
  )
}

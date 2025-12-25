'use client'

import { useState } from 'react'
import Link from 'next/link'

interface CategoryDetailInfoProps {
  productName: string
  brand?: string
  quantity?: string
  protein?: string
  mineral?: string
  calories?: string
  carbs?: string
  highlights?: string[]
  nutrients?: Array<{ name: string; value: string }>
  healthBenefits?: Array<{ benefit: string; description: string }>
  rating?: number
  categorySlug?: string
  foodSlug?: string
  foodType?: 'Veg' | 'Non-veg'
  price?: string
  originalPrice?: string
  discount?: string
}

export default function CategoryDetailInfo({
  productName,
  brand,
  quantity = '100g',
  protein,
  mineral,
  calories,
  carbs,
  highlights = [],
  nutrients = [],
  healthBenefits = [],
  rating = 4.4,
  categorySlug,
  foodSlug,
  foodType,
  price,
  originalPrice,
  discount
}: CategoryDetailInfoProps) {
  const [isLiked, setIsLiked] = useState(false)

  // Default highlights for product attributes
  const defaultHighlights = highlights.length > 0 ? highlights : [
    'Best for Pre-workout',
    'Rich in vitamins and minerals',
    'Natural and organic',
    'No artificial preservatives'
  ]

  // Product attributes similar to the image
  const productAttributes = [
    { label: 'Brand', value: brand || 'Natural Foods' },
    { label: 'Product Type', value: categorySlug ? categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1) : 'Food Item' },
    { label: 'Dietary Preference', value: foodType === 'Veg' ? 'Vegetarian' : foodType === 'Non-veg' ? 'Non-Vegetarian' : 'N/A' },
    { label: 'Serving Size', value: quantity },
    { label: 'Calories', value: calories ? `${calories} kcal` : '89 kcal' },
    { label: 'Protein', value: protein || '10g' },
    { label: 'Carbohydrates', value: carbs || '23g' },
    { label: 'Is Perishable', value: 'Yes' },
    { label: 'Key Features', value: defaultHighlights.join(', ') }
  ]

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <div className="w-full space-y-4">
      {/* Product Overview Box - First Box */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        {/* Brand */}
        {brand && (
          <div className="mb-2">
            <Link href={categorySlug ? `/category/${categorySlug}` : '#'}>
              <span className="text-sm text-[#9fcc2e] font-semibold hover:underline">
                {brand}
              </span>
            </Link>
          </div>
        )}

        {/* Product Name */}
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-tight">
          {productName}
        </h1>

        {/* Net Quantity */}
        <div className="text-sm text-gray-600 mb-3">
          Net Qty: 1 pack | {quantity}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <span className="text-gray-900 font-semibold">{rating}</span>
          <span className="text-gray-500 text-sm">/5</span>
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-3xl md:text-4xl font-bold text-[#9fcc2e]">{price || '₹99'}</span>
            {originalPrice && (
              <span className="text-lg text-gray-500 line-through">{originalPrice}</span>
            )}
            {discount && (
              <span className="text-sm font-semibold text-[#9fcc2e]">{discount}</span>
            )}
          </div>
        </div>
      </div>

      {/* Coupons & Offers Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Coupons & Offers</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Get 10% off on first order</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Assured Cashback up to ₹300</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Get 5% discount with credit cards</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <Link href="#" className="block text-center text-sm text-[#9fcc2e] font-semibold mt-3 hover:underline">
            View all coupons →
          </Link>
        </div>
      </div>

      {/* Delivery & Return Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <span className="text-xs text-gray-600 text-center">No Return or Exchange</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-[#9fcc2e]/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#9fcc2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xs text-gray-600 text-center">Fast Delivery</span>
          </div>
        </div>
      </div>

      {/* Highlights Section - Product Attributes */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Highlights</h2>
        <div className="space-y-3">
          {productAttributes.map((attr, index) => (
            <div key={index} className="flex items-start gap-4 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="min-w-[140px] text-sm font-medium text-gray-600">
                {attr.label}:
              </div>
              <div className="flex-1 text-sm font-semibold text-gray-900">
                {attr.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* More Nutrients Value Table */}
      {nutrients.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">More nutrients Value</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-4 font-bold text-gray-900 text-sm">Nutrient</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900 text-sm">Value</th>
                </tr>
              </thead>
              <tbody>
                {nutrients.map((nutrient, index) => (
                  <tr
                    key={index}
                    className={index < nutrients.length - 1 ? 'border-b border-gray-200' : ''}
                  >
                    <td className="py-3 px-4 text-gray-700 font-medium text-sm">{nutrient.name}</td>
                    <td className="py-3 px-4 text-gray-900 font-semibold text-sm">{nutrient.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Health Benefits Table */}
      {healthBenefits.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Health benefits</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-4 font-bold text-gray-900 text-sm">Benefit</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900 text-sm">Description</th>
                </tr>
              </thead>
              <tbody>
                {healthBenefits.map((benefit, index) => (
                  <tr
                    key={index}
                    className={index < healthBenefits.length - 1 ? 'border-b border-gray-200' : ''}
                  >
                    <td className="py-3 px-4 text-gray-700 font-medium text-sm">{benefit.benefit}</td>
                    <td className="py-3 px-4 text-gray-900 font-semibold text-sm">{benefit.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import Link from 'next/link'

interface ProductInfoBoxProps {
  brand: string
  productName: string
  netQuantity?: string
  rating?: string
  price: string
  originalPrice?: string
  discount?: string
  categorySlug: string
  foodType?: 'Veg' | 'Non-veg'
  calories?: string
  protein?: string
  carbs?: string
}

export default function ProductInfoBox({
  brand,
  productName,
  netQuantity = 'pack | 100g',
  rating = '4.4',
  price,
  originalPrice,
  discount,
  categorySlug,
  foodType,
  calories,
  protein,
  carbs,
}: ProductInfoBoxProps) {
  return (
    <div className="space-y-4">
      {/* Brand */}
      <div>
        <Link href={`/category/${categorySlug}`}>
          <span className="text-sm text-[#9fcc2e] font-semibold hover:underline">
            {brand}
          </span>
        </Link>
      </div>

      {/* Product Name */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
        {productName}
      </h1>

      {/* Net Quantity */}
      <div className="text-sm text-gray-600">
        {netQuantity}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <span className="text-gray-900 font-semibold">{rating}</span>
          <span className="text-gray-500 text-sm">/5</span>
        </div>
      </div>

      {/* Price Box */}
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl md:text-4xl font-black text-gray-900">{price}</span>
          {originalPrice && (
            <>
              <span className="text-lg text-gray-500 line-through">{originalPrice}</span>
              {discount && (
                <span className="text-sm font-semibold text-green-600">{discount}</span>
              )}
            </>
          )}
        </div>
        {calories && (
          <div className="mt-2 text-sm text-gray-600">
            {calories} kcal per serving
          </div>
        )}
      </div>

      {/* Nutritional Info Tags */}
      {(protein || carbs) && (
        <div className="flex flex-wrap gap-2">
          {protein && (
            <span className="px-3 py-1 bg-[#9fcc2e] text-white text-sm font-semibold rounded-full">
              Protein: {protein}
            </span>
          )}
          {carbs && (
            <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm font-semibold rounded-full">
              Carbs: {carbs}
            </span>
          )}
        </div>
      )}

      {/* Dietary Preference Badge */}
      {foodType && (
        <div>
          {foodType === 'Veg' ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border-2 border-green-200 rounded-lg">
              <div className="w-6 h-6 border-2 border-green-600 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              </div>
              <span className="text-green-800 font-bold text-sm">Veg</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border-2 border-red-200 rounded-lg">
              <div className="w-6 h-6 border-2 border-red-600 bg-white rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[8px] border-l-transparent border-r-transparent border-b-red-600"></div>
              </div>
              <span className="text-red-800 font-bold text-sm">Non-Veg</span>
            </div>
          )}
        </div>
      )}

      {/* Service Icons */}
      <div className="flex flex-wrap gap-4 pt-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <span>No Return or Exchange</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#9fcc2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span>Fast Delivery</span>
        </div>
      </div>
    </div>
  )
}


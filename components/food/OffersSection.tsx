'use client'

import { useState } from 'react'

interface OffersSectionProps {
  offers?: string[]
}

const defaultOffers = [
  'Earn 15% Off Your First Flight',
  'Assured Cashback From CRED',
  'Get 10% off with VISA Canara Credit Cards',
  'Assured ₹15-₹300 Cashback using MobiKwik wallet at Zepto',
  'Get 5% discount with City Union Bank Debit Cards',
]

export default function OffersSection({ offers = defaultOffers }: OffersSectionProps) {
  const [showAll, setShowAll] = useState(false)
  const displayedOffers = showAll ? offers : offers.slice(0, 3)

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Coupons & Offers</h3>
      <div className="space-y-2">
        {displayedOffers.map((offer, index) => (
          <div
            key={index}
            className="flex items-start gap-2 text-sm text-gray-700 p-2 hover:bg-gray-50 rounded transition-colors"
          >
            <svg className="w-4 h-4 text-[#9fcc2e] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="flex-1">{offer}</span>
          </div>
        ))}
      </div>
      {offers.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 text-sm text-[#9fcc2e] font-semibold hover:underline w-full text-left"
        >
          {showAll ? 'Show less' : 'View all coupons'}
        </button>
      )}
    </div>
  )
}


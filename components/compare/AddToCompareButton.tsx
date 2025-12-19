'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface AddToCompareButtonProps {
  categorySlug: string
  foodSlug: string
  className?: string
  children: React.ReactNode
}

export default function AddToCompareButton({ categorySlug, foodSlug, className, children }: AddToCompareButtonProps) {
  const [compareUrl, setCompareUrl] = useState<string>('')
  
  useEffect(() => {
    // Get foods from localStorage
    if (typeof window !== 'undefined') {
      const storedFoods = localStorage.getItem('compareFoods')
      const foodsArray = storedFoods ? JSON.parse(storedFoods) : []
      
      // Check if this food is already in comparison
      const newFood = `${categorySlug}:${foodSlug}`
      const isInComparison = foodsArray.includes(newFood)
      
      // Check if comparison is full (max 2)
      const isFull = foodsArray.length >= 2
      
      // Build comparison URL
      let url = ''
      if (isInComparison) {
        // Already in comparison, go to compare page
        url = `/compare?foods=${encodeURIComponent(foodsArray.join(','))}`
      } else if (isFull) {
        // Replace the second food
        const newFoods = [foodsArray[0], newFood]
        localStorage.setItem('compareFoods', JSON.stringify(newFoods))
        url = `/compare?foods=${encodeURIComponent(newFoods.join(','))}`
      } else {
        // Add to existing or create new
        const newFoods = foodsArray.length > 0 
          ? [...foodsArray, newFood]
          : [newFood]
        localStorage.setItem('compareFoods', JSON.stringify(newFoods))
        url = `/compare?foods=${encodeURIComponent(newFoods.join(','))}`
      }
      
      setCompareUrl(url)
    } else {
      // Fallback for SSR
      setCompareUrl(`/compare?foods=${encodeURIComponent(`${categorySlug}:${foodSlug}`)}`)
    }
  }, [categorySlug, foodSlug])

  // Show loading state while URL is being calculated
  if (!compareUrl) {
    return (
      <div className={className}>
        {children}
      </div>
    )
  }

  return (
    <Link 
      href={compareUrl} 
      className={className}
    >
      {children}
    </Link>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface AddToCompareButtonProps {
  categorySlug: string
  foodSlug: string
  className?: string
  children: React.ReactNode
}

export default function AddToCompareButton({ categorySlug, foodSlug, className, children }: AddToCompareButtonProps) {
  const searchParams = useSearchParams()
  const [foodsArray, setFoodsArray] = useState<string[]>([])
  
  useEffect(() => {
    // Get foods from URL params first
    const urlFoods = searchParams.get('foods') || ''
    const urlFoodsArray = urlFoods ? decodeURIComponent(urlFoods).split(',').filter(Boolean) : []
    
    // Also check localStorage for persisted comparison
    if (typeof window !== 'undefined') {
      const storedFoods = localStorage.getItem('compareFoods')
      const storedFoodsArray = storedFoods ? JSON.parse(storedFoods) : []
      
      // Use URL params if available, otherwise use localStorage
      const currentFoods = urlFoodsArray.length > 0 ? urlFoodsArray : storedFoodsArray
      setFoodsArray(currentFoods)
      
      // Update localStorage
      if (currentFoods.length > 0) {
        localStorage.setItem('compareFoods', JSON.stringify(currentFoods))
      }
    } else {
      setFoodsArray(urlFoodsArray)
    }
  }, [searchParams])
  
  // Check if this food is already in comparison
  const newFood = `${categorySlug}:${foodSlug}`
  const isInComparison = foodsArray.includes(newFood)
  
  // Check if comparison is full (max 2)
  const isFull = foodsArray.length >= 2
  
  // Build comparison URL
  const getCompareUrl = () => {
    // If already in comparison, go to compare page with current foods
    if (isInComparison) {
      const foods = foodsArray.join(',')
      return `/compare?foods=${encodeURIComponent(foods)}`
    }
    
    // If comparison is full, replace the second food
    if (isFull) {
      const newFoods = [foodsArray[0], newFood]
      // Update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('compareFoods', JSON.stringify(newFoods))
      }
      return `/compare?foods=${encodeURIComponent(newFoods.join(','))}`
    }
    
    // Add to existing or create new
    const newFoods = foodsArray.length > 0 
      ? [...foodsArray, newFood]
      : [newFood]
    
    // Update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('compareFoods', JSON.stringify(newFoods))
    }
    
    return `/compare?foods=${encodeURIComponent(newFoods.join(','))}`
  }

  // If full and not in comparison, show disabled state but still allow click to replace
  if (isFull && !isInComparison) {
    return (
      <Link 
        href={getCompareUrl()}
        className={className}
        title="Comparison is full. This will replace the second food."
      >
        {children}
      </Link>
    )
  }

  return (
    <Link 
      href={getCompareUrl()} 
      className={className}
    >
      {children}
    </Link>
  )
}

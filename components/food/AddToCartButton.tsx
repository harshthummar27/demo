'use client'

import { useState, useEffect } from 'react'
import { addToCart, isItemInCart, type CartItem } from '@/lib/cartUtils'

interface AddToCartButtonProps {
  productName: string
  categorySlug: string
  foodSlug: string
  protein?: string
  calories?: string
  image?: string
  price?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function AddToCartButton({
  productName,
  categorySlug,
  foodSlug,
  protein,
  calories,
  image,
  price,
  className = '',
  size = 'md'
}: AddToCartButtonProps) {
  const [isInCart, setIsInCart] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    const itemId = `${categorySlug}:${foodSlug}`
    setIsInCart(isItemInCart(itemId))
  }, [categorySlug, foodSlug])

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      const itemId = `${categorySlug}:${foodSlug}`
      setIsInCart(isItemInCart(itemId))
    }

    window.addEventListener('cartUpdated', handleCartUpdate)
    return () => window.removeEventListener('cartUpdated', handleCartUpdate)
  }, [categorySlug, foodSlug])

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsAdding(true)
    const itemId = `${categorySlug}:${foodSlug}`
    
    const cartItem: CartItem = {
      id: itemId,
      name: productName,
      categorySlug,
      foodSlug,
      protein: protein || '0g',
      calories,
      image,
      price
    }

    addToCart(cartItem)
    setIsInCart(true)
    
    setTimeout(() => {
      setIsAdding(false)
    }, 500)
  }

  const sizeClasses = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2.5'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isInCart || isAdding}
      className={`${sizeClasses[size]} rounded-full bg-[#9fcc2e] hover:bg-[#8bb825] text-white transition-all duration-300 transform hover:scale-110 shadow-lg flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100 ${className}`}
      title={isInCart ? 'Already in cart' : 'Add to cart'}
    >
      {isAdding ? (
        <svg className={`${iconSizes[size]} animate-spin`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : isInCart ? (
        <svg className={iconSizes[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className={iconSizes[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      )}
    </button>
  )
}


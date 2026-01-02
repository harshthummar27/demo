// Cart utility functions for managing cart items

export interface CartItem {
  id: string // categorySlug:foodSlug
  name: string
  categorySlug: string
  foodSlug: string
  protein: string
  calories?: string
  carbs?: string
  image?: string
  price?: string
}

const CART_STORAGE_KEY = 'fitzone_cart'

// Get all cart items from localStorage
export function getCartItems(): CartItem[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error reading cart from localStorage:', error)
    return []
  }
}

// Add item to cart
export function addToCart(item: CartItem): void {
  if (typeof window === 'undefined') return
  
  try {
    const cartItems = getCartItems()
    
    // Check if item already exists
    const existingIndex = cartItems.findIndex(cartItem => cartItem.id === item.id)
    
    if (existingIndex === -1) {
      // Add new item
      cartItems.push(item)
    } else {
      // Item already exists, you can update quantity or skip
      // For now, we'll skip adding duplicates
      return
    }
    
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  } catch (error) {
    console.error('Error adding to cart:', error)
  }
}

// Remove item from cart
export function removeFromCart(itemId: string): void {
  if (typeof window === 'undefined') return
  
  try {
    const cartItems = getCartItems()
    const updatedItems = cartItems.filter(item => item.id !== itemId)
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems))
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  } catch (error) {
    console.error('Error removing from cart:', error)
  }
}

// Clear all cart items
export function clearCart(): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(CART_STORAGE_KEY)
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  } catch (error) {
    console.error('Error clearing cart:', error)
  }
}

// Get cart item count
export function getCartItemCount(): number {
  return getCartItems().length
}

// Calculate total protein from all cart items
export function getTotalProtein(): number {
  const cartItems = getCartItems()
  let totalProtein = 0
  
  cartItems.forEach(item => {
    if (item.protein) {
      // Extract numeric value from protein string (e.g., "10g" -> 10)
      const proteinValue = parseFloat(item.protein.replace(/[^\d.]/g, ''))
      if (!isNaN(proteinValue)) {
        totalProtein += proteinValue
      }
    }
  })
  
  return Math.round(totalProtein * 10) / 10 // Round to 1 decimal place
}

// Calculate total calories from all cart items
export function getTotalCalories(): number {
  const cartItems = getCartItems()
  let totalCalories = 0
  
  cartItems.forEach(item => {
    if (item.calories) {
      // Extract numeric value from calories string (e.g., "100 kcal" -> 100 or "100" -> 100)
      const caloriesValue = parseFloat(item.calories.replace(/[^\d.]/g, ''))
      if (!isNaN(caloriesValue)) {
        totalCalories += caloriesValue
      }
    }
  })
  
  return Math.round(totalCalories)
}

// Calculate total carbs from all cart items
export function getTotalCarbs(): number {
  const cartItems = getCartItems()
  let totalCarbs = 0
  
  cartItems.forEach(item => {
    if (item.carbs) {
      // Extract numeric value from carbs string (e.g., "25g" -> 25)
      const carbsValue = parseFloat(item.carbs.replace(/[^\d.]/g, ''))
      if (!isNaN(carbsValue)) {
        totalCarbs += carbsValue
      }
    }
  })
  
  return Math.round(totalCarbs * 10) / 10 // Round to 1 decimal place
}

// Check if item is in cart
export function isItemInCart(itemId: string): boolean {
  const cartItems = getCartItems()
  return cartItems.some(item => item.id === itemId)
}


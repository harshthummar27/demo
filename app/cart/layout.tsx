import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shopping Cart - My Cart | FitZone Gym',
  description: 'View your shopping cart with all selected products. Track your total protein intake from all cart items. Review products, remove items, and manage your cart easily.',
  keywords: 'shopping cart, cart, my cart, protein tracking, food cart, nutrition cart, cart items',
  openGraph: {
    title: 'Shopping Cart - My Cart | FitZone Gym',
    description: 'View your shopping cart with all selected products. Track your total protein intake from all cart items.',
    type: 'website',
  },
  alternates: {
    canonical: '/cart',
  },
  robots: {
    index: false, // Cart pages typically shouldn't be indexed
    follow: true,
  },
}

export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


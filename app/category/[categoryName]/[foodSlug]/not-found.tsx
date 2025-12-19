import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl md:text-8xl font-black text-[#9fcc2e] mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Food Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the food item you're looking for. It may have been removed or the link might be incorrect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/categories"
              className="bg-gradient-to-r from-[#9fcc2e] to-[#8bb825] hover:from-[#8bb825] hover:to-[#7fb518] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Browse Categories
            </Link>
            <Link
              href="/"
              className="bg-white border-2 border-[#9fcc2e] hover:bg-[#9fcc2e] text-[#9fcc2e] hover:text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}


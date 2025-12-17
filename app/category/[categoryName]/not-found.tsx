import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function CategoryNotFound() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Category Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The category you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/categories"
            className="inline-block px-6 py-3 bg-[#9fcc2e] text-white font-semibold rounded-lg hover:bg-[#8bb825] transition-colors duration-300"
          >
            Browse All Categories
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}


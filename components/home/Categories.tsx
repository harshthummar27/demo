'use client'

import Image from 'next/image'

export default function Categories() {

  const categories = [
    // {
    //   id: 1,
    //   name: 'Foods',
    //   image: '/categories/foods1.png',
    //   description: 'Various Food Items'
    // },
    {
      id: 2,
      name: 'Fruits',
      image: '/categories/fruits.jpg',
      description: 'Fresh Fruits'
    },
    {
      id: 3,
      name: 'Vegetables',
      image: '/categories/Vegetables.png',
      description: 'Fresh Vegetables'
    },
    {
      id: 4,
      name: 'Fast Food',
      image: '/categories/FastFood.png',
      description: 'Quick Meals'
    },
    {
      id: 5,
      name: 'Wafers and Snacks',
      image: '/categories/WafersandSnacks.png',
      description: 'Chips & Snacks'
    },
    {
      id: 6,
      name: 'Juices',
      image: '/categories/Juices.png',
      description: 'Fresh Juices'
    },
    {
      id: 7,
      name: 'Dairy Products',
      image: '/categories/DairyProducts.png',
      description: 'Milk & Dairy'
    },
    {
      id: 8,
      name: 'Bakery Items',
      image: '/categories/BakeryItems.png',
      description: 'Bread & Pastries'
    },
    {
      id: 9,
      name: 'Beverage Items',
      image: '/categories/BeverageItems.png',
      description: 'Drinks & Beverages'
    },
    {
      id: 10,
      name: 'Dry Fruits and Nuts',
      image: '/categories/DryFruitsandNuts.png',
      description: 'Nuts & Dried Fruits'
    }
  ]


  return (
    <section className="py-6 md:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-6 md:mb-8">
          {/* Badge */}
          <div className="inline-block mb-3">
            <span className="px-4 py-2 bg-[#9fcc2e] text-white text-xs sm:text-sm font-semibold rounded-full">
              FOOD CATEGORIES
            </span>
          </div>
          
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
            Explore Our Categories
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our wide selection of food categories to find exactly what you're looking for
          </p>
        </div>
        
        {/* Mobile View: 3 Cards Per Row Grid */}
        <div className="md:hidden">
          <div className="grid grid-cols-3 gap-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group cursor-pointer flex flex-col items-center bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-[#9fcc2e] transition-all duration-300 p-2"
              >
                {/* Image with Fixed Dimensions */}
                <div className="w-full flex items-center justify-center mb-1" style={{ height: '90px', width: '100%' }}>
                  <div style={{ width: '90px', height: '90px', position: 'relative' }}>
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                      sizes="90px"
                    />
                  </div>
                </div>
                {/* Category Name */}
                <h3 className="text-xs text-gray-900 text-center font-medium leading-tight line-clamp-2 w-full group-hover:text-[#9fcc2e] transition-colors">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop View: Single Row */}
        <div className="hidden md:block">
          <div 
            className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {categories.map((category) => (
              <div
                key={category.id}
                className="group cursor-pointer flex flex-col items-center flex-shrink-0 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#9fcc2e] transition-all duration-300 p-4 w-[140px]"
              >
                {/* Image with Fixed Dimensions */}
                <div className="flex items-center justify-center mb-3" style={{ height: '120px', width: '120px' }}>
                  <div style={{ width: '120px', height: '120px', position: 'relative' }}>
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                      sizes="120px"
                    />
                  </div>
                </div>
                {/* Category Name */}
                <h3 className="text-sm lg:text-base text-gray-900 text-center font-semibold group-hover:text-[#9fcc2e] transition-colors line-clamp-2">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <style jsx global>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
          }
          .scrollbar-hide {
            -ms-overflow-style: none !important;
            scrollbar-width: none !important;
          }
          .scrollbar-hide::-webkit-scrollbar-track {
            display: none !important;
          }
          .scrollbar-hide::-webkit-scrollbar-thumb {
            display: none !important;
          }
        `}</style>
      </div>
    </section>
  )
}


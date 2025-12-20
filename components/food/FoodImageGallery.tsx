'use client'

import { useState } from 'react'
import Image from 'next/image'

interface FoodImageGalleryProps {
  mainImage: string
  foodName: string
  categoryImage?: string
}

export default function FoodImageGallery({ mainImage, foodName, categoryImage }: FoodImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  
  // Generate multiple image variations (using different sizes/angles from Unsplash)
  const images = [
    mainImage,
    mainImage.replace('?w=400&q=80', '?w=600&q=90'),
    mainImage.replace('?w=400&q=80', '?w=500&q=85'),
    categoryImage || mainImage.replace('?w=400&q=80', '?w=450&q=85'),
  ].filter(Boolean)

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
      {/* Thumbnail Images - Left Side (Desktop) / Top (Mobile) */}
      <div className="flex md:flex-col gap-2 md:gap-3 order-2 md:order-1">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === index
                ? 'border-[#9fcc2e] shadow-md scale-105'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Image
              src={img}
              alt={`${foodName} view ${index + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Main Image - Center */}
      <div className="flex-1 order-1 md:order-2">
        <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg">
          <Image
            src={images[selectedImage]}
            alt={foodName}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </div>
  )
}


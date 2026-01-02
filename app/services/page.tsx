import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Services - FitZone Gym | Personal Training, Group Classes & More',
  description: 'Explore FitZone Gym services: Personal Training, Group Classes, Cardio Zone, Strength Training, Nutrition Counseling, and premium locker rooms. Everything you need for a complete fitness experience.',
  keywords: 'gym services, personal training, group fitness classes, cardio equipment, strength training, nutrition counseling, gym amenities',
  openGraph: {
    title: 'Our Services - FitZone Gym',
    description: 'Explore FitZone Gym services: Personal Training, Group Classes, Cardio Zone, Strength Training, and more.',
    type: 'website',
  },
  alternates: {
    canonical: '/services',
  },
}

export default function ServicesPage() {
  const mainServices = [
    {
      title: 'Personal Training',
      description: 'Get one-on-one attention from certified personal trainers who will create a customized workout plan tailored to your fitness goals, schedule, and preferences.',
      features: [
        'Customized workout plans',
        'Form correction and technique',
        'Progress tracking',
        'Flexible scheduling',
        'Nutrition guidance included'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80'
    },
    {
      title: 'Group Fitness Classes',
      description: 'Join energizing group classes led by expert instructors. From high-intensity workouts to yoga and pilates, find the perfect class to keep you motivated.',
      features: [
        'Variety of class types',
        'Expert instructors',
        'Motivating atmosphere',
        'All fitness levels welcome',
        'Regular schedule updates'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80'
    },
    {
      title: 'Cardio Zone',
      description: 'State-of-the-art cardio equipment including treadmills, ellipticals, bikes, and rowing machines. All equipped with entertainment systems for an enjoyable workout.',
      features: [
        'Latest cardio equipment',
        'Entertainment systems',
        'Heart rate monitoring',
        '24/7 access',
        'Regular equipment maintenance'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80'
    },
    {
      title: 'Strength Training',
      description: 'Comprehensive strength training area with free weights, machines, and functional training equipment. Perfect for building muscle and increasing strength.',
      features: [
        'Free weights section',
        'Machine training area',
        'Functional training zone',
        'Expert guidance available',
        'Safety equipment provided'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80'
    },
    {
      title: 'Nutrition Counseling',
      description: 'Work with certified nutritionists to create personalized meal plans, track your nutrition, and learn about healthy eating habits that support your fitness goals.',
      features: [
        'Personalized meal plans',
        'Nutrition tracking tools',
        'Expert consultations',
        'Diet plan customization',
        'Progress monitoring'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80'
    },
    {
      title: 'Premium Amenities',
      description: 'Enjoy our spacious locker rooms, recovery zones, and comfortable lounge areas. We provide everything you need for a complete fitness experience.',
      features: [
        'Modern locker rooms',
        'Recovery and stretching areas',
        'Comfortable lounge spaces',
        'Clean facilities',
        'Towel service available'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80'
    }
  ]

  const dietPlans = [
    {
      title: 'High Protein Diet',
      description: 'Build muscle and support recovery with our high protein diet plans. Perfect for athletes and fitness enthusiasts.',
      icon: '🥩',
      href: '/nutrition/high-protein-foods'
    },
    {
      title: 'Weight Loss Diet',
      description: 'Achieve your weight loss goals with our balanced, calorie-controlled diet plans designed for sustainable results.',
      icon: '📉',
      href: '/services'
    },
    {
      title: 'Weight Gain Diet',
      description: 'Healthy weight gain with nutrient-dense foods and strategic meal planning for muscle building and strength.',
      icon: '📈',
      href: '/services'
    },
    {
      title: 'High Vitamin Diet',
      description: 'Boost your immunity and overall health with vitamin-rich foods and comprehensive nutrition plans.',
      icon: '🍊',
      href: '/services'
    }
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#9fcc2e] via-[#8bb825] to-[#7fb518] pt-20 md:pt-24 pb-12 md:pb-16 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-white/25 backdrop-blur-md text-white text-xs sm:text-sm font-semibold rounded-full border-2 border-white/40">
                OUR SERVICES
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 drop-shadow-lg">
              Complete Fitness Solutions
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-3xl mx-auto font-medium">
              From personal training to nutrition counseling, we offer everything you need to achieve your fitness goals and live a healthier life.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-block mb-4">
              <span className="px-3 py-1 bg-[#9fcc2e]/10 text-[#9fcc2e] text-xs sm:text-sm font-semibold rounded-full">
                WHAT WE OFFER
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive fitness and nutrition services tailored to your needs
            </p>
          </div>

          <div className="space-y-12 md:space-y-16">
            {mainServices.map((service, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-8 md:gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="w-16 h-16 bg-[#9fcc2e]/10 rounded-full flex items-center justify-center text-[#9fcc2e] mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-[#9fcc2e] rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-base md:text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-[#9fcc2e] hover:bg-[#8bb825] text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Learn More
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
                <div className={`relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diet Plans Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-block mb-4">
              <span className="px-3 py-1 bg-[#9fcc2e]/10 text-[#9fcc2e] text-xs sm:text-sm font-semibold rounded-full">
                NUTRITION PLANS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Personalized Diet Plans
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your nutrition goal and get personalized diet plans
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {dietPlans.map((plan, index) => (
              <Link
                key={index}
                href={plan.href}
                className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
              >
                <div className="text-4xl md:text-5xl mb-4">{plan.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#9fcc2e] transition-colors">
                  {plan.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {plan.description}
                </p>
                <div className="flex items-center text-[#9fcc2e] font-semibold">
                  <span className="text-sm md:text-base">Learn More</span>
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-[#9fcc2e] via-[#8bb825] to-[#7fb518] text-white">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-lg md:text-xl text-white/95 mb-8 max-w-2xl mx-auto">
            Join thousands of members who have transformed their lives at FitZone. Contact us today to learn more about our services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#9fcc2e] font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Contact Us
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-md text-white font-bold rounded-xl transition-all duration-300 border-2 border-white/40 hover:bg-white/20"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}


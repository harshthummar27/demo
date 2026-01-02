import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Us - FitZone Gym | Our Story & Mission',
  description: 'Learn about FitZone Gym - 10+ years of experience, 5000+ happy members, 50+ expert trainers. Discover our mission to help you achieve your fitness goals.',
  keywords: 'about FitZone, gym history, fitness trainers, gym mission, fitness community',
  openGraph: {
    title: 'About Us - FitZone Gym',
    description: 'Learn about FitZone Gym - 10+ years of experience, 5000+ happy members, 50+ expert trainers.',
    type: 'website',
  },
  alternates: {
    canonical: '/about',
  },
}

export default function AboutPage() {
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
                ABOUT FITZONE
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 drop-shadow-lg">
              Transform Your Life, Transform Your Body
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-3xl mx-auto font-medium">
              We are more than just a gym. We are a community dedicated to helping you achieve your fitness goals and live a healthier, happier life.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="inline-block mb-4">
                <span className="px-3 py-1 bg-[#9fcc2e]/10 text-[#9fcc2e] text-xs sm:text-sm font-semibold rounded-full">
                  OUR STORY
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                Your Journey Starts Here
              </h2>
              <p className="text-gray-600 mb-4 text-base md:text-lg leading-relaxed">
                Founded in 2014, FitZone Gym began with a simple vision: to create a fitness community where everyone feels welcome, regardless of their fitness level. What started as a small local gym has grown into a comprehensive fitness and nutrition hub serving thousands of members.
              </p>
              <p className="text-gray-600 mb-4 text-base md:text-lg leading-relaxed">
                At FitZone, we believe that fitness is not just about physical strength, but about building confidence, discipline, and a healthier lifestyle. Our state-of-the-art facility is equipped with the latest fitness equipment and staffed by certified trainers who are passionate about your success.
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Whether you're a beginner taking your first steps into fitness or an experienced athlete looking to push your limits, we provide the tools, guidance, and community support you need to reach your goals.
              </p>
            </div>
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
                alt="FitZone Gym Facility"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Our Achievements
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Numbers that speak for themselves
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="text-4xl sm:text-5xl md:text-6xl font-black text-[#9fcc2e] mb-2">10+</div>
              <div className="text-sm sm:text-base md:text-lg text-gray-300 font-medium">Years Experience</div>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="text-4xl sm:text-5xl md:text-6xl font-black text-[#9fcc2e] mb-2">5000+</div>
              <div className="text-sm sm:text-base md:text-lg text-gray-300 font-medium">Happy Members</div>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="text-4xl sm:text-5xl md:text-6xl font-black text-[#9fcc2e] mb-2">50+</div>
              <div className="text-sm sm:text-base md:text-lg text-gray-300 font-medium">Expert Trainers</div>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="text-4xl sm:text-5xl md:text-6xl font-black text-[#9fcc2e] mb-2">24/7</div>
              <div className="text-sm sm:text-base md:text-lg text-gray-300 font-medium">Open Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Mission */}
            <div className="bg-gradient-to-br from-[#9fcc2e]/10 to-[#8bb825]/10 rounded-2xl p-6 md:p-8 border border-[#9fcc2e]/20">
              <div className="w-16 h-16 bg-[#9fcc2e] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                To empower individuals of all fitness levels to achieve their health and wellness goals through expert guidance, state-of-the-art facilities, and a supportive community. We are committed to making fitness accessible, enjoyable, and sustainable for everyone.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 md:p-8 text-white">
              <div className="w-16 h-16 bg-[#9fcc2e] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                To become the leading fitness and nutrition destination where people transform not just their bodies, but their entire lives. We envision a world where everyone has access to quality fitness resources and the support they need to live healthier, happier lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-block mb-4">
              <span className="px-3 py-1 bg-[#9fcc2e]/10 text-[#9fcc2e] text-xs sm:text-sm font-semibold rounded-full">
                OUR VALUES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What We Stand For
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Community First',
                description: 'We believe in building a supportive community where everyone feels welcome and encouraged to reach their goals.'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Excellence',
                description: 'We maintain the highest standards in everything we do, from our facilities to our training programs.'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: 'Passion',
                description: 'Our team is passionate about fitness and dedicated to helping you succeed in your journey.'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                title: 'Education',
                description: 'We provide comprehensive nutrition and fitness education to help you make informed decisions.'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Innovation',
                description: 'We continuously evolve our programs and facilities to incorporate the latest fitness trends and technologies.'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Accessibility',
                description: 'We believe fitness should be accessible to everyone, regardless of age, fitness level, or background.'
              }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-14 h-14 bg-[#9fcc2e]/10 rounded-full flex items-center justify-center text-[#9fcc2e] mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-block mb-4">
              <span className="px-3 py-1 bg-[#9fcc2e]/10 text-[#9fcc2e] text-xs sm:text-sm font-semibold rounded-full">
                WHY FITZONE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose FitZone?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Discover what makes us different
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: 'State-of-the-Art Equipment',
                description: 'Our facility features the latest fitness equipment from leading brands, ensuring you have everything you need for an effective workout.'
              },
              {
                title: 'Expert Trainers',
                description: 'Our certified trainers bring years of experience and are committed to helping you achieve your fitness goals safely and effectively.'
              },
              {
                title: 'Comprehensive Nutrition Guidance',
                description: 'Beyond fitness, we provide detailed nutritional information and meal planning to support your overall health journey.'
              },
              {
                title: 'Flexible Membership Options',
                description: 'Choose from various membership plans that fit your schedule and budget, with 24/7 access available.'
              },
              {
                title: 'Community Support',
                description: 'Join a welcoming community of fitness enthusiasts who motivate and support each other every step of the way.'
              },
              {
                title: 'Free Fitness Tools',
                description: 'Access our free calculators for BMI, calories, protein requirements, and ideal weight to track your progress.'
              }
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 rounded-xl hover:bg-gray-50 transition duration-300 border border-gray-100">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#9fcc2e] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
              <Image
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80"
                alt="FitZone Gym Equipment"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-block mb-4">
                <span className="px-3 py-1 bg-[#9fcc2e]/10 text-[#9fcc2e] text-xs sm:text-sm font-semibold rounded-full">
                  OUR FACILITIES
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                World-Class Facilities
              </h2>
              <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed">
                Our facility is designed to provide you with everything you need for a complete fitness experience. From cutting-edge equipment to comfortable spaces, we've thought of every detail.
              </p>
              <div className="space-y-4">
                {[
                  'Premium cardio equipment with entertainment systems',
                  'Comprehensive strength training area with free weights',
                  'Group fitness studios for classes',
                  'Spacious locker rooms with modern amenities',
                  'Nutrition consultation area',
                  'Comfortable lounge and recovery zones'
                ].map((facility, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-[#9fcc2e] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-base md:text-lg">{facility}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-[#9fcc2e] via-[#8bb825] to-[#7fb518] text-white">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg md:text-xl text-white/95 mb-8 max-w-2xl mx-auto">
            Join thousands of members who have transformed their lives at FitZone. Your fitness journey starts today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#9fcc2e] font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="/services"
              className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-md text-white font-bold rounded-xl transition-all duration-300 border-2 border-white/40 hover:bg-white/20"
            >
              Explore Services
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}


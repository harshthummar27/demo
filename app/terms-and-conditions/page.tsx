import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Terms and Conditions - FitZone Gym | Legal Terms',
  description: 'Read FitZone Gym\'s terms and conditions to understand the rules and regulations for using our website and services. Your agreement to our terms ensures a safe and fair experience.',
  keywords: 'terms and conditions, terms of service, user agreement, legal terms, gym terms, fitness terms',
  openGraph: {
    title: 'Terms and Conditions - FitZone Gym',
    description: 'Read FitZone Gym\'s terms and conditions to understand the rules and regulations for using our website and services.',
    type: 'website',
  },
  alternates: {
    canonical: '/terms-and-conditions',
  },
}

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-12 md:pt-28 md:pb-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Terms and Conditions
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Please read these terms carefully before using our website and services. By using FitZone Gym, you agree to these terms.
          </p>
          <p className="text-sm md:text-base text-gray-400 mt-4">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="prose prose-lg max-w-none">
            
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the FitZone Gym website, you accept and agree to be bound by the terms and provision 
              of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily access the materials on FitZone Gym's website for personal, non-commercial 
              transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
              <li>Attempt to decompile or reverse engineer any software contained on FitZone Gym's website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>

            <h2>3. Membership and Services</h2>
            <h3>3.1 Membership Terms</h3>
            <p>When you register for a membership with FitZone Gym:</p>
            <ul>
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for maintaining the confidentiality of your account</li>
              <li>You are responsible for all activities that occur under your account</li>
              <li>You must notify us immediately of any unauthorized use of your account</li>
            </ul>

            <h3>3.2 Service Availability</h3>
            <p>
              We reserve the right to modify, suspend, or discontinue any part of our services at any time, with or without notice. 
              We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.
            </p>

            <h2>4. Fitness Calculators and Tools</h2>
            <p>
              Our fitness calculators (BMI, Calories, Protein Requirements, etc.) are provided for informational purposes only. 
              These tools are not intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice 
              of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>

            <h2>5. Product Information and Nutrition Data</h2>
            <p>
              While we strive to provide accurate nutritional information for products listed on our website, we cannot guarantee 
              the accuracy, completeness, or timeliness of all product information. Nutritional values may vary based on preparation 
              methods, serving sizes, and other factors. Always check product labels for the most current information.
            </p>

            <h2>6. User Content and Conduct</h2>
            <h3>6.1 User Responsibilities</h3>
            <p>You agree not to:</p>
            <ul>
              <li>Use the website in any way that violates any applicable law or regulation</li>
              <li>Transmit any malicious code, viruses, or harmful data</li>
              <li>Attempt to gain unauthorized access to any portion of the website</li>
              <li>Interfere with or disrupt the website or servers connected to the website</li>
              <li>Use the website to collect or store personal data about other users</li>
              <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
            </ul>

            <h3>6.2 User-Generated Content</h3>
            <p>
              If you submit any content to our website (comments, reviews, etc.), you grant us a non-exclusive, royalty-free, 
              perpetual, and worldwide license to use, reproduce, modify, and distribute such content. You represent that you have 
              the right to grant such license.
            </p>

            <h2>7. Intellectual Property</h2>
            <p>
              All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, 
              and software, is the property of FitZone Gym or its content suppliers and is protected by copyright, trademark, and 
              other intellectual property laws. You may not use any content without our express written permission.
            </p>

            <h2>8. Payment Terms</h2>
            <h3>8.1 Payment Processing</h3>
            <p>
              All payments for memberships, services, or products are processed through secure third-party payment processors. 
              By making a payment, you agree to the terms and conditions of the payment processor.
            </p>

            <h3>8.2 Refunds and Cancellations</h3>
            <p>
              Refund and cancellation policies vary by service type. Please refer to your specific membership or service agreement 
              for details. Generally, membership fees are non-refundable unless otherwise stated in your agreement.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
              FitZone Gym shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including 
              without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the 
              website or services. Our total liability shall not exceed the amount you paid to us in the past 12 months.
            </p>

            <h2>10. Health and Safety Disclaimer</h2>
            <p>
              <strong>IMPORTANT:</strong> Before beginning any exercise program or making significant dietary changes, consult with 
              a healthcare professional. The information provided on this website is for educational purposes only and is not intended 
              as medical advice. FitZone Gym is not responsible for any injuries or health issues that may arise from the use of our 
              information, tools, or services.
            </p>

            <h2>11. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless FitZone Gym, its officers, directors, employees, agents, and affiliates 
              from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising 
              out of or in any way connected with your use of the website or violation of these terms.
            </p>

            <h2>12. Links to Third-Party Websites</h2>
            <p>
              Our website may contain links to third-party websites that are not owned or controlled by FitZone Gym. We have no 
              control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. 
              You acknowledge and agree that FitZone Gym shall not be responsible or liable for any damage or loss caused by or in 
              connection with the use of any such content or services.
            </p>

            <h2>13. Termination</h2>
            <p>
              We may terminate or suspend your access to our website and services immediately, without prior notice or liability, 
              for any reason, including without limitation if you breach these Terms and Conditions. Upon termination, your right 
              to use the website will immediately cease.
            </p>

            <h2>14. Governing Law</h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which 
              FitZone Gym operates, without regard to its conflict of law provisions. Any disputes arising from these terms shall be 
              subject to the exclusive jurisdiction of the courts in that jurisdiction.
            </p>

            <h2>15. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms and Conditions at any time. If a revision 
              is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a 
              material change will be determined at our sole discretion. By continuing to access or use our website after any revisions 
              become effective, you agree to be bound by the revised terms.
            </p>

            <h2>16. Severability</h2>
            <p>
              If any provision of these Terms and Conditions is held to be invalid or unenforceable by a court, the remaining provisions 
              of these Terms and Conditions will remain in effect. These Terms and Conditions constitute the entire agreement between us 
              regarding our website and services.
            </p>

            <h2>17. Contact Information</h2>
            <p>If you have any questions about these Terms and Conditions, please contact us:</p>
            <ul>
              <li><strong>Email:</strong> legal@fitzonegym.com</li>
              <li><strong>Phone:</strong> (555) 123-4567</li>
              <li><strong>Address:</strong> 123 Fitness Street, Health City, HC 12345</li>
            </ul>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-0">
                <strong>Note:</strong> By using FitZone Gym's website and services, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website 
                or services.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}


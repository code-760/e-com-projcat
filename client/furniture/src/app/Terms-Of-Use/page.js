import React from "react";

export default function TermsOfUse() {
  const lastUpdated = "October 25, 2023"; // Current date daalein
  const companyName = "Your Company Name"; // Apna brand name yahan likhein
  const contactEmail = "support@yourwebsite.com"; // Apna email daalein

  return (
    <div className="py-16 bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header Section --- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold uppercase tracking-wide mb-4 font-[cha]">
            Terms of Use
          </h1>
          <p className="text-gray-500">
            Last Updated: <span className="font-medium text-gray-700">{lastUpdated}</span>
          </p>
        </div>

        {/* --- Content Section --- */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-8 md:p-12 space-y-8 leading-relaxed">
          
          {/* Introduction */}
          <section>
            <p className="text-gray-600">
              Welcome to <strong>{companyName}</strong>. By accessing our website and purchasing our products, you agree to be bound by the following terms and conditions ("Terms of Use", "Terms"). Please read these Terms carefully before using our website.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#c09578]">1. General Conditions</h2>
            <p className="text-gray-600 mb-3">
              We reserve the right to refuse service to anyone for any reason at any time. You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service, use of the Service, or access to the Service without express written permission by us.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#c09578]">2. Products and Pricing</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 marker:text-[#c09578]">
              <li><strong>Accuracy of Information:</strong> We have made every effort to display the colors and images of our furniture as accurately as possible. However, we cannot guarantee that your computer monitor's display of any color will be completely accurate.</li>
              <li><strong>Modifications:</strong> Prices for our products are subject to change without notice. We reserve the right to modify or discontinue any product at any time.</li>
              <li><strong>Availability:</strong> All products are subject to availability. We may limit the quantities of any products or services that we offer.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#c09578]">3. Orders and Billing</h2>
            <p className="text-gray-600 mb-3">
              We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. 
            </p>
            <p className="text-gray-600">
              You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#c09578]">4. Shipping and Delivery</h2>
            <p className="text-gray-600">
              Delivery times are estimates and are not guaranteed. We are not responsible for any delays in shipping. The risk of loss and title for items purchased from us pass to you upon our delivery to the carrier.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#c09578]">5. Intellectual Property</h2>
            <p className="text-gray-600">
              All content included on this site, such as text, graphics, logos, images, and software, is the property of <strong>{companyName}</strong> or its content suppliers and protected by international copyright laws.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#c09578]">6. Governing Law</h2>
            <p className="text-gray-600">
              These Terms of Use and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#c09578]">7. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              Questions about the Terms of Use should be sent to us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 inline-block">
              <p className="font-medium text-gray-800">{companyName}</p>
              <p className="text-gray-600 mt-1">
                Email: <a href={`mailto:${contactEmail}`} className="text-[#c09578] hover:underline">{contactEmail}</a>
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
import React from "react";

export default function PrivacyPolicy() {
  const lastUpdated = "October 25, 2023"; // Yahan current date daal sakte hain
  const companyName = "Your Company Name"; // Isey apne brand name se replace karein
  const contactEmail = "support@yourwebsite.com"; // Apna support email daalein

  return (
    <div className="py-16 bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header Section --- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold uppercase tracking-wide mb-4 font-[cha]">
            Privacy Policy
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
              Welcome to <strong>{companyName}</strong>. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and purchase our products.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#c09578]">1. Information We Collect</h2>
            <p className="text-gray-600 mb-3">We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 marker:text-[#c09578]">
              <li><strong>Personal Data:</strong> Name, shipping address, email address, and telephone number that you voluntarily give to us when registering or placing an order.</li>
              <li><strong>Financial Data:</strong> Data related to your payment method (e.g., valid credit card number, card brand, expiration date) is handled securely by our payment processors. We do not store financial data on our servers.</li>
              <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, browser type, and the dates/times you access the Site.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#c09578]">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-3">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 marker:text-[#c09578]">
              <li>Create and manage your account.</li>
              <li>Process your orders, payments, and arrange for delivery.</li>
              <li>Email you regarding your order or account status.</li>
              <li>Respond to product and customer service requests.</li>
              <li>Send you promotional offers and newsletters (only if you have opted in).</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#c09578]">3. Sharing Your Information</h2>
            <p className="text-gray-600">
              We respect your privacy and do not sell your personal data. We may share information with third-party vendors that perform services for us, such as payment processing, data analysis, email delivery, hosting services, and customer service. They are obligated to protect your information and only use it for the services they provide.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#c09578]">4. Cookies and Tracking Technologies</h2>
            <p className="text-gray-600">
              We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. You can choose to disable cookies through your browser settings, though this may affect your ability to use certain features of our website.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#c09578]">5. Security of Your Information</h2>
            <p className="text-gray-600">
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#c09578]">6. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have questions or comments about this Privacy Policy, please contact us at:
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
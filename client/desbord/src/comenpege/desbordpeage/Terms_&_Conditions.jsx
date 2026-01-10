import React from 'react';
// 1. Remix Icons (Ri) hata kar FontAwesome (Fa) import kiya
import { 
  FaFileAlt, 
  FaPrint, 
  FaDownload, 
  FaBalanceScale, 
  FaShieldAlt, 
  FaCopyright, 
  FaExclamationTriangle 
} from "react-icons/fa";

export default function TermsAndConditions() {
  
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            {/* RiFileTextLine -> FaFileAlt */}
            <FaFileAlt className="text-indigo-600" />
            Terms & Conditions
          </h2>
          <p className="text-gray-500 mt-2">Please read these terms carefully before using our services.</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium">
            {/* RiPrinterLine -> FaPrint */}
            <FaPrint /> Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 font-medium">
            {/* RiDownload2Line -> FaDownload */}
            <FaDownload /> Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-gray-700 leading-relaxed">
            
            {/* Last Updated */}
            <div className="mb-8 pb-6 border-b border-gray-100">
              <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                Last Updated: October 24, {currentYear}
              </span>
            </div>

            {/* Section 1 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                {/* RiScaleLine -> FaBalanceScale */}
                <FaBalanceScale className="text-indigo-500" /> 1. Introduction
              </h3>
              <p className="mb-4">
                Welcome to <span className="font-semibold text-gray-900">[Company Name]</span>. By accessing our website and using our services, 
                you agree to be bound by the following terms and conditions. If you disagree with any part of these terms, 
                you may not access the service.
              </p>
              <p>
                These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </div>

            {/* Section 2 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                {/* RiShieldCheckLine -> FaShieldAlt */}
                <FaShieldAlt className="text-indigo-500" /> 2. Privacy Policy
              </h3>
              <p className="mb-4">
                Your privacy is important to us. It is <span className="font-semibold text-gray-900">[Company Name]</span>'s policy to respect your privacy regarding 
                any information we may collect from you across our website.
              </p>
              <p>
                We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, 
                with your knowledge and consent.
              </p>
            </div>

            {/* Section 3 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                {/* RiCopyrightLine -> FaCopyright */}
                <FaCopyright className="text-indigo-500" /> 3. Intellectual Property
              </h3>
              <p className="mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive property of 
                <span className="font-semibold text-gray-900"> [Company Name]</span> and its licensors. The Service is protected by copyright, trademark, 
                and other laws of both the Country and foreign countries.
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4 text-gray-600">
                <li>You may not modify or copy the materials.</li>
                <li>You may not use the materials for any commercial purpose.</li>
                <li>You may not attempt to decompile or reverse engineer any software.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                {/* RiAlarmWarningLine -> FaExclamationTriangle */}
                <FaExclamationTriangle className="text-indigo-500" /> 4. Limitation of Liability
              </h3>
              <p>
                In no event shall <span className="font-semibold text-gray-900">[Company Name]</span>, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, 
                data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>
            </div>

            {/* Footer of Document */}
            <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-500">
              <p>
                If you have any questions about these Terms, please contact us at <a href="mailto:support@example.com" className="text-indigo-600 hover:underline">support@example.com</a>.
              </p>
            </div>

          </div>
        </div>

        {/* Sidebar / Quick Links */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Table of Contents</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-indigo-600 font-medium border-l-2 border-indigo-600 pl-3 block">1. Introduction</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600 border-l-2 border-transparent hover:border-gray-300 pl-3 block transition-colors">2. Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600 border-l-2 border-transparent hover:border-gray-300 pl-3 block transition-colors">3. Intellectual Property</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600 border-l-2 border-transparent hover:border-gray-300 pl-3 block transition-colors">4. Limitation of Liability</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600 border-l-2 border-transparent hover:border-gray-300 pl-3 block transition-colors">5. Contact Us</a>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="text-sm font-bold text-gray-900 mb-2">Need Help?</h4>
              <p className="text-xs text-gray-500 mb-4">Can't find what you're looking for? Contact our legal team.</p>
              <button className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
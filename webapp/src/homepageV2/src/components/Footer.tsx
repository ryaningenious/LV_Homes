"use client";

import type React from "react";
// import { Mail, Phone, MapPin, Send } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img
            src={`${
              import.meta.env.VITE_STATIC_FILE
            }/i9aDy-hVHkyBIVRGv35BaQ_lv_homes_logo_03.png`}
            alt="Company Logo"
          />
        </div>

        <div className="footer-navigation">
          <h3>Navigation</h3>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Projects</a>
            </li>
            <li>
              <a href="#">Articles</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <ul>
            <li>Email: info@yourcompany.com</li>
            <li>Phone: +123 456 7890</li>
            <li>Address: 123 Main St, City, Country</li>
          </ul>
        </div>

        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#" target="_blank" className="social-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.675 0H1.325C0.593 0 0 0.593 0 1.325v21.351C0 23.407 0.593 24 1.325 24H12.82v-9.294H9.692V11.08h3.127V8.408c0-3.1 1.894-4.79 4.662-4.79 1.325 0 2.463.099 2.796.142v3.24h-1.92c-1.504 0-1.794.715-1.794 1.763v2.315h3.588l-.467 3.626h-3.121V24h6.117C23.407 24 24 23.407 24 22.675V1.325C24 0.593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a href="#" target="_blank" className="social-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.035-1.849-3.035-1.849 0-2.133 1.444-2.133 2.94v5.664H9.356V9.001h3.412v1.561h.048c.476-.902 1.637-1.849 3.369-1.849 3.602 0 4.269 2.368 4.269 5.448v6.291h-.007zM5.337 7.433c-1.144 0-2.068-.926-2.068-2.069s.925-2.069 2.068-2.069c1.145 0 2.069.926 2.069 2.069 0 1.143-.924 2.069-2.069 2.069zM7.114 20.452H3.557V9h3.557v11.452zM22.225 0H1.771C.792 0 0 .792 0 1.771v20.457C0 23.207.792 24 1.771 24h20.457C23.207 24 24 23.208 24 22.228V1.771C24 .792 23.208 0 22.225 0z" />
              </svg>
            </a>
            <a href="#" target="_blank" className="social-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.004 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.693 4.919 4.919.058 1.265.07 1.645.07 4.85s-.012 3.585-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.265.058-1.645.07-4.85.07s-3.585-.012-4.85-.07c-3.225-.148-4.771-1.694-4.919-4.919-.058-1.265-.07-1.645-.07-4.85s.012-3.585.07-4.85C2.384 3.926 3.899 2.38 7.154 2.232c1.265-.058 1.645-.07 4.85-.07M12 0C8.74 0 8.332.015 7.052.073 1.942.327.327 1.942.073 7.052.015 8.332 0 8.74 0 12c0 3.26.015 3.668.073 4.948.254 5.11 1.869 6.725 6.979 6.979 1.28.058 1.688.073 4.948.073 3.26 0 3.668-.015 4.948-.073 5.11-.254 6.725-1.869 6.979-6.979.058-1.28.073-1.688.073-4.948 0-3.26-.015-3.668-.073-4.948-.254-5.11-1.869-6.725-6.979-6.979C15.668.015 15.26 0 12 0zm0 5.838c-3.403 0-6.162 2.76-6.162 6.162 0 3.403 2.76 6.162 6.162 6.162 3.403 0 6.162-2.76 6.162-6.162 0-3.403-2.76-6.162-6.162-6.162zm0 10.154c-2.208 0-3.992-1.784-3.992-3.992S9.792 8.008 12 8.008s3.992 1.784 3.992 3.992-1.784 3.992-3.992 3.992zm6.406-10.738c0 .796-.646 1.442-1.442 1.442s-1.442-.646-1.442-1.442c0-.796.646-1.442 1.442-1.442s1.442.646 1.442 1.442z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
    // <footer classNameName=" text-gray-300 py-12">
    //   <div classNameName="container mx-auto px-4">
    //     <div classNameName="mt-8 pt-8 border-t border-gray-700">
    //       <div classNameName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    //         <div classNameName="space-y-4">
    //           <h3 classNameName="text-lg font-semibold text-white">About Us</h3>
    //           <p classNameName="text-sm">We are a company dedicated to providing excellent services to our customers.</p>
    //         </div>
    //         <div classNameName="space-y-4">
    //           <h3 classNameName="text-lg font-semibold text-white">Quick Links</h3>
    //           <ul classNameName="space-y-2">
    //             <li>
    //               <a href="/" classNameName="hover:text-white transition-colors">
    //                 Home
    //               </a>
    //             </li>
    //             <li>
    //               <a href="/services" classNameName="hover:text-white transition-colors">
    //                 Services
    //               </a>
    //             </li>
    //             <li>
    //               <a href="/about" classNameName="hover:text-white transition-colors">
    //                 About
    //               </a>
    //             </li>
    //             <li>
    //               <a href="/contact" classNameName="hover:text-white transition-colors">
    //                 Contact
    //               </a>
    //             </li>
    //           </ul>
    //         </div>
    //         <div classNameName="space-y-4">
    //           <h3 classNameName="text-lg font-semibold text-white">Contact Us</h3>
    //           <ul classNameName="space-y-2">
    //             <li classNameName="flex items-center space-x-2">
    //               <Phone size={18} />
    //               <span classNameName="text-sm">(+971) 585683589</span>
    //             </li>
    //             <li classNameName="flex items-center space-x-2">
    //               <Mail size={18} />
    //               <a href="mailto:info@luxveritas.com" classNameName="text-sm hover:text-white transition-colors">
    //                 info@luxveritas.com
    //               </a>
    //             </li>
    //             <li classNameName="flex items-start space-x-2">
    //               <MapPin size={18} classNameName="mt-1 flex-shrink-0" />
    //               <span classNameName="text-sm text-left">1101, Ibn Battuta Gate Offices, Sheikh Zayed Road, Dubai. UAE</span>
    //             </li>
    //           </ul>
    //         </div>
    //         <div classNameName="space-y-4">
    //           <h3 classNameName="text-lg font-semibold text-white">Follow Us</h3>
    //           <div classNameName="flex space-x-4 justify-center">
    //             <a href="#" classNameName="text-gray-400 hover:text-white transition-colors">
    //               <span classNameName="sr-only">Facebook</span>
    //               <svg classNameName="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    //                 <path
    //                   fillRule="evenodd"
    //                   d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
    //                   clipRule="evenodd"
    //                 />
    //               </svg>
    //             </a>
    //             <a href="#" classNameName="text-gray-400 hover:text-white transition-colors">
    //               <span classNameName="sr-only">Twitter</span>
    //               <svg classNameName="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    //                 <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    //               </svg>
    //             </a>
    //             <a href="#" classNameName="text-gray-400 hover:text-white transition-colors">
    //               <span classNameName="sr-only">LinkedIn</span>
    //               <svg classNameName="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    //                 <path
    //                   fillRule="evenodd"
    //                   d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
    //                   clipRule="evenodd"
    //                 />
    //               </svg>
    //             </a>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     <div classNameName="mt-8 border-t border-gray-700 pt-8 text-center">
    //       <p classNameName="text-sm">&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
    //     </div>
    //   </div>
    // </footer>
  );
};

export default Footer;

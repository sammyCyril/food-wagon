import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-black py-16">
      <Container>
        {/* Top Cities */}
        <div>
          <h3 className="text-white text-xl font-bold mb-6">Our top cities</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-4 text-sm">
            <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">New York</a>
            <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Los Angeles</a>
            <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Chicago</a>
            <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Houston</a>
            <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Philadelphia</a>

            <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">San Francisco</a>
            <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Miami</a>
            <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Boston</a>
            <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Seattle</a>
            <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Dallas</a>

            <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Atlanta</a>
            <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Denver</a>
            <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Phoenix</a>
            <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Detroit</a>
            <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Las Vegas</a>
          </div>
        </div>

        <div className="border-b border-gray-700 my-12" />

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10">

          {/* Company */}
          <div className="lg:col-span-3">
            <h3 className="text-white text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-2.5 text-gray-300">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Team</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-white text-lg font-medium mb-4">Contact</h3>
            <ul className="space-y-2.5 text-gray-300">
              <li><a href="#" className="hover:text-white transition">Help & Support</a></li>
              <li><a href="#" className="hover:text-white transition">Partner with us</a></li>
              <li><a href="#" className="hover:text-white transition">Ride with us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-3">
            <h3 className="text-white text-lg font-medium mb-4">Legal</h3>
            <ul className="space-y-2.5 text-gray-300">
              <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition">Refund & Cancellation</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="lg:col-span-3 lg:pl-8 border-l border-gray-700">
            <h3 className="text-white text-lg font-medium mb-4">FOLLOW US</h3>

            <div className="flex gap-5 mb-6">
              {/* Facebook */}
              <a href="#" className="text-gray-400 hover:text-white text-2xl transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>

              {/* Twitter / X */}
              <a href="#" className="text-gray-400 hover:text-white text-2xl transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25l-7.129 8.132L3.75 2.25H.5l7.36 10.42L.5 21.75h3.75l6.43-7.32 6.564 7.32h3.75l-7.74-10.92L23.5 2.25h-5.256z"/>
                </svg>
              </a>
            </div>

            <p className="text-gray-300 mb-4 text-sm">
              Receive exclusive offers in your mailbox
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border border-gray-700 focus:border-orange-400 text-gray-200 px-4 py-3 rounded-lg flex-1 focus:outline-none"
              />
              <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-medium text-white transition whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>

        </div>
      </Container>
    </footer>
  );
}
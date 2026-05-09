import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <Container>

        <div className="grid gap-10 md:grid-cols-4">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold text-orange-500">
              foodwagon
            </h2>

            <p className="mt-4 text-sm text-gray-400 leading-6">
              Delicious meals delivered to your doorstep anytime.
            </p>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="font-semibold mb-4">
              Company
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  About
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  Careers
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  Blog
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  Careers
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  Careers
                </a>
              </li>

            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="font-semibold mb-4">
              Support
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  Help Center
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  Terms
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  Help Center
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  Terms
                </a>
              </li>

            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="font-semibold mb-4">
              Stay Updated
            </h3>

            <p className="text-sm text-gray-400 mb-4">
              Get offers and updates directly in your inbox.
            </p>

            

            {/* SOCIALS */}
            <div className="flex items-center gap-4 mt-6 text-gray-400">
             <a href="#" className="text-gray-400 hover:text-white text-2xl transition"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"> <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/> </svg> </a>

              {/* <a href="#" className="hover:text-white transition">
                <InstagramIcon size={20} />
              </a> */}

             <a href="#" className="text-gray-400 hover:text-white text-2xl transition"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"> <path d="M18.244 2.25l-7.129 8.132L3.75 2.25H.5l7.36 10.42L.5 21.75h3.75l6.43-7.32 6.564 7.32h3.75l-7.74-10.92L23.5 2.25h-5.256z"/> </svg> </a>
            </div>

            <div className="flex gap-2 mt-5" >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400"
              />

              <button className="bg-orange-500 hover:bg-orange-600 px-4 rounded-lg text-sm font-medium transition">
                Join
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          © 2026 foodwagon. All rights reserved.
        </div>

      </Container>
    </footer>
  );
}
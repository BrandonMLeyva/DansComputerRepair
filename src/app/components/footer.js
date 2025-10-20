export function Footer() {
    return (
      <footer className="bg-white text-gray-800 border-t mt-12">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* About Us */}
          <div>
            <h3 className="font-semibold mb-3">About Us</h3>
            <ul className="space-y-1 text-sm">
              <li>Computer diagnostics</li>
              <li>Laptop & desktop repair</li>
              <li>Virus and malware removal</li>
              <li>Data recovery</li>
              <li>Custom PC builds</li>
              <li>System upgrades</li>
            </ul>
          </div>
  
          {/* Location */}
          <div>
            <h3 className="font-semibold mb-3">Location</h3>
            <p className="text-sm">Sacramento, CA 95842</p>
            <p className="text-sm mt-1">Mon - Sat: 7 AM - 9 PM</p>
            <p className="text-sm mt-2">(916) 320-6955</p>
            <p className="text-sm">(279) 241-0963</p>
          </div>
  
          {/* Customer Support */}
          <div>
            <h3 className="font-semibold mb-3">Customer Support</h3>
            <ul className="space-y-1 text-sm">
              <li>Request a repair</li>
              <li>Track your service</li>
              <li>Warranty information</li>
              <li>Troubleshooting tips</li>
              <li>Contact technician</li>
            </ul>
          </div>
        </div>
  
        {/* WIP */}
        <div className="border-t text-center text-xs text-gray-500 py-4">
          © {new Date().getFullYear()} Dan’s Computer Repair — All rights reserved.
        </div>
      </footer>
    );
  }
  
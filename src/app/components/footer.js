import Image from 'next/image';

export function Footer() {
    return (
      <footer className="bg-white text-gray-800 border-t mt-12">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[auto_1fr_1fr_1fr] gap-8">
          
          {/* DC-668: Social media icons - positioned on the left, horizontal layout */}
          <div className="flex flex-row gap-4 items-start mr-8">
            {/* Instagram icon - opens in new tab */}
            <a 
              href="https://www.instagram.com/danscomputerrepairsacramento/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-70"
              aria-label="Visit our Instagram page"
            >
              <Image 
                src="/insta.svg" 
                alt="Instagram" 
                width={24} 
                height={24}
                className="w-6 h-26"
              />
            </a>

            {/* Yelp icon - opens in new tab */}
            <a 
              href="https://www.yelp.com/biz/dan-s-computer-repair-sacramento-2?utm_campaign=www_business_share_popup&utm_medium=copy_link&utm_source=(direct)" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-70"
              aria-label="Visit our Yelp page"
            >
              <Image 
                src="/yelp.svg" 
                alt="Yelp" 
                width={24} 
                height={24}
                className="w-6 h-26"
              />
            </a>
          </div>

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
  
        {/* Copyright section */}
        <div className="border-t text-center text-xs text-gray-500 py-4">
          © {new Date().getFullYear()} Dan's Computer Repair — All rights reserved.
        </div>
      </footer>
    );
  }

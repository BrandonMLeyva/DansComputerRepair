"use client";
import { useState } from "react";

function Header() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const services = [
        "Data recovery",
        "Telecom or Network services",
        "Mobile phone body repair",
        "Printer support",
        "Device support or repair",
        "VOIP services",
        "Mobile phone support",
        "Video game console support",
    ];

    return (
        <header className="site-header">
            <div className="brand">
                <img src="/Danlogo.jpg" alt="Dan's Computer Repair Logo" width="80" height="80" />
                <div className="brand-text">
                    <h1> Dan's Computer Repair</h1>
                    <p>IT Services and Computer Repair</p>
                </div>
            </div>
            <nav className="main-nav">
                <ul className="nav-list">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">Products</a></li>
                    <li className="relative"> 
                        <button onClick={() => setDropdownOpen(!isDropdownOpen)}>Service Request</button>
                        {isDropdownOpen && (
                            <div className="absolute left-1/2 -translate-x-1/2 w-[380px] bg-white border border-black p-1">
                            {/* <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-[380px] bg-white border border-black p-6"> */}
                                <p className="text-center text-black text-lg font-medium mb-4">
                                    Select a service
                                </p>
                                <ul className="space-y-1">
                                    {services.map((service, index) => (
                                        <li key={index}>
                                            <a 
                                                href={`/services/${service.toLowerCase().replace(/ /g, '-')}`}
                                                className="!rounded-none block w-full text-center bg-gray-300 border border-black !py-3 text-black hover:bg-gray-400 transition-colors"
                                                // className="block w-full text-center bg-gray-300 border border-black rounded-none py-3 text-black hover:bg-gray-400 transition-colors"
                                            >
                                                {service}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>

                    {/* admin login button with different styling from other links */}
                    <li>
                        <a
                            href="/contact"
                            style={{
                                background: '#333',
                                color: '#fff',
                                padding: '6px 10px',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                display: 'inline-block'
                            }}
                        >Admin Login</a>
                    </li>
                </ul>
            </nav>

        </header>
    )
}
export default Header;


            // {isDropdownOpen && (
            //     <div>
            //         <ul className="py-1">
            //             <li>
            //                 <a href="/intake" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            //                     New Request
            //                 </a>
            //             </li>
            //             <li>
            //                 <a href="/status" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            //                         Check Status
            //                 </a>
            //             </li>
            //             <li>
            //                 <a href="/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            //                     Contact Us
            //                 </a>
            //             </li>
            //         </ul>
            //             </div>
            // )}
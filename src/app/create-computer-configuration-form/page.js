

export default function CreateComputerConfigurationForm() {
    return (
        <main className="min-h-screen bg-white text-black">
                <form className="mx-auto max-w-3xl px-12,py-12">
                     <h1 className="text-3xl mb-6">Computer Configuration Form</h1>
                    {/* Boundary line wrapping two section and more in the future depended on it*/}
                    <div className="border border-neutral-300 bg-white, px-6 py-4">
                        <h2 className="text-5xl,mt-6, mb-6 ">1.Customer Information</h2>
                        {/* Displays as 3-column grid on medium to larger displays for section 1*/}
                        <div className="grid grid-cols-3 gaps-3 grid-flow-row, flex flex-col gap-6">
                            <div>
                                <label className="block text-sm mb1" htmlFor="Name">Name</label>
                                <input type="text" name="Name" placeholder="Name" className="w-55 border border-black px-3 py-2"/>
                            </div>

                            <div>    
                                <label className="block test-sm mb1" htmlFor="Phone number">Phone number</label>
                                <input type="tel" name="Phone number" placeholder="Phone number" className="w-55 border border-black px-3 py-2"/>
                            </div>
                            <div>
                                <label className="block test-sm mb1" htmlFor="Email address">Email address</label>
                                <input type="email" name="Email address" placeholder="Email address" className="w-55 border border-black  px-3 py-2"/>
                            </div>
                            <div>
                                <label className="block test-sm mb1" htmlFor="Budget Range">Budget Range</label>
                                <input type="text" name="Budget Range" placeholder="Budget Range" className="w-55 border border-black  px-3 py-2"/>
                            </div>
                            <div>
                                <label className="block test-sm mb1" htmlFor="Intended Use">Intended Use</label>
                                <input type="text" name="Intended Use" placeholder="Intended Use" className="w-55 border border-black  px-3 py-2"/>
                            </div>
                        </div>
                        {/* end of Section 1 list*/}
                        <h3 className="mt-6 mb-6">2. Core Components</h3>
                        {/* Section 2 starts here*/}
                        <div className="grid grid-cols-3 gaps-3 grid-flow-row, flex flex-col gap-6">
                            <div>
                                <label className="block text-sm mb1" htmlFor="Processor (CPU)">1.Processor (CPU)</label>
                                <select name="Processor (CPU)" className="w-55 border border-black  py-2">
                                    <option value="">Select a CPU</option>
                                    <option value="Intel Core i9-13900K">Intel Core i9-13900K</option>
                                    <option value="AMD Ryzen 9 7950X">AMD Ryzen 9 7950X</option>
                                    <option value="Intel Core i7-13700K">Intel Core i7-13700K</option>
                                    <option value="AMD Ryzen 7 7700X">AMD Ryzen 7 7700X</option>
                                    <option value="Intel Core i5-13600K">Intel Core i5-13600K</option>
                                    <option value="AMD Ryzen 5 7600X">AMD Ryzen 5 7600X</option>
                                </select>
                            </div>

                            <div>
                                <label className="block test-sm mb1" htmlFor="Graphic Card">2.Graphic Card (GPU)</label>
                                <select name="Graphic Card" className="w-55 border border-black  py-2">
                                    <option value="">Select a GPU</option>
                                    <option value="NVIDIA GeForce RTX 4090">NVIDIA GeForce RTX 4090</option>
                                    <option value="AMD Radeon RX 7900 XTX">AMD Radeon RX 7900 XTX</option>
                                    <option value="NVIDIA GeForce RTX 4080">NVIDIA GeForce RTX 4080</option>
                                    <option value="AMD Radeon RX 7800 XT">AMD Radeon RX 7800 XT</option>
                                    <option value="NVIDIA GeForce RTX 4070 Ti">NVIDIA GeForce RTX 4070 Ti</option>
                                    <option value="AMD Radeon RX 7700 XT">AMD Radeon RX 7700 XT</option>
                                </select>
                            </div>
                            <div>
                                <label className="block test-sm mb1" htmlFor="Motherboard">3.Motherboard</label>
                                <select name="Motherboard" className="w-55 border border-black py-2">
                                    <option value="">Select a Motherboard</option>
                                    <option value="ASUS ROG Strix Z790-E">ASUS ROG Strix Z790-E</option>
                                    <option value="MSI MPG B650 Carbon WiFi">MSI MPG B650 Carbon WiFi</option>
                                    <option value="Gigabyte Z790 AORUS Elite AX">Gigabyte Z790 AORUS Elite AX</option>
                                    <option value="ASRock B650M Steel Legend">ASRock B650M Steel Legend</option>
                                </select>
                            </div>
                            <div>
                                <label className="block test-sm mb1" htmlFor="Memory">4.Memory (RAM)</label>
                                <select name="Memory" className="w-55 border border-black  py-2">
                                    <option value="">Select RAM Size</option>
                                    <option value="16GB (2x8GB) DDR5-6000">16GB (2x8GB) DDR5-6000</option>
                                    <option value="32GB (2x16GB) DDR5-6000">32GB (2x16GB) DDR5-6000</option>
                                    <option value="64GB (2x32GB) DDR5-6000">64GB (2x32GB) DDR5-6000</option>
                                </select>
                            </div>
                            <div>
                                <label className="block test-sm mb1" htmlFor="Storage">5.Storage</label>
                                <select name="Storage" className="w-55 border border-black py-2">
                                    <option value="">Select Storage Option</option>
                                    <option value="1TB NVMe SSD">1TB NVMe SSD</option>
                                    <option value="2TB NVMe SSD">2TB NVMe SSD</option>
                                    <option value="4TB NVMe SSD">4TB NVMe SSD</option>
                                    <option value="1TB NVMe SSD + 2TB HDD">1TB NVMe SSD + 2TB HDD</option>
                                    <option value="2TB NVMe SSD + 4TB HDD">2TB NVMe SSD + 4TB HDD</option>
                                </select>
                            </div>
                            <div>
                                <label className="block test-sm mb1" htmlFor="Power Supply Unit (PSU)">6.Power Supply Unit (PSU)</label>
                                <select name="Power Supply Unit (PSU)" className="w-55 border border-black py-2">
                                    <option value="">Select a PSU</option>
                                    <option value="650W 80+ Gold">650W 80+ Gold</option>
                                    <option value="750W 80+ Gold">750W 80+ Gold</option>
                                    <option value="850W 80+ Platinum">850W 80+ Platinum</option>
                                    <option value="1000W 80+ Platinum">1000W 80+ Platinum</option>
                                </select>
                            </div>
                            <div>
                                <label className="block test-sm mb1" htmlFor="Computer Case">7.Computer Case</label>
                                <select name="Computer Case" className="w-55 border border-black  py-2">
                                    <option value="">Select a Case</option>
                                    <option value="Mid-Tower Case with Tempered Glass">Mid-Tower Case with Tempered Glass</option>
                                    <option value="Full-Tower Case with RGB Lighting">Full-Tower Case with RGB Lighting</option>
                                    <option value="Compact Mini-ITX Case">Compact Mini-ITX Case</option>
                                </select>
                            </div>
                        </div>
                        {/* end of Section 2 list*/}
                    </div>
                </form>
        </main>
    );
}
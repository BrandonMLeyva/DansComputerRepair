"use client";
import { use, useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // 2 icons for password state
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";

export default function InitMFAPage() {
    const [showPassword, setShowPassword] = useState(false);  // hide password by default
    const [email, setEmail] = useState(""); // used by supabase
    const [password, setPassword] = useState(""); // used by supabase

    // const [qrSVG, setQrSVG] = useState(null); //  holds the SVG for the QR code that pops up
    const [qrURI, setQrURI] = useState(null); // holds the URI for the MFA factor. A special link

    return (
        <main className="min-h-screen bg-white text-black">
            <section className="mx-auto max-w-3xl p-6">
                <h1 className="text-3xl font-semibold mb-6">Initialize Your Multi-Factor Authentication</h1>

                <div className="border border-neutral-300 rounded-md bg-white">
                    <div className = "p-6 md:p-8">
                        {/* 2 Columns for the layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* The left column. This Holds the Form info. */}
                            <form className="space-y-4 flex flex-col justify-center">
                            {/* ^ add onSubmit={handleSubmit} */}
                                <div>
                                    <label className="block text-sm mb-1">Email address</label>
                                    <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter email address "
                                    className="w-full border border-black rounded-sm px-3 py-2"
            //                      value = {email}
            //                      onChange= {(e) => setEmail(e.target.value)}
                                    required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">Password</label>
                                        <div className="relative w-full">
                                            <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            className="w-full border border-black rounded-sm px-3 py-2 pr-10"
                                            //   value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            />
                                            <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-3 flex items-center text-neutral-500 hover:text-black"
                                            tabIndex={-1}
                                            >
                                            {showPassword ? (
                                                <EyeOff size={18} strokeWidth={1.5} />
                                            ) : (
                                                <Eye size={18} strokeWidth={1.5} />
                                            )}
                                            </button>
                                        </div>   
                                </div>
                                <button
                                type="submit"
                                //disabled={loading}
                                className="w-full bg-[#8fbd7e] hover:bg-[#6dab5c] text-white font-medium py-2 rounded-sm mt-2"
                                >
                                {/* {loading ? "Loading..." : "Sign In"} */}
                                Initalize a MFA Factor
                                </button>
                            </form>
                            <aside className="border border-dashed rounded-md p-4 bg-neutral-50 flex items-center justify-center aspect-square min-h-[220px]">
                                {qrURI ? (
                                <div className="flex flex-col items-center break-all">
                                    <QRCodeSVG value={qrURI} size={190}></QRCodeSVG>
                                </div>
                                ) : (
                                <div className="text-sm text-center text-neutral-600">
                                    QR will appear here once a factor is initialized
                                </div>
                                )}
                            </aside>
                        </div>
                    </div>
                    
                </div>
            </section>
        </main>
    )
}
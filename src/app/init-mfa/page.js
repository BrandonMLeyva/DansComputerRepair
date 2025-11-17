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
    const [factorID, setFactorID] = useState(null);
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setQrURI(null);
        setFactorID(null);
        setCode("");
        setSuccess(false);

        const emailTrimmed = email.trim();

        // The regular login
        const { error: authError} = await supabase.auth.signInWithPassword({email: emailTrimmed, password,});
        if (authError) {
            setError(authError.message);
            return;
        }

        // Prompt Supabase to enroll a TOTP factor
        const { data, error} = await supabase.auth.mfa.enroll({factorType: 'totp', friendlyName: `totp-${Date.now()}`});
        if (error) {
            setError(error.message);
            return
        }
        setFactorID(data.id);
        setQrURI(data.totp?.uri || null);
    }

    async function verifyTOTP(e) {
        e.preventDefault();
        setError("");

        if (!factorID) {
            setError("No factor to verify.");
            return;
        }
        if(!/^\d{6}$/.test(code.trim())) {
            setError("Enter the 6-digit code from your authenticator app.");
            return;
        }

        const challenge = await supabase.auth.mfa.challenge({factorId: factorID});
        if (challenge.error) {
            setError(challenge.error.message);
            return;
        }

        const verify = await supabase.auth.mfa.verify({factorId: factorID, challengeId: challenge.data.id, code: code.trim()});
        if (verify.error) {
            setError(verify.error.message);
            return;
        }

        // If you reach this point, then the factor was set successfully.
        setCode("");
        setSuccess(true);
        setTimeout(() => {
            router.replace("/admin-log-in");
        }, 1500);
    }

    return (
        <main className="min-h-screen bg-white text-black">
            <section className="mx-auto max-w-3xl p-6">
                <h1 className="text-3xl font-semibold mb-6">Initialize Your Multi-Factor Authentication</h1>

                <div className="border border-neutral-300 rounded-md bg-white">
                    <div className = "p-6 md:p-8">
                        {/* 2 Columns for the layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                            {/* The left column. This Holds the Form info. */}
                            <form onSubmit= {handleSubmit} className="space-y-10 flex flex-col justify-center h-full">
                                <div>
                                    <label className="block text-sm mb-1">Email address</label>
                                    <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter email address "
                                    className="w-full border border-black rounded-sm px-3 py-2"
                                    value = {email}
                                    onChange= {(e) => setEmail(e.target.value)}
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
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            />
                                            <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-3 flex items-center text-neutral-500 hover:text-black cursor-pointer"
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
                                className="w-full bg-[#8fbd7e] hover:bg-[#6dab5c] text-white font-medium py-2 rounded-sm mt-2 cursor-pointer"
                                >
                                Initialize a MFA Factor
                                </button>
                                {error && ( <div className="text-xs text-red-600 mt-2">{error}</div>)}
                            </form>
                            <aside className="border border-dashed rounded-md p-4 bg-neutral-50 flex flex-col items-center justify-center aspect-square min-h-[220px] h-full">
                                {qrURI ? (
                                <div className="flex flex-col items-center break-all">
                                    <QRCodeSVG value={qrURI} size={190}></QRCodeSVG>
                                    <form onSubmit={verifyTOTP} className="flex items-center gap-2 w-full justify-center py-3">
                                        <input className="border rounded px-2 py-1 text-center"
                                            inputMode="numeric"
                                            pattern="[0-9]{6}"
                                            maxLength={6}
                                            placeholder="123456"
                                            value={code}
                                            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                                            required></input>
                                    </form>
                                    <button type="submit" onClick={verifyTOTP} className="w-full px-3 py-1 border rounded bg-black text-white hover:opacity-80 cursor-pointer">Verify</button>
                                    {/* If successful, will show green text here */}
                                    {success && (<div className="text-green-600 text-sm text-center font-medium mt-2">MFA setup was successful. Redirecting…</div>)}


                                    {/* If an error occurs, this will display text for the error */}
                                    {error && <div className="text-sm text-center text-red-600">{error}</div>}
                                </div>
                                ) : (
                                <div className="text-sm text-bold text-center text-neutral-600">
                                    QR will appear here once a factor is initialized. Please use an app like Google Authenticator
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
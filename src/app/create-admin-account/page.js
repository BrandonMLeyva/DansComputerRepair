export default function CreateAdminAccountPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-3xl p-6">
        <h1 className="text-3xl font-semibold mb-6">Create Admin account</h1>

        {/* Card Area */}
        <div className="border border-neutral-300 rounded-md bg-white">
          <form className="p-6 md:p-8">
            {/* Displays as 2-column grid on medium to larger displays */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1">First name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  className="w-full border border-black rounded-sm px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  className="w-full border border-black rounded-sm px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Email address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="w-full border border-black rounded-sm px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Phone number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  className="w-full border border-black rounded-sm px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Minimum 10 characters"
                  className="w-full border border-black rounded-sm px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Confirm password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Minimum 10 characters"
                  className="w-full border border-black rounded-sm px-3 py-2"
                />
              </div>
            </div>

            {/* Sign up button (muted) */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-slate-400 text-white py-2 rounded-sm hover:bg-slate-500"
              >
                Sign up
              </button>
            </div>
          </form>

          {/* Footer row with divider and Sign in button included */}
          <div className="border-t border-neutral-300 p-6 md:p-8">
            <div className="flex justify-center items-center gap-2">
              <span className="text-sm text-neutral-600">Or</span>
              <button
                type="button"
                className="bg-green-600 text-white px-4 py-2 rounded-sm hover:bg-green-700"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
"use client";

import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      
      {/* LEFT SIDE */}
      <section className="hidden lg:flex bg-orange-500 items-center justify-center p-10">
        <div className="max-w-md text-white">
          <h1 className="text-5xl font-bold leading-tight">
            Welcome Back
          </h1>

          <p className="mt-6  text-lg text-white/90 ">
            Order delicious meals from your favorite restaurants anytime.
          </p>
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="flex items-center justify-center px-6 py-12 bg-white">
        <LoginForm />
      </section>

    </main>
  );
}
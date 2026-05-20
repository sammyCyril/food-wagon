// app/(auth)/layout.tsx

import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F8FAF8]">
  <div className="grid min-h-screen lg:grid-cols-2">

    {/* LEFT */}
    <section className="hidden lg:block">
      <div className="sticky top-0 relative min-h-screen w-full">
        <Image
          src="/pizza/pizza8.jpg"
          alt="Electric bike"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/10" />
      </div>
    </section>

    {/* RIGHT */}

    <section className="flex justify-center px-6 py-16 sm:px-10 lg:px-16">
      <div className="w-full max-w-md">

        {/* <div className="mb-10">
          <Image
            src="/Agile-Cycle-Logo.png"
            alt="Agile Cycle"
            width={90}
            height={90}
            priority
          />
        </div> */}

        {children}

      </div>
    </section>

  </div>
</main>
  );
}
"use client";

export default function Error404({children}) {
  return (
    <section className="h-screen bg-gray-200 relative">
        <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-[150%]
         flex flex-col">
          <h1 className="font-bold text-4xl text-red-600 text-center mb-8">404 - ERROR</h1>
          <p className="text-base font-semibold text-red-600">{children}</p>
      </div>
    </section>
  );
}

"use client";

import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  return (
    <main className="max-w-4xl mx-auto p-8 text-white text-center border m-10 rounded-lg shadow-xl bg-gradient-to-tr from-gray-900 via-[#029FAE] to-[#00C6A7]">
      <div className="flex flex-col items-center space-y-6">
        <CheckCircleIcon className="w-16 h-16 text-white animate-bounce" />

        <h1 className="text-5xl font-extrabold tracking-wide">Payment Successful!</h1>
        <p className="text-lg font-medium opacity-90">
          Thank you for your payment. Your transaction has been processed successfully.
        </p>

        <div className="bg-white p-4 px-6 rounded-lg text-black text-4xl font-bold shadow-md">
          ${amount}
        </div>

        <a
          href="/"
          className="mt-4 px-6 py-3 bg-white text-[#029FAE] font-semibold rounded-full shadow-md hover:bg-gray-100 transition"
        >
          Go to Homepage
        </a>
      </div>
    </main>
  );
}

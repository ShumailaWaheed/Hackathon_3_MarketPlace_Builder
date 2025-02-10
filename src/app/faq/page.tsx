"use client";

import React, { useState, useMemo } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

interface FAQ {
  question: string;
  description: string;
  isOpen: boolean;
}

const FAQSection: React.FC = () => {
  const initialFAQs: FAQ[] = useMemo(
    () => [
      { question: "What types of chairs do you offer?", description: "We offer a variety of chairs including office chairs, gaming chairs, dining chairs, and ergonomic seating options.", isOpen: false },
      { question: "How do I place an order?", description: "You can place an order by selecting your desired chair, adding it to your cart, and proceeding to checkout.", isOpen: false },
      { question: "Can I return a product?", description: "Yes, we have a 30-day return policy. Items must be in their original condition and packaging.", isOpen: false },
      { question: "Do you offer international shipping?", description: "Yes, we ship internationally. Shipping costs and delivery times vary based on your location.", isOpen: false },
      { question: "Are the chairs customizable?", description: "Yes, we offer customization options for some chair models, including fabric choice and ergonomic adjustments.", isOpen: false },
      { question: "How do I track my order?", description: "Once your order is shipped, you will receive a tracking number via email.", isOpen: false },
    ],
    []
  );

  const [faqs, setFAQs] = useState<FAQ[]>(initialFAQs);
  const [newQuestion, setNewQuestion] = useState<string>("");
  const toggleFAQ = (index: number) => {
    setFAQs((prevFAQs) =>
      prevFAQs.map((faq, i) =>
        i === index ? { ...faq, isOpen: !faq.isOpen } : faq
      )
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      setFAQs([
        ...faqs,
        {
          question: newQuestion,
          description: "Thank you for your question! Our team will respond soon.",
          isOpen: false,
        },
      ]);
      setNewQuestion("");
    }
  };

  return (
    <section className="w-full max-w-[1200px] mx-auto py-10 px-4 mb-10">
      <div className="text-center mb-10">
        <h2 className="lg:text-5xl md:text-4xl text-3xl font-bold text-[#272343]">
          Questions? Look Here
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-10">
        {faqs.map((faq, index) => (
          <div key={index} className="relative bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFAQ(index)}>
              <h3 className="text-xl font-semibold text-[#272343]">{faq.question}</h3>
              {faq.isOpen ? (
                <MinusIcon className="w-6 h-6 text-[#272343]" />
              ) : (
                <PlusIcon className="w-6 h-6 text-[#272343]" />
              )}
            </div>
            {faq.isOpen && <p className="text-sm text-[#272343] mt-2">{faq.description}</p>}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-2xl font-semibold text-[#272343] mb-4">Have Another Question?</h3>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex flex-col gap-4">
          <input
            type="text"
            placeholder="Type your question here..."
            value={newQuestion}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewQuestion(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#029FAE]"
          />
          <button
            type="submit"
            className="bg-[#272343] text-white px-6 py-2 rounded-lg hover:bg-[#029FAE] transition-all"
          >
            Submit Question
          </button>
        </form>
      </div>
    </section>
  );
};

export default FAQSection;

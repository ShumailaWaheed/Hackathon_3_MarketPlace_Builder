import React, { useMemo } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

const FAQSection = () => {
  const faqs = useMemo(
    () => [
      {
        question: "What types of chairs do you offer?",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veritatis enim repellat optio natus eum delectus deserunt, odit expedita eos molestiae ipsa totam quidem?",
      },
      {
        question: "How do I place an order?",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veritatis enim repellat optio natus eum delectus deserunt, odit expedita eos molestiae ipsa totam quidem?",
      },
      {
        question: "Can I return a product?",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veritatis enim repellat optio natus eum delectus deserunt, odit expedita eos molestiae ipsa totam quidem?",
      },
      {
        question: "Do you offer international shipping?",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veritatis enim repellat optio natus eum delectus deserunt, odit expedita eos molestiae ipsa totam quidem?",
      },
      {
        question: "Are the chairs customizable?",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veritatis enim repellat optio natus eum delectus deserunt, odit expedita eos molestiae ipsa totam quidem?",
      },
      {
        question: "How do I track my order?",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veritatis enim repellat optio natus eum delectus deserunt, odit expedita eos molestiae ipsa totam quidem?",
      },
    ],
    []
  );

  const renderFAQItem = (faq: { question: string; description: string }, index: number) => (
    <div
      key={index}
      className="relative bg-gray-100 p-6 rounded-lg shadow-md hover:scale-[1.03] transition-transform duration-300"
    >
      <PlusIcon className="absolute top-2 right-2 w-6 h-6 text-[#272343] cursor-pointer" />
      <h3 className="text-xl font-semibold text-[#272343] mb-4">{faq.question}</h3>
      <p className="text-sm text-[#272343] font-inter">{faq.description}</p>
    </div>
  );

  return (
    <section className="w-full max-w-[1920px] mx-auto py-10 px-4 mb-10">
      <div className="text-center mb-10">
        <h2 className="lg:text-5xl md:text-4xl text-3xl font-bold text-[#272343] mt-10">
          Questions Look Here
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
        {faqs.map((faq, index) => renderFAQItem(faq, index))}
      </div>
    </section>
  );
};

export default FAQSection;

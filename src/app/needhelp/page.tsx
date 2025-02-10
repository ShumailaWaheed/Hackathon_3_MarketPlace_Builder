"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MessageCircle, PhoneCall } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NeedHelp = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Need Help? We’re Here for You</h1>
        <p className="text-gray-600 mt-2">Find answers to your questions or reach out to our support team.</p>
        <div className="mt-4 flex items-center justify-center space-x-2">
          <Input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-2/3"
          />
          <Button><Search className="w-5 h-5" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {[
          { title: "FAQs", link: "/faqs" },
          { title: "Order Tracking", link: "/track-order" },
          { title: "Shipping & Returns", link: "/shipping-returns" },
          { title: "Payment & Refunds", link: "/payments" },
          { title: "Account Help", link: "/account" },
          { title: "Warranty & Repairs", link: "/warranty" },
        ].map((item, index) => (
          <Link key={index} href={item.link} className="block p-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-center">
            {item.title}
          </Link>
        ))}
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Still Need Assistance?</h2>
        <p className="text-gray-600 mt-2">Reach out to our customer support team.</p>
        <div className="flex justify-center mt-4 space-x-4">
          <Button variant="outline"><MessageCircle className="w-5 h-5 mr-2" /> Live Chat</Button>
          <Button variant="outline"><PhoneCall className="w-5 h-5 mr-2" /> Call Us</Button>
        </div>
      </div>
    </div>
  );
};

export default NeedHelp;

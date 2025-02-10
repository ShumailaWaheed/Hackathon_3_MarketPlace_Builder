"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";  
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function ContactSupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState([
    { type: "bot", message: "Hello! How can I assist you today?" },
  ]);
  const [question, setQuestion] = useState<string>("order");
  const [customMessage, setCustomMessage] = useState<string>("");

  const defaultResponses: Record<string, string> = {
    order: "Your order is being processed. You can track it in your account.",
    refund: "Refunds take 5-7 business days. Please check your email for updates.",
    shipping: "Shipping takes 3-5 days. Track your shipment in your order history.",
    payment: "Please check your payment method or contact us for further assistance with payments.",
    account: "For account issues, please ensure you are logged in. If the issue persists, contact support.",
    other: "Sorry, we're currently unavailable. We'll reply soon.",
  };

  const toggleWidget = () => setIsOpen(!isOpen);

  const handleSelectChange = (value: string) => {
    setQuestion(value);
    if (value !== "other") {
      setChat((prev) => [
        ...prev,
        { type: "user", message: value },
        { type: "bot", message: defaultResponses[value] },
      ]);
    }
  };

  const handleSendMessage = () => {
    if (customMessage.trim()) {
      setChat((prev) => [
        ...prev,
        { type: "user", message: customMessage },
        { type: "bot", message: defaultResponses.other },
      ]);
      setCustomMessage(""); 
    }
  };

  return (
    <div>
      <Button
        onClick={toggleWidget}
        className="fixed bottom-6 right-6 bg-[#029FAE] text-white p-4 rounded-full shadow-xl hover:bg-[#027e85] transition flex items-center gap-2"
      >
        <MessageCircle size={24} />
        <span className="hidden md:inline">Support</span>
      </Button>

      {isOpen && (
        <Card className="fixed bottom-16 right-6 w-72 shadow-2xl border border-gray-200 animate-fade-in">
          <CardHeader className="p-3 bg-[#029FAE] text-white rounded-t-lg text-center font-bold">
            Contact Support
          </CardHeader>
          <CardContent className="p-4 bg-white text-sm h-64 overflow-auto flex flex-col gap-2">
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg ${
                  msg.type === "bot"
                    ? "bg-gray-200 self-start"
                    : "bg-[#029FAE] text-white self-end"
                }`}
              >
                {msg.message}
              </div>
            ))}

            {/* Select Topic */}
            <Select onValueChange={handleSelectChange} defaultValue={question}>
              <SelectTrigger>
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="order">Order Issue</SelectItem>
                <SelectItem value="refund">Refund Inquiry</SelectItem>
                <SelectItem value="shipping">Shipping Details</SelectItem>
                <SelectItem value="payment">Payment Issue</SelectItem>
                <SelectItem value="account">Account Issue</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            {/* Input for "Other" selection */}
            {question === "other" && (
              <div className="flex items-center gap-2 mt-2">
                <Textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Please describe your issue"
                  rows={1} 
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  className="p-2 bg-[#029FAE] text-white rounded-full flex items-center justify-center"
                >
                  <Send size={20} />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CheckoutPage: React.FC = () => {
  const searchParams = useSearchParams();
  const amountParam = searchParams.get("amount");

  // Ensure amount is correctly parsed
  const finalAmount = amountParam ? parseFloat(amountParam) : 0;

  console.log("Received Checkout Amount:", finalAmount); 

  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (finalAmount <= 0) {
      setErrorMessage("Invalid checkout amount. Please return to cart and try again.");
      return;
    }

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: finalAmount * 100 }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret ?? ""))
      .catch(() => setErrorMessage("Failed to load payment details. Please try again."));
  }, [finalAmount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setErrorMessage("Payment system is not ready. Please try again later.");
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success?amount=${finalAmount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message ?? "Payment failed. Please try again.");
      setLoading(false);
      return;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Card className="max-w-lg w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Secure Checkout</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center font-bold text-lg mb-4">
            {finalAmount > 0 ? `Total: $${finalAmount.toFixed(2)}` : "Invalid Amount"}
          </p>

          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle className="w-5 h-5" />
              <AlertTitle>Payment Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {finalAmount > 0 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {clientSecret && <PaymentElement />}
              <Button type="submit" className="w-full" disabled={!stripe || loading}>
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : `Pay $${finalAmount.toFixed(2)}`}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;

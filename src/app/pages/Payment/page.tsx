"use client";
import { useState } from "react";

export default function PaymentPage() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Payment Processed!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Payment Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Card Number */}
          <div>
            <label className="block text-gray-700">Card Number</label>
            <input
              type="text"
              maxLength={16}
              placeholder="1234 5678 9012 3456"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>

          {/* Expiry & CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                maxLength={5}
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">CVV</label>
              <input
                type="password"
                placeholder="123"
                maxLength={3}
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
          </div>

          {/* Card Holder Name */}
          <div>
            <label className="block text-gray-700">Card Holder Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  const proPrice = billingCycle === "monthly" ? 15 : 12 * 15 * 0.75; // Assuming 25% discount for yearly

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center text-white p-6 selection:bg-orange-500 selection:text-white"
      style={{ backgroundImage: "url(/subbackground.png)" }}
    >
      {/* Header */}


      {/* Main Content */}
      <main className="w-full max-w-6xl mx-auto flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-3">
          Choose your plan
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12">
          Unlock endless possibilities
        </p>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {/* Info Card */}
          <div className="bg-black/30 backdrop-blur-lg rounded-xl p-8 flex flex-col justify-between shadow-xl order-1 md:order-1">
            <div>
              <h2 className="text-3xl font-semibold mb-6">Pricing</h2>
              <p className="text-gray-300 mb-8 text-sm leading-relaxed">
                Try Basic for free - or, if you wish, upgrade to our Pro plan to get the
                most of your designdecode subscription. You can switch between packages or terminate
                your subscription at any point.
              </p>
            </div>
            <div className="mt-auto">
              <div className="flex bg-black/20 p-1 rounded-full mb-2">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`w-1/2 py-2 rounded-full text-sm font-medium transition-all
                    ${billingCycle === "monthly" ? "bg-white text-slate-900 shadow-md" : "text-gray-400 hover:text-white"}`}
                >
                  MONTHLY
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`w-1/2 py-2 rounded-full text-sm font-medium transition-all
                    ${billingCycle === "yearly" ? "bg-white text-slate-900 shadow-md" : "text-gray-400 hover:text-white"}`}
                >
                  YEARLY
                </button>
              </div>
              <p className="text-xs text-orange-300 text-center">
                {billingCycle === "yearly" ? "Save 25% on yearly plans" : "Switch to yearly and save 25%"}
              </p>
            </div>
          </div>

          {/* Basic Plan */}
          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 flex flex-col items-center shadow-xl order-2 md:order-2">
            <h2 className="text-3xl font-semibold mb-2">Basic</h2>
            <p className="text-sm text-gray-400 mb-4">No credit card required.</p>
            <div className="my-6">
              <span className="text-6xl font-bold">$0</span>
              <span className="text-gray-400">/free forever</span>
            </div>
            <p className="text-xs text-gray-400 mb-6">billed yearly</p>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors mb-8 shadow-md">
              SIGN UP
            </button>
            <ul className="space-y-3 text-sm text-gray-300 w-full">
              {[
                "2 free illustration styles",
                "Limited Templates",
                "Limited Mockups",
                "JPG and PNG downloads",
              ].map((item) => (
                <li key={item} className="flex items-center">
                  <span className="bg-purple-500 rounded-full w-2 h-2 mr-3"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 flex flex-col items-center border-2 border-orange-500 shadow-2xl order-3 md:order-3 relative">
            <div className="absolute -top-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">POPULAR</div>
            <h2 className="text-3xl font-semibold mb-2 mt-3">Pro</h2>
            <p className="text-sm text-gray-400 mb-4">Full access to all designstripe content</p>
            <div className="my-6">
              <span className="text-6xl font-bold">${proPrice}</span>
              <span className="text-gray-400">
                {billingCycle === "monthly" ? "USD / month" : "USD / year"}
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-6">billed yearly</p>
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors mb-8 shadow-md">
              SUBSCRIBE
            </button>
            <ul className="space-y-3 text-sm text-gray-300 w-full">
              {[
                "All illustration styles",
                "Unlimited Templates",
                "Unlimited Mockups",
                "JPG, PNG & SVG downloads",
                "SVG animations",
                "Plus everything in Basic",
              ].map((item) => (
                <li key={item} className="flex items-center">
                  <span className="bg-orange-500 rounded-full w-2 h-2 mr-3"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;
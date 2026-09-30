import React from 'react';
import { Check, X, ShieldCheck, AlertTriangle } from 'lucide-react';

export const ComparisonTable = () => {
  const comparisons = [
    {
      feature: "100% Organic & Plant-Powered",
      blossom: true,
      market: false,
      detail: "Wild turmeric, saffron, goat milk, alpha arbutin & almond oil"
    },
    {
      feature: "Zero Mercury, Bleach & Steroids",
      blossom: true,
      market: false,
      detail: "No toxic skin thinners, no artificial peeling chemicals"
    },
    {
      feature: "No Rebound Darkening or Redness",
      blossom: true,
      market: false,
      detail: "Safe for sensitive skin with lasting natural brightness"
    },
    {
      feature: "Non-Comedogenic (Won't Clog Pores)",
      blossom: true,
      market: false,
      detail: "Lightweight texture, deep absorption without greasy residue"
    },
    {
      feature: "Synergistic 2-Step Routine",
      blossom: true,
      market: false,
      detail: "Soap deeply purifies while Cream locks in nutrients"
    },
    {
      feature: "Cash on Delivery Nationwide + 7-Day Guarantee",
      blossom: true,
      market: false,
      detail: "Pay at your doorstep across all Pakistan cities"
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#7b3e1d]">
            Pure Organic Difference
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1a1a1a] mt-1">
            Why Blossom Organics vs. Market Chemical Creams?
          </h2>
          <div className="w-12 h-0.5 bg-[#c59b27] mx-auto mt-2.5"></div>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Most local creams contain harsh mercurial salts that damage your skin barrier. Blossom Organics heals and illuminates naturally.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200 text-xs font-bold py-3.5 px-4 sm:px-6">
            <div className="col-span-6 sm:col-span-6 text-gray-600 uppercase tracking-wider">Features</div>
            <div className="col-span-3 sm:col-span-3 text-center text-[#7b3e1d] flex items-center justify-center space-x-1 font-extrabold">
              <ShieldCheck className="w-4 h-4 text-[#c59b27]" />
              <span>Blossom Organics</span>
            </div>
            <div className="col-span-3 sm:col-span-3 text-center text-gray-400 flex items-center justify-center space-x-1">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Chemical Creams</span>
            </div>
          </div>

          <div className="divide-y divide-gray-100 text-xs">
            {comparisons.map((row, idx) => (
              <div key={idx} className="grid grid-cols-12 py-3.5 px-4 sm:px-6 items-center hover:bg-gray-50/60 transition-colors">
                <div className="col-span-6 sm:col-span-6 pr-2">
                  <span className="font-bold text-gray-900 block">{row.feature}</span>
                  <span className="text-[11px] text-gray-500">{row.detail}</span>
                </div>
                <div className="col-span-3 sm:col-span-3 flex justify-center">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>
                <div className="col-span-3 sm:col-span-3 flex justify-center">
                  <div className="w-7 h-7 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
                    <X className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

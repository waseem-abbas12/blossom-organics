import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ChevronDown } from 'lucide-react';

export const FaqSection = () => {
  const { faqs } = useStore();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-12 sm:py-20 bg-[#fbf9f5] border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#7b3e1d]">
            Help & Guidance
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1a1a1a] mt-1">
            Frequently Asked Questions
          </h2>
          <div className="w-12 h-0.5 bg-[#c59b27] mx-auto mt-2.5"></div>
        </div>

        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-semibold text-gray-900 text-xs sm:text-sm hover:text-[#7b3e1d] transition-colors"
                >
                  <span>{item.question}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#7b3e1d]' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

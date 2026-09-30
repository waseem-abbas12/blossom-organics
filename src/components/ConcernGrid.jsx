import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export const ConcernGrid = () => {
  const { concerns } = useStore();

  return (
    <section className="py-10 sm:py-16 bg-[#fbf9f5] border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#7b3e1d]">
            Targeted Herbal Solutions
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1a1a1a] mt-1">
            Shop by Concern
          </h2>
          <div className="w-12 h-0.5 bg-[#c59b27] mx-auto mt-2.5"></div>
          <p className="text-xs sm:text-sm text-gray-600 mt-3">
            Handcrafted natural botanicals specifically formulated to address your personal hair and skincare needs.
          </p>
        </div>

        {/* Concern Circles / Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {concerns.map(item => (
            <Link
              key={item.id}
              to={`/shop?concern=${encodeURIComponent(item.name)}`}
              className="group flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-gray-100 hover:border-[#c59b27] hover:shadow-md transition-all duration-300"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-3.5 border-2 border-gray-100 group-hover:border-[#7b3e1d] group-hover:scale-105 transition-all duration-300 bg-gray-50">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-[#7b3e1d] transition-colors line-clamp-2">
                {item.name}
              </h3>
              <span className="text-[10px] text-gray-500 mt-0.5 font-medium">
                {item.tagline}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

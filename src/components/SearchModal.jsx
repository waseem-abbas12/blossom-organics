import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Search, X, Star, ArrowRight } from 'lucide-react';

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, products } = useStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const results = query.trim()
    ? products.filter(p => 
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        (p.concern && p.concern.toLowerCase().includes(query.toLowerCase())) ||
        (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 animate-fade-in border border-gray-100">
        {/* Search input field */}
        <div className="p-4 border-b border-gray-200 flex items-center space-x-3 bg-gray-50">
          <Search className="w-5 h-5 text-[#7b3e1d] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search facial kits, serums, bleached creams, hair oils..."
            className="w-full bg-transparent text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-gray-400 hover:text-black rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results view */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-gray-100">
          {query.trim() === "" ? (
            <div className="py-8 text-center text-xs text-gray-500 space-y-3">
              <p className="font-semibold text-gray-700">Popular Searches:</p>
              <div className="flex flex-wrap gap-2 justify-center max-w-md mx-auto">
                {["Facial Kit", "Peach Bleach", "Hair Fall", "Pure Rosewater", "Baby Wash", "Mani Pedi"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1 bg-gray-100 hover:bg-[#7b3e1d] hover:text-white rounded-full text-xs transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <p className="text-sm font-semibold">No cosmetics found matching "{query}"</p>
              <p className="text-xs text-gray-400 mt-1">Try checking for typos or searching by category name.</p>
            </div>
          ) : (
            results.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                onClick={() => setIsSearchOpen(false)}
                className="py-3 flex items-center space-x-3.5 hover:bg-gray-50 px-2 rounded-xl transition-colors group"
              >
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-14 h-14 object-cover rounded-lg border border-gray-100 bg-gray-50"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#c59b27] uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-[#7b3e1d] truncate">
                    {product.title}
                  </h4>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className="text-xs font-bold text-gray-900">
                      Rs. {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[11px] text-gray-400 line-through">
                        Rs. {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#7b3e1d] group-hover:translate-x-1 transition-all" />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

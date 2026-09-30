import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const StickyBottomBar = () => {
  const navigate = useNavigate();
  const { products, addToCart } = useStore();
  const [visible, setVisible] = useState(false);

  // Target the Duo as default best value
  const duoProduct = products.find(p => p.id === 'prod-duo') || products[0];

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 400px
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible || !duoProduct) return null;

  const handleQuickOrder = () => {
    addToCart(duoProduct, 1);
    navigate('/checkout');
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 py-2.5 px-4 shadow-2xl sm:hidden animate-fade-in">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5 min-w-0">
          <img
            src={duoProduct.image}
            alt={duoProduct.title}
            className="w-10 h-10 object-cover rounded-lg border border-gray-100 flex-shrink-0"
          />
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-gray-900 block truncate">
              The Power Glow Duo (Soap + Cream)
            </span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-xs font-extrabold text-[#7b3e1d]">
                Rs. {duoProduct.price.toLocaleString()}
              </span>
              <span className="text-[10px] text-gray-400 line-through">
                Rs. {duoProduct.originalPrice?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleQuickOrder}
          className="flex-shrink-0 px-4 py-2.5 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-md flex items-center space-x-1"
        >
          <span>Order COD</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

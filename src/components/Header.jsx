import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  Phone, 
  Sparkles,
  ShieldCheck,
  Search
} from 'lucide-react';

export const Header = () => {
  const { 
    settings, 
    cartItemCount, 
    cartTotal,
    setIsCartOpen, 
    wishlist, 
    setIsSearchOpen 
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="w-full relative z-40 bg-white">
      {/* 1. Announcement Bar */}
      {settings.announcementEnabled && (
        <div 
          className="text-xs font-medium py-2 px-4 transition-colors"
          style={{ backgroundColor: settings.announcementBg || '#7b3e1d', color: settings.announcementColor || '#ffffff' }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="hidden md:flex items-center space-x-4 text-[11px] opacity-90">
              <span className="flex items-center space-x-1">
                <Phone className="w-3 h-3" />
                <span>Helpline / WhatsApp: {settings.phone}</span>
              </span>
            </div>

            <div className="flex-1 text-center font-medium tracking-wide flex items-center justify-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>{settings.announcementText}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse hidden sm:inline" />
            </div>

            <div className="hidden md:flex items-center space-x-3 text-[11px]">
              <span className="bg-black/20 px-2 py-0.5 rounded font-mono font-bold">PKR (Rs.)</span>
              <Link to="/track-order" className="hover:underline opacity-90">Track Order</Link>
            </div>
          </div>
        </div>
      )}

      {/* 2. Main Branding Header */}
      <div className="border-b border-gray-100 py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-gray-700 hover:text-black focus:outline-none"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex flex-col items-center group">
            <div className="flex items-center space-x-2">
              <span className="text-2xl sm:text-3xl font-serif font-black tracking-wider text-[#1a1a1a] uppercase group-hover:text-[#7b3e1d] transition-colors">
                Blossom
              </span>
              <span className="text-2xl sm:text-3xl font-serif italic text-[#c59b27] font-semibold">
                Organics
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-gray-500 font-medium">
              Pure 2-Step Botanical Care
            </span>
          </Link>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-bold tracking-wider uppercase text-gray-700">
            <Link to="/#hero-buy" className="hover:text-[#7b3e1d] transition-colors py-1">
              Shop The Routine
            </Link>
            <a href="#synergy" className="hover:text-[#7b3e1d] transition-colors py-1">
              The 2-Step Synergy
            </a>
            <a href="#products-deepdive" className="hover:text-[#7b3e1d] transition-colors py-1">
              Soap vs Cream
            </a>
            <a href="#results" className="hover:text-[#7b3e1d] transition-colors py-1">
              Results & Proof
            </a>
            <a href="#reviews" className="hover:text-[#7b3e1d] transition-colors py-1">
              Reviews
            </a>
            <a href="#faq" className="hover:text-[#7b3e1d] transition-colors py-1">
              FAQs
            </a>
          </nav>

          {/* User & Cart Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              to="/track-order"
              className="hidden sm:inline-block text-xs font-semibold text-gray-600 hover:text-[#7b3e1d] px-2 py-1 rounded"
            >
              Track Order
            </Link>

            {/* Admin Portal Quick Link */}
            <Link
              to="/admin"
              className="flex items-center space-x-1 p-2 text-xs font-medium text-gray-600 hover:text-[#7b3e1d] transition-colors"
              title="Admin Panel"
            >
              <User className="w-4 h-4" />
              <span className="hidden xl:inline">Admin</span>
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="p-2 text-gray-700 hover:text-[#7b3e1d] relative transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-[#c59b27] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center space-x-2.5 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white px-3 sm:px-4 py-2 rounded-full transition-all text-xs font-semibold shadow-sm group"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#d94826] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">
                {cartItemCount > 0 ? `Rs. ${cartTotal.toLocaleString()}` : "Cart"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-fade-in">
            {/* Drawer Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <span className="font-serif font-bold text-lg text-[#1a1a1a]">Menu</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-gray-500 hover:text-black rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 text-sm font-medium">
              <a 
                href="#hero-buy" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-lg bg-[#7b3e1d]/10 text-[#7b3e1d] font-bold"
              >
                Shop The 2-Step Routine (Save 27%)
              </a>
              <a 
                href="#synergy" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 rounded-md hover:bg-gray-100 text-gray-800"
              >
                The 2-Step Synergy (Soap + Cream)
              </a>
              <a 
                href="#products-deepdive" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 rounded-md hover:bg-gray-100 text-gray-800"
              >
                Ingredients & Benefits Breakdown
              </a>
              <a 
                href="#results" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 rounded-md hover:bg-gray-100 text-gray-800"
              >
                Results Timeline
              </a>
              <a 
                href="#reviews" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 rounded-md hover:bg-gray-100 text-gray-800"
              >
                Customer Reviews
              </a>
              <a 
                href="#faq" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 rounded-md hover:bg-gray-100 text-gray-800"
              >
                Frequently Asked Questions
              </a>

              <div className="pt-4 border-t border-gray-100 space-y-2">
                <Link to="/track-order" className="block py-2 px-3 rounded-md hover:bg-gray-100 text-gray-700">
                  Track Your Parcel
                </Link>
                <Link to="/wishlist" className="block py-2 px-3 rounded-md hover:bg-gray-100 text-gray-700">
                  My Wishlist ({wishlist.length})
                </Link>
                <Link to="/admin" className="block py-2 px-3 rounded-md bg-[#1a1a1a] text-white font-bold text-center">
                  Admin Panel Login
                </Link>
              </div>
            </div>

            {/* Drawer Footer Contact */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-600 space-y-1">
              <p className="font-semibold text-gray-800">Helpline / WhatsApp:</p>
              <p>{settings.phone}</p>
              <p className="text-[11px] text-gray-500">Fast Cash on Delivery across Pakistan</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

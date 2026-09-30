import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Phone, Mail, MapPin, Send, Check } from 'lucide-react';

export const Footer = () => {
  const { settings } = useStore();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 2500);
  };

  return (
    <footer className="bg-[#1a1a1a] text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-serif font-black tracking-wider text-white uppercase">
                Blossom
              </span>
              <span className="text-2xl font-serif italic text-[#c59b27] font-semibold">
                Organics
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Blossom Organics is dedicated to creating high-performance herbal cosmetics, clinical-grade facial glow kits, and natural hair restoration treatments for radiant Pakistani beauty.
            </p>

            <div className="space-y-2 text-xs text-gray-400 pt-2">
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#c59b27]" />
                <span>Helpline / WhatsApp: {settings.phone}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#c59b27]" />
                <span>Email: {settings.email}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-[#c59b27]" />
                <span>Lahore, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              The 2-Step Routine
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#hero-buy" className="hover:text-white transition-colors">The Complete Glow Duo (Save 27%)</a></li>
              <li><a href="#products-deepdive" className="hover:text-white transition-colors">Organic Glow Cream (50g)</a></li>
              <li><a href="#products-deepdive" className="hover:text-white transition-colors">Organic Herbal Soap (120g)</a></li>
              <li><a href="#synergy" className="hover:text-white transition-colors">How The 2-Step Ritual Works</a></li>
              <li><a href="#results" className="hover:text-white transition-colors">21-Day Results Timeline</a></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Customer Help
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link to="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition-colors">My Wishlist</Link></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQs & Shipping Info</a></li>
              <li><span className="text-gray-500">Cash on Delivery Policy</span></li>
              <li><span className="text-gray-500">7 Days Return Guarantee</span></li>
              <li><Link to="/admin" className="hover:text-[#c59b27] transition-colors font-semibold">Admin Panel</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Special Discounts
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Subscribe to receive exclusive secret sales, seasonal discount voucher codes, and beauty tips.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c59b27]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#c59b27] hover:bg-[#7b3e1d] text-white rounded-md flex items-center justify-center transition-colors"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 font-medium">
                  🎉 Subscribed! Use code <strong className="text-white">BLOSSOM10</strong> for 10% off.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar: Payment badges & Copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Blossom Organics. All Rights Reserved. Built for high performance & Netlify deployment.</p>

          <div className="flex items-center space-x-3 text-[11px] text-gray-400">
            <span className="bg-gray-800 px-2 py-1 rounded text-white font-bold">Cash on Delivery</span>
            <span className="bg-gray-800 px-2 py-1 rounded text-white">Bank Transfer</span>
            <span className="bg-gray-800 px-2 py-1 rounded text-white">EasyPaisa / JazzCash</span>
            <span className="bg-gray-800 px-2 py-1 rounded text-white">Visa / Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

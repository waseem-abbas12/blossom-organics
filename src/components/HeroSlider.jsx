import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { 
  Star, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle,
  Award,
  Clock,
  Heart
} from 'lucide-react';

export const HeroSlider = ({ onSelectProduct }) => {
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isInWishlist } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const duoProd = products.find(p => p.id === 'prod-duo') || products[0];
  const creamProd = products.find(p => p.id === 'prod-cream') || products[1];
  const soapProd = products.find(p => p.id === 'prod-soap') || products[2];

  const slides = [
    {
      id: 'slide-duo',
      tier: 'duo',
      product: duoProd,
      badge: '🌸 THE 2-STEP COMPLETE RITUAL • BEST SELLER',
      titleHighlight: 'Reveal Your Authentic',
      titleMain: 'Glass-Skin Radiance',
      subtitle: 'Cold-processed Herbal Radiance Soap (120g) to detoxify acne bacteria + Saffron & Niacinamide Glow Cream (50g) to repair melasma and fade dark spots. 100% natural, zero mercury.',
      price: 'Rs. 1,750',
      originalPrice: 'Rs. 2,400',
      discountBadge: 'SAVE 27% + FREE DELIVERY',
      primaryBtn: 'Order Duo (Cash on Delivery)',
      secondaryBtn: 'Customize Package',
      image: duoProd?.image || 'https://cdn.shopify.com/s/files/1/0031/0296/5795/files/6-StepFacialGlowKit.png?v=1786621465',
      floatingBadge1: { text: '4.9 ★ (1,420+ Reviews)', sub: 'Across 30+ Pakistani Cities' },
      floatingBadge2: { text: 'Free Delivery', sub: 'Cash on Delivery at Doorstep' },
      accentColor: '#7b3e1d',
      bgGradient: 'from-[#fdfbf7] via-[#f7f2e9] to-[#eee4d3]'
    },
    {
      id: 'slide-cream',
      tier: 'cream',
      product: creamProd,
      badge: '✨ CONCENTRATED BOTANICAL ELIXIR • 50G JAR',
      titleHighlight: 'Target Melasma &',
      titleMain: 'Stubborn Dark Spots',
      subtitle: 'Infused with pure Kashmiri Saffron, 2% Alpha Arbutin, and Sweet Almond Oil. Reverses sun tanning, fades acne discoloration, and provides 24-hour weightless hydration without peeling.',
      price: 'Rs. 1,250',
      originalPrice: 'Rs. 1,550',
      discountBadge: 'BEST SELLER CREAM',
      primaryBtn: 'Buy Glow Cream (COD)',
      secondaryBtn: 'View Ingredients',
      image: creamProd?.image || 'https://cdn.shopify.com/s/files/1/0031/0296/5795/files/DailyGlowTrio.png?v=1786621510',
      floatingBadge1: { text: '0% Mercury / Steroids', sub: 'Safe for Daily AM/PM Use' },
      floatingBadge2: { text: 'Visible Glow in 14 Days', sub: 'Non-greasy, fast absorbing' },
      accentColor: '#c59b27',
      bgGradient: 'from-[#fffdfa] via-[#fbf5ea] to-[#f4e8d3]'
    },
    {
      id: 'slide-soap',
      tier: 'soap',
      product: soapProd,
      badge: '🌿 6-WEEK COLD-PROCESSED • 120G BAR',
      titleHighlight: 'Purify Pores &',
      titleMain: 'Calm Active Acne',
      subtitle: 'Handcrafted with fresh goat milk, wild mountain turmeric, and raw honey. Deeply eliminates pollution and balances excess surface oil without ever stripping your natural moisture barrier.',
      price: 'Rs. 650',
      originalPrice: 'Rs. 850',
      discountBadge: 'ACNE CONTROL ESSENTIAL',
      primaryBtn: 'Buy Herbal Soap (COD)',
      secondaryBtn: 'Read 21-Day Guide',
      image: soapProd?.image || 'https://cdn.shopify.com/s/files/1/0031/0296/5795/collections/1_c157e7e3-0555-4a75-8444-ef9ef9d76235.png?v=1759211143',
      floatingBadge1: { text: 'Anti-Bacterial Turmeric', sub: 'Clears blackheads & breakouts' },
      floatingBadge2: { text: 'Pure Goat Milk Base', sub: 'Creamy soothing lather' },
      accentColor: '#2d6a4f',
      bgGradient: 'from-[#fafdfb] via-[#f0f7f3] to-[#e1ede6]'
    }
  ];

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const slide = slides[currentSlide];

  const handlePrimaryClick = (slideItem) => {
    addToCart(slideItem.product, 1);
    navigate('/checkout');
  };

  const handleSecondaryClick = (slideItem) => {
    if (onSelectProduct) {
      onSelectProduct(slideItem.tier);
    }
    const target = document.getElementById('product-selector');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="relative w-full overflow-hidden transition-colors duration-700 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background with Ambient Glow */}
      <div className={`w-full bg-gradient-to-br ${slide.bgGradient} transition-all duration-700 relative`}>
        {/* Soft radial glow */}
        <div className="absolute top-10 left-1/4 w-[450px] h-[450px] bg-amber-200/35 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-rose-200/25 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-20 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-black/5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#c59b27] animate-pulse" />
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-800">
                  {slide.badge}
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-1">
                <span className="block text-2xl sm:text-4xl lg:text-5xl font-serif text-gray-700 italic font-medium">
                  {slide.titleHighlight}
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-gray-900 tracking-tight leading-[1.1]">
                  {slide.titleMain}
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {slide.subtitle}
              </p>

              {/* Pricing & Offer Pill */}
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-3 bg-white/80 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-black/5 shadow-xs">
                <div className="flex items-baseline space-x-2">
                  <span className="text-xl sm:text-2xl font-black text-[#7b3e1d]">
                    {slide.price}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-400 line-through">
                    {slide.originalPrice}
                  </span>
                </div>
                <span className="bg-[#7b3e1d] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {slide.discountBadge}
                </span>
                {slide.tier === 'duo' && (
                  <span className="text-[11px] text-emerald-700 font-bold flex items-center space-x-1">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Free Shipping</span>
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => handlePrimaryClick(slide)}
                  className="w-full sm:w-auto px-8 py-4 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Truck className="w-4 h-4 text-amber-300" />
                  <span>{slide.primaryBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleSecondaryClick(slide)}
                  className="w-full sm:w-auto px-6 py-4 bg-white/90 hover:bg-white text-gray-900 border border-gray-300/80 hover:border-gray-900 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>{slide.secondaryBtn}</span>
                </button>
              </div>

              {/* Social Proof Avatars Strip */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-gray-600">
                <div className="flex items-center space-x-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="font-bold text-gray-900 ml-1">4.9 / 5.0</span>
                </div>
                <span className="text-gray-300 hidden sm:inline">|</span>
                <span className="text-gray-600 font-medium">Over 2,500+ Organic Rituals Delivered in Pakistan</span>
              </div>
            </div>

            {/* Right Visual Showcase Column */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              {/* Product Frame Card */}
              <div className="relative w-full max-w-[420px] aspect-square rounded-3xl bg-white/90 backdrop-blur-md p-6 sm:p-8 border border-white/80 shadow-2xl flex items-center justify-center group">
                
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(slide.product)}
                  className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs shadow-md flex items-center justify-center transition-all ${
                    isInWishlist(slide.product?.id) ? 'text-rose-600' : 'text-gray-400 hover:text-black'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(slide.product?.id) ? 'fill-current text-rose-500' : ''}`} />
                </button>

                {/* Main Product Image with subtle float animation */}
                <img
                  src={slide.image}
                  alt={slide.titleMain}
                  className="max-h-[300px] sm:max-h-[340px] w-auto object-contain transform group-hover:scale-105 transition-transform duration-700 drop-shadow-xl"
                />

                {/* Floating Glassmorphic Badge 1 (Top Left) */}
                <div className="absolute -top-3 -left-3 sm:-left-6 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-gray-100 shadow-xl flex items-center space-x-2.5 animate-bounce-subtle">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-[#c59b27] flex items-center justify-center font-bold text-xs shrink-0">
                    ★
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-gray-900 block leading-tight">
                      {slide.floatingBadge1.text}
                    </span>
                    <span className="text-[10px] text-gray-500 block">
                      {slide.floatingBadge1.sub}
                    </span>
                  </div>
                </div>

                {/* Floating Glassmorphic Badge 2 (Bottom Right) */}
                <div className="absolute -bottom-3 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-gray-100 shadow-xl flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-gray-900 block leading-tight">
                      {slide.floatingBadge2.text}
                    </span>
                    <span className="text-[10px] text-gray-500 block">
                      {slide.floatingBadge2.sub}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1))}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md flex items-center justify-center transition-all z-20 cursor-pointer backdrop-blur-xs hover:scale-110"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md flex items-center justify-center transition-all z-20 cursor-pointer backdrop-blur-xs hover:scale-110"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Slide Indicator Bar & Thumbnails Switcher */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-8 relative z-20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-black/5">
            {/* Quick Switcher Tabs */}
            <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto py-1">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center space-x-2 shrink-0 cursor-pointer ${
                    currentSlide === idx
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'bg-white/70 text-gray-600 hover:bg-white hover:text-black'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#c59b27]" />
                  <span>{s.tier === 'duo' ? 'Glow Duo (Save 27%)' : (s.tier === 'cream' ? 'Glow Cream' : 'Herbal Soap')}</span>
                </button>
              ))}
            </div>

            {/* Slide Dots */}
            <div className="flex items-center space-x-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? 'w-8 bg-[#7b3e1d]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4-Pill Luxury Trust & Guarantee Bar (Golden Girl Style) */}
      <div className="bg-white border-y border-gray-200/80 py-5 sm:py-6 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="flex items-center space-x-3 p-2">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#7b3e1d] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">Cash on Delivery</h4>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Pay at doorstep across Pakistan</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">100% Organic Actives</h4>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">0% Mercury, steroids or bleach</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-2">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">Dermatologist Tested</h4>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Safe for sensitive & acne skin</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-2">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">7-Day Guarantee</h4>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Hassle-free replacement policy</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

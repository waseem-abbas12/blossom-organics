import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { HeroSlider } from '../components/HeroSlider';
import { ComparisonTable } from '../components/ComparisonTable';
import { StickyBottomBar } from '../components/StickyBottomBar';
import { ReviewMarquee } from '../components/ReviewMarquee';
import { VideoSection } from '../components/VideoSection';
import { FaqSection } from '../components/FaqSection';
import { InstagramFeed } from '../components/InstagramFeed';
import { 
  Star, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Heart,
  Droplets,
  Award
} from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isInWishlist } = useStore();

  // The 3 purchasing options
  const duoProd = products.find(p => p.id === 'prod-duo') || products[0];
  const creamProd = products.find(p => p.id === 'prod-cream') || products[1] || products[0];
  const soapProd = products.find(p => p.id === 'prod-soap') || products[2] || products[0];

  const [selectedTier, setSelectedTier] = useState('duo'); // 'duo', 'cream', 'soap'
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('soap'); // 'soap', 'cream'
  const [addedAnim, setAddedAnim] = useState(false);

  const currentProduct = selectedTier === 'duo' 
    ? duoProd 
    : (selectedTier === 'cream' ? creamProd : soapProd);

  const handleAddToCart = () => {
    addToCart(currentProduct, quantity);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1200);
  };

  const handleOrderCOD = () => {
    addToCart(currentProduct, quantity);
    navigate('/checkout');
  };

  return (
    <div className="w-full bg-white">
      {/* 1. CINEMATIC LUXURY HERO SLIDER (Golden Girl / High-Fashion Cosmetic Style) */}
      <HeroSlider onSelectProduct={(tier) => setSelectedTier(tier)} />

      {/* 2. ORDER CUSTOMIZATION STUDIO */}
      <section id="product-selector" className="py-12 sm:py-20 bg-[#fdfbf7] border-b border-gray-100 scroll-mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-[11px] uppercase tracking-[0.25em] font-extrabold text-[#7b3e1d] bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
              Customize Your Order
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 mt-2.5">
              Choose Your Organic Skincare Package
            </h2>
            <div className="w-12 h-0.5 bg-[#c59b27] mx-auto mt-3"></div>
            <p className="text-xs sm:text-sm text-gray-600 mt-2.5">
              Select <strong>The Duo Bundle</strong> for best synergistic glass-skin results with Free Delivery, or purchase individual botanical essentials.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-xl flex items-center justify-center p-6 group">
                <img
                  src={currentProduct?.image}
                  alt={currentProduct?.title}
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Tag */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                  <span className="bg-[#7b3e1d] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {selectedTier === 'duo' ? '⭐ MOST POPULAR • SAVE 27%' : '100% PURE ORGANIC'}
                  </span>
                  {selectedTier === 'duo' && (
                    <span className="bg-emerald-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                      FREE NATIONWIDE SHIPPING
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(currentProduct)}
                  className={`absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center transition-all ${
                    isInWishlist(currentProduct?.id) ? 'text-rose-600' : 'text-gray-600 hover:text-black'
                  }`}
                  aria-label="Save to wishlist"
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(currentProduct?.id) ? 'fill-current text-rose-500' : ''}`} />
                </button>
              </div>

              {/* Thumbnails to Switch Between Products */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setSelectedTier('duo')}
                  className={`p-2.5 rounded-2xl border-2 flex items-center space-x-2 text-left bg-white transition-all cursor-pointer ${
                    selectedTier === 'duo' ? 'border-[#7b3e1d] shadow-sm ring-1 ring-[#7b3e1d]' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={duoProd?.image} alt="Duo" className="w-10 h-10 object-contain" />
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-gray-900 block truncate">Glow Duo</span>
                    <span className="text-[10px] text-[#7b3e1d] font-bold">Rs. 1,750</span>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedTier('cream')}
                  className={`p-2.5 rounded-2xl border-2 flex items-center space-x-2 text-left bg-white transition-all cursor-pointer ${
                    selectedTier === 'cream' ? 'border-[#7b3e1d] shadow-sm ring-1 ring-[#7b3e1d]' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={creamProd?.image} alt="Cream" className="w-10 h-10 object-contain" />
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-gray-900 block truncate">Glow Cream</span>
                    <span className="text-[10px] text-gray-800 font-bold">Rs. 1,250</span>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedTier('soap')}
                  className={`p-2.5 rounded-2xl border-2 flex items-center space-x-2 text-left bg-white transition-all cursor-pointer ${
                    selectedTier === 'soap' ? 'border-[#7b3e1d] shadow-sm ring-1 ring-[#7b3e1d]' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={soapProd?.image} alt="Soap" className="w-10 h-10 object-contain" />
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-gray-900 block truncate">Herbal Soap</span>
                    <span className="text-[10px] text-gray-800 font-bold">Rs. 650</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Buy-Box & Conversion Form */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                {/* Active selection header */}
                <div className="flex items-center space-x-2 text-xs font-semibold mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#c59b27] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    {currentProduct?.concern || "Pure Organic Care"}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-600 text-xs font-medium">{currentProduct?.size}</span>
                </div>

                <h3 className="text-xl sm:text-3xl font-serif font-bold text-gray-900 leading-tight">
                  {currentProduct?.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  {currentProduct?.description}
                </p>
              </div>

              {/* 3-Tier Interactive Bundle Box */}
              <div className="space-y-2.5 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                  Select Your Package:
                </span>

                {/* Tier 1: The Duo Bundle */}
                <label 
                  onClick={() => setSelectedTier('duo')}
                  className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedTier === 'duo' 
                      ? 'border-[#7b3e1d] bg-white shadow-md' 
                      : 'border-gray-200 bg-white/70 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="tier"
                      checked={selectedTier === 'duo'}
                      onChange={() => setSelectedTier('duo')}
                      className="accent-[#7b3e1d] w-4 h-4"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <strong className="text-xs sm:text-sm text-gray-900 font-bold">
                          The Complete Glow Duo (Soap + Cream)
                        </strong>
                        <span className="bg-[#7b3e1d] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                          Save 27%
                        </span>
                      </div>
                      <span className="text-[11px] text-emerald-700 font-medium block mt-0.5">
                        Includes Free Delivery Nationwide (Best Results)
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 pl-2">
                    <span className="text-sm sm:text-base font-extrabold text-[#7b3e1d] block">
                      Rs. 1,750
                    </span>
                    <span className="text-[11px] text-gray-400 line-through">
                      Rs. 2,400
                    </span>
                  </div>
                </label>

                {/* Tier 2: Cream Solo */}
                <label 
                  onClick={() => setSelectedTier('cream')}
                  className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedTier === 'cream' 
                      ? 'border-[#7b3e1d] bg-white shadow-md' 
                      : 'border-gray-200 bg-white/70 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="tier"
                      checked={selectedTier === 'cream'}
                      onChange={() => setSelectedTier('cream')}
                      className="accent-[#7b3e1d] w-4 h-4"
                    />
                    <div>
                      <strong className="text-xs sm:text-sm text-gray-900 font-bold block">
                        Organic Glow Nourishing Cream (50g)
                      </strong>
                      <span className="text-[11px] text-gray-500">
                        Targets dark spots, melasma & deep hydration
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 pl-2">
                    <span className="text-sm sm:text-base font-bold text-gray-900 block">
                      Rs. 1,250
                    </span>
                    <span className="text-[11px] text-gray-400 line-through">
                      Rs. 1,550
                    </span>
                  </div>
                </label>

                {/* Tier 3: Soap Solo */}
                <label 
                  onClick={() => setSelectedTier('soap')}
                  className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedTier === 'soap' 
                      ? 'border-[#7b3e1d] bg-white shadow-md' 
                      : 'border-gray-200 bg-white/70 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="tier"
                      checked={selectedTier === 'soap'}
                      onChange={() => setSelectedTier('soap')}
                      className="accent-[#7b3e1d] w-4 h-4"
                    />
                    <div>
                      <strong className="text-xs sm:text-sm text-gray-900 font-bold block">
                        Organic Herbal Radiance Soap (120g)
                      </strong>
                      <span className="text-[11px] text-gray-500">
                        Deep pore detox, acne control & fresh foaming cleanse
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 pl-2">
                    <span className="text-sm sm:text-base font-bold text-gray-900 block">
                      Rs. 650
                    </span>
                    <span className="text-[11px] text-gray-400 line-through">
                      Rs. 850
                    </span>
                  </div>
                </label>
              </div>

              {/* Quantity Stepper & Buy Buttons */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-gray-300 rounded-full bg-white overflow-hidden shadow-xs">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-bold text-gray-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">Quantity</span>
                </div>

                {/* Primary Cash on Delivery Button */}
                <button
                  onClick={handleOrderCOD}
                  className="w-full py-4 px-6 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                >
                  <Truck className="w-4 h-4 text-amber-300" />
                  <span>Order Now with Cash on Delivery (Rs. {((currentProduct?.price || 1750) * quantity).toLocaleString()})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Add to Cart Secondary Button */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3 px-6 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all flex items-center justify-center space-x-2 ${
                    addedAnim ? 'bg-emerald-600 text-white border-emerald-600' : ''
                  }`}
                >
                  {addedAnim ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Shopping Bag</span>
                    </>
                  )}
                </button>
              </div>

              {/* Guarantees Box */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-gray-600 font-medium">
                <span className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>0% Mercury & Zero Steroids</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Truck className="w-4 h-4 text-[#c59b27] flex-shrink-0" />
                  <span>Cash on Delivery (Pakistan)</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-[#7b3e1d] flex-shrink-0" />
                  <span>Dermatologist Approved</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>7-Day Replacement Policy</span>
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE 2-STEP SYNERGY ("WHY IT WORKS") */}
      <section id="synergy" className="py-12 sm:py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#7b3e1d]">
              The Synergy Science
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-1">
              How the 2-Step Routine Transforms Your Skin
            </h2>
            <div className="w-12 h-0.5 bg-[#c59b27] mx-auto mt-2.5"></div>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Why use both together? A cream cannot penetrate clogged pores, and a soap cannot lock in hydration. They are designed to work as one powerful organic system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Step 1: Soap */}
            <div className="p-8 rounded-3xl bg-[#fbf9f5] border border-gray-200/80 relative space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-[#7b3e1d] text-white text-[10px] font-extrabold uppercase tracking-widest">
                  Step 1 • Morning & Night
                </span>
                <Droplets className="w-5 h-5 text-[#7b3e1d]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900">
                Purify & Detox with Herbal Soap
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Cold-processed with pure goat milk, wild turmeric, and raw honey. Deeply cleanses stubborn pollution, clears active acne bacteria, balances sebum production, and opens channels for deep cream absorption.
              </p>
              <ul className="space-y-2 text-xs text-gray-700 font-medium pt-2">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Clears blackheads & excess surface oil</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Soothes active acne and redness naturally</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Never strips or dries out sensitive skin</span>
                </li>
              </ul>
            </div>

            {/* Step 2: Cream */}
            <div className="p-8 rounded-3xl bg-[#fbf9f5] border border-gray-200/80 relative space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-[#c59b27] text-white text-[10px] font-extrabold uppercase tracking-widest">
                  Step 2 • Morning & Night
                </span>
                <Sparkles className="w-5 h-5 text-[#c59b27]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900">
                Repair & Illuminate with Glow Cream
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Infused with Kashmiri saffron, 2% alpha arbutin, niacinamide, and sweet almond oil. Deeply repairs damaged epidermal layers, suppresses melanin overproduction, fades dark marks, and leaves an authentic glass skin glow.
              </p>
              <ul className="space-y-2 text-xs text-gray-700 font-medium pt-2">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Fades stubborn acne scars & melasma</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Provides 24-hour weightless hydration</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Zero mercury, zero peeling, 100% safe</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT DEEP DIVE TABS (SOAP VS CREAM) */}
      <section id="products-deepdive" className="py-12 sm:py-20 bg-[#fbf9f5] border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#7b3e1d]">
              Botanical Ingredients & Specs
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-1">
              Deep Dive: What’s Inside?
            </h2>
            <div className="w-12 h-0.5 bg-[#c59b27] mx-auto mt-2.5"></div>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-8">
            <div className="bg-white p-1.5 rounded-full border border-gray-200 shadow-xs inline-flex">
              <button
                onClick={() => setActiveTab('soap')}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === 'soap'
                    ? 'bg-[#1a1a1a] text-white shadow-xs'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                The Herbal Soap (120g)
              </button>
              <button
                onClick={() => setActiveTab('cream')}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === 'cream'
                    ? 'bg-[#1a1a1a] text-white shadow-xs'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                The Glow Cream (50g)
              </button>
            </div>
          </div>

          {/* Tab 1: The Soap */}
          {activeTab === 'soap' && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/70 shadow-sm animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="aspect-square rounded-2xl bg-gray-50 p-6 flex items-center justify-center">
                <img src={soapProd?.image} alt={soapProd?.title} className="max-h-72 object-contain" />
              </div>
              <div className="space-y-4 text-xs sm:text-sm text-gray-600">
                <span className="text-xs font-bold text-[#7b3e1d] uppercase tracking-wider">
                  Handcrafted Cold-Processed Bar
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
                  Blossom Organic Herbal Radiance Soap
                </h3>
                <p className="leading-relaxed">
                  {soapProd?.description}
                </p>
                <div>
                  <strong className="text-gray-900 block font-semibold mb-1">Key Botanical Actives:</strong>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    {soapProd?.ingredients}
                  </p>
                </div>
                <div>
                  <strong className="text-gray-900 block font-semibold mb-1">How to Use:</strong>
                  <p>{soapProd?.howToUse}</p>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">Rs. {soapProd?.price?.toLocaleString()}</span>
                  <button
                    onClick={() => { addToCart(soapProd, 1); navigate('/checkout'); }}
                    className="px-5 py-2.5 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors"
                  >
                    Buy Soap Only (COD)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: The Cream */}
          {activeTab === 'cream' && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/70 shadow-sm animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="aspect-square rounded-2xl bg-gray-50 p-6 flex items-center justify-center">
                <img src={creamProd?.image} alt={creamProd?.title} className="max-h-72 object-contain" />
              </div>
              <div className="space-y-4 text-xs sm:text-sm text-gray-600">
                <span className="text-xs font-bold text-[#c59b27] uppercase tracking-wider">
                  Concentrated Botanical Elixir
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
                  Blossom Organic Glow Nourishing Beauty Cream
                </h3>
                <p className="leading-relaxed">
                  {creamProd?.description}
                </p>
                <div>
                  <strong className="text-gray-900 block font-semibold mb-1">Key Botanical Actives:</strong>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    {creamProd?.ingredients}
                  </p>
                </div>
                <div>
                  <strong className="text-gray-900 block font-semibold mb-1">How to Use:</strong>
                  <p>{creamProd?.howToUse}</p>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">Rs. {creamProd?.price?.toLocaleString()}</span>
                  <button
                    onClick={() => { addToCart(creamProd, 1); navigate('/checkout'); }}
                    className="px-5 py-2.5 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors"
                  >
                    Buy Cream Only (COD)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. RESULTS TIMELINE SECTION */}
      <section id="results" className="py-12 sm:py-20 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#7b3e1d]">
              Visible Transformation
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-1">
              Your 21-Day Organic Journey
            </h2>
            <div className="w-12 h-0.5 bg-[#c59b27] mx-auto mt-2.5"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#fbf9f5] border border-gray-100 space-y-3">
              <span className="w-10 h-10 rounded-full bg-[#7b3e1d] text-white flex items-center justify-center font-bold text-xs">
                1-3
              </span>
              <h4 className="text-base font-bold text-gray-900">Days 1 to 3: The Detox</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Herbal soap washes away stubborn surface sebum and pollutant buildup. Your skin feels noticeably fresher, cleaner, and stops producing greasy sheen throughout the day.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#fbf9f5] border border-gray-100 space-y-3">
              <span className="w-10 h-10 rounded-full bg-[#c59b27] text-white flex items-center justify-center font-bold text-xs">
                7-14
              </span>
              <h4 className="text-base font-bold text-gray-900">Days 7 to 14: Cellular Repair</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Niacinamide and alpha arbutin in the cream start breaking down clusters of dark spots and acne discoloration. Skin barrier regains its soft, silky texture with zero irritation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#fbf9f5] border border-gray-100 space-y-3">
              <span className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                21+
              </span>
              <h4 className="text-base font-bold text-gray-900">Days 21+: Glass-Skin Radiance</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Even complexion, luminous clarity, and healthy natural glow. You can comfortably step out without heavy foundation or concealer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMPARISON TABLE */}
      <ComparisonTable />

      {/* 6. CALLOUT BANNER FOR DUO (HIGH CONVERSION) */}
      <section className="py-14 sm:py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c59b27] bg-[#c59b27]/20 px-3 py-1 rounded-full border border-[#c59b27]/30">
            Limited Time Offer
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold leading-tight">
            Order The Ultimate Glow Duo Today
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto">
            Get the full Organic Herbal Soap (120g) + Glow Cream (50g) at a special discounted price of <strong>Rs. 1,750</strong> with <strong>FREE Cash on Delivery</strong> all across Pakistan.
          </p>
          <div className="pt-4">
            <button
              onClick={() => { addToCart(duoProd, 1); navigate('/checkout'); }}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-[#c59b27] hover:bg-[#7b3e1d] text-white font-bold text-xs sm:text-sm uppercase tracking-widest rounded-full transition-all shadow-xl transform hover:scale-105"
            >
              <Truck className="w-4 h-4" />
              <span>Claim Duo Bundle with Free Shipping</span>
            </button>
          </div>
        </div>
      </section>

      {/* 7. SHOPPABLE VIDEO REELS & APPLICATION DEMOS */}
      <div id="videos">
        <VideoSection />
      </div>

      {/* 8. CUSTOMER REVIEWS CONTINUOUS MARQUEE SLIDER */}
      <div id="reviews">
        <ReviewMarquee />
      </div>

      {/* 8. FAQ ACCORDION */}
      <div id="faq">
        <FaqSection />
      </div>

      {/* 9. INSTAGRAM PROOF */}
      <InstagramFeed />

      {/* 10. STICKY BOTTOM CONVERSION BAR FOR MOBILE */}
      <StickyBottomBar />
    </div>
  );
};

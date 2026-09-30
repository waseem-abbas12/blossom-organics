import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  const inWish = isInWishlist(product.id);
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1200);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div 
      className="group relative bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={(isHovered && product.secondaryImage) ? product.secondaryImage : product.image}
            alt={product.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {discountPercent > 0 && (
            <span className="bg-[#d94826] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-sm uppercase tracking-wider shadow-xs">
              -{discountPercent}%
            </span>
          )}
          {product.badge && product.badge !== "SALE" && (
            <span className="bg-[#1a1a1a] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider shadow-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Action Overlays (Wishlist + Quick View) */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            onClick={handleWishlist}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
              inWish 
                ? 'bg-rose-50 text-rose-600' 
                : 'bg-white/90 text-gray-600 hover:bg-white hover:text-black'
            }`}
            title={inWish ? "Remove from wishlist" : "Add to wishlist"}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${inWish ? 'fill-current text-rose-500' : ''}`} />
          </button>

          <button
            onClick={handleQuickView}
            className="w-8 h-8 rounded-full bg-white/90 text-gray-600 hover:bg-white hover:text-black flex items-center justify-center transition-all duration-200 shadow-sm opacity-0 group-hover:opacity-100"
            title="Quick View"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Add Overlay on Hover (Desktop) */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md ${
              addedAnim
                ? 'bg-emerald-600 text-white'
                : 'bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white'
            }`}
          >
            {addedAnim ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category / Concern tag */}
          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
            <span className="font-medium">{product.category}</span>
            {product.size && <span className="text-[10px] text-gray-400">{product.size}</span>}
          </div>

          {/* Title */}
          <Link 
            to={`/product/${product.id}`}
            className="block text-xs sm:text-sm font-medium text-gray-900 hover:text-[#7b3e1d] transition-colors line-clamp-2 leading-snug"
          >
            {product.title}
          </Link>

          {/* Rating */}
          <div className="flex items-center space-x-1.5 mt-2">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3 h-3 ${i < Math.floor(product.rating || 5) ? 'fill-current' : 'text-gray-200'}`} 
                />
              ))}
            </div>
            <span className="text-[11px] text-gray-500 font-medium">
              ({product.reviewCount || 24})
            </span>
          </div>
        </div>

        {/* Price & Mobile Add button */}
        <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-sm sm:text-base font-bold text-[#1a1a1a]">
              Rs. {product.price.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Mobile direct Add button */}
          <button
            onClick={handleQuickAdd}
            className="sm:hidden p-2 rounded-full bg-gray-100 hover:bg-[#7b3e1d] text-gray-800 hover:text-white transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

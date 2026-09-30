import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Star, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuickViewProduct(null);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh] animate-fade-in">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-black flex items-center justify-center shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-6 relative">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-72 md:max-h-96 object-contain rounded-xl"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-[#7b3e1d] text-white text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-semibold text-[#c59b27] uppercase tracking-wider">
              {product.category}
            </span>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-gray-900 leading-snug">
              {product.title}
            </h2>

            {/* Stars */}
            <div className="flex items-center space-x-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.rating || 5) ? 'fill-current' : 'text-gray-200'}`} 
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 font-medium">
                {product.rating} ({product.reviewCount || 30} verified reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3 pt-1">
              <span className="text-2xl font-bold text-[#1a1a1a]">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Short description */}
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
              {product.description}
            </p>

            {/* Stock status */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-emerald-700 font-semibold">In Stock & Ready for Dispatch</span>
            </div>

            {/* Quantity Stepper */}
            <div className="pt-2 flex items-center space-x-4">
              <span className="text-xs font-semibold text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-bold text-gray-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-6 space-y-3">
            <button
              onClick={handleAdd}
              className={`w-full py-3 px-6 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md transition-all ${
                added 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart (Rs. {(product.price * quantity).toLocaleString()})</span>
                </>
              )}
            </button>

            <Link
              to={`/product/${product.id}`}
              onClick={() => setQuickViewProduct(null)}
              className="block text-center text-xs text-gray-500 hover:text-[#7b3e1d] underline"
            >
              View Complete Product Details & Ingredients &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

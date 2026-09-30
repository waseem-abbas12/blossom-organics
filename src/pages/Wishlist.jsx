import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';

export const Wishlist = () => {
  const { wishlist } = useStore();

  return (
    <div className="w-full bg-[#fbf9f5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
            My Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {wishlist.length} saved botanical cosmetics
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xs max-w-md mx-auto space-y-4">
            <p className="text-sm font-bold text-gray-800">Your wishlist is currently empty</p>
            <p className="text-xs text-gray-500">
              Click the heart icon on any product to save it here for later.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

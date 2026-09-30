import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Filter, SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';

export const Shop = () => {
  const { products, categories, concerns } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get('category') || 'All';
  const activeConcern = searchParams.get('concern') || 'All';
  const maxPriceParam = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 4000;

  const [priceLimit, setPriceLimit] = useState(maxPriceParam);
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (activeCategory !== 'All' && activeCategory !== 'Shop All') {
        if (!p.category.toLowerCase().includes(activeCategory.toLowerCase())) {
          return false;
        }
      }
      // Concern filter
      if (activeConcern !== 'All') {
        if (!p.concern || !p.concern.toLowerCase().includes(activeConcern.toLowerCase())) {
          return false;
        }
      }
      // Price limit
      if (p.price > priceLimit) {
        return false;
      }
      // In-stock toggle
      if (inStockOnly && !p.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'best-seller') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      return 0; // featured default
    });
  }, [products, activeCategory, activeConcern, priceLimit, inStockOnly, sortBy]);

  const handleCategorySelect = (catName) => {
    const params = new URLSearchParams(searchParams);
    if (catName === 'All' || catName === 'Shop All') {
      params.delete('category');
    } else {
      params.set('category', catName);
    }
    setSearchParams(params);
  };

  const handleConcernSelect = (concernName) => {
    const params = new URLSearchParams(searchParams);
    if (concernName === 'All') {
      params.delete('concern');
    } else {
      params.set('concern', concernName);
    }
    setSearchParams(params);
  };

  const clearAllFilters = () => {
    setSearchParams({});
    setPriceLimit(4000);
    setInStockOnly(false);
    setSortBy('featured');
  };

  return (
    <div className="w-full bg-[#fbf9f5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#7b3e1d]">
            Organic Cosmetic Catalog
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#1a1a1a] mt-1">
            {activeCategory !== 'All' ? activeCategory : (activeConcern !== 'All' ? activeConcern : 'All Beauty Products')}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Showing {filteredProducts.length} premium botanical cosmetic formulas
          </p>
        </div>

        {/* Top Control Bar (Mobile filter toggle + Sorting) */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>

            {/* Active filters pill */}
            {(activeCategory !== 'All' || activeConcern !== 'All' || priceLimit < 4000 || inStockOnly) && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-rose-600 hover:underline font-semibold flex items-center space-x-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <span className="text-xs text-gray-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#7b3e1d]"
            >
              <option value="featured">Featured</option>
              <option value="best-seller">Best Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Layout: Sidebar + Product Grid */}
        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0 space-y-6">
            {/* Categories */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                Categories
              </h3>
              <ul className="space-y-1.5 text-xs text-gray-600">
                <li>
                  <button
                    onClick={() => handleCategorySelect('All')}
                    className={`w-full text-left py-1 hover:text-[#7b3e1d] font-medium ${
                      activeCategory === 'All' ? 'text-[#7b3e1d] font-bold' : ''
                    }`}
                  >
                    All Categories
                  </button>
                </li>
                {categories.filter(c => c.id !== 'all').map(cat => (
                  <li key={cat.id}>
                    <button
                      onClick={() => handleCategorySelect(cat.name)}
                      className={`w-full text-left py-1 hover:text-[#7b3e1d] transition-colors ${
                        activeCategory.toLowerCase() === cat.name.toLowerCase() ? 'text-[#7b3e1d] font-bold' : ''
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Concerns */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                Shop by Concern
              </h3>
              <ul className="space-y-1.5 text-xs text-gray-600">
                <li>
                  <button
                    onClick={() => handleConcernSelect('All')}
                    className={`w-full text-left py-1 hover:text-[#7b3e1d] font-medium ${
                      activeConcern === 'All' ? 'text-[#7b3e1d] font-bold' : ''
                    }`}
                  >
                    All Concerns
                  </button>
                </li>
                {concerns.map(con => (
                  <li key={con.id}>
                    <button
                      onClick={() => handleConcernSelect(con.name)}
                      className={`w-full text-left py-1 hover:text-[#7b3e1d] transition-colors ${
                        activeConcern.toLowerCase() === con.name.toLowerCase() ? 'text-[#7b3e1d] font-bold' : ''
                      }`}
                    >
                      {con.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter Slider */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                Max Price: Rs. {priceLimit.toLocaleString()}
              </h3>
              <input
                type="range"
                min="300"
                max="4000"
                step="50"
                value={priceLimit}
                onChange={(e) => setPriceLimit(Number(e.target.value))}
                className="w-full accent-[#7b3e1d] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>Rs. 300</span>
                <span>Rs. 4,000+</span>
              </div>
            </div>

            {/* In Stock toggle */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-800">In Stock Only</span>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 accent-[#7b3e1d] rounded"
              />
            </div>
          </aside>

          {/* Main Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <p className="text-sm font-bold text-gray-800">No cosmetics match your selected filters</p>
                <p className="text-xs text-gray-500 mt-1">Try resetting your price range or choosing a different category.</p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 px-5 py-2 bg-[#1a1a1a] text-white text-xs font-bold rounded-full hover:bg-[#7b3e1d] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs" 
            onClick={() => setMobileFilterOpen(false)} 
          />
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 p-5 overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h3 className="font-bold text-base text-gray-900">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 text-xs">
              <div>
                <h4 className="font-bold text-gray-800 mb-2 uppercase">Categories</h4>
                <div className="space-y-1.5">
                  <button
                    onClick={() => { handleCategorySelect('All'); setMobileFilterOpen(false); }}
                    className="block py-1 text-left w-full text-gray-700"
                  >
                    All Categories
                  </button>
                  {categories.filter(c => c.id !== 'all').map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => { handleCategorySelect(cat.name); setMobileFilterOpen(false); }}
                      className="block py-1 text-left w-full text-gray-700"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-2 uppercase">Concerns</h4>
                <div className="space-y-1.5">
                  {concerns.map(con => (
                    <button
                      key={con.id}
                      onClick={() => { handleConcernSelect(con.name); setMobileFilterOpen(false); }}
                      className="block py-1 text-left w-full text-gray-700"
                    >
                      {con.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-2 uppercase">Max Price: Rs. {priceLimit}</h4>
                <input
                  type="range"
                  min="300"
                  max="4000"
                  step="50"
                  value={priceLimit}
                  onChange={(e) => setPriceLimit(Number(e.target.value))}
                  className="w-full accent-[#7b3e1d]"
                />
              </div>

              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-2.5 bg-[#1a1a1a] text-white font-bold rounded-lg uppercase"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

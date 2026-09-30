import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Share2, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  Check, 
  ChevronRight 
} from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isInWishlist } = useStore();

  const product = products.find(p => p.id === id) || products[0];

  const [activeImage, setActiveImage] = useState(product?.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedAnim, setAddedAnim] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      window.scrollTo(0, 0);
    }
  }, [product, id]);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold">Product not found</h2>
        <Link to="/shop" className="text-[#7b3e1d] underline mt-2 inline-block">
          Return to Shop
        </Link>
      </div>
    );
  }

  const inWish = isInWishlist(product.id);
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1200);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  // Related products
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="w-full bg-[#fbf9f5] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-black">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/shop" className="hover:text-black">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-black">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium truncate max-w-xs">{product.title}</span>
        </nav>

        {/* Product Details Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xs mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Gallery Column */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
                <img
                  src={activeImage}
                  alt={product.title}
                  className="w-full h-full object-contain p-4"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-[#7b3e1d] text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.secondaryImage && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => setActiveImage(product.image)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 bg-gray-50 ${
                      activeImage === product.image ? 'border-[#7b3e1d]' : 'border-gray-200 opacity-70'
                    }`}
                  >
                    <img src={product.image} alt="Thumb 1" className="w-full h-full object-cover" />
                  </button>
                  <button
                    onClick={() => setActiveImage(product.secondaryImage)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 bg-gray-50 ${
                      activeImage === product.secondaryImage ? 'border-[#7b3e1d]' : 'border-gray-200 opacity-70'
                    }`}
                  >
                    <img src={product.secondaryImage} alt="Thumb 2" className="w-full h-full object-cover" />
                  </button>
                </div>
              )}
            </div>

            {/* Product Meta Column */}
            <div className="space-y-5">
              <div>
                <span className="text-xs font-bold text-[#c59b27] uppercase tracking-widest">
                  {product.category} {product.concern ? `• ${product.concern}` : ''}
                </span>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-1 leading-snug">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center space-x-2 mt-2.5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 font-semibold">
                    {product.rating} ({product.reviewCount || 42} Customer Reviews)
                  </span>
                </div>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline space-x-3 py-3 border-y border-gray-100">
                <span className="text-3xl font-extrabold text-[#1a1a1a]">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      Rs. {product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-[#d94826] bg-[#d94826]/10 px-2 py-0.5 rounded">
                      SAVE {discountPercent}%
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-semibold text-emerald-800">
                  In Stock — Ready to ship via Cash on Delivery across Pakistan
                </span>
              </div>

              {product.size && (
                <div className="text-xs text-gray-600">
                  <span className="font-semibold text-gray-800">Size / Pack: </span>
                  <span className="bg-gray-100 px-2.5 py-1 rounded font-medium ml-1">{product.size}</span>
                </div>
              )}

              {/* Quantity Stepper & Actions */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-full bg-gray-50 overflow-hidden">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="px-4 py-2.5 text-sm font-bold text-gray-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 rounded-full border border-gray-200 hover:border-black transition-colors ${
                      inWish ? 'bg-rose-50 text-rose-600 border-rose-300' : 'text-gray-600'
                    }`}
                    title={inWish ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart className={`w-5 h-5 ${inWish ? 'fill-current text-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Main Purchase Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className={`py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md transition-all ${
                      addedAnim
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white'
                    }`}
                  >
                    {addedAnim ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider bg-[#c59b27] hover:bg-[#7b3e1d] text-white shadow-md transition-all text-center"
                  >
                    Buy It Now
                  </button>
                </div>
              </div>

              {/* Delivery info box */}
              <div className="bg-[#fbf9f5] rounded-2xl p-4 border border-gray-100 space-y-2 text-xs text-gray-600 mt-4">
                <div className="flex items-center space-x-2 text-gray-800 font-semibold">
                  <Truck className="w-4 h-4 text-[#7b3e1d]" />
                  <span>Free nationwide delivery on orders over Rs. 2,500</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#c59b27]" />
                  <span>100% Genuine, freshly prepared botanical batch guaranteed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4 text-emerald-600" />
                  <span>7 Days easy return and exchange policy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs (Description, How to Use, Ingredients, Reviews) */}
          <div className="mt-14 pt-8 border-t border-gray-100">
            {/* Tab Nav */}
            <div className="flex flex-wrap border-b border-gray-200 gap-6">
              {[
                { id: 'description', label: 'Description & Benefits' },
                { id: 'howtouse', label: 'How to Use' },
                { id: 'ingredients', label: 'Ingredients' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'border-[#7b3e1d] text-[#7b3e1d]'
                      : 'border-transparent text-gray-400 hover:text-black'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="py-6 text-xs sm:text-sm text-gray-600 leading-relaxed max-w-4xl">
              {activeTab === 'description' && (
                <div className="space-y-3">
                  <p>{product.description}</p>
                  <p className="text-gray-500">
                    Specifically suited for diverse Pakistani climates, maintaining moisture and skin barrier integrity without any greasy aftermath.
                  </p>
                </div>
              )}

              {activeTab === 'howtouse' && (
                <div className="space-y-3">
                  <p className="font-semibold text-gray-900">Recommended Ritual Steps:</p>
                  <p>{product.howToUse}</p>
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div className="space-y-3">
                  <p className="font-semibold text-gray-900">Key Active Extracts:</p>
                  <p>{product.ingredients}</p>
                  <p className="text-emerald-700 text-xs font-semibold">
                    Free from: Parabens, Mineral Oils, Sulfates, Bleaching Mercurial Salts.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-6 text-center">
              You May Also Love
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map(rel => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

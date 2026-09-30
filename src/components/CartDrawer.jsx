import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, ShieldCheck, Truck } from 'lucide-react';

export const CartDrawer = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    cartSubtotal, 
    cartItemCount, 
    isFreeShipping, 
    amountNeededForFreeShipping, 
    freeShippingProgress,
    settings 
  } = useStore();

  const [orderNote, setOrderNote] = useState("");

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-fade-in">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#7b3e1d]" />
              <h2 className="text-base font-bold text-gray-900">
                Your Shopping Cart ({cartItemCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-gray-400 hover:text-black rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Goal Bar */}
          <div className="bg-[#fbf9f5] border-b border-gray-100 p-3.5 px-5">
            <div className="flex items-center justify-between text-xs mb-1.5">
              {isFreeShipping ? (
                <span className="font-bold text-emerald-700 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Congratulations! You qualify for FREE Delivery!</span>
                </span>
              ) : (
                <span className="text-gray-700">
                  Add <strong className="text-[#7b3e1d]">Rs. {amountNeededForFreeShipping.toLocaleString()}</strong> more to get <strong>FREE SHIPPING!</strong>
                </span>
              )}
              <span className="font-bold text-gray-500">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 rounded-full ${
                  isFreeShipping ? 'bg-emerald-500' : 'bg-[#c59b27]'
                }`}
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-gray-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-800">Your cart is empty</h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-xs">
                    Explore our botanical skin care, facial glow kits, and hair restoration therapies!
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="py-4 first:pt-0 last:pb-0 flex space-x-3.5">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-100 bg-gray-50 flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link 
                          to={`/product/${item.product.id}`}
                          onClick={() => setIsCartOpen(false)}
                          className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-[#7b3e1d] line-clamp-2"
                        >
                          {item.product.title}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-rose-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-gray-500">
                        {item.size || item.product.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-gray-200 rounded-md bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs sm:text-sm font-bold text-[#1a1a1a]">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer Checkout Actions */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-gray-200 bg-white space-y-3.5">
              {/* Special instructions accordion/input */}
              <div>
                <input
                  type="text"
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="Special instructions or delivery note..."
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#7b3e1d]"
                />
              </div>

              {/* Subtotal & Delivery Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-gray-900">Rs. {cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Delivery:</span>
                  <span>
                    {isFreeShipping ? (
                      <strong className="text-emerald-600">FREE</strong>
                    ) : (
                      `Rs. ${settings.standardShippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-bold text-[#1a1a1a] pt-1.5 border-t border-gray-100">
                  <span>Estimated Total:</span>
                  <span className="text-[#7b3e1d]">
                    Rs. {(cartSubtotal + (isFreeShipping ? 0 : settings.standardShippingFee)).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center space-x-4 text-[10px] text-gray-400 font-medium">
                <span className="flex items-center space-x-1">
                  <Truck className="w-3 h-3 text-emerald-600" />
                  <span>Cash on Delivery</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-[#c59b27]" />
                  <span>100% Authentic Guarantee</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

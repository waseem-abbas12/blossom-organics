import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Truck, ArrowLeft, CheckCircle, Tag } from 'lucide-react';

const PAKISTAN_CITIES = [
  "Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", 
  "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala", 
  "Hyderabad", "Bahawalpur", "Sargodha", "Abbottabad", "Sukkur",
  "Gujrat", "Jhelum", "Mardan", "Sheikhupura", "Rahim Yar Khan"
];

export const Checkout = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    cartSubtotal, 
    isFreeShipping, 
    shippingFee, 
    cartTotal, 
    placeOrder, 
    settings 
  } = useStore();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "Lahore",
    province: "Punjab",
    postalCode: "",
    paymentMethod: "Cash on Delivery",
    notes: ""
  });

  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-800">Your Cart is Empty</h2>
        <p className="text-xs text-gray-500 mt-2">
          Please add cosmetic products to your cart before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-block px-6 py-2.5 bg-[#1a1a1a] text-white text-xs font-bold rounded-full uppercase"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "BLOSSOM10") {
      const disc = Math.round(cartSubtotal * 0.1);
      setDiscountAmount(disc);
      setCouponSuccess("10% discount coupon applied successfully!");
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code. Try BLOSSOM10");
      setCouponSuccess("");
    }
  };

  const finalTotal = Math.max(0, cartTotal - discountAmount);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const order = placeOrder({
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode,
        paymentMethod: formData.paymentMethod,
        discount: discountAmount,
        notes: formData.notes
      });
      navigate(`/order-success/${order.id}`);
    }, 600);
  };

  return (
    <div className="w-full bg-[#fbf9f5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="mb-6">
          <Link to="/shop" className="inline-flex items-center space-x-1.5 text-xs text-gray-500 hover:text-black">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-2">
            Secure Delivery & Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Customer Address Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-xs">
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Ayesha Khan"
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b3e1d]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Mobile / WhatsApp Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 0300 1234567"
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b3e1d]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ayesha@example.com"
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b3e1d]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
                  2. Shipping Address in Pakistan
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Street Address, House #, Colony *</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="House # 12, Street 4, Sector G-11"
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b3e1d]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">City *</label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b3e1d] bg-white font-medium"
                      >
                        {PAKISTAN_CITIES.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">Province</label>
                      <select
                        value={formData.province}
                        onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b3e1d] bg-white"
                      >
                        <option value="Punjab">Punjab</option>
                        <option value="Sindh">Sindh</option>
                        <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                        <option value="Balochistan">Balochistan</option>
                        <option value="Islamabad Capital">Islamabad Capital</option>
                        <option value="Azad Kashmir">Azad Kashmir</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Order Notes (Optional)</label>
                    <input
                      type="text"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Call before delivery, landmark near my home..."
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b3e1d]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
                  3. Payment Method
                </h3>
                <div className="space-y-3">
                  <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === 'Cash on Delivery' 
                      ? 'border-[#7b3e1d] bg-[#fbf9f5]' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Cash on Delivery"
                        checked={formData.paymentMethod === 'Cash on Delivery'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="accent-[#7b3e1d]"
                      />
                      <div>
                        <span className="font-bold text-gray-900 block text-xs sm:text-sm">
                          Cash on Delivery (COD) - Recommended
                        </span>
                        <span className="text-[11px] text-gray-500">
                          Pay in cash when rider delivers the parcel to your doorstep.
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      NO ADVANCE
                    </span>
                  </label>

                  <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === 'Bank Transfer' 
                      ? 'border-[#7b3e1d] bg-[#fbf9f5]' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Bank Transfer"
                        checked={formData.paymentMethod === 'Bank Transfer'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="accent-[#7b3e1d]"
                      />
                      <div>
                        <span className="font-bold text-gray-900 block text-xs sm:text-sm">
                          Direct Bank Transfer / EasyPaisa / JazzCash
                        </span>
                        <span className="text-[11px] text-gray-500">
                          Bank details will be shared on WhatsApp after placing order.
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {loading ? "Processing Order..." : `Place Order (Rs. ${finalTotal.toLocaleString()})`}
              </button>
            </form>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider pb-3 border-b border-gray-100">
                Order Summary ({cart.length} items)
              </h3>

              {/* Items */}
              <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.product.id} className="py-3 flex items-center space-x-3 text-xs">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-14 h-14 object-cover rounded-lg border border-gray-100 bg-gray-50"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">{item.product.title}</h4>
                      <span className="text-[11px] text-gray-400">Qty: {item.quantity} × Rs. {item.product.price.toLocaleString()}</span>
                    </div>
                    <span className="font-bold text-gray-900">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Code Input */}
              <form onSubmit={handleApplyCoupon} className="pt-2">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Discount code (e.g. BLOSSOM10)"
                    className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-lg uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-800 hover:bg-black text-white text-xs font-bold rounded-lg"
                  >
                    Apply
                  </button>
                </div>
                {couponSuccess && <p className="text-[11px] text-emerald-600 mt-1">{couponSuccess}</p>}
                {couponError && <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>}
              </form>

              {/* Price Calculation */}
              <div className="border-t border-gray-100 pt-3 space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-gray-800">Rs. {cartSubtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Coupon Discount (10%):</span>
                    <span>-Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee:</span>
                  <span>
                    {isFreeShipping ? (
                      <strong className="text-emerald-600">FREE</strong>
                    ) : (
                      `Rs. ${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-gray-900 pt-2 border-t border-gray-100">
                  <span>Grand Total:</span>
                  <span className="text-[#7b3e1d]">Rs. {finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

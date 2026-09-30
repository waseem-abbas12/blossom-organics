import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Package, Truck, Printer, ArrowRight } from 'lucide-react';

export const OrderSuccess = () => {
  const { id } = useParams();
  const { orders, settings } = useStore();

  const order = orders.find(o => o.id === id) || orders[0];

  return (
    <div className="w-full bg-[#fbf9f5] min-h-screen py-12 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm text-center">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs font-bold text-[#c59b27] uppercase tracking-widest">
          Order Confirmed
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-1">
          Thank you for your order!
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-md mx-auto">
          We have received your order. Our team will verify and dispatch your cosmetic parcel within 24 hours.
        </p>

        {order && (
          <div className="mt-8 p-6 bg-[#fbf9f5] rounded-2xl border border-gray-100 text-left text-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between pb-3 border-b border-gray-200/70 gap-2">
              <div>
                <span className="text-gray-500">Order ID: </span>
                <strong className="text-base text-gray-900 font-mono font-bold">{order.id}</strong>
              </div>
              <div>
                <span className="text-gray-500">Payment: </span>
                <strong className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded font-bold">
                  {order.paymentMethod}
                </strong>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-gray-400 font-medium block">Delivery Details:</span>
                <strong className="text-gray-900 block mt-0.5">{order.customerName}</strong>
                <p className="text-gray-600">{order.address}, {order.city}, {order.province}</p>
                <p className="text-gray-600">{order.phone}</p>
              </div>

              <div>
                <span className="text-gray-400 font-medium block">Order Summary:</span>
                <p className="text-gray-700 mt-0.5">{order.items?.length || 1} items ordered</p>
                <p className="text-sm font-bold text-[#7b3e1d] mt-1">
                  Total: Rs. {order.total?.toLocaleString()}
                </p>
                <p className="text-[11px] text-gray-500 mt-1">Estimated delivery: 2-3 working days</p>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to={`/track-order?orderId=${order?.id || ''}`}
            className="w-full sm:w-auto px-6 py-3 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white text-xs font-bold uppercase tracking-wider rounded-full flex items-center justify-center space-x-2 transition-all shadow-md"
          >
            <Truck className="w-4 h-4" />
            <span>Track Order Status</span>
          </Link>

          <Link
            to="/shop"
            className="w-full sm:w-auto px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-bold uppercase tracking-wider rounded-full transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Need help? Message our support team on WhatsApp at <strong className="text-gray-700">{settings.phone}</strong>
        </p>
      </div>
    </div>
  );
};

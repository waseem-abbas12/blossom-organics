import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Search, PackageCheck, Truck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const { orders } = useStore();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('orderId') || "");
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const idFromParam = searchParams.get('orderId');
    if (idFromParam) {
      handleSearch(idFromParam);
    }
  }, [searchParams]);

  const handleSearch = (term) => {
    const target = term || searchTerm;
    if (!target.trim()) return;
    setHasSearched(true);
    const found = orders.find(o => 
      o.id.toLowerCase() === target.trim().toLowerCase() ||
      o.phone.replace(/[^0-9]/g, '').includes(target.replace(/[^0-9]/g, ''))
    );
    setSearchedOrder(found || null);
  };

  const steps = [
    { title: "Order Placed", status: "Pending" },
    { title: "Processing & Packed", status: "Processing" },
    { title: "Dispatched & Shipped", status: "Shipped" },
    { title: "Delivered", status: "Delivered" }
  ];

  const getStepIndex = (status) => {
    switch (status) {
      case "Pending": return 0;
      case "Processing": return 1;
      case "Shipped": return 2;
      case "Delivered": return 3;
      default: return 1;
    }
  };

  const currentStep = searchedOrder ? getStepIndex(searchedOrder.status) : 0;

  return (
    <div className="w-full bg-[#fbf9f5] min-h-screen py-12 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#7b3e1d]">
            Live Tracking
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-1">
            Track Your Parcel
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Enter your Order ID (e.g. ORD-90214) or Phone Number to view live status.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-xs mb-8">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSearch(searchTerm); }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                required
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter Order ID (e.g. ORD-90214) or Phone Number..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#7b3e1d]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm"
            >
              Track Order
            </button>
          </form>
        </div>

        {/* Results */}
        {hasSearched && (
          searchedOrder ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-gray-100 gap-2">
                <div>
                  <span className="text-xs text-gray-400">Order Reference</span>
                  <h3 className="text-base font-bold font-mono text-gray-900">{searchedOrder.id}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400">Current Status</span>
                  <span className="block text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                    {searchedOrder.status}
                  </span>
                </div>
              </div>

              {/* Visual Progress Steps */}
              <div className="py-4">
                <div className="grid grid-cols-4 gap-2 text-center relative">
                  {steps.map((step, idx) => {
                    const isDone = idx <= currentStep;
                    return (
                      <div key={idx} className="flex flex-col items-center space-y-2 relative z-10">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition-colors ${
                          isDone 
                            ? 'bg-[#7b3e1d] text-white' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {isDone ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                        </div>
                        <span className={`text-[11px] font-semibold leading-tight ${
                          isDone ? 'text-gray-900' : 'text-gray-400'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Details breakdown */}
              <div className="p-4 bg-[#fbf9f5] rounded-xl text-xs space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Customer:</span>
                  <strong className="text-gray-900">{searchedOrder.customerName}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Destination:</span>
                  <span className="text-gray-900">{searchedOrder.address}, {searchedOrder.city}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="font-semibold text-gray-800">{searchedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200/60 pt-2 font-bold text-sm text-gray-900">
                  <span>Total Amount:</span>
                  <span className="text-[#7b3e1d]">Rs. {searchedOrder.total?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm space-y-3">
              <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
              <h3 className="text-base font-bold text-gray-800">No Order Found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                We couldn't locate an order matching "{searchTerm}". Please verify your Order ID or contact our WhatsApp support.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

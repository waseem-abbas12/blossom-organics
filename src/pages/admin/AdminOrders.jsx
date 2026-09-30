import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Eye, Printer, X, CheckCircle, Clock, Truck, ShoppingBag } from 'lucide-react';

export const AdminOrders = () => {
  const { orders, updateOrderStatus } = useStore();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [activeOrderModal, setActiveOrderModal] = useState(null);

  const filteredOrders = selectedFilter === "All"
    ? orders
    : orders.filter(o => o.status === selectedFilter);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            View customer shipping details, update dispatch statuses, and generate packing invoices.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-xl border border-gray-200/70 shadow-xs">
          {["All", "Pending", "Processing", "Shipped", "Delivered"].map(status => (
            <button
              key={status}
              onClick={() => setSelectedFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedFilter === status 
                  ? 'bg-[#1a1a1a] text-white shadow-xs' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-200/70 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Order ID & Date</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Shipping Destination</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    No orders found matching "{selectedFilter}" status.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50/80">
                    <td className="p-4">
                      <span className="font-mono font-bold text-gray-900 block">{order.id}</span>
                      <span className="text-[11px] text-gray-400">{order.date}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold block text-gray-900">{order.customerName}</span>
                      <span className="text-[11px] text-gray-500">{order.phone}</span>
                    </td>
                    <td className="p-4">
                      <span className="block font-semibold text-gray-800">{order.city || "Pakistan"}</span>
                      <span className="text-[11px] text-gray-400 max-w-xs truncate block">{order.address}</span>
                    </td>
                    <td className="p-4">
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-[11px] font-bold">
                        {order.items?.length || 1} items
                      </span>
                    </td>
                    <td className="p-4">
                      <strong className="text-[#1a1a1a] block">Rs. {order.total?.toLocaleString()}</strong>
                      <span className="text-[10px] text-emerald-700 font-semibold">{order.paymentMethod}</span>
                    </td>
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold border focus:outline-none ${
                          order.status === 'Delivered' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : order.status === 'Shipped'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : order.status === 'Processing'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setActiveOrderModal(order)}
                        className="p-1.5 bg-gray-100 hover:bg-[#7b3e1d] hover:text-white rounded-lg transition-colors inline-flex items-center space-x-1"
                        title="View invoice"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline text-[11px] font-bold">View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      {activeOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setActiveOrderModal(null)} />
          <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto animate-fade-in border border-gray-100 text-xs">
            {/* Modal Actions */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-serif font-black tracking-wider uppercase">Blossom</span>
                <span className="text-xs bg-[#c59b27] text-white px-2 py-0.5 rounded font-bold">INVOICE</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-bold flex items-center space-x-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button onClick={() => setActiveOrderModal(null)} className="text-gray-400 hover:text-black">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-gray-400 block">Order Reference:</span>
                  <strong className="text-base font-mono text-gray-900">{activeOrderModal.id}</strong>
                  <span className="text-gray-500 block mt-0.5">Placed on: {activeOrderModal.date}</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 block">Payment Method:</span>
                  <strong className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold inline-block">
                    {activeOrderModal.paymentMethod}
                  </strong>
                </div>
              </div>

              {/* Customer Box */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 grid grid-cols-2 gap-4">
                <div>
                  <span className="font-bold text-gray-900 block mb-1">Customer Details:</span>
                  <p className="font-semibold text-gray-800">{activeOrderModal.customerName}</p>
                  <p className="text-gray-600">{activeOrderModal.phone}</p>
                  {activeOrderModal.email && <p className="text-gray-600">{activeOrderModal.email}</p>}
                </div>
                <div>
                  <span className="font-bold text-gray-900 block mb-1">Shipment Address:</span>
                  <p className="text-gray-700">{activeOrderModal.address}</p>
                  <p className="text-gray-700">{activeOrderModal.city}, {activeOrderModal.province}</p>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h4 className="font-bold text-gray-900 uppercase tracking-wider mb-2">Order Items</h4>
                <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
                  {activeOrderModal.items?.map((item, i) => (
                    <div key={i} className="p-3 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={item.image} alt={item.title} className="w-10 h-10 object-cover rounded-md" />
                        <div>
                          <p className="font-bold text-gray-900">{item.title}</p>
                          <span className="text-gray-400 text-[11px]">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-gray-900">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="pt-2 border-t border-gray-200 space-y-1.5 text-right">
                <p className="text-gray-600">Subtotal: Rs. {activeOrderModal.subtotal?.toLocaleString()}</p>
                <p className="text-gray-600">Shipping Delivery: Rs. {activeOrderModal.shipping?.toLocaleString()}</p>
                <p className="text-base font-extrabold text-[#7b3e1d]">
                  Total Payable: Rs. {activeOrderModal.total?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

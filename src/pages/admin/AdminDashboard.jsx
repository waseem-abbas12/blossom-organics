import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { 
  DollarSign, 
  ShoppingBag, 
  Package, 
  Clock, 
  ArrowUpRight, 
  TrendingUp, 
  Plus,
  Eye,
  MessageSquare,
  Star,
  Video
} from 'lucide-react';

export const AdminDashboard = () => {
  const { orders, products, updateOrderStatus, reviews, videos } = useStore();

  const totalSales = orders.reduce((acc, o) => acc + (o.total || 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Processing');
  const lowStockCount = products.filter(p => (p.stockCount || 50) < 20).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Monitor real-time sales, order statuses, and botanical cosmetic inventory.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/admin/products"
            className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Sales */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/70 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Sales</span>
            <h3 className="text-base sm:text-xl font-extrabold text-gray-900 mt-1">
              Rs. {totalSales.toLocaleString()}
            </h3>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center space-x-1 mt-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>COD</span>
            </span>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/70 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Orders</span>
            <h3 className="text-base sm:text-xl font-extrabold text-gray-900 mt-1">
              {orders.length}
            </h3>
            <span className="text-[10px] text-gray-500 mt-0.5 block">Checkouts</span>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/70 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Pending</span>
            <h3 className="text-base sm:text-xl font-extrabold text-amber-600 mt-1">
              {pendingOrders.length}
            </h3>
            <span className="text-[10px] text-gray-500 mt-0.5 block">Dispatch</span>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Active Products */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/70 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Products</span>
            <h3 className="text-base sm:text-xl font-extrabold text-gray-900 mt-1">
              {products.length}
            </h3>
            <span className="text-[10px] text-gray-500 mt-0.5 block">Catalog</span>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Package className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Videos & Reels */}
        <Link 
          to="/admin/videos"
          className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/70 shadow-xs flex items-center justify-between hover:border-rose-400 transition-colors group cursor-pointer"
        >
          <div>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Videos</span>
            <h3 className="text-base sm:text-xl font-extrabold text-gray-900 mt-1">
              {videos?.length || 0}
            </h3>
            <span className="text-[10px] text-rose-600 font-semibold mt-0.5 block group-hover:underline">
              Reels Studio →
            </span>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Video className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </Link>

        {/* Reviews */}
        <Link 
          to="/admin/reviews"
          className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/70 shadow-xs flex items-center justify-between hover:border-[#c59b27] transition-colors group cursor-pointer"
        >
          <div>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Reviews</span>
            <h3 className="text-base sm:text-xl font-extrabold text-gray-900 mt-1 flex items-center space-x-0.5">
              <span>{reviews?.length || 0}</span>
              <span className="text-[10px] text-amber-500 font-bold">★ 4.9</span>
            </h3>
            <span className="text-[10px] text-[#7b3e1d] font-semibold mt-0.5 block group-hover:underline">
              Stories →
            </span>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </Link>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-2xl border border-gray-200/70 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Recent Customer Orders</h3>
            <p className="text-xs text-gray-500 mt-0.5">Directly update order status to notify customers on tracking</p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs text-[#7b3e1d] font-bold hover:underline flex items-center space-x-1"
          >
            <span>View All Orders</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">City</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
              {orders.slice(0, 6).map(order => (
                <tr key={order.id} className="hover:bg-gray-50/80">
                  <td className="p-4 font-mono font-bold text-gray-900">{order.id}</td>
                  <td className="p-4">
                    <span className="font-semibold block text-gray-900">{order.customerName}</span>
                    <span className="text-[11px] text-gray-400">{order.phone}</span>
                  </td>
                  <td className="p-4">{order.city || "Pakistan"}</td>
                  <td className="p-4 font-bold text-[#1a1a1a]">Rs. {order.total?.toLocaleString()}</td>
                  <td className="p-4">
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-[11px] font-semibold text-gray-700">
                      {order.paymentMethod}
                    </span>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

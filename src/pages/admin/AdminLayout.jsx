import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  MessageSquare,
  Video,
  Sliders, 
  Settings, 
  LogOut, 
  ExternalLink,
  Menu,
  X,
  Store
} from 'lucide-react';

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdminLoggedIn, adminLogout } = useAuth();
  const { orders, products, reviews, videos } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If not logged in, redirect to login
  if (!isAdminLoggedIn) {
    navigate('/admin/login');
    return null;
  }

  const navItems = [
    { title: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { title: "Products Catalog", path: "/admin/products", icon: Package, badge: products.length },
    { title: "Orders Management", path: "/admin/orders", icon: ShoppingBag, badge: orders.length },
    { title: "Videos & Reels", path: "/admin/videos", icon: Video, badge: videos?.length },
    { title: "Customer Reviews", path: "/admin/reviews", icon: MessageSquare, badge: reviews?.length },
    { title: "Banners & Marquee", path: "/admin/banners", icon: Sliders },
    { title: "Store Settings", path: "/admin/settings", icon: Settings },
  ];

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1a1a1a] text-white flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div>
          {/* Logo Brand */}
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <Link to="/admin/dashboard" className="flex items-center space-x-2">
              <span className="text-xl font-serif font-black tracking-wider uppercase">Blossom</span>
              <span className="text-xs bg-[#c59b27] text-white px-2 py-0.5 rounded font-bold">ADMIN</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 text-xs font-semibold">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-[#7b3e1d] text-white shadow-sm font-bold' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-black/30 text-white' : 'bg-gray-800 text-gray-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-800 space-y-2 text-xs">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 bg-gray-800/80 hover:bg-gray-800 text-gray-200 rounded-xl transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Store className="w-4 h-4 text-[#c59b27]" />
              <span>View Live Store</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-4 py-2.5 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 h-14 sm:h-16 flex items-center justify-between px-3 sm:px-8 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 text-gray-700 hover:text-black rounded-lg hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="flex items-center space-x-1.5">
              <span className="text-sm sm:text-base font-serif font-black text-gray-900 uppercase tracking-wider">
                Blossom
              </span>
              <span className="text-[10px] bg-[#c59b27] text-white px-1.5 py-0.5 rounded font-extrabold">
                ADMIN
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 text-xs">
            <Link
              to="/"
              target="_blank"
              className="flex items-center space-x-1 px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold transition-colors"
              title="Open storefront"
            >
              <Store className="w-3.5 h-3.5 text-[#7b3e1d]" />
              <span className="hidden xs:inline">Live Store</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </Link>

            <span className="hidden sm:flex items-center space-x-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-bold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live</span>
            </span>

            <button
              onClick={handleLogout}
              className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg lg:hidden"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page body with padding bottom on mobile */}
        <main className="flex-1 p-3 sm:p-8 pb-24 lg:pb-8">
          <Outlet />
        </main>

        {/* Mobile Bottom Fixed Navigation Bar (App-like control on mobile) */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#161616] border-t border-gray-800 lg:hidden flex items-center justify-around py-2 px-1 text-white shadow-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all relative ${
                  active ? 'text-[#c59b27] font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#c59b27] text-white text-[9px] font-bold px-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-1 leading-none tracking-tight">
                  {item.title.split(' ')[0]}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

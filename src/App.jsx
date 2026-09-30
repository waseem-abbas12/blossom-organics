import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';

// Storefront Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { TrackOrder } from './pages/TrackOrder';
import { Wishlist } from './pages/Wishlist';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminBanners } from './pages/admin/AdminBanners';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminReviews } from './pages/admin/AdminReviews';
import { AdminVideos } from './pages/admin/AdminVideos';

function StorefrontLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <QuickViewModal />
      <SearchModal />
    </div>
  );
}

export function App() {
  return (
    <Routes>
      {/* Storefront Routes */}
      <Route path="/" element={<StorefrontLayout><Home /></StorefrontLayout>} />
      <Route path="/shop" element={<StorefrontLayout><Shop /></StorefrontLayout>} />
      <Route path="/product/:id" element={<StorefrontLayout><ProductDetail /></StorefrontLayout>} />
      <Route path="/checkout" element={<StorefrontLayout><Checkout /></StorefrontLayout>} />
      <Route path="/order-success/:id" element={<StorefrontLayout><OrderSuccess /></StorefrontLayout>} />
      <Route path="/track-order" element={<StorefrontLayout><TrackOrder /></StorefrontLayout>} />
      <Route path="/wishlist" element={<StorefrontLayout><Wishlist /></StorefrontLayout>} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="videos" element={<AdminVideos />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="banners" element={<AdminBanners />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Catch-all redirect to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
export default App;

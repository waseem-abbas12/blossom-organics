import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/initialProducts';
import { initialCategories, initialConcerns, initialFaqs, initialReviews } from '../data/initialCategories';
import { initialSettings } from '../data/initialSettings';
import { initialVideos } from '../data/initialVideos';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Products (v2 for dual-product catalog)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('blossom_products_v2');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  // Settings & Banners
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('blossom_settings_v2');
      return saved ? JSON.parse(saved) : initialSettings;
    } catch {
      return initialSettings;
    }
  });

  // Categories
  const [categories] = useState(initialCategories);
  const [concerns] = useState(initialConcerns);
  const [faqs] = useState(initialFaqs);

  // Reviews
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('blossom_reviews_v2');
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  // Videos
  const [videos, setVideos] = useState(() => {
    try {
      const saved = localStorage.getItem('blossom_videos');
      return saved ? JSON.parse(saved) : initialVideos;
    } catch {
      return initialVideos;
    }
  });

  // Cart
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('blossom_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('blossom_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('blossom_orders');
      if (saved) return JSON.parse(saved);
      // Default sample order
      return [
        {
          id: "ORD-90214",
          date: "2026-09-10",
          customerName: "Sana Tariq",
          email: "sana.tariq@gmail.com",
          phone: "0301-4455667",
          address: "House 24, Street 9, DHA Phase 5",
          city: "Lahore",
          province: "Punjab",
          paymentMethod: "Cash on Delivery",
          status: "Processing",
          items: [
            { id: "prod-1", title: "6-Step Ultra Glow Facial Kit", price: 888, quantity: 1, image: "https://cdn.shopify.com/s/files/1/0031/0296/5795/files/6-StepFacialGlowKit.png?v=1786621465" },
            { id: "prod-14", title: "Pure Rosewater & Botanical Toner Mist", price: 340, quantity: 2, image: "https://cdn.shopify.com/s/files/1/0031/0296/5795/collections/7_f3bf1fb0-61fd-45df-b2a3-897bc3329e4a.png?v=1759214679" }
          ],
          subtotal: 1568,
          shipping: 200,
          total: 1768,
          notes: "Call before delivering parcel."
        }
      ];
    } catch {
      return [];
    }
  });

  // UI Modals
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Safe save to localStorage with quota overflow protection
  useEffect(() => {
    try {
      localStorage.setItem('blossom_products_v2', JSON.stringify(products));
    } catch (e) {
      console.warn("Storage quota warning on products:", e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('blossom_settings_v2', JSON.stringify(settings));
    } catch (e) {
      console.warn("Storage quota warning on settings:", e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('blossom_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn("Storage quota warning on cart:", e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('blossom_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn("Storage quota warning on wishlist:", e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('blossom_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn("Storage quota warning on orders:", e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('blossom_reviews_v2', JSON.stringify(reviews));
    } catch (e) {
      console.warn("Storage quota warning on reviews:", e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('blossom_videos', JSON.stringify(videos));
    } catch (e) {
      console.warn("Storage quota warning on videos:", e);
    }
  }, [videos]);

  // Cart operations
  const addToCart = (product, quantity = 1, size = null) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, size: size || product.size || "Standard" }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => setCart([]);

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isFreeShipping = cartSubtotal >= settings.freeShippingThreshold;
  const shippingFee = cartSubtotal === 0 ? 0 : (isFreeShipping ? 0 : settings.standardShippingFee);
  const cartTotal = cartSubtotal + shippingFee;
  const amountNeededForFreeShipping = Math.max(0, settings.freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / settings.freeShippingThreshold) * 100));

  // Wishlist operations
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

  // Orders
  const placeOrder = (orderData) => {
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      status: "Pending",
      items: [...cart.map(c => ({
        id: c.product.id,
        title: c.product.title,
        price: c.product.price,
        quantity: c.quantity,
        image: c.product.image,
        size: c.size
      }))],
      subtotal: cartSubtotal,
      shipping: shippingFee,
      total: cartTotal,
      ...orderData
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  // Admin Product Operations
  const addProduct = (prodData) => {
    const newProduct = {
      ...prodData,
      id: `prod-${Date.now()}`,
      handle: prodData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      rating: prodData.rating || 5.0,
      reviewCount: prodData.reviewCount || 0,
      inStock: prodData.inStock !== false,
      stockCount: prodData.stockCount || 50,
      isBestSeller: prodData.isBestSeller || false,
      isNew: prodData.isNew || false,
      isFeatured: prodData.isFeatured || false
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id, updatedData) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const resetToDefaultProducts = () => {
    setProducts(initialProducts);
  };

  // Admin Settings Operations
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateHeroBanners = (banners) => {
    setSettings(prev => ({ ...prev, heroBanners: banners }));
  };

  const addReview = (reviewData) => {
    const newRev = {
      id: `rev-${Date.now()}`,
      date: "Just now",
      verified: true,
      ...reviewData
    };
    setReviews(prev => [newRev, ...prev]);
  };

  const updateReview = (id, updatedData) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, ...updatedData } : r));
  };

  const deleteReview = (id) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  const toggleReviewVerified = (id) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, verified: !r.verified } : r));
  };

  const resetToDefaultReviews = () => {
    setReviews(initialReviews);
  };

  // Video operations
  const addVideo = (videoData) => {
    const newVid = {
      id: `vid-${Date.now()}`,
      views: "1.2K",
      duration: "0:45",
      ...videoData
    };
    setVideos(prev => [newVid, ...prev]);
  };

  const updateVideo = (id, updatedData) => {
    setVideos(prev => prev.map(v => v.id === id ? { ...v, ...updatedData } : v));
  };

  const deleteVideo = (id) => {
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  const resetToDefaultVideos = () => {
    setVideos(initialVideos);
  };

  return (
    <StoreContext.Provider value={{
      products,
      categories,
      concerns,
      faqs,
      reviews,
      videos,
      settings,
      cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartSubtotal,
      cartItemCount,
      isFreeShipping,
      shippingFee,
      cartTotal,
      amountNeededForFreeShipping,
      freeShippingProgress,
      wishlist,
      toggleWishlist,
      isInWishlist,
      orders,
      placeOrder,
      updateOrderStatus,
      addProduct,
      updateProduct,
      deleteProduct,
      resetToDefaultProducts,
      updateSettings,
      updateHeroBanners,
      addReview,
      updateReview,
      deleteReview,
      toggleReviewVerified,
      resetToDefaultReviews,
      addVideo,
      updateVideo,
      deleteVideo,
      resetToDefaultVideos,
      quickViewProduct,
      setQuickViewProduct,
      isSearchOpen,
      setIsSearchOpen
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};

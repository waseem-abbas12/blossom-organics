import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Plus, Search, Edit2, Trash2, RotateCcw, X, Check, Image as ImageIcon } from 'lucide-react';

export const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct, resetToDefaultProducts, categories } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Skin Care",
    concern: "Dark Spot & Pigmentation",
    price: 999,
    originalPrice: 1299,
    image: "",
    secondaryImage: "",
    badge: "SALE",
    stockCount: 50,
    size: "100ml",
    description: "",
    ingredients: "",
    howToUse: "",
    isBestSeller: true,
    isFeatured: true
  });

  const filtered = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      title: "",
      category: "Skin Care",
      concern: "Dark Spot & Pigmentation",
      price: 999,
      originalPrice: 1299,
      image: "https://cdn.shopify.com/s/files/1/0031/0296/5795/files/6-StepFacialGlowKit.png?v=1786621465",
      secondaryImage: "",
      badge: "NEW",
      stockCount: 50,
      size: "100ml",
      description: "Enriched with pure botanical herbal ingredients to give natural skin radiance.",
      ingredients: "Organic Aloe Vera, Mulberry Extract, Vitamin B3, Rosewater.",
      howToUse: "Apply gently to clean skin daily.",
      isBestSeller: true,
      isFeatured: true
    });
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      category: product.category,
      concern: product.concern || "Dark Spot & Pigmentation",
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      image: product.image,
      secondaryImage: product.secondaryImage || "",
      badge: product.badge || "",
      stockCount: product.stockCount || 50,
      size: product.size || "100ml",
      description: product.description || "",
      ingredients: product.ingredients || "",
      howToUse: product.howToUse || "",
      isBestSeller: !!product.isBestSeller,
      isFeatured: !!product.isFeatured
    });
    setModalOpen(true);
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...formData,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        stockCount: Number(formData.stockCount)
      });
    } else {
      addProduct({
        ...formData,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        stockCount: Number(formData.stockCount)
      });
    }
    setModalOpen(false);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProduct(id);
    }
  };

  const handleReset = () => {
    if (window.confirm("Reset catalog back to initial 18+ Golden Girl Cosmetics benchmark products?")) {
      resetToDefaultProducts();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage your cosmetic inventory, PKR pricing, badges, and herbal formulas.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleReset}
            className="px-3.5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold rounded-xl flex items-center space-x-1.5 transition-colors"
            title="Restore default catalog"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore Default</span>
          </button>

          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/70 shadow-xs flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by title or category..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#7b3e1d]"
          />
        </div>
        <span className="text-xs font-semibold text-gray-500 hidden sm:inline">
          Total: {products.length} Products
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200/70 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price (PKR)</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Badge</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
              {filtered.map(prod => (
                <tr key={prod.id} className="hover:bg-gray-50/80">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="w-12 h-12 object-cover rounded-lg border border-gray-200 bg-gray-50 flex-shrink-0"
                      />
                      <div>
                        <span className="font-bold text-gray-900 block max-w-xs sm:max-w-md truncate">
                          {prod.title}
                        </span>
                        <span className="text-[11px] text-gray-400">{prod.size || "Standard"}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-gray-100 px-2.5 py-1 rounded-md text-[11px] font-semibold text-gray-800">
                      {prod.category}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-[#1a1a1a]">
                    Rs. {prod.price.toLocaleString()}
                    {prod.originalPrice && (
                      <span className="block text-[10px] text-gray-400 line-through">
                        Rs. {prod.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      (prod.stockCount || 50) < 20 
                        ? 'bg-rose-50 text-rose-700' 
                        : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {prod.stockCount || 50} in stock
                    </span>
                  </td>
                  <td className="p-4">
                    {prod.badge ? (
                      <span className="bg-[#c59b27] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {prod.badge}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-[11px]">-</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => openEditModal(prod)}
                        className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                        title="Edit product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id, prod.title)}
                        className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto animate-fade-in border border-gray-100">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-4">
              <h3 className="font-bold text-lg text-gray-900">
                {editingProduct ? "Edit Product" : "Add New Cosmetic Product"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. 6-Step Ultra Glow Facial Kit"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#7b3e1d]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#7b3e1d] bg-white font-medium"
                  >
                    {categories.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Skin Concern</label>
                  <select
                    value={formData.concern}
                    onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#7b3e1d] bg-white font-medium"
                  >
                    <option value="Acne & Blemishes">Acne & Blemishes</option>
                    <option value="Dandruff & Itch">Dandruff & Itch</option>
                    <option value="Dry & Dull Skin">Dry & Dull Skin</option>
                    <option value="Hair Fall & Thinning">Hair Fall & Thinning</option>
                    <option value="Dark Spots & Pigmentation">Dark Spots & Pigmentation</option>
                    <option value="Hands & Feet Care">Hands & Feet Care</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Selling Price (Rs.) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#7b3e1d]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Original Price (Rs.)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#7b3e1d]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={formData.stockCount}
                    onChange={(e) => setFormData({ ...formData, stockCount: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#7b3e1d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Product Image (Upload from Mobile or URL)
                  </label>
                  <div className="flex items-center space-x-2 mb-2">
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Product preview"
                        className="w-10 h-10 object-contain rounded-lg border border-gray-200 bg-gray-50 shrink-0"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="block w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#1a1a1a] file:text-white hover:file:bg-[#7b3e1d] cursor-pointer"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Or paste image URL https://..."
                    className="w-full px-3.5 py-1.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#7b3e1d] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Badge Tag (e.g. SALE, HOT)</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="SALE / BEST SELLER"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#7b3e1d]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Product Description</label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#7b3e1d]"
                />
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    className="accent-[#7b3e1d] w-4 h-4 rounded"
                  />
                  <span>Mark as Best Seller (Shows on Homepage)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2 border border-gray-300 text-gray-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white font-bold rounded-xl transition-colors"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

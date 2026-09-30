import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Star, 
  Trash2, 
  Edit, 
  Plus, 
  Search, 
  CheckCircle, 
  X, 
  RotateCcw,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  MapPin,
  Filter
} from 'lucide-react';

export const AdminReviews = () => {
  const { reviews, addReview, updateReview, deleteReview, toggleReviewVerified, resetToDefaultReviews, products } = useStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('ALL');
  const [productFilter, setProductFilter] = useState('ALL');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    author: '',
    city: 'Lahore',
    productTitle: 'The Ultimate Glow Duo (Soap + Cream)',
    rating: 5,
    title: '',
    content: '',
    verified: true
  });

  // Calculate statistics
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0 
    ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / totalReviews).toFixed(1)
    : "5.0";
  const fiveStarCount = reviews.filter(r => r.rating === 5).length;
  const verifiedCount = reviews.filter(r => r.verified).length;

  // Filter reviews
  const filteredReviews = reviews.filter(r => {
    const matchesSearch = 
      (r.author || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.city || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.content || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRating = ratingFilter === 'ALL' || r.rating === Number(ratingFilter);
    const matchesProduct = productFilter === 'ALL' || r.productTitle === productFilter;

    return matchesSearch && matchesRating && matchesProduct;
  });

  const handleOpenAdd = () => {
    setEditingReview(null);
    setFormData({
      author: '',
      city: 'Lahore',
      productTitle: 'The Ultimate Glow Duo (Soap + Cream)',
      rating: 5,
      title: '',
      content: '',
      verified: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (rev) => {
    setEditingReview(rev);
    setFormData({
      author: rev.author || '',
      city: rev.city || 'Pakistan',
      productTitle: rev.productTitle || 'The Ultimate Glow Duo (Soap + Cream)',
      rating: rev.rating || 5,
      title: rev.title || '',
      content: rev.content || '',
      verified: rev.verified !== false
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingReview) {
      updateReview(editingReview.id, {
        ...formData,
        rating: Number(formData.rating)
      });
    } else {
      addReview({
        ...formData,
        rating: Number(formData.rating)
      });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id, author) => {
    if (window.confirm(`Are you sure you want to delete the review by "${author}"?`)) {
      deleteReview(id);
    }
  };

  const handleReset = () => {
    if (window.confirm("Reset all reviews to default authentic customer reviews?")) {
      resetToDefaultReviews();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">
            Customer Reviews Management
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage real customer testimonials shown in the storefront review marquee and product pages.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleReset}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-xs"
            title="Reset reviews to initial 8 verified customer stories"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Review</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Total Reviews</span>
            <MessageSquare className="w-4 h-4 text-[#7b3e1d]" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalReviews}</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Active on storefront</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Average Rating</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{avgRating} <span className="text-xs text-gray-400">/ 5.0</span></div>
          <div className="text-[10px] text-amber-600 font-semibold mt-0.5">★★★★★ Exceptional</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">5-Star Reviews</span>
            <Sparkles className="w-4 h-4 text-[#c59b27]" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{fiveStarCount}</div>
          <div className="text-[10px] text-gray-400 mt-0.5">{totalReviews > 0 ? Math.round((fiveStarCount / totalReviews) * 100) : 0}% of all reviews</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Verified Buyers</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{verifiedCount}</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">100% Real Customers</div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search author, city, title, keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b3e1d]"
          />
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          {/* Rating filter */}
          <div className="flex items-center space-x-1.5 text-xs text-gray-600">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="px-2.5 py-2 border border-gray-300 rounded-lg text-xs bg-white focus:outline-none focus:border-[#7b3e1d]"
            >
              <option value="ALL">All Star Ratings</option>
              <option value="5">5 Stars Only</option>
              <option value="4">4 Stars Only</option>
              <option value="3">3 Stars Only</option>
            </select>
          </div>

          {/* Product filter */}
          <select
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
            className="px-2.5 py-2 border border-gray-300 rounded-lg text-xs bg-white focus:outline-none focus:border-[#7b3e1d] max-w-[200px] truncate"
          >
            <option value="ALL">All Products</option>
            <option value="The Ultimate Glow Duo (Soap + Cream)">The Ultimate Glow Duo</option>
            <option value="Organic Glow Nourishing Beauty Cream">Organic Glow Cream</option>
            <option value="Organic Herbal Radiance Soap">Organic Herbal Soap</option>
          </select>
        </div>
      </div>

      {/* Mobile Reviews Cards View */}
      <div className="md:hidden space-y-3">
        {filteredReviews.length === 0 ? (
          <div className="p-8 text-center text-gray-400 bg-white rounded-xl border border-gray-200">
            No customer reviews match your filter.
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div key={rev.id} className="bg-white rounded-2xl border border-gray-200/80 p-4 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7b3e1d] to-[#c59b27] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {rev.author ? rev.author.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-xs">{rev.author}</div>
                    <div className="text-[10px] text-gray-500">{rev.city || "Pakistan"}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-gray-200'}`} />
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <span className="inline-block text-[10px] font-bold text-[#7b3e1d] bg-[#fbf5ee] px-2 py-0.5 rounded border border-[#7b3e1d]/15">
                  {rev.productTitle}
                </span>
                <h4 className="text-xs font-bold text-gray-900 leading-snug">"{rev.title}"</h4>
                <p className="text-[11px] text-gray-600 line-clamp-3 italic">"{rev.content}"</p>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => toggleReviewVerified(rev.id)}
                  className={`inline-flex items-center space-x-1 text-[10px] font-bold px-2 py-1 rounded-full cursor-pointer ${
                    rev.verified
                      ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                      : 'text-gray-500 bg-gray-100'
                  }`}
                >
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  <span>{rev.verified ? 'Verified Buyer' : 'Unverified'}</span>
                </button>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleOpenEdit(rev)}
                    className="p-1.5 text-gray-700 hover:text-blue-600 bg-gray-100 rounded-lg text-xs flex items-center space-x-1 font-bold"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(rev.id, rev.author)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Reviews Table */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Author & Location</th>
                <th className="py-3.5 px-4">Product Reviewed</th>
                <th className="py-3.5 px-4">Rating</th>
                <th className="py-3.5 px-4">Review Content</th>
                <th className="py-3.5 px-4">Verified Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-400">
                    No customer reviews match your search filter.
                  </td>
                </tr>
              ) : (
                filteredReviews.map((rev) => (
                  <tr key={rev.id} className="hover:bg-gray-50/80 transition-colors">
                    {/* Author & Location */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7b3e1d] to-[#c59b27] text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {rev.author ? rev.author.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{rev.author}</div>
                          <div className="text-[10px] text-gray-500 flex items-center space-x-1 mt-0.5">
                            <MapPin className="w-2.5 h-2.5 text-gray-400" />
                            <span>{rev.city || "Pakistan"}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Product */}
                    <td className="py-3.5 px-4 max-w-[180px]">
                      <span className="inline-block text-[11px] font-semibold text-[#7b3e1d] bg-[#fbf5ee] px-2 py-0.5 rounded border border-[#7b3e1d]/15 truncate max-w-full">
                        {rev.productTitle || "The Glow Duo"}
                      </span>
                    </td>

                    {/* Rating */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-gray-200'
                            }`}
                          />
                        ))}
                        <span className="text-[11px] font-bold text-gray-700 ml-1">
                          {rev.rating}.0
                        </span>
                      </div>
                    </td>

                    {/* Content */}
                    <td className="py-3.5 px-4 max-w-md">
                      <div className="font-semibold text-gray-900 truncate">
                        "{rev.title}"
                      </div>
                      <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5 italic">
                        {rev.content}
                      </p>
                    </td>

                    {/* Verified Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleReviewVerified(rev.id)}
                        className={`inline-flex items-center space-x-1 text-[11px] font-bold px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                          rev.verified
                            ? 'text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100'
                            : 'text-gray-500 bg-gray-100 border border-gray-200 hover:bg-gray-200'
                        }`}
                        title="Click to toggle verified buyer status"
                      >
                        <CheckCircle className={`w-3 h-3 ${rev.verified ? 'text-emerald-600' : 'text-gray-400'}`} />
                        <span>{rev.verified ? 'Verified Buyer' : 'Unverified'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() => handleOpenEdit(rev)}
                          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Review"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(rev.id, rev.author)}
                          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif font-bold text-gray-900 mb-1">
              {editingReview ? "Edit Customer Review" : "Add New Customer Review"}
            </h3>
            <p className="text-xs text-gray-500 mb-5">
              Enter customer details and feedback to showcase in the continuous moving marquee.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Rating Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Rating (Stars) *
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFormData(p => ({ ...p, rating: star }))}
                      className="p-1 hover:scale-125 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= formData.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-gray-800 ml-2">
                    {formData.rating} Stars
                  </span>
                </div>
              </div>

              {/* Product Reviewed */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Product Reviewed *
                </label>
                <select
                  value={formData.productTitle}
                  onChange={(e) => setFormData(p => ({ ...p, productTitle: e.target.value }))}
                  className="w-full text-xs p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#7b3e1d] bg-white"
                >
                  <option value="The Ultimate Glow Duo (Soap + Cream)">The Ultimate Glow Duo (Soap + Cream)</option>
                  <option value="Organic Glow Nourishing Beauty Cream">Organic Glow Nourishing Beauty Cream (50g)</option>
                  <option value="Organic Herbal Radiance Soap">Organic Herbal Radiance Soap (120g)</option>
                </select>
              </div>

              {/* Author & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayesha Khan"
                    value={formData.author}
                    onChange={(e) => setFormData(p => ({ ...p, author: e.target.value }))}
                    className="w-full text-xs p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#7b3e1d]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lahore / Karachi"
                    value={formData.city}
                    onChange={(e) => setFormData(p => ({ ...p, city: e.target.value }))}
                    className="w-full text-xs p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#7b3e1d]"
                  />
                </div>
              </div>

              {/* Review Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Review Title / Headline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Faded my dark spots in 2 weeks!"
                  value={formData.title}
                  onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
                  className="w-full text-xs p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#7b3e1d]"
                />
              </div>

              {/* Review Content */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Review Text / Feedback *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Customer's genuine feedback on the formula and results..."
                  value={formData.content}
                  onChange={(e) => setFormData(p => ({ ...p, content: e.target.value }))}
                  className="w-full text-xs p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#7b3e1d]"
                />
              </div>

              {/* Verified Buyer Checkbox */}
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="verified-buyer"
                  checked={formData.verified}
                  onChange={(e) => setFormData(p => ({ ...p, verified: e.target.checked }))}
                  className="w-4 h-4 rounded text-[#7b3e1d] focus:ring-[#7b3e1d] border-gray-300"
                />
                <label htmlFor="verified-buyer" className="text-xs font-bold text-gray-700 cursor-pointer">
                  Mark as Verified Buyer (Shows green verified badge)
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm"
                >
                  {editingReview ? "Save Changes" : "Publish Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

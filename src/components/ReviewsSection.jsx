import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Star, CheckCircle, MessageSquarePlus, X } from 'lucide-react';

export const ReviewsSection = () => {
  const { reviews, addReview } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [author, setAuthor] = useState("");
  const [city, setCity] = useState("");
  const [productTitle, setProductTitle] = useState("6-Step Ultra Glow Facial Kit");
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author || !content) return;
    addReview({
      author,
      city: city || "Pakistan",
      productTitle,
      rating: Number(rating),
      title: title || "Wonderful product!",
      content
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setAuthor("");
      setContent("");
      setTitle("");
    }, 1200);
  };

  return (
    <section className="py-12 sm:py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-500 mb-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="text-xs font-bold text-gray-700 ml-1">4.9 / 5 Overall Rating</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1a1a1a]">
              Customer Love & Reviews
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Read real feedback from verified customers across Pakistan.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gray-900 hover:bg-[#7b3e1d] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors self-start sm:self-auto shadow-sm"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div 
              key={rev.id} 
              className="p-5 rounded-2xl bg-[#fbf9f5] border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                {/* Stars & Verified */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="flex items-center space-x-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-gray-900 leading-snug">
                  "{rev.title}"
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed italic">
                  "{rev.content}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center justify-between text-[11px]">
                <div>
                  <span className="font-bold text-gray-900 block">{rev.author}</span>
                  <span className="text-gray-400">{rev.city}</span>
                </div>
                <span className="text-gray-400 font-medium">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl z-10 animate-fade-in border border-gray-100">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
              <h3 className="font-serif font-bold text-lg text-gray-900">Write a Customer Review</h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-8 text-emerald-600 space-y-2">
                <CheckCircle className="w-12 h-12 mx-auto" />
                <h4 className="font-bold text-base">Thank you for your review!</h4>
                <p className="text-xs text-gray-500">Your review has been published to Blossom Organics.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Fatima Ali"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b3e1d]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Lahore / Karachi"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b3e1d]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b3e1d]"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5 Stars - Excellent)</option>
                    <option value="4">⭐⭐⭐⭐ (4 Stars - Good)</option>
                    <option value="3">⭐⭐⭐ (3 Stars - Average)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Review Headline</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Highly recommend this facial kit!"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b3e1d]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Your Experience *</label>
                  <textarea
                    required
                    rows="3"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tell us about the scent, results, delivery, or packaging..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b3e1d]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white font-bold uppercase tracking-wider rounded-lg transition-colors"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

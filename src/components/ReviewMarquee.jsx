import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Star, CheckCircle, MessageSquarePlus, X, Heart, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

export const ReviewMarquee = () => {
  const { reviews, addReview, products } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [author, setAuthor] = useState("");
  const [city, setCity] = useState("");
  const [productTitle, setProductTitle] = useState("The Ultimate Glow Duo (Soap + Cream)");
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
      title: title || "Amazing Results!",
      content
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setAuthor("");
      setCity("");
      setContent("");
      setTitle("");
      setRating(5);
    }, 1200);
  };

  // Split reviews into 2 rows for high visual dynamism
  const half = Math.ceil(reviews.length / 2);
  const row1Original = reviews.slice(0, half);
  const row2Original = reviews.slice(half);

  // Duplicate for seamless infinite loop
  const row1 = [...row1Original, ...row1Original, ...row1Original, ...row1Original];
  const row2 = [...row2Original, ...row2Original, ...row2Original, ...row2Original];

  const renderCard = (rev, idx) => (
    <div
      key={`${rev.id}-${idx}`}
      className="w-[320px] sm:w-[380px] shrink-0 mx-3 p-5 sm:p-6 rounded-2xl bg-white border border-amber-900/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
    >
      <div>
        {/* Top Header: Stars & Verified Badge */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < rev.rating
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-xs font-bold text-gray-800 ml-1.5">{rev.rating}.0</span>
          </div>

          {rev.verified && (
            <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
              <CheckCircle className="w-3 h-3 text-emerald-600" />
              <span>Verified Buyer</span>
            </span>
          )}
        </div>

        {/* Product Tag */}
        {rev.productTitle && (
          <div className="mb-2">
            <span className="inline-block text-[10px] font-semibold tracking-wider text-[#7b3e1d] bg-[#fbf5ee] px-2.5 py-0.5 rounded-md border border-[#7b3e1d]/15">
              {rev.productTitle}
            </span>
          </div>
        )}

        {/* Title */}
        <h4 className="text-sm font-bold text-gray-900 leading-snug line-clamp-1 mb-2 group-hover:text-[#7b3e1d] transition-colors">
          "{rev.title}"
        </h4>

        {/* Content */}
        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 italic">
          "{rev.content}"
        </p>
      </div>

      {/* Footer Info: Author, City, Date */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#7b3e1d] to-[#c59b27] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            {rev.author ? rev.author.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <div className="font-bold text-gray-900 leading-none">{rev.author}</div>
            <div className="text-[10px] text-gray-500 flex items-center space-x-0.5 mt-0.5">
              <MapPin className="w-2.5 h-2.5 text-gray-400" />
              <span>{rev.city || "Pakistan"}</span>
            </div>
          </div>
        </div>

        <span className="text-[10px] text-gray-400 font-medium">
          {rev.date || "Verified Order"}
        </span>
      </div>
    </div>
  );

  return (
    <section className="py-14 sm:py-24 bg-[#fcfaf7] border-b border-gray-200/60 overflow-hidden relative">
      {/* Decorative floral background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#7b3e1d] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
              <span className="uppercase tracking-wider">Real Customer Stories • Pakistan Wide</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight">
              Loved by Over 1,420+ Women Across Pakistan
            </h2>

            <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-3">
              <div className="flex items-center space-x-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-sm font-bold text-gray-900 ml-1.5">4.9 / 5.0</span>
              </div>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <div className="flex items-center space-x-1.5 text-xs text-gray-600 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Organic & Halal Certified Actives</span>
              </div>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <span className="text-xs text-gray-500">Based on 840+ verified buyer reviews</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#c59b27]" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>
      </div>

      {/* Marquee Continuous Sliders with Edge Fades */}
      <div className="relative w-full">
        {/* Left & Right gradient masks for luxurious fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-r from-[#fcfaf7] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-l from-[#fcfaf7] to-transparent z-20 pointer-events-none" />

        {/* Row 1: Slides Left */}
        <div className="overflow-hidden py-3">
          <div className="animate-marquee-left flex items-center">
            {row1.map((rev, idx) => renderCard(rev, idx))}
          </div>
        </div>

        {/* Row 2: Slides Right (Dual Direction) */}
        <div className="overflow-hidden py-3">
          <div className="animate-marquee-right flex items-center">
            {row2.map((rev, idx) => renderCard(rev, idx))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-6 text-center">
        <p className="text-xs text-gray-400 italic">
          💡 Tip: Hover or tap on any review slide to pause continuous scroll.
        </p>
      </div>

      {/* Write a Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-bold text-[#c59b27] uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/50">
                Verified Customer Feedback
              </span>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mt-2">
                Share Your Experience
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Your genuine review helps women all over Pakistan choose pure, chemical-free skincare.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">Thank You So Much!</h4>
                <p className="text-xs text-gray-600 max-w-xs mx-auto">
                  Your review has been successfully added to our customer showcase.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Rating Stars Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Your Rating *
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-125 transition-transform"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= rating 
                              ? 'text-amber-400 fill-amber-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-gray-700 ml-2">
                      {rating} Star{rating > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {/* Product Select */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Product Reviewed *
                  </label>
                  <select
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#7b3e1d] bg-white"
                  >
                    <option value="The Ultimate Glow Duo (Soap + Cream)">The Ultimate Glow Duo (Soap + Cream)</option>
                    <option value="Organic Glow Nourishing Beauty Cream">Organic Glow Nourishing Beauty Cream (50g)</option>
                    <option value="Organic Herbal Radiance Soap">Organic Herbal Radiance Soap (120g)</option>
                  </select>
                </div>

                {/* Name & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ayesha Tariq"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#7b3e1d]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      City in Pakistan *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lahore / Karachi"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#7b3e1d]"
                    />
                  </div>
                </div>

                {/* Review Headline */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Review Headline *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cleared my dark spots in 2 weeks!"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#7b3e1d]"
                  />
                </div>

                {/* Review Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Detailed Experience *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about the texture, fragrance, how your skin felt, and results..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#7b3e1d]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md"
                >
                  Submit Verified Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

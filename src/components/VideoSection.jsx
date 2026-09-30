import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { 
  Play, 
  X, 
  ShoppingBag, 
  Truck, 
  Eye, 
  Clock, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  Volume2,
  VolumeX
} from 'lucide-react';

export const VideoSection = () => {
  const navigate = useNavigate();
  const { videos, addToCart, products } = useStore();
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  if (!videos || videos.length === 0) return null;

  const currentModalVideo = activeVideoIndex !== null ? videos[activeVideoIndex] : null;

  const handleOrderProduct = (videoItem) => {
    const prod = products.find(p => p.id === videoItem.productId) || products[0];
    addToCart(prod, 1);
    setActiveVideoIndex(null);
    navigate('/checkout');
  };

  const handleQuickAdd = (e, videoItem) => {
    e.stopPropagation();
    const prod = products.find(p => p.id === videoItem.productId) || products[0];
    addToCart(prod, 1);
  };

  // Helper to render video player inside modal
  const renderVideoPlayer = (videoItem) => {
    if (!videoItem?.videoUrl) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gray-900 text-white">
          <img src={videoItem?.thumbnail} alt="" className="max-h-60 rounded-2xl mb-4 object-cover" />
          <h4 className="text-lg font-bold">{videoItem?.title}</h4>
          <p className="text-xs text-gray-400 mt-1">{videoItem?.description}</p>
        </div>
      );
    }

    // Check if it's YouTube
    const isYouTube = videoItem.videoUrl.includes('youtube.com') || videoItem.videoUrl.includes('youtu.be');
    if (isYouTube) {
      // Format embed url
      let embedUrl = videoItem.videoUrl;
      if (videoItem.videoUrl.includes('watch?v=')) {
        embedUrl = videoItem.videoUrl.replace('watch?v=', 'embed/');
      } else if (videoItem.videoUrl.includes('youtu.be/')) {
        embedUrl = videoItem.videoUrl.replace('youtu.be/', 'www.youtube.com/embed/');
      } else if (videoItem.videoUrl.includes('shorts/')) {
        embedUrl = videoItem.videoUrl.replace('shorts/', 'embed/');
      }
      if (!embedUrl.includes('autoplay=')) {
        embedUrl += (embedUrl.includes('?') ? '&' : '?') + 'autoplay=1&rel=0';
      }

      return (
        <iframe
          src={embedUrl}
          title={videoItem.title}
          className="w-full h-full object-cover"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    // Native HTML5 Video
    return (
      <video
        src={videoItem.videoUrl}
        poster={videoItem.thumbnail}
        controls
        autoPlay
        playsInline
        muted={isMuted}
        className="w-full h-full object-cover"
      />
    );
  };

  return (
    <section className="py-14 sm:py-22 bg-[#faf7f2] border-b border-gray-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-rose-500/10 border border-rose-500/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-800 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span className="uppercase tracking-wider">Shoppable Video Reels • Real Results</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight">
              Watch Blossom Organics in Action
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
              Explore authentic application tutorials, cold-process lather tests, and 21-day dark spot transformations.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Tap any video to watch full tutorial & order directly</span>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((vid, idx) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideoIndex(idx)}
              className="group relative rounded-3xl overflow-hidden bg-gray-900 border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-end aspect-[9/14] cursor-pointer hover:-translate-y-1 select-none"
            >
              {/* Background Thumbnail Image */}
              <img
                src={vid.thumbnail}
                alt={vid.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

              {/* Top Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="text-[10px] font-bold tracking-wider uppercase bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/20">
                  {vid.tag || "Tutorial"}
                </span>

                <div className="flex items-center space-x-1.5 text-[10px] font-semibold bg-black/60 backdrop-blur-md text-amber-300 px-2.5 py-1 rounded-full border border-white/10">
                  <Eye className="w-3 h-3" />
                  <span>{vid.views}</span>
                </div>
              </div>

              {/* Center Animated Play Button */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md text-[#7b3e1d] flex items-center justify-center shadow-xl group-hover:scale-115 transition-transform duration-300 group-hover:bg-[#c59b27] group-hover:text-white">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
              </div>

              {/* Bottom Card Content & Shoppable Product */}
              <div className="relative z-10 p-5 space-y-3">
                {/* Title & Creator */}
                <div>
                  <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 drop-shadow-sm group-hover:text-amber-200 transition-colors">
                    {vid.title}
                  </h3>
                  <div className="text-[11px] text-gray-300 mt-1 flex items-center space-x-1">
                    <span>By {vid.creator}</span>
                    {vid.city && (
                      <>
                        <span>•</span>
                        <span>{vid.city}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Shoppable Product Pill */}
                {vid.productTitle && (
                  <div className="bg-white/95 backdrop-blur-md p-2.5 rounded-2xl flex items-center justify-between shadow-lg border border-white/80">
                    <div className="min-w-0 pr-2">
                      <span className="text-[10px] font-extrabold text-gray-900 block truncate">
                        {vid.productTitle}
                      </span>
                      <span className="text-[10px] text-[#7b3e1d] font-black block">
                        Rs. {vid.productPrice?.toLocaleString() || "1,750"}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(e, vid)}
                      className="px-3 py-1.5 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-colors shrink-0 flex items-center space-x-1"
                      title="Add to shopping bag"
                    >
                      <ShoppingBag className="w-3 h-3 text-[#c59b27]" />
                      <span>Buy</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shoppable Fullscreen Video Modal (TikTok / Reel Experience) */}
      {currentModalVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          
          {/* Close button */}
          <button
            onClick={() => setActiveVideoIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center z-50 transition-all cursor-pointer backdrop-blur-md"
            aria-label="Close video player"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div className="relative w-full max-w-sm sm:max-w-md bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20 aspect-[9/16] flex flex-col justify-between">
            
            {/* The Video Layer */}
            <div className="absolute inset-0 z-0">
              {renderVideoPlayer(currentModalVideo)}
            </div>

            {/* Top Modal Controls */}
            <div className="relative z-10 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent pointer-events-auto">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider bg-black/60 text-white px-3 py-1 rounded-full border border-white/20">
                  {currentModalVideo.tag}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                {/* Previous & Next Video inside modal */}
                <button
                  onClick={() => setActiveVideoIndex(prev => (prev === 0 ? videos.length - 1 : prev - 1))}
                  className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                  title="Previous Video"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveVideoIndex(prev => (prev + 1) % videos.length)}
                  className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                  title="Next Video"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Shoppable Bar (The Conversion Engine) */}
            <div className="relative z-10 p-4 sm:p-5 bg-gradient-to-t from-black via-black/90 to-transparent space-y-3 pointer-events-auto">
              <div>
                <h4 className="text-base font-bold text-white leading-snug drop-shadow-sm">
                  {currentModalVideo.title}
                </h4>
                <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                  {currentModalVideo.description}
                </p>
                <div className="text-[11px] text-amber-300 font-semibold mt-1">
                  ⭐ Featured by {currentModalVideo.creator} ({currentModalVideo.city})
                </div>
              </div>

              {/* Product Direct COD Checkout Action */}
              <div className="bg-white/95 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-xl">
                <div className="min-w-0">
                  <span className="text-xs font-extrabold text-gray-900 block truncate">
                    {currentModalVideo.productTitle}
                  </span>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="text-xs font-black text-[#7b3e1d]">
                      Rs. {currentModalVideo.productPrice?.toLocaleString() || "1,750"}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                      COD Available
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleOrderProduct(currentModalVideo)}
                  className="px-4 py-2.5 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center space-x-1.5 shrink-0"
                >
                  <Truck className="w-3.5 h-3.5 text-amber-300" />
                  <span>Order COD</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

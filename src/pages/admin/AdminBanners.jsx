import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Save, Plus, Trash2, Check, Sparkles } from 'lucide-react';

export const AdminBanners = () => {
  const { settings, updateSettings, updateHeroBanners } = useStore();

  const [announcementText, setAnnouncementText] = useState(settings.announcementText || "");
  const [announcementBg, setAnnouncementBg] = useState(settings.announcementBg || "#7b3e1d");
  const [announcementEnabled, setAnnouncementEnabled] = useState(settings.announcementEnabled !== false);
  const [slides, setSlides] = useState(settings.heroBanners || []);
  const [savedMsg, setSavedMsg] = useState("");

  const handleSaveAnnouncement = (e) => {
    e.preventDefault();
    updateSettings({
      announcementText,
      announcementBg,
      announcementEnabled
    });
    setSavedMsg("Top announcement bar updated successfully!");
    setTimeout(() => setSavedMsg(""), 2000);
  };

  const handleSlideChange = (index, field, value) => {
    const updated = [...slides];
    updated[index][field] = value;
    setSlides(updated);
  };

  const handleBannerFileUpload = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      handleSlideChange(index, 'image', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveSlides = () => {
    updateHeroBanners(slides);
    setSavedMsg("Hero banners updated successfully!");
    setTimeout(() => setSavedMsg(""), 2000);
  };

  const handleAddSlide = () => {
    setSlides([
      ...slides,
      {
        id: `slide-${Date.now()}`,
        title: "New Seasonal Collection",
        subtitle: "100% Pure Botanical Formulations",
        badge: "Limited Offer",
        ctaText: "Shop Now",
        ctaLink: "/shop",
        image: "https://cdn.shopify.com/s/files/1/0031/0296/5795/files/winter_banner_1.png?v=1788760478&width=2000"
      }
    ]);
  };

  const handleDeleteSlide = (index) => {
    if (slides.length <= 1) {
      alert("At least one hero banner is required.");
      return;
    }
    setSlides(slides.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Banners & Marquee Announcement</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Customize the top scrolling announcement message and homepage hero slider banners.
        </p>
      </div>

      {savedMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-xl flex items-center space-x-2">
          <Check className="w-4 h-4" />
          <span>{savedMsg}</span>
        </div>
      )}

      {/* 1. Announcement Bar Manager */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200/70 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-100 flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#c59b27]" />
          <span>Top Announcement Bar</span>
        </h3>

        <form onSubmit={handleSaveAnnouncement} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Announcement Message</label>
            <input
              type="text"
              required
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#7b3e1d]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Background Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={announcementBg}
                  onChange={(e) => setAnnouncementBg(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border border-gray-300"
                />
                <input
                  type="text"
                  value={announcementBg}
                  onChange={(e) => setAnnouncementBg(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-xl text-xs font-mono"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-5">
              <input
                type="checkbox"
                id="enableAnn"
                checked={announcementEnabled}
                onChange={(e) => setAnnouncementEnabled(e.target.checked)}
                className="w-4 h-4 accent-[#7b3e1d] rounded"
              />
              <label htmlFor="enableAnn" className="text-gray-800 font-semibold cursor-pointer">
                Show Announcement Bar on Storefront
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white font-bold rounded-xl transition-colors shadow-sm flex items-center space-x-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Announcement</span>
          </button>
        </form>
      </div>

      {/* 2. Hero Banners Manager */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200/70 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            Homepage Hero Banners ({slides.length} slides)
          </h3>
          <button
            onClick={handleAddSlide}
            className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold flex items-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Slide</span>
          </button>
        </div>

        <div className="space-y-6">
          {slides.map((slide, idx) => (
            <div key={slide.id || idx} className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-800">Slide #{idx + 1}</span>
                <button
                  onClick={() => handleDeleteSlide(idx)}
                  className="text-rose-600 hover:text-rose-800 font-semibold flex items-center space-x-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 font-semibold mb-0.5">
                    Slide Image (Upload from Mobile or URL)
                  </label>
                  <div className="flex items-center space-x-2 mb-1.5">
                    {slide.image && (
                      <img src={slide.image} alt="" className="w-10 h-7 object-cover rounded border border-gray-200 bg-white shrink-0" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleBannerFileUpload(idx, e)}
                      className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-[#1a1a1a] file:text-white hover:file:bg-[#7b3e1d] cursor-pointer"
                    />
                  </div>
                  <input
                    type="text"
                    value={slide.image}
                    onChange={(e) => handleSlideChange(idx, 'image', e.target.value)}
                    placeholder="Or enter image URL"
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-0.5">Badge (e.g. Best Seller)</label>
                  <input
                    type="text"
                    value={slide.badge || ""}
                    onChange={(e) => handleSlideChange(idx, 'badge', e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-0.5">Headline Title</label>
                  <input
                    type="text"
                    value={slide.title}
                    onChange={(e) => handleSlideChange(idx, 'title', e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-0.5">Subtitle Description</label>
                  <input
                    type="text"
                    value={slide.subtitle}
                    onChange={(e) => handleSlideChange(idx, 'subtitle', e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-0.5">CTA Button Text</label>
                  <input
                    type="text"
                    value={slide.ctaText || "Shop Now"}
                    onChange={(e) => handleSlideChange(idx, 'ctaText', e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-0.5">CTA Target Route</label>
                  <input
                    type="text"
                    value={slide.ctaLink || "/shop"}
                    onChange={(e) => handleSlideChange(idx, 'ctaLink', e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg bg-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSaveSlides}
          className="px-6 py-2.5 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white font-bold rounded-xl transition-colors shadow-sm flex items-center space-x-1.5 text-xs"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save All Hero Banners</span>
        </button>
      </div>
    </div>
  );
};

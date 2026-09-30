import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Video, 
  Plus, 
  Trash2, 
  Edit, 
  Upload, 
  Film, 
  Eye, 
  Check, 
  X, 
  RotateCcw,
  Sparkles,
  Play,
  Camera,
  Link as LinkIcon
} from 'lucide-react';

export const AdminVideos = () => {
  const { videos, addVideo, updateVideo, deleteVideo, resetToDefaultVideos, products } = useStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [uploadMode, setUploadMode] = useState('file'); // 'file' or 'link'
  
  const [formData, setFormData] = useState({
    title: '',
    creator: 'Dr. Aiman Tariq',
    city: 'Karachi',
    tag: 'Tutorial',
    duration: '0:45',
    views: '1.5K',
    videoUrl: '',
    thumbnail: 'https://cdn.shopify.com/s/files/1/0031/0296/5795/files/6-StepFacialGlowKit.png?v=1786621465',
    productId: 'prod-duo',
    productTitle: 'The Ultimate Glow Duo (Soap + Cream)',
    productPrice: 1750,
    description: ''
  });

  const handleOpenAdd = () => {
    setEditingVideo(null);
    setFormData({
      title: '',
      creator: 'Blossom Customer',
      city: 'Lahore',
      tag: 'Tutorial',
      duration: '0:45',
      views: '1.2K',
      videoUrl: '',
      thumbnail: 'https://cdn.shopify.com/s/files/1/0031/0296/5795/files/6-StepFacialGlowKit.png?v=1786621465',
      productId: 'prod-duo',
      productTitle: 'The Ultimate Glow Duo (Soap + Cream)',
      productPrice: 1750,
      description: ''
    });
    setUploadMode('file');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (vid) => {
    setEditingVideo(vid);
    setFormData({
      ...vid
    });
    setUploadMode(vid.videoUrl?.startsWith('blob:') || vid.videoUrl?.startsWith('data:') ? 'file' : 'link');
    setIsModalOpen(true);
  };

  // Handle Video File Upload from Mobile / Computer
  const handleVideoFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create a local blob URL for instant preview & playback
    const localVideoUrl = URL.createObjectURL(file);
    setFormData(prev => ({
      ...prev,
      videoUrl: localVideoUrl
    }));
  };

  // Handle Thumbnail File Upload from Mobile Camera / Gallery
  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        thumbnail: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleProductChange = (prodId) => {
    const selected = products.find(p => p.id === prodId);
    setFormData(prev => ({
      ...prev,
      productId: prodId,
      productTitle: selected?.title || 'The Ultimate Glow Duo',
      productPrice: selected?.price || 1750
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) {
      alert("Please enter a video title.");
      return;
    }

    if (editingVideo) {
      updateVideo(editingVideo.id, formData);
    } else {
      addVideo(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete video: "${title}"?`)) {
      deleteVideo(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">
            Video & Reels Studio
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Upload videos from your mobile phone camera or gallery, or paste video links to display on the storefront.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              if (window.confirm("Reset videos to default authentic demos?")) {
                resetToDefaultVideos();
              }
            }}
            className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Video</span>
          </button>
        </div>
      </div>

      {/* Mobile-Friendly Upload Helper Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start space-x-3 shadow-xs">
        <div className="w-10 h-10 rounded-xl bg-[#c59b27] text-white flex items-center justify-center shrink-0">
          <Camera className="w-5 h-5" />
        </div>
        <div className="text-xs space-y-1">
          <h3 className="font-bold text-gray-900">
            Mobile Upload Enabled
          </h3>
          <p className="text-gray-600 leading-relaxed">
            You can open this admin panel on your mobile phone, tap <strong>"Upload New Video"</strong>, and pick videos or photos directly from your phone camera or gallery!
          </p>
        </div>
      </div>

      {/* Videos List / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {videos.map((vid) => (
          <div 
            key={vid.id}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            {/* Thumbnail Preview with Play icon */}
            <div className="relative aspect-[9/12] bg-gray-900 group">
              <img 
                src={vid.thumbnail} 
                alt={vid.title} 
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-bold uppercase bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-full border border-white/20">
                  {vid.tag || "Tutorial"}
                </span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-white/90 text-gray-900 flex items-center justify-center shadow-lg">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                <div className="font-bold truncate">{vid.title}</div>
                <div className="text-[10px] text-gray-300 mt-0.5 flex items-center justify-between">
                  <span>{vid.creator}</span>
                  <span className="text-amber-300 font-bold">{vid.views}</span>
                </div>
              </div>
            </div>

            {/* Shoppable Linked Product & Actions */}
            <div className="p-3.5 space-y-2 border-t border-gray-100">
              <div className="text-[11px] text-gray-600">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Linked Product:</span>
                <span className="font-bold text-gray-900 truncate block">{vid.productTitle}</span>
                <span className="text-[#7b3e1d] font-bold">Rs. {vid.productPrice?.toLocaleString()}</span>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => handleOpenEdit(vid)}
                  className="px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-black bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center space-x-1 transition-colors"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(vid.id, vid.title)}
                  className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg flex items-center space-x-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-lg w-full relative shadow-2xl border border-gray-100 max-h-[92vh] overflow-y-auto">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif font-bold text-gray-900 mb-1">
              {editingVideo ? "Edit Video & Reel" : "Upload Video / Reel from Mobile"}
            </h3>
            <p className="text-xs text-gray-500 mb-5">
              Select a video file from your phone storage/camera or paste an online video link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Upload Mode Selector */}
              <div className="flex bg-gray-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setUploadMode('file')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                    uploadMode === 'file' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Upload from Phone</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode('link')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                    uploadMode === 'link' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>Paste Video URL</span>
                </button>
              </div>

              {/* Video Source Input */}
              {uploadMode === 'file' ? (
                <div className="p-4 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-[#7b3e1d] flex items-center justify-center mx-auto">
                    <Film className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-gray-700 font-bold">
                    Select Video from Mobile Gallery or Record
                  </div>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoFileUpload}
                    className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#1a1a1a] file:text-white hover:file:bg-[#7b3e1d] cursor-pointer"
                  />
                  {formData.videoUrl && (
                    <div className="text-[10px] text-emerald-600 font-bold flex items-center justify-center space-x-1 pt-1">
                      <Check className="w-3 h-3" />
                      <span>Video file selected & ready!</span>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Video URL (YouTube, MP4, Shorts, CDN) *
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=... or https://...mp4"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData(p => ({ ...p, videoUrl: e.target.value }))}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#7b3e1d]"
                  />
                </div>
              )}

              {/* Video Thumbnail Upload from Mobile */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Video Thumbnail / Cover Image (From Mobile)
                </label>
                <div className="flex items-center space-x-3">
                  <img
                    src={formData.thumbnail}
                    alt="Thumbnail"
                    className="w-14 h-18 object-cover rounded-xl border border-gray-200 shrink-0"
                  />
                  <div className="flex-1 space-y-1.5">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      className="block w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-800 hover:file:bg-gray-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      placeholder="Or enter image URL"
                      value={formData.thumbnail}
                      onChange={(e) => setFormData(p => ({ ...p, thumbnail: e.target.value }))}
                      className="w-full text-xs p-2 rounded-lg border border-gray-200 text-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Title & Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Video Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 60-Sec Herbal Soap Lather"
                    value={formData.title}
                    onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#7b3e1d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Tag / Category *
                  </label>
                  <select
                    value={formData.tag}
                    onChange={(e) => setFormData(p => ({ ...p, tag: e.target.value }))}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#7b3e1d] bg-white"
                  >
                    <option value="Tutorial">Skincare Tutorial</option>
                    <option value="Acne Detox">Acne Detox</option>
                    <option value="21-Day Transformation">21-Day Transformation</option>
                    <option value="Unboxing & COD">Unboxing & COD</option>
                    <option value="Customer Review">Customer Review</option>
                  </select>
                </div>
              </div>

              {/* Creator & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Creator / Customer Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Aiman Tariq"
                    value={formData.creator}
                    onChange={(e) => setFormData(p => ({ ...p, creator: e.target.value }))}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#7b3e1d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    City in Pakistan
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lahore / Karachi"
                    value={formData.city}
                    onChange={(e) => setFormData(p => ({ ...p, city: e.target.value }))}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#7b3e1d]"
                  />
                </div>
              </div>

              {/* Linked Product for Shoppable Buy Button */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Feature Shoppable Product *
                </label>
                <select
                  value={formData.productId}
                  onChange={(e) => handleProductChange(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#7b3e1d] bg-white font-medium"
                >
                  <option value="prod-duo">The Ultimate Glow Duo (Rs. 1,750)</option>
                  <option value="prod-cream">Organic Glow Nourishing Cream (Rs. 1,250)</option>
                  <option value="prod-soap">Organic Herbal Radiance Soap (Rs. 650)</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell customers what to look for in this video..."
                  value={formData.description}
                  onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                  className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#7b3e1d]"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 border border-gray-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
                >
                  {editingVideo ? "Save Changes" : "Publish Video Reel"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

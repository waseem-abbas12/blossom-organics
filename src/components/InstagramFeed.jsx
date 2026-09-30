import React from 'react';
import { Instagram } from 'lucide-react';

export const InstagramFeed = () => {
  const posts = [
    "https://cdn.shopify.com/s/files/1/0031/0296/5795/files/6-StepFacialGlowKit.png?v=1786621465",
    "https://cdn.shopify.com/s/files/1/0031/0296/5795/files/DailyGlowTrio.png?v=1786621510",
    "https://cdn.shopify.com/s/files/1/0031/0296/5795/files/TheResetKit.png?v=1786621518",
    "https://cdn.shopify.com/s/files/1/0031/0296/5795/files/PeachCremeBleachShipper-1.png?v=1786098026",
    "https://cdn.shopify.com/s/files/1/0031/0296/5795/files/Hot-Air-Brush-1.jpg?v=1788164782",
    "https://cdn.shopify.com/s/files/1/0031/0296/5795/collections/11_69dded3c-c29d-472a-8418-d48c52b88693.png?v=1759216605"
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center mb-6">
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noreferrer" 
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-gray-800 hover:text-[#7b3e1d] transition-colors"
        >
          <Instagram className="w-4 h-4 text-pink-600" />
          <span>@ Follow Us on Instagram: #BlossomOrganics</span>
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 px-2 sm:px-6 max-w-7xl mx-auto">
        {posts.map((img, idx) => (
          <div key={idx} className="relative aspect-square overflow-hidden group rounded-lg bg-gray-100">
            <img 
              src={img} 
              alt={`Instagram post ${idx}`} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Instagram className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
